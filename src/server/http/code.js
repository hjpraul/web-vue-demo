var crypto = require('crypto');
var	Config  = require('./config');

class Code {
	encodeSign(obj){
		let md5 = crypto.createHash('md5');
		let jsonData = JSON.stringify(obj);
		md5.update(jsonData + Config.SIGN_KEY);
		let sign = md5.digest('hex');
		return sign;
	}
	decodeSign(chunk){
		let obj;
		let content = chunk.split('&');
		let json = this.cutChunk(content[0]);
		let sign = this.cutChunk(content[1]);
		let md5 = crypto.createHash('md5');
		md5.update(json + Config.SIGN_KEY);
		let match = md5.digest('hex');
		if (match === sign){
			obj = JSON.parse(json);
		}
		else {
			obj = null;
		}
		return obj;
	}
	cutChunk(chunk){
		let position = chunk.indexOf('=');
		let decodeData = decodeURIComponent(chunk.substr(position+1).replace(/\+/g, '%20'));
		return decodeData;
	}
}

module.exports = Code; 