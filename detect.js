/**
 *设备检测
 */

function detect(ua){
	var os = this.os = {}, browser = this.browser = {},
	webkit = ua.match(/Web[Kk]it[\/]?(\d.)+/),
	android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
    touchpad = webos && ua.match(/TouchPad/),
    kindle = ua.match(/Kindle\/([\d.]+)/),
    silk = ua.match(/Silk\/([\d._]+)/),
    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
    rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    playbook = ua.match(/PlayBook/),
    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
    firefox = ua.match(/Firefox\/([\d.]+)/),
    uc = ua.match(/UCBrowser\/([\d.]+)/),
    qq = ua.match(/(QQ)\/([\d.]+)/),
    qqBrowser = ua.match(/(MQQBrowser)\/([\d.]+)/),
    ie = ua.match(/MSIE\s([\d.]+)/),
    safari = webkit && ua.match(/Mobile\//) && !chrome,
    webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome,
    // 微信
    wx = ua.match(/micromessenger\/([\d.]+)/i);

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]
    if (uc) browser.uc = true, browser.version = uc[1]

    /**
     * QQ浏览器分两种，一种内置inner，一种独立stand-alone
     * 二者的表现不一致，比如在呼出APP上，inner会拦截，stand-alone不会
     * 所以需要区分
     * 独立浏览器上 只有MQQBrowser标识
     * 内置浏览器上
     *  在IOS这块，是只有QQ没有MQQBrowser(因为没法用自研的TBS)
     *  在Android这块，同时有QQ和MQQBrowser
     */
    if (qq) {
        browser.qqInnerBrowser = true;
        if (qqBrowser) {
            browser.version = qqBrowser[2];
        } else {
            browser.version = qq[2];
        }
    } else {
        if (qqBrowser) {
            browser.qqStandAloneBrowser = true;
            browser.version = qqBrowser[2];
        }
    }
    if (ie) browser.ie = true, browser.version = ie[1]
    if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true
    if (webview) browser.webview = true

    // 微信
    if (wx) browser.wx = true, browser.version = wx[1]

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
        (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
    os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
        (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
        (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))

    browser.isOldIe = (browser.ie && browser.version < 9);
	
	// 从屏幕上判断是不是移动端（适合于响应式布局的时候），并不代表真实的手机
	this.isMobile = function(){
		var w = window.innerWidth 
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;
		return w < 768;
	};
	this.isRealMobile = function(){
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "BlackBerry");
		var flag = false;
		for(var v = 0; v < Agents.length; v++){
		   if(ua.indexOf(Agents[v]) > 0){ flag = true; break; }
		}
		return flag;
	};
}

var uaInfo = {};
detect.call(uaInfo, navigator.userAgent);
window.uaInfo = uaInfo;

