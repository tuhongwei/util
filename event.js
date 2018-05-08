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
		listener[type][i](data);
	}
};

// 注册事件
var eventRegist = function(type, callback, target){
	if(!listener[type]){
		listener[type] = [];
	}
	if(target){
		listener[type].push(function(data){
			callback.apply(target, data);
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

