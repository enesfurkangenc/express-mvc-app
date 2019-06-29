// var Users = [];

exports.login = function(req, res){
  if(!req.body.email || !req.body.password){
    res.render('login', {message: 'Please enter both email and password'});
  } else {
    if (req.body.email === 'test@test.com' && req.body.password === 'test123') {
      var user = req.body.email;
      req.session.user = user;
      res.redirect('/myalbums');
    } else {
      res.render('login', {message: 'Invalid credentials!'});
    }
  }
};

exports.logintest = function(req, res){
  if(!req.body.email || !req.body.password){
    res.send({ login: false});
  } else {
    if (req.body.email === 'test@test.com' && req.body.password === 'test123') {
      res.send({ login: true});
    } else {
      res.send({ login: false});
    }
  }
};