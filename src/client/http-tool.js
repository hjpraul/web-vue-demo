import _ from "underscore"

export default {
	install(Vue, options) {
		Vue.prototype.$myHttpRequest = function(options){
			let defaults = {};
			let args = _.extend(defaults, options.args || {});
			if (options.type == "post"){
				this.$http.post(options.path, args).then(function(resp){
					let result = JSON.parse(resp.bodyText);
					if (result.resp.resp_code === "AS0000"){
		  				options.success(result);
		  			} else if ((result.resp.resp_code === "AS0001")||(result.resp.resp_code === "AS0002")||(result.resp.resp_code === "AS0003")||(result.resp.resp_code === "AS0005")||(result.resp.resp_code === "AS0011")){
						// 清除cookie中的session id
						var d = new Date;
						d.setTime(d.getTime()+24*60*60*1000*(-1));
						window.document.cookie = 'web_session_id=null' + ";path=/;expires=" + d.toGMTString();
						
						// 转到登录界面
						location.href = '/';
						// location.href = 'http://localhost:3000'; 
					} else {
						options.failure(result.resp);
					}
		  		}).catch(err => {
					var resp = {
						"resp_code" : err.status,
						"resp_desc" : err.statusText
					};
					options.failure({"resp":resp});
				});
			}
			else if (options.type == "get"){
				this.$http.get(options.path, {params:args}).then(function(resp){
					let result = JSON.parse(resp.bodyText);
					if (result.resp.resp_code === "AS0000"){
		  				options.success(result);
		  			} else if ((result.resp.resp_code === "AS0001")||(result.resp.resp_code === "AS0002")||(result.resp.resp_code === "AS0003")||(result.resp.resp_code === "AS0005")||(result.resp.resp_code === "AS0011")){
						// 清除cookie中的session id
						var d = new Date;
						d.setTime(d.getTime()+24*60*60*1000*(-1));
						window.document.cookie = 'web_session_id=null' + ";path=/;expires=" + d.toGMTString();
						
						// 转到登录界面
						location.href = '/';
						// location.href = 'http://localhost:3000'; 
					} else {
						options.failure(result.resp);
		  			}
		  		}).catch(err => {
					var resp = {
						"resp_code" : err.status,
						"resp_desc" : err.statusText
					};
					options.failure({"resp":resp});
				});
			}
		}
	}
}

