/*
 * 登录页面
 */

var GLOBAL_CODE; //全局定义验证码  
var GET_MSG_CODE_COUNT_TIME = 60; //发送短信获取验证码倒计时

$(function() {
	createCode(); //创建验证码
	inputDataError(); //错误提示
	loginBtnClick(); //登录
	closePwdBoxBtn(); //忘记密码弹出框关闭
	openPwdBoxBtn();
	checkBoxSubmitBtn(); //检查确认按钮是否可用
	degreeinputCheck();
	boxSubmitBtnFun(); //身份验证确认提交按钮
	eyePwdBtnFun(); //密码眼睛
	checkBoxSubmitSureBtn(); //检查确认修改按钮是否可用
	wirteNewPwdContentInputCheck();
	getPwdValedateByMsgBtn(); //短信获取验证码
	boxSubmitSurePwdBtnFun(); //确认修改按钮
	inputSetPwdDataError(); //改密弹框错误提示
});

//创建验证码
function createCode() {
	GLOBAL_CODE = "";
	var codeLength = 4; //验证码的长度    
	var checkCode = document.getElementById("randomCode");
	var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符   
	for(var i = 0; i < codeLength; i++) {
		var index = Math.floor(Math.random() * codeChars.length); //取得随机数的索引   
		GLOBAL_CODE += codeChars[index]; //根据索引取得随机数加到code上    
	}
	checkCode.value = GLOBAL_CODE; //把code值赋给验证码    
}

//错误提示
function inputDataError() {
	$("#userName").click(function() {
		$(".login-input-data .error-info-login-name").hide();
	});
	$("#userPassword").click(function() {
		$(".login-input-data .error-info-detail").hide();
	});
	$("#validateCode").click(function() {
		$(".login-input-data .error-info-validateCode").hide();
	});
}

//
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

//登录
function loginBtnClick() {

	$("#loginBtn").click(function() {
		loginDealGlobalFun();
	});

}
//登录函数
function loginDealGlobalFun() {
	var user = $("#userName").val();
	var pass = $("#userPassword").val();
	var myCode = $("#validateCode").val();
	if(user == "") {
		$(".login-input-data .error-info-login-name").show();
		$(".login-input-data .error-info-login-name").html("请输入账号");
	}
	if(pass == "") {
		$(".login-input-data .error-info-detail").show();
		$(".login-input-data .error-info-detail").html("请输入密码");
	}
	if(myCode == "") {
		$(".login-input-data .error-info-validateCode").show();
		$(".login-input-data .error-info-validateCode").html("请输入验证码");
	}

	if(user == "" || pass == "" || myCode == "") {
		return;
	}
	var ss = { Code: 10000, UserName: user, Password: pass, Vcode: myCode };
	$.ajax({
		type: "POST",
		url: "v1/station",
		dataType: "json",
		data: JSON.stringify(ss),
		beforeSend: function() {
			//console.log(ss);
			$("#loginBtn").attr("disabled", "disabled");
		},
		success: function(json) {
			console.log(json);
			$("#loginBtn").removeAttr("disabled");
			if(json.Result == 2200) {

				//登录成功
				//跳转到首页

				var check = document.getElementById("rememberLoginCk");
				var saveNameKey = "QuanYongBackLoginName";
				var saveSessionIdKey = "QuanYongBackLoginSessionID";
				var saveManagerIdkey = "QuanYongBackLoginManagerID";
				var saveRolekey = "QuanYongBackLoginRole";
				if(check.checked) {
					setCookie(saveNameKey, user, 7); //默认自动登录7天
					setCookie(saveSessionIdKey, json.SessionId, 7); //默认自动登录7天
					setCookie(saveManagerIdkey, json.ManagerId, 7);
					setCookie(saveRolekey, json.Role, 7);

				} else {
					setCookie(saveNameKey, user, 0);
					setCookie(saveSessionIdKey, json.SessionId, 0); //关闭浏览器后cookie清除
					setCookie(saveManagerIdkey, json.ManagerId, 0);
					setCookie(saveRolekey, json.Role, 0);
				}

				window.location.assign("index.html");

			} else {
				//登录失败
				if(json.Result == 2401) {
					$(".login-input-data .error-info-detail").show();
					$(".login-input-data .error-info-detail").html("用户名或密码错误");

				} else if(json.Result == 2403) {
					$(".login-input-data .error-info-detail").show();
					$(".login-input-data .error-info-detail").html("用户名或密码输入错误次数太多，禁止连接");

				} else if(json.Result == 2500) {
					$(".login-input-data .error-info-detail").show();
					$(".login-input-data .error-info-detail").html("服务器内部错误");

				} else if(json.Result == 2436) {
					$(".login-input-data .error-info-validateCode").show();
					$(".login-input-data .error-info-validateCode").html("验证码输入错误");

				}else{
					alert(json.Message);
				}
			}

		},
		error: function() {
			$("#loginBtn").removeAttr("disabled");
			alert("连接服务器出错");
		}

	});
}
document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode == 13) {
		loginDealGlobalFun();
	}
};

