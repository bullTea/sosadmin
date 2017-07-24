/*
 * 主框架
 * 注意此文档已废弃！！！！！！！！！！！！
 */
$(function() {
	setmMainContentHeight();
	headerUIShowLoginName();
	sidebarFoldBtn();

});

//设置主容器高度
function setmMainContentHeight() {
	var viewHeight = document.documentElement.clientHeight || document.body.clientHeight;
	var headerContentHeight = $(".content-header").outerHeight(true);
	var mainContentHeight = viewHeight - headerContentHeight + "px";
	$(".content-main").css({ "height": mainContentHeight });
}
$(window).resize(function() {
	setmMainContentHeight();
});
/*侧边导航栏start*/
//折叠按钮
function sidebarFoldBtn() {
	/*
	$(".sidebar-menu-item-header-fold-btn").click(function() {
		var state = $(this).parent(".sidebar-menu-item-header").next().is(":hidden");
		$(".sidebar-menu-item-content").hide();
		$(".sidebar-menu-item-header").children(".sidebar-menu-item-header-active-class").removeClass("sidebar-menu-item-header-active");
		$(".sidebar-menu-item-header").removeClass("sidebar-menu-item-header-select");
		$(".sidebar-menu-item-header-fold-btn").removeClass("glyphicon-chevron-up");
		$(".sidebar-menu-item-header-fold-btn").addClass("glyphicon-chevron-down");
		if(state) {
			$(this).parent(".sidebar-menu-item-header").next().show();
			$(this).parent(".sidebar-menu-item-header").children(".sidebar-menu-item-header-active-class").addClass("sidebar-menu-item-header-active");
			$(this).parent(".sidebar-menu-item-header").addClass("sidebar-menu-item-header-select");
			$(this).addClass("glyphicon-chevron-up");
			$(this).removeClass("glyphicon-chevron-down");
		} else {
			$(this).parent(".sidebar-menu-item-header").next().hide();

		}

	});
	*/
	$(".sidebar-menu-item-header").click(function() {
		var state = $(this).next().is(":hidden");
		$(".sidebar-menu-item-content").hide();
		$(".sidebar-menu-item-header").children(".sidebar-menu-item-header-active-class").removeClass("sidebar-menu-item-header-active");
		$(".sidebar-menu-item-header").removeClass("sidebar-menu-item-header-select");
		$(".sidebar-menu-item-header-fold-btn").removeClass("glyphicon-chevron-up");
		$(".sidebar-menu-item-header-fold-btn").addClass("glyphicon-chevron-down");
		if(state) {
			$(this).next().show();
			$(this).children(".sidebar-menu-item-header-active-class").addClass("sidebar-menu-item-header-active");
			$(this).addClass("sidebar-menu-item-header-select");
			$(this).children(".sidebar-menu-item-header-fold-btn").addClass("glyphicon-chevron-up");
			$(this).children(".sidebar-menu-item-header-fold-btn").removeClass("glyphicon-chevron-down");
		} else {
			$(this).next().hide();

		}

	});

}
//切换菜单时重置界面
function sliderSwitchResetMenuUI() {
	//$(".form-group input[type='text']").val("");
	//$(".form-group input[type='password']").val("");
	/*经销商start*/
	if(global_vue_A_m1_app) {
		global_vue_A_m1_app.nickName = "";
		global_vue_A_m1_app.loginName = "";
		global_vue_A_m1_app.loginPassword = "";
	}
	if(global_vue_A_m2_app) {
		if(global_vue_A_m2_app && global_vue_A_m2_app.distributorArr) {
			global_vue_A_m2_app.distributorArr = null;
			global_vue_A_m2_app.distributorArr = new Object();
			global_vue_A_m2_app.loginName = "";
			global_vue_A_m2_app.loginPassword = "";
		}
	}
	global_page_tools_render_flag = true;
	global_A_m2_page_tool_render_flag = true;
	/*经销商end*/
	/*集团管理start*/
	if(global_vue_B_m1_app) {
		global_vue_B_m1_app.companyName = "";
		global_vue_B_m1_app.selectCity = "1";

	}
	if(global_vue_B_m2_app) {
		if(global_vue_B_m2_app && global_vue_B_m2_app.userListArr) {
			global_vue_B_m2_app.userListArr = null;
			global_vue_B_m2_app.userListArr = new Object();
		}
		if(global_vue_B_m2_app && global_vue_B_m2_app.companyArr) {
			global_vue_B_m2_app.companyArr = null;
			global_vue_B_m2_app.companyArr = new Object();
		}
		global_vue_B_m2_app.sub3_loginName = "";
		global_vue_B_m2_app.sub3_password = "";
		global_vue_B_m2_app.sub3_nicheng = "";
		global_vue_B_m2_app.sub3_heartTime = "";
		global_vue_B_m2_app.sub3_openLocation = "true";
		if(global_vue_B_m2_app && global_vue_B_m2_app.sub4_userInGroupList) {
			global_vue_B_m2_app.sub4_userInGroupList = null;
			global_vue_B_m2_app.sub4_userInGroupList = new Object();
		}
		global_vue_B_m2_app.sub4_editM1_priority = "1";
		global_vue_B_m2_app.sub4_nospeak = "false";
		if(global_vue_B_m2_app && global_vue_B_m2_app.sub4AddGropuArr) {
			global_vue_B_m2_app.sub4AddGropuArr = null;
			global_vue_B_m2_app.sub4AddGropuArr = new Object();
		}
		global_vue_B_m2_app.sub4_userAddGroup_priority = "1";
		global_vue_B_m2_app.sub4_userAddGroup_nospeak = "false";
		global_vue_B_m2_app.sub2_nowLocation_style = "1";

		global_vue_B_m2_app.sub2_updateLocationConfig_openLoc = "true";
		global_vue_B_m2_app.sub2_updateLocationConfig_heartTime = "";
		global_vue_B_m2_app.sub2_updateLocationConfig_ip = "";
		global_vue_B_m2_app.sub2_updateLocationConfig_port = "";
		global_vue_B_m2_app.sub2_updateLocationConfig_locStyle = "1";
		global_vue_B_m2_app.sub2_updateLocationConfig_starttime1 = "";
		global_vue_B_m2_app.sub2_updateLocationConfig_endtime1 = "";
		global_vue_B_m2_app.sub2_updateLocationConfig_starttime2 = "";
		global_vue_B_m2_app.sub2_updateLocationConfig_endtime2 = "";

		global_vue_B_m2_app.sub2_setUserPwd_pwd1 = "";
		global_vue_B_m2_app.sub2_setUserPwd_pwd2 = "";

		global_vue_B_m2_app.sub2_setUserOterInfo_name = "";
		global_vue_B_m2_app.sub2_setUserOterInfo_openLoc = "true";
		global_vue_B_m2_app.sub2_setUserOterInfo_heartTime = "";

		if(global_vue_B_m2_app && global_vue_B_m2_app.sub5_groupArr) {
			global_vue_B_m2_app.sub5_groupArr = null;
			global_vue_B_m2_app.sub5_groupArr = new Object();
		}
		global_vue_B_m2_app.sub5_createGroup_name = "";
		global_vue_B_m2_app.sub5_editGroup_name = "";
		if(global_vue_B_m2_app && global_vue_B_m2_app.sub6_adminArr) {
			global_vue_B_m2_app.sub6_adminArr = null;
			global_vue_B_m2_app.sub6_adminArr = new Object();
		}
		global_vue_B_m2_app.sub6_login_name = "";
		global_vue_B_m2_app.sub6_login_password = "";

		global_vue_B_m2_app.sub6_dispatcher_login_name = "";
		global_vue_B_m2_app.sub6_dispatcher_login_password = "";
		global_vue_B_m2_app.sub6_relation_select_user = "";
		if(global_vue_B_m2_app && global_vue_B_m2_app.sub6_userArr) {
			global_vue_B_m2_app.sub6_userArr = null;
			global_vue_B_m2_app.sub6_userArr = new Object();
		}
	}
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub5_group_userArr) {
		global_vue_B_m2_app.sub5_group_userArr = null;
		global_vue_B_m2_app.sub5_group_userArr = new Object();
	}
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub5_editGroup_userArr) {
		global_vue_B_m2_app.sub5_editGroup_userArr = null;
		global_vue_B_m2_app.sub5_editGroup_userArr = new Object();
	}
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub5_addUserGroup_userArr) {
		global_vue_B_m2_app.sub5_addUserGroup_userArr = null;
		global_vue_B_m2_app.sub5_addUserGroup_userArr = new Object();
	}
	global_B_m2_sub1_page_tool_render_flag = true;
	global_B_m2_sub2_page_tool_render_flag = true;
	global_B_m2_sub4_page_tool_render_flag = true;
	global_B_m2_sub5_page_tool_render_flag = true;
	global_B_m2_sub6_page_tool_render_flag = true;
	$("#B-m2-sub1").hide();
	$("#B-m2-sub2").hide();
	$("#B-m2-sub3").hide();
	$("#B-m2-sub4").hide();
	$("#B-m2-sub5").hide();
	$("#B-m2-sub6").hide();

	global_C_m1_sub1_page_tool_render_flag = true;
	if(global_vue_C_m1_app) {
		if(global_vue_C_m1_app && global_vue_C_m1_app.adminArr) {
			global_vue_C_m1_app.adminArr = null;
			global_vue_C_m1_app.adminArr = new Object();
		}
		global_vue_C_m1_app.sub2_loginName = "";
		global_vue_C_m1_app.sub2_loginPassword = "";
		global_vue_C_m1_app.sub3_name = "";
		global_vue_C_m1_app.sub3_openLoc = "true";
	}
	$("#C-m1-sub1").hide();
	$("#C-m1-sub2").hide();
	if(global_vue_D_m1_app) {
		if(global_vue_D_m1_app && global_vue_D_m1_app.accountArr) {
			global_vue_D_m1_app.accountArr = null;
			global_vue_D_m1_app.accountArr = new Object();
		}
	}
	/*集团管理end*/
}
/*经销商管理start*/
//新建经销商
function Am1CreateNewDistributor(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#A-m1").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");

}
//查看经销商
function Am1ShowMyDistributor(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#A-m2").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	$("#A-m2-sub1").show();
	$("#A-m2-sub2").hide();
	$("#A-m2-sub3").hide();
	Am2Sub1getDistributorListSever(0);
}
/*经销商管理end*/

