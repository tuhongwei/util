/**
 * 对url的path、search 和 hash 进行解析
 */

// 编码query
var encodeQuery = function(obj){
	if(!obj){
		return '';
	}
	var pairs = [];
	for(var k in obj){
		pairs.push(k + '=' + encodeURIComponent(obj[k]));
	}
	return pairs.join('&');
};

// 解析search
var decodeSearch = function(url){
	var obj = {};
	if(!url){
		return obj;
	}
	var search = url.match(/\?(.*)(?:(#|$))/);
	if(search){
		var search0 = search[1].split('&');
		for(var i=0; i<search0.length; i++){
			var pair = search0[i].split('=');
			if(pair.length == 2){
				obj[pair[0]] = decodeURIComponent(pair[1]);
			}
		}
	}
	return obj;
};

// 解析hash
var decodeHash = function(url){
	var obj = {};
	if(!url){
		return obj;
	}
	var e, r = /([^&;=]*)=?([^&;=]*)/g;
	while(r.exec(url)){
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
};