//忘记密码弹出框关闭
function closePwdBoxBtn() {
	$(".closeBoxBtn").click(function() {
		$("#resetPwdContent").hide();
		$("#content").show();
	});

}

function openPwdBoxBtn() {
	$(".forgetPwdBtn").click(function() {

		//重置密码弹框表单数据
		/*
		document.getElementById("degreeLoginForm").reset();
		document.getElementById("wirteNewPwdForm").reset();
		$("#resetPwdContent").show();
		$("#content").hide();
		*/
		alert("功能暂未开放");
	});
}

//检查确认按钮是否可用
function checkBoxSubmitBtn() {
	var fullName = $("#companyFullName").val();
	var bndTel = $("#bindTelNum").val();
	if(fullName == "" || bndTel == "") {
		$("#boxSubmitBtn").attr("disabled", "disabled");
		$("#boxSubmitBtn").css({ "backgroundColor": "#9b9a9b" });

	} else {
		$("#boxSubmitBtn").removeAttr("disabled");
		$("#boxSubmitBtn").css({ "backgroundColor": "#4a494a" });
	}
}

function degreeinputCheck() {
	$("#companyFullName").keyup(function() {
		checkBoxSubmitBtn()
	});
	$("#bindTelNum").keyup(function() {
		checkBoxSubmitBtn()
	});
}
//身份验证确认提交按钮
function boxSubmitBtnFun() {
	$("#boxSubmitBtn").click(function() {
		var fullName = $("#companyFullName").val();
		var bndTel = $("#bindTelNum").val();
		$.ajax({
			type: "POST",
			url: "resetUserPwd.php?action=login",
			dataType: "json",
			data: { companyFullName: fullName, bindTelNum: bndTel },
			beforeSend: function() {
				$("#boxSubmitBtn").attr("disabled", "disabled");
			},
			success: function(json) {
				$("#boxSubmitBtn").removeAttr("disabled");

				if(json.code == 1) {

					//修改密码身份验证成功
					document.getElementById("result-error-info").style.visibility = "hidden";
					$(".degreeLoginContent").hide();
					$(".wirteNewPwdContent").show();
					$("#curUser").html(fullName);
					$("#curUserTel").html(bndTel);
				} else {
					//修改密码身份验证失败
					document.getElementById("result-error-info").style.visibility = "visible";
					$(".degreeLoginContent").show();
					$(".wirteNewPwdContent").hide();
					$("#curUser").html("");
					$("#curUserTel").html("");
				}

			}
		});
	});
}
//密码眼睛
function eyePwdBtnFun() {
	$(".eyeBtn").click(function() {
		var inputType = $(this).parent(".setpwd-input-newpwd").children("input").attr("type");
		if(inputType == "password") {
			$(this).parent(".setpwd-input-newpwd").children("input").attr("type", "text");
			$(this).parent(".setpwd-input-newpwd").children("img").attr("src", "img/login/icon_eye.png");
		} else {
			$(this).parent(".setpwd-input-newpwd").children("input").attr("type", "password");
			$(this).parent(".setpwd-input-newpwd").children("img").attr("src", "img/login/icon_eye_close.png");
		}
	});
}