/*集团管理start*/

//新建集团
function Bm1CreateNewCompany(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#B-m1").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");

}

//用户集团
function Bm2ShowCompanyList(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#B-m2").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	$("#B-m2-sub1").show();
	$("#B-m2-sub2").hide();
	$("#B-m2-sub3").hide();
	Bm2Sub1getCompanyListSever(0);
}
/*集团管理end*/

/*侧边导航栏end*/

//修改密码
function globalSetAdminPasswordBox() {
	$("#content-header-set-admin-password").modal("show");
}
//管理员管理模块
function Cm1ShowAdminManageUI(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#C-m1").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	Cm1Sub1SOpenUI();
	$("#C-m1-sub1").show();
}
//账户信息管理模块
function Dm1ShowAccountInfoUI(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#D-m1").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	Dm1Sub1getAccountListSever();
	$("#D-m1-sub1").show();

}

/*页首注销，改密相关start*/
function headerUIShowLoginName() {
	var name = getCookie("QuanYongBackLoginName");
	$("#header-login-name").html(name);
}

function haderUILogOut() {
	delCookie();
	window.location.assign("login.html");
}

function headerUIsetPassword() {
	var name = $("#header_ui_loginname").val().trim();
	var oldPwd = $("#header_ui_old_loginpwd").val().trim();
	var pwd = $("#header_ui_loginpwd").val().trim();
	var surePwd = $("#header_ui_sure_loginpwd").val().trim();

	if(pwd != surePwd) {
		globalFunTopBoxTipInfo("新密码和确认密码不同！");
		return;
	}
	var ss = { Code: 10006, SessionId: global_sessionID, ManagerId: global_managerID, ManagerName: name, ManagerPassword: pwd, OldPassword: oldPwd, Action: 0 };
	$.ajax({
		type: "POST",
		url: "v1/station",
		dataType: "json",
		data: JSON.stringify(ss),
		beforeSend: function() {},
		success: function(json) {
			if(json.Result == 2411) {
				globalFunUserLoginInvalid();
			} else if(json.Result == 2000) {

				//成功
				if(name.length > 0) {
					var saveNameKey = "QuanYongBackLoginName";
					setCookie(saveNameKey, name, 7);
					$("#header-login-name").html(name);
				}
				$("#content-header-set-admin-password").modal("hide");
				globalFunTopBoxTipInfo("保存成功!");

			} else {
				//失败
				globalFunTopBoxTipInfo(json.Message);
			}

		},
		error: function() {
			//失败
			globalFunTopBoxTipInfo("服务器错误");
		}

	});
}
/*页首注销，改密相关end*/