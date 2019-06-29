var axios = require('axios');

exports.getAlbums = function(req,res,next) {
  var data = [];
  axios.get('https://jsonplaceholder.typicode.com/albums').then(function(response) {
    data = response.data;
    var filterData = data.splice(0, 10);
    res.render('myalbums', {
      data: filterData
    });
  });
};


exports.getAlbumstest = function(req,res,next) {
  var data = [];
  axios.get('https://jsonplaceholder.typicode.com/albums').then(function(response) {
    data = response.data;
    var filterData = data.splice(0, 10);
    res.send(filterData);
  });
};