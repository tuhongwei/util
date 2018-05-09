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
		for(var i=0, l=obj.length; i<l; i++){
			fn.call(null, obj[i], i, obj);
		}
	}else{
		for(var key in obj){
			if(Object.prototype.hasOwnProperty.call(obj, key)){
				fn.call(null, obj[key], key, obj);
			}
		}
	}
}

/**
 * @params {[object|boolean]} [arguments[0]] 是否为深合并
 * @returns {object}
 * @test: merge({a:1, b: {c: 2, d: 3}, e: 4, g: 5}, {a:2, b: {c: 3}, e: {f: 4}})
 */
function merge(){
	var deep = arguments[0] && typeof arguments[0] !== 'object';
	var result = {};
	function assignValue(val, key){
		if(deep && typeof result[key] === 'object' && typeof val === 'object'){
			result[key] = merge(deep, result[key], val);
		}else{
			result[key] = val;
		}
	}

	for(var i = (deep ? 1 : 0), l=arguments.length; i<l; i++){
		forEach(arguments[i], assignValue);
	}
	return result;
}

// 扩充函数作用域
function bind(fn, thisArg){
	return function wrap(){
		var args = Array.prototype.slice.call(arguments, 0);
		return fn.apply(thisArg, args);
	};
}

// 对象继承
function extend(a, b, thisArg){

}