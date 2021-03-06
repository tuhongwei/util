/**
 *事件操作
 */

var listener = {};
// 触发事件
var emit = function(type, data){
	if(!listener[type]){
		return;
	}
	for(var i=0; i<listener[type].length; i++){
		listener[type][i].apply({}, [data]);
	}
};

// 注册事件
var eventRegist = function(type, callback, target){
	if(!listener[type]){
		listener[type] = [];
	}
	if(target){
		listener[type].push(function(data){
			callback.apply(target, [data]);
		});
	}else{
		listener[type].push(callback);
	}
};
// 解绑事件
var eventOff = function(type, callback){
	if(!listener[type]){
		return;
	}
	if(callback){
		for(var i=0; i<listener[type].length; i++){
			if(listener[type][i] == callback){
				listener[type].splice(i, 1);
				return;
			}
		}
	}else{
		delete listener[type];
	}
};

// 绑定事件
var eventUtil = {
	on: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent('on' + type, handler);
		}else{
			element['on' + type] = handler;
		}
	},
	off: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent('on' + type, handler);
		}else{
			element['on' + type] = null;
		}
	}
};

