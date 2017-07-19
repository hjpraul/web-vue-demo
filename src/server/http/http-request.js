var http = require('http');
var qs = require('querystring');
var _ = require('underscore');
var	Config  = require('./config');
var Code = require('./code');

let code = new Code();

class HttpRequest {
	constructor(){
		this.defaults = {
			hostname: Config.ENVIRONMENT_DEV.HOST,
			method: "POST"
		}
	}
	postRequest(path, req, succ){
		let reqData;
		let baseData = {
			'sys_name': 'WEB',
	        'sys_version': '4.4',
	        'app_version': '1.0.0'
		};
		if (req.method == 'POST'){
			req.body.req = baseData;
			reqData = req.body;
		}
		else {
			req.query.req = baseData;
			reqData = req.query;
		}
		let md5Sign = code.encodeSign(reqData);
		let postData = qs.stringify({
			"json" : JSON.stringify(reqData),
			"sign" : md5Sign 
		});

		let str = '';
		let options = _.extend(this.defaults, {path : Config.ENVIRONMENT_DEV.PATH + path, headers : {
			'Content-Type': 'application/x-www-form-urlencoded',
		    'Content-Length': Buffer.byteLength(postData)
		}});
		let request = http.request(this.defaults, (res) => {
			res.setEncoding('utf-8');
			res.on('data', (chunk) => {
				str += chunk;
			});
			res.on('end', () => {
				let result = code.decodeSign(str);
				if (result){
					if (result.resp.resp_code === 'AS0000'){
						succ(result);
					}
				}
				else {
					
				}
			});
		});

		request.on('error', (e) => {
			console.log(e.message);
		});

		request.write(postData);
		request.end();
	}
}

module.exports = HttpRequest;