//检查确认修改按钮是否可用
function checkBoxSubmitSureBtn() {
	var newPwd = $("#newPwd").val();
	var sureNewPwd = $("#sureNewPwd").val();
	var setpwdValidate = $("#setpwdValidate").val();
	if(newPwd == "" || sureNewPwd == "" || setpwdValidate == "") {
		$("#boxSubmitSurePwdBtn").attr("disabled", "disabled");
		$("#boxSubmitSurePwdBtn").css({ "backgroundColor": "#9b9a9b" });

	} else {
		$("#boxSubmitSurePwdBtn").removeAttr("disabled");
		$("#boxSubmitSurePwdBtn").css({ "backgroundColor": "#4a494a" });
	}
}

function wirteNewPwdContentInputCheck() {
	$("#newPwd").keyup(function() {
		checkBoxSubmitSureBtn()
	});
	$("#sureNewPwd").keyup(function() {
		checkBoxSubmitSureBtn()
	});
	$("#setpwdValidate").keyup(function() {
		checkBoxSubmitSureBtn()
	});
}
//短信获取验证码
function getPwdValedateByMsgBtn() {
	$("#boxGetValidateBtn").click(function() {
		getPwdCodeByMsg();
		console.log("aaaa");
		//发送通知告诉服务器发送短信
	});
}

function getPwdCodeByMsg() {
	$("#boxGetValidateBtn").attr("disabled", "disabled");
	$("#boxGetValidateBtn").html(GET_MSG_CODE_COUNT_TIME + "s");
	if(GET_MSG_CODE_COUNT_TIME > 0) {
		GET_MSG_CODE_COUNT_TIME--;
		setTimeout(getPwdCodeByMsg, 1000);
	} else {
		GET_MSG_CODE_COUNT_TIME = 60;
		$("#boxGetValidateBtn").html("获取验证码");
		$("#boxGetValidateBtn").removeAttr("disabled");
	}
}

//确认修改按钮
function boxSubmitSurePwdBtnFun() {
	$("#boxSubmitSurePwdBtn").click(function() {
		var newPwd = $("#newPwd").val();
		var sureNewPwd = $("#sureNewPwd").val();
		var setpwdValidate = $("#setpwdValidate").val();

		$.ajax({
			type: "POST",
			url: "resetUserPwd.php?action=sureSetPwd",
			dataType: "json",
			data: { newPwd: newPwd, sureNewPwd: sureNewPwd, setpwdValidate: setpwdValidate },
			beforeSend: function() {
				$("#boxSubmitSurePwdBtn").attr("disabled", "disabled");
			},
			success: function(json) {
				$("#boxSubmitSurePwdBtn").removeAttr("disabled");

				if(json.code == 1) {

					//修改成功
					document.getElementById("newPwdErrorInfo").style.visibility = "hidden";
					document.getElementById("sureNewPwdErrorInfo").style.visibility = "hidden";
					document.getElementById("setpwdValidateErrorInfo").style.visibility = "hidden";
					$("#resetPwdContent").hide();
					$("#content").show();
					alert("修改密码成功!");

				} else {
					//失败
					document.getElementById("newPwdErrorInfo").style.visibility = "visible";
					$("#newPwdErrorInfo").html(json.newPwdErrorInfo);
					document.getElementById("sureNewPwdErrorInfo").style.visibility = "visible";
					$("#sureNewPwdErrorInfo").html(json.sureNewPwdErrorInfo);
					document.getElementById("setpwdValidateErrorInfo").style.visibility = "visible";
					$("#setpwdValidateErrorInfo").html(json.setpwdValidateErrorInfo);

				}

			}
		});
	});
}

//改密弹框错误提示
function inputSetPwdDataError() {
	$("#newPwd").click(function() {
		document.getElementById("newPwdErrorInfo").style.visibility = "hidden";
	});
	$("#sureNewPwd").click(function() {
		document.getElementById("sureNewPwdErrorInfo").style.visibility = "hidden";
	});
	$("#setpwdValidate").click(function() {
		document.getElementById("setpwdValidateErrorInfo").style.visibility = "hidden";
	});
}