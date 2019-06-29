//load Gulp
var { src, dest, task, watch, series, parallel } = require('gulp');

//CSS plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

//JS plugins
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var stripDebug = require('gulp-strip-debug');

//Utility plugins
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var wait = require('gulp-wait');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var options = require('gulp-options');
var gulpif = require('gulp-if');
var del = require('del');

//Browser plugins
var bs = require('browser-sync').create();

//Project Variables
var styleSRCDir = './src/scss/**/*.scss';
var styleBundle = './src/scss/style.scss';
var styleDist = './public/stylesheets/';
var mapURL = './';

var jsSRC = './src/js/';
var jsFront = 'main.js';
var jsFiles = [jsFront];
var jsDist = './public/javascripts/';

var htmlSRC = (['views/**/*.pug', 'views/**/*.html']);
var htmlURL = '';

//Watch variables 
var styleWatch = './src/scss/**/*.scss';
var jsWatch = './src/js/**/*.js';
var htmlWatch = './views/**/*.*';

//Tasks
function callNodemon(cb) {
  let called = false;
  return nodemon({

    // nodemon our expressjs server
    script: './bin/www',

    // watch core server file(s) that require server restart on change
    watch: ['app.js', 'routes/*.js']

  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        bs.reload({
          stream: false
        });
      }, wait(300));
    });
}

function callBrowserSync() {
  bs.init({
    // server: {
    //   baseDir: 'public/'
    // },
    proxy: 'localhost:3000',
    browser: 'chrome',
    port: 8000,
    tunnel: false //change to true if you can't control firewall settings 
  });
}

function reload(done) {
  bs.reload();
  done();
}

function delSweep() {
  (function() {
    var deletedPaths = del(['src/scss/bundle.css', 'public/stylesheets/style.min.css'],
      {
        dryRun: false
      });
    console.log('Deleted files and folders:\n', deletedPaths.join('\n'));
  })();
}

function concatSCSS() {
  // (async () => {
  //   await delSweep()
  //   console.log('delSweep done')
  // })();
  return src('src/scss/**/*.scss')
    .pipe(concat('bundle.scss'))
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded' //compressed
    }))
    .on('error', console.error.bind(console))
    .pipe(dest('src/scss/'));
}

function css(done) {
  src('./src/scss/bundle.css')
    .pipe(cleanCSS())
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    }))
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write(mapURL))
    .pipe(dest('./public/stylesheets/'));
  done();
}

function js(done) {
  jsFiles.map(function (entry) {
    return browserify({
      entries: [jsSRC + entry]
    })
      .transform(babelify, {
        presets: ['@babel/preset-env']
      })
      .bundle()
      .pipe(source(entry))
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(buffer())
      .pipe(gulpif(options.has('production'), stripDebug()))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(dest(jsDist));
  });
  done();
}

function triggerPlumber(src_file, dest_file) {
  return src(src_file)
    .pipe(plumber())
    .pipe(dest(dest_file));
}

function html(done) {
  //express takes care of this, no need for an additional task 
  // src([styleSRC]);
  // return bs.reload();
  done();
}

function watch_files() {
  watch(styleWatch, series(concatSCSS, css, reload));
  watch(jsWatch, series(js, reload));
  watch(htmlWatch, series(html, reload));
  src(jsDist + 'main.min.js')
    .pipe(notify({
      message: 'Gulp is Watching, Happy Coding!'
    }));
}

task('delSweep', delSweep);
task('concatSCSS', series(delSweep, concatSCSS));
task('css', series(css));
task('js', js);
task('html', html);
task('callNodemon', callNodemon);
task('bs', callBrowserSync);
task('build', series(concatSCSS, css, js));
task('default', parallel(callNodemon, callBrowserSync, concatSCSS, css, js, watch_files));