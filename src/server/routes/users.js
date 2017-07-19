var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

var HttpRequest = require('../http/http-request');

let httpRequest = new HttpRequest();

router.post('/queryPhone', function(req, res, next) {
    httpRequest.postRequest('/CustomerService/get_mobile_status/', req, (resp) => {
		res.send(resp);
	});
});

router.post('/login', function(req, res, next) {
    httpRequest.postRequest('/CustomerService/login/', req, (resp) => {
    	res.send(resp);
	});
});

router.get('/getVerifyCode', function(req, res, next) {
    httpRequest.postRequest('/SecureCodeService/send_sms_secureity_code/', req, (resp) => {
    	res.send(resp);
	});
});

router.post('/register', function(req, res, next) {
    httpRequest.postRequest('/CustomerService/register/', req, (resp) => {
		res.send(resp);
	});
});

router.get('/logout', function(req, res, next) {
    httpRequest.postRequest('/CustomerService/logout/', req, (resp) => {
        res.send(resp);
	});
});

router.get('/getInfo', function(req, res, next) {
    httpRequest.postRequest('/CustomerService/get_customer/', req, (resp) => {
        if (resp.resp.resp_code === "AS0000"){
           resp.customer.base_info.avatar = resp.customer.base_info.avatar ? resp.customer.base_info.avatar : '/images/person_center_top.png';
        }
    	res.send(resp);
	});
});




module.exports = router;
