/**
 *类型检测
 */

var toString = Object.prototype.toString;

/**
 * @param {Object}
 * @return {boolean}
 */
function isArray(val){
	return toString.call(val) === '[object Array]';
}
function isArrayBuffer(val){
	return toString.call(val) === '[object ArrayBuffer]';
}
function isFunction(val){
	return toString.call(val) === '[object Function]';
}
function isRegExp(val){
	return toString.call(val) === '[object RegExp]';
}
function isDate(val){
	return toString.call(val) === '[object Date]';
}
function isFile(val){
	return toString.call(val) == '[object File]';
}
function isBlob(val){
	return toString.call(val) === '[object Blob]';
}

function isStream(val){
	return isObject(val) && isFunction(val.pipe);
}

function isString(val){
	return typeof val === 'string';
}
function isNumber(val){
	return typeof val === 'number';
}
function isUndefined(val){
	return typeof val === 'undefined';
}
function isObject(val){
	return val !== null && typeof val === 'object';
}

function isURLSearchParams(val){
	return (typeof URLSearchParams !== "undefined") && (val instanceof URLSearchParams);
}
function isFormData(val){
	return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

function isArrayBufferView(val){
	var result;
	if((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)){
		result = ArrayBuffer.isView(val);
	}else{
		result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	}
	return result;
}

function isEmptyObject(val){
	for(var name in val){
		return false;
	}
	return true;
}

function isStandarBrowserEnv(){
	if(typeof navigator !== 'undefined' && navigator.product === 'ReactNative'){
		return false;
	}
	return (typeof window !== 'undefined' && typeof document !== 'undefined');
}

