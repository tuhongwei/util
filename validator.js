// 邮箱验证
var email = function(val){
	if(!val){
		return false;
	}
	return /^([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/.test(val);
};
// 手机验证
var mobile = function(val){
	if(!val){
		return false;
	}
	return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val);
};
// 身份证验证
var idCard = function(val){
	if(!val){
		return false;
	}
	return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
};