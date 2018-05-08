/**
 *一些有用的基础方法
 */

function forEach(obj, fn){
	if(obj === null || typeof obj === 'undefined'){
		return;
	}
	if(typeof obj !== 'object'){
		obj = [obj];
	}
	if(Object.prototype.toString.call(obj) === '[object Array]'){
		
	}
}