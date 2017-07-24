/*
 * 如果没有登录自动跳转登录页
 */
var global_sessionID = null; //记录sessionID
var global_managerID = null; //记录管理员ID
checkCookie();

function setCookie(cname, cvalue, exdays) {
	if(Math.floor(exdays) <= 0) {
		document.cookie = cname + "=" + cvalue + "; "
	} else {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}
//删除cookie
function delCookie() {
	document.cookie = "QuanYongBackLoginName=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "QuanYongBackLoginSessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "QuanYongBackLoginManagerID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "QuanYongBackLoginRole=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function checkCookie() {
	var sessionid = getCookie("QuanYongBackLoginSessionID");
	var managerid = getCookie("QuanYongBackLoginManagerID");
	if(sessionid != "" && managerid != "") {
		global_sessionID = sessionid;
		global_managerID = managerid;
	} else {
		window.location.assign("login.html");
	}
}