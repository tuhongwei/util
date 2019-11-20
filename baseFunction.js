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
 * @params {object|boolean} arguments[0] 是否为深合并
 * @return {object}
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
function bindFn(fn, thisArg){
	return function wrap(){
		var args = Array.prototype.slice.call(arguments, 0);
		return fn.apply(thisArg, args);
	};
}

var assign;
if(typeof Object.assign === 'function'){
	assign = Object.assign;
}else{
	assign =  function(target){
		if(target === undefined || target === null){
			throw new TypeError('Cannot convert undefined or null to object');
		}else{
			var output = Object(target);
			for(var i=1, l=arguments.length; i<l; i++){
				var source = arguments[i];
				if(source !== undefined && source !== null){
					for(var k in source){
						if(source.hasOwnProperty(k)){
							output[k] = source[k];
						}
					}
				}
			}
			return output;
		}
	};
}
// 对象继承
function inherit(child, base, properties){
	for(var k in base){
		if(base.hasOwnProperty(key)){
			child[k] = base[k];
		}
	}
	var baseP = base.prototype,
		childP;
	childP = child.prototype = Object.create(baseP);
	childP.constructor = child;
	childP._super = baseP;
	if(properties){
		assign(childP, properties);
	}
}
/**
* 获取一个函数的单例
* @params {function} 需要得到单例的函数
* * @test 
	function friend(name, age) {
    this.name = name;
    this.age = age;
  }
  var a = getSingle(friend)('a', 10);
  var b = getSingle(friend)('b', 20);
  console.log(a === b);
*/

var getSingleton = (function() {
  var result;
  return function(fn) {
    return function() {
      return result || (result = new (fn.bind(this, ...arguments)));
    }
  }
})();