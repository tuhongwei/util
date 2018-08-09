/**
 *ajax操作(用fetch实现)
 */

(function(window, document){
	function checkStatus(response){
		if(response.status >= 200 && response.status < 300){
			return response;
		}else{
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	}
	function processBlob(type, filename, res, success, error){
		res.blob().then(function(blob){
			var url = window.URL.createObjectURL(blob);
			if(type === "download"){
				filename = filename || res.headers.get("Content-Disposition")
				var a = document.createElement("a");
				a.href = url;
				a.download = filename;
				a.click();
			}
			success && success(url);
			window.URL.revokeObjectURL(url);
		}).catch(function(msg){
			console.log(msg);
			error && error(-1, msg);
		});
	}
	var config = {}, requestQueue = {};
	function http(url, params, success, error, options){
		if(typeof params === 'function'){
			options = error;
			error = success;
			success = params;
			params = null;
		}
		if(typeof success === 'object'){
			options = success;
			success = null;
			error = null;
		}
		if(typeof error === 'object'){
			options = error;
			error = null;
		}
		options = options || {};
		if(config.urlPrefix && url.indexOf("http") !== 0){
			url = config.urlPrefix + url;
		}
		var url0 = url;
		if(!options.ignoreBlock){
			if(requestQueue[url0]){
				return;
			}
		}
		requestQueue[url0] = 1;
		var method = options.method ? options.method.toUpperCase() : "POST",
			credentials = options.credentials ? options.credentials : "include",
			dataType = options.dataType ? options.dataType : "json",
			preProcess = options.preProcess !== undefined ? options.preProcess : config.preProcess,
			blob = options.blob ? options.blob : false,
			filename = options.filename ? options.filename : null,
			jsonParam = options.jsonParam ? options.jsonParam : (method === "POST" ? false : true),
			paramsInBody = method == "POST" || method == "PUT" || method == "PATCH";
		params = params || {};
		if(!options.ignoreDefaultParams && config.defaultParams){
			var defaultParams = config.defaultParams() || {};
			for(var k in defaultParams){
				params[k] = defaultParams[k];
			}
		}
		var postData = null,
			getData = [];
		if(paramsInBody){
			postData = new FormData();
		}
		for(var k in params){
			if(Object.prototype.toString.call(params[k]) === 'Object Array'){
				var pairs = params[k];
				for(var i=0, l=pairs.length; i<l; i++){
					if(postData){
						postData.append(k, pairs[i]);
					}
					getData.push(k + '[]=' + encodeURIComponent(pairs[i]));
				}
			}else{
				if(postData){
					postData.append(k, params[k])
				}
				getData.push(k + '=' + encodeURIComponent(params[k]));
			}
		}
		var option0 = {
			method: method
		};
		if(!paramsInBody){
			if(url.indexOf("?") > -1){
				url += '&' + getData.join("&");
			}else{
				url += '?' + getData.join("&");
			}
		}else{
			if(!jsonParam){
				option0.body = postData;
			}else{
				option0.body = JSON.stringify(params);
				option0.headers = {
					'Content-Type': 'application/json'
				}
			}
			option0.credentials = credentials;
		}
		var p = fetch(url, option0).then(checkStatus);
		if(blob){
			p = p.then(function(response){
				delete requestQueue[url0];
				processBlob(blob, filename, response, success, error);
			});
		}else{
			if(dataType === 'text'){
				p = p.then(function(response){
					return response.text();
				});
			}else if(dataType === 'json'){
				p = p.then(function(response){
					return response.json();
				});
			}
			p = p.then(function(data){
				delete requestQueue[url0];
				if(typeof preProcess === 'function'){
					var ret = preProcess(data, dataType, success, error);
					if(ret == null){
						return;
					}
					data = ret;
				}
				success && success.apply({}, [].concat(data));
			});
		}
		p.catch(function(msg){
			console.log(msg);
			delete requestQueue[url0];
			error && error(-1, msg);
		});
	}

	http.config = function(options){
		config.preProcess = options.preProcess ? options.preProcess : null;
		config.defaultParams = options.defaultParams ? options.defaultParams : null;
		config.urlPrefix = options.urlPrefix ? options.urlPrefix : null;
	};
	http.setMethod = function(args0, type){
		var args = [];
		if(args0.length > 0){
			for(var i=0, l=args0.length; i<l; i++){
				args.push(args[0]);
			}
		}
		var lastArg = args.slice(-1)[0];
		if(typeof lastArg === 'object'){
			lastArg.method = type;
		}else{
			args.push({method: type});
		}
		return args;
	};
	http.get = function(){
		http.apply(this, setMethod(arguments, 'get'));
	};
	http.post = function(){
		http.apply(this, setMethod(arguments, 'post'));
	};
	http.put = function(){
		http.apply(this, setMethod(arguments, 'put'));
	};
	http.patch = function(){
		http.apply(this, setMethod(arguments, 'patch'));
	};
	http.delete = function(){
		http.apply(this, setMethod(arguments, 'delete'));
	};
	http.options = function(){
		http.apply(this, setMethod(arguments, 'options'));
	};
	http.head = function(){
		http.apply(this, setMethod(arguments, 'head'));
	};

	if(typeof define === "function" && define.amd){
		define(function(){
		  return http;
		});
	}else if(typeof module === "object" && typeof module.exports === "object"){
		module.exports = http;
	}else{
		window.http = http;
	}
})(window, document);


