/**
 *DOM 操作
 */

/* 操作类 */
var addClass = function ($elem, name) {
	if(!$elem.className.match(new RegExp("(\\s+|^)" + name + "(\\s+|$)"))){
		$elem.className += ' '+name;
	}
};
var removeClass = function ($elem, name){
	$elem.className = $elem.className.replace(new RegExp("(\\s+|^)" + name + "(\\s+|$)","gm"), '').replace(/(\s*$)/g, '');
};
var hasClass = function ($elem, name){
	return $elem.className.split(" ").indexOf(name) > -1;
};

