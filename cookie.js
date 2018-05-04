// cookie 操作

var	getCookie = function(name){
	var ret = '';
	if(typeof name == 'string' && name != ''){
		var str = '(^| )' + name + '=([^;]*)(;|$)',
		reg = new RegExp(str),
		m;
		if(m = document.cookie.match(reg)){
			ret = decodeURIComponent(m[2]);
		}
	}
	return ret;
};
var	setCookie = function(name, value, days, path){
	var expires = "";
	if(days){
		var date = new Date();
		date.setTime(date.getTime() + days*24*60*60*1000);
		expires = "; expires=" + date.toGMTString();
	}
	path = path || "/";
	document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=" + path;
};
var	removeCookie = function(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var val  = this.getCookie(name);
	val && (document.cookie = name + "=" + val + "; expires=" + exp.toGMTString());
};

