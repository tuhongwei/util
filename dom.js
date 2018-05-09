/**
 *DOM 操作 ->需要支持Promise
 */

/* 操作类 */
var addClass = function ($elem, name) {
	if(!$elem.className.match(new RegExp("(\\s+|^)" + name + "(\\s+|$)"))){
		$elem.className += ' '+name;
	}
};
var removeClass = function ($elem, name){
	$elem.className = $elem.className.replace(new RegExp("(\\s+|^)" + name + "(\\s+|$)","gm"), '').replace(/(\s*$)/g, '');
};
var hasClass = function ($elem, name){
	return $elem.className.split(" ").indexOf(name) > -1;
};

/* 动态添加css 和 js */
var loadStyle = function(url){
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
};
var loadScript = function(url, callback){
	var reslove0;
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
	if(script.readyState){
		script.onreadystatechange = function(){
			if(script.readyState == "loaded" || script.readyState == "complete"){
				script.onreadystatechange = null;
				if(typeof callback === 'function'){
					callback();
				}else if(typeof reslove0 === 'function'){
					reslove0();
				}
			}
		}
	}else{
		script.onload = function(){
			if(typeof callback === 'function'){
				callback();
			}else if(typeof reslove0 === 'function'){
				reslove0();
			}
		}
	}
	if(typeof callback !== 'function'){
		return new Promise(function(reslove, reject){
			reslove0 = reslove;
		});
	}
};
/**
 * 同一个数组里面是并行加载，不同数组之间按数组顺序依赖加载
 */
var loadScripts = function(){
	if(arguments.length < 1){
		return;
	}
	var arg = arguments[0], promise = null;
	if(Object.prototype.toString.call(arg) === '[object Array]'){
		var ps = [];
		for(var i=0, l=arg.length; i<l; i++){
			ps.push(loadScript(arg[i]));
		}
		promise = Promise.all(ps);
	}else if(typeof arg === 'string'){
		promise = loadScript(arg);
	}else if(typeof arg === 'function'){
		promise = loadScript(arg());
	}
	if(arguments.length > 1){
		var args = Array.prototype.slice.call(arguments, 1);
		if(promise){
			promise.then(function(){
				loadScripts.apply(window, args);
			});
		}else{
			loadScripts.apply(window, args);
		}
	}
};

