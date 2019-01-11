// 邮箱验证
var validateEmail = function(email){
	if(!email){
		return false;
	}
	return /^([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/.test(email);
};
// 手机验证
var validateMobile = function(mobile){
	if(!mobile){
		return false;
	}
	return /^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile);
};
// 身份证验证
var validateIdCard = function(idCard){
	if(!idCard){
		return false;
	}
	return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard);
};
// url验证
var validateURL = function(url){
	if(!url){
		return false;
	}
	return /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(url);
};