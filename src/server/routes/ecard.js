var express = require('express');
var router = express.Router();
var moment = require('moment');

var HttpRequest = require('../http/http-request');

let httpRequest = new HttpRequest();

router.get('/getEcard', function(req, res, next){
	httpRequest.postRequest('/ECardService/get_ecard/', req, (resp) => {
		res.send(resp);
	});
});

router.post('/cancelFreezeEcard', function(req, res, next){
	httpRequest.postRequest('/ECardService/cancel_freeze/', req, (resp) => {
		res.send(resp);
	});
});
module.exports = router;