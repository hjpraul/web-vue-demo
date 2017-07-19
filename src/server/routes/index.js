var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var _ = require('underscore');

var HttpRequest = require('../http/http-request');

let httpRequest = new HttpRequest();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('login');
// });

// router.get('/first', function(req, res, next) {
//   res.render('first');
// });

// router.get('/sys-status', function(req, res, next) {
//   res.render('version');
// });

module.exports = router;
