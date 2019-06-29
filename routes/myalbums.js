var express = require('express');
var router = express.Router();
//controller
var myalbumscontroller = require('../controller/myalbums.controller');

/* GET users listing. */
router.get('/', myalbumscontroller.getAlbums);
router.get('/test', myalbumscontroller.getAlbumstest);

// router.get('/getalbums', myalbumscontroller.getAlbums);

module.exports = router;
