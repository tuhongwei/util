/**
 *DOM 操作
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
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
	if(script.readyState){
		script.onreadystatechange = function(){
			if(script.readyState == "loaded" || script.readyState == "complete"){
				script.onreadystatechange = null;
				callback && callback();
			}
		}
	}else{
		script.onload = function(){
			callback && callback();
		}
	}
};
var loadScripts = function(){

};

