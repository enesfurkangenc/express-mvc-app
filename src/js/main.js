// import './category-list-item/category-list-item.js';
require('./category-list-item/category-list-item.js');


var btn = document.getElementsByClassName('album-li');

for(var i=0; i<btn.length; i++){
  btn[i].addEventListener('click', function(e){
    getDetail(e.target.id);
  });
}

var AlbumElement = document.createElement('img');
AlbumElement.style = 'margin-right : 50px';

// if select album and show album detail
var getDetail = function(albumid){
  /* Why I still use XHR instead of the Fetch API???
      fetch is a failed promise
      the simplicity of the fetch falls apart 
      pretty quickly once you start dealing with error handling.
      fetch() works in all modern browsers, 
      but has no IE support, only works in Safari 10 and up,
      and Edge support starts at 14.
  */
  var r = new XMLHttpRequest();
  r.open('GET', 'https://jsonplaceholder.typicode.com/albums/' + albumid + '/photos', true);
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    var data = JSON.parse(r.responseText);
    document.createElement('li');
    data = data.splice(0, 8);
    var row = document.getElementById('list-row');
    var col = document.getElementById('list-image');
    row.appendChild(col);
    col.innerHTML = '';
    data.forEach(element => {
      var el = document.createElement('category-list-item');
      el.article = element;
      col.appendChild(el);
      el.addEventListener('click', function() {
        showBigPicture(element.url);
      });
    });
  };
  r.send();
};

var showBigPicture = function(image) {
  var rowThumb = document.getElementById('thumb-image-row');
  var colThumb = document.getElementById('thumb-image-col');
  rowThumb.appendChild(colThumb);
  colThumb.innerHTML = '';
  var img = document.createElement('img');
  img.src = image;
  img.style = 'width: 100%;height: 600px;margin-top: 10px';
  colThumb.appendChild(img);
};
