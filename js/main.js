/*
 * 主框架
 */
//引入CSS文件
require('../css/common.less');
require('../css/distributor.less');
require('../css/company.less');
require('../css/admin.less');
require('../css/account.less');

//ES6->ES5
import 'babel-polyfill';
//保存导入的js方法
var main_distributorJS = null;
var main_companyJS = null;
var main_adminJS = null;
var main_accountJS = null;
$(function() {
	checkLoginAdminRole();
	setmMainContentHeight();
	headerUIShowLoginName();
	sidebarFoldBtn();

	main_distributorJS = require('./distributor.js');
	main_distributorJS.initDistributorFun();
	main_companyJS = require('./company.js');
	main_companyJS.initCompanyFun();
	main_adminJS = require('./admin.js');
	main_adminJS.initAdminFun();
	main_accountJS = require('./account.js');
	main_accountJS.initAccountFun();
	defaultShowMenuUI();
	loadMapScript();

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
		global_vue_B_m2_app.sub3_tel = "";
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
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_newUserArr) {
		global_vue_B_m2_app.sub7_newUserArr = null;
		global_vue_B_m2_app.sub7_newUserArr = new Object();
	}
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_packageArr) {
		global_vue_B_m2_app.sub7_packageArr = null;
		global_vue_B_m2_app.sub7_packageArr = new Object();
	}
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub8_waringArr) {
		global_vue_B_m2_app.sub8_waringArr = null;
		global_vue_B_m2_app.sub8_waringArr = new Object();
	}
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub8_groupArr) {
		global_vue_B_m2_app.sub8_groupArr = null;
		global_vue_B_m2_app.sub8_groupArr = new Object();
	}
	global_vue_B_m2_app.sub2_packSelectType = -1;
	global_vue_B_m2_app.sub7_packSelectType = -1;
	global_vue_B_m2_app.sub3_packSelectType = -1;
	global_vue_B_m2_app.sub2_continue_packSelectType = -1;
	global_B_m2_sub1_page_tool_render_flag = true;
	global_B_m2_sub2_page_tool_render_flag = true;
	global_B_m2_sub4_page_tool_render_flag = true;
	global_B_m2_sub5_page_tool_render_flag = true;
	global_B_m2_sub6_page_tool_render_flag = true;
	global_B_m2_sub8_page_tool_render_flag = true;
	$("#B-m2-sub1").hide();
	$("#B-m2-sub2").hide();
	$("#B-m2-sub3").hide();
	$("#B-m2-sub4").hide();
	$("#B-m2-sub5").hide();
	$("#B-m2-sub6").hide();
	$("#B-m2-sub7").hide();
	$("#B-m2-sub8").hide();

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
	$("#D-m1-sub1").hide();
	$("#D-m2-sub1").hide();
	global_D_m2_sub1_page_tool_render_flag = true;
	if(global_vue_D_m1_app) {
		if(global_vue_D_m1_app && global_vue_D_m1_app.accountArr) {
			global_vue_D_m1_app.accountArr = null;
			global_vue_D_m1_app.accountArr = new Object();
		}
	}
	if(global_vue_D_m2_app && global_vue_D_m2_app.transactionMoneyArr) {
		global_vue_D_m2_app.transactionMoneyArr = null;
		global_vue_D_m2_app.transactionMoneyArr = new Object();
	}
	$(".server-package-item-active").hide();
	$(".server-package-item-content").css({ "color": "black", "border-color": "gray" });
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub3_packageArr) {
		global_vue_B_m2_app.sub3_packageArr = null;
		global_vue_B_m2_app.sub3_packageArr = new Object();
	}
	global_vue_B_m2_app.sub7_errorJson.splice(0);
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub2_packageArr) {
		global_vue_B_m2_app.sub2_packageArr = null;
		global_vue_B_m2_app.sub2_packageArr = new Object();
	}
	global_vue_B_m2_app.sub2_checkedUidArr.splice(0);
	global_vue_D_m2_app.selectSearchType = "-1";
	global_vue_D_m2_app.search_start_tm = "";
	global_vue_D_m2_app.search_end_tm = "";

	if(global_vue_B_m2_app && global_vue_B_m2_app.sub3_areaArr) {
		global_vue_B_m2_app.sub3_areaArr = null;
		global_vue_B_m2_app.sub3_areaArr = new Object();
	}
	global_vue_B_m2_app.sub3_selectArea = "1";
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub3_venderArr) {
		global_vue_B_m2_app.sub3_venderArr = null;
		global_vue_B_m2_app.sub3_venderArr = new Object();
	}
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_areaArr) {
		global_vue_B_m2_app.sub7_areaArr = null;
		global_vue_B_m2_app.sub7_areaArr = new Object();
	}
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_venderArr) {
		global_vue_B_m2_app.sub7_venderArr = null;
		global_vue_B_m2_app.sub7_venderArr = new Object();
	}
	/*集团管理end*/
}
/*经销商管理start*/
//新建经销商
window.Am1CreateNewDistributor = function(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#A-m1").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");

}
//查看经销商
window.Am1ShowMyDistributor = function(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#A-m2").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	$("#A-m2-sub1").show();
	$("#A-m2-sub2").hide();
	$("#A-m2-sub3").hide();
	main_distributorJS.Am2Sub1getDistributorListSever(0);
}
/*经销商管理end*/

/*集团管理start*/

//新建集团
window.Bm1CreateNewCompany = function(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#B-m1").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");

}

//用户集团
window.Bm2ShowCompanyList = function(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#B-m2").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	$("#B-m2-sub1").show();
	$("#B-m2-sub2").hide();
	$("#B-m2-sub3").hide();
	main_companyJS.Bm2Sub1getCompanyListSever(0);
}
/*集团管理end*/

/*侧边导航栏end*/

//修改密码
window.globalSetAdminPasswordBox = function() {
	$("#content-header-set-admin-password").modal("show");
}
//管理员管理模块
window.Cm1ShowAdminManageUI = function(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#C-m1").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	main_adminJS.Cm1Sub1SOpenUI();
	$("#C-m1-sub1").show();
}
//账户信息管理模块
//查询余额
window.Dm1ShowAccountInfoUI = function(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#D-m1").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	main_accountJS.Dm1Sub1getAccountListSever();
	$("#D-m1-sub1").show();

}
//查询交易记录
window.Dm2ShowTransactionInfoUI = function(e) {
	var clickNode = $(e);
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#D-m2").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$(clickNode).addClass("sidebar-menu-item-li-select");
	main_accountJS.Dm2Sub1getTransactionListSever(0, -1, "", "");
	$("#D-m2-sub1").show();

}

/*页首注销，改密相关start*/
function headerUIShowLoginName() {
	var name = getCookie("QuanYongBackLoginName");
	$("#header-login-name").html(name);
}

window.haderUILogOut = function() {
	delCookie();
	window.location.assign("login.html");
}

window.headerUIsetPassword = function() {
	//var name = $("#header_ui_loginname").val().trim();
	var oldPwd = $("#header_ui_old_loginpwd").val().trim();
	var pwd = $("#header_ui_loginpwd").val().trim();
	var surePwd = $("#header_ui_sure_loginpwd").val().trim();

	if(pwd != surePwd) {
		globalFunTopBoxTipInfo("新密码和确认密码不同！");
		return;
	}
	var ss = { Code: 10006, SessionId: global_sessionID, ManagerId: global_managerID, ManagerPassword: pwd, OldPassword: oldPwd, Action: 0 };
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
				/*
				if(name.length > 0) {
					var saveNameKey = "QuanYongBackLoginName";
					setCookie(saveNameKey, name, 7);
					$("#header-login-name").html(name);
				}
				*/
				$("#content-header-set-admin-password").modal("hide");
				globalFunTopBoxTipInfo("保存成功!");
				//$("#header_ui_loginname").val("");
				$("#header_ui_old_loginpwd").val("");
				$("#header_ui_loginpwd").val("");
				$("#header_ui_sure_loginpwd").val("");

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

//默认打开的菜单
function defaultShowMenuUI() {
	sliderSwitchResetMenuUI();
	$(".main-show-content-menu-item-show-panel").hide();
	$("#B-m2").show();
	$(".sidebar-menu-item-content ul li").removeClass("sidebar-menu-item-li-select");
	$("#default_show_menu").addClass("sidebar-menu-item-li-select");
	$("#B-m2-sub1").show();
	$("#B-m2-sub2").hide();
	$("#B-m2-sub3").hide();
	main_companyJS.Bm2Sub1getCompanyListSever(0);

	$("#default_show_menu_btn").parent(".sidebar-menu-item-header").next().show();
	$("#default_show_menu_btn").parent(".sidebar-menu-item-header").children(".sidebar-menu-item-header-active-class").addClass("sidebar-menu-item-header-active");
	$("#default_show_menu_btn").parent(".sidebar-menu-item-header").addClass("sidebar-menu-item-header-select");
	$("#default_show_menu_btn").addClass("glyphicon-chevron-up");
	$("#default_show_menu_btn").removeClass("glyphicon-chevron-down");
}

//判断登录身份开启功能
function checkLoginAdminRole() {
	var roleType = getCookie("QuanYongBackLoginRole");
	if(roleType != "3") {
		$(".left-menu-open").removeClass("left-menu-open");
	}
}

/*操作excels start*/
//导入
window.ExcelImport = function(obj) {
	if(typeof(XLSX) == "undefined") {
		globalFunTopBoxTipInfo("Excel工具还没有载入完毕，请稍后再试");
		return;
	}
	if(global_vue_B_m2_app.sub7_packSelectType == -1) {
		document.getElementById("B-m2-sub7-form").reset();
		globalFunTopBoxTipInfo("请选择套餐后在导入!");
		return;
	}
	/*
			            FileReader共有4种读取方法：
			            1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
			            2.readAsBinaryString(file)：将文件读取为二进制字符串
			            3.readAsDataURL(file)：将文件读取为Data URL
			            4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
	 */
	var wb; //读取完成的数据
	var rABS = true; //是否将文件读取为二进制字符串

	if(!obj.files) {
		return;
	}
	var f = obj.files[0];
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		if(rABS) {
			wb = XLSX.read(btoa(fixdata(data)), { //手动转化
				type: 'base64'
			});
		} else {
			wb = XLSX.read(data, {
				type: 'binary'
			});
		}
		//wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
		//wb.Sheets[Sheet名]获取第一个Sheet的数据
		var str = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
		document.getElementById("B-m2-sub7-form").reset();

		//查询消耗点券
		var us = [];
		for(var i = 0; i < str.length; i++) {
			us.push({ Uid: i });
		}
		var ss = {
			Code: 10308,
			SessionId: global_sessionID,
			ManagerId: global_managerID,
			Type: 3,
			MenuId: global_vue_B_m2_app.sub7_packSelectType,
			Users: us
		};
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
					SimplePop.confirm("需要消耗" + json.TotalCount + "点券,确定批量导入?", {
						cancel: function() {},
						confirm: function() {
							var ss = {
								Code: 10210,
								SessionId: global_sessionID,
								ManagerId: global_managerID,
								TeamId: global_B_m2_sub2_select_gid,
								MenuId: global_vue_B_m2_app.sub7_packSelectType,
								RegionId: global_vue_B_m2_app.sub7_selectArea,
								VenderId: global_vue_B_m2_app.sub7_selectVender,
								Users: str
							};
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
										main_companyJS.Bm2Sub6GetCreateUserErrorList(json.Users);
										globalFunTopBoxTipInfo("创建成功" + json.SuccessCount + "个成员,共消耗" + json.ActualCount + "点券!");

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
					});

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

	};
	reader.readAsArrayBuffer(f);

}
//文件流转BinaryString
function fixdata(data) {
	var o = "",
		l = 0,
		w = 10240;
	for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
	o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
	return o;
}
//导出excel文件
window.ExcelExport = function() {
	if(typeof(XLSX) == "undefined") {
		globalFunTopBoxTipInfo("Excel工具还没有载入完毕，请稍后再试");
		return;
	}
	/*
	var jsono = [{ //测试数据  
		"a": "212",
		"b": "132"
	}, {
		"a": "zcxc",
		"b": "xcxc"
	}];
	*/
	downloadExl(global_vue_B_m2_app.sub7_errorJson);
}

function downloadExl(json, type) {
	var tmpDown; //导出的二进制对象  
	var keyMap = []; //获取键  
	var k;
	for(k in json[0]) {
		keyMap.push(k);
	}
	var tmpdata = []; //用来保存转换好的json  

	json.map((v, i) => keyMap.map((k, j) => Object.assign({}, { //运用ES6内容  
		v: v[k],
		position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
	}))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
		v: v.v
	});

	/*
	json.map(function(v, i) { //运用ES5内容  
		return keyMap.map(function(k, j) {
			return Object.assign({}, {
				v: v[k],
				position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
			});
		});
	}).reduce(function(prev, next) {
		return prev.concat(next);
	}).forEach(function(v, i) {
		tmpdata[v.position] = {
			v: v.v
		}
	});
	*/
	var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10  
	var tmpWB = {
		SheetNames: ['mySheet'], //保存的表标题  
		Sheets: {
			'mySheet': Object.assign({},
				tmpdata, //内容  
				{
					'!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域  
				})
		}
	};
	tmpDown = new Blob([s2ab(XLSX.write(tmpWB, {
			bookType: (type == undefined ? 'xlsx' : type),
			bookSST: false,
			type: 'binary'
		} //这里的数据是用来定义导出的格式类型  
	))], {
		type: ""
	}); //创建二进制对象写入转换好的字节流  
	var href = URL.createObjectURL(tmpDown); //创建对象超链接  
	document.getElementById("B-m2-sub7-hf").href = href; //绑定a标签  
	document.getElementById("B-m2-sub7-hf").click(); //模拟点击实现下载  ,IE不支持

	/*IE模拟CLICK
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", false, false); // 或用initMouseEvent()，不过需要更多参数 
	$("#B-m2-sub7-hf").get(0).dispatchEvent(evt);
	*/

	setTimeout(function() { //延时释放  
		URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL  
	}, 100);
}

function s2ab(s) { //字符串转字符流  
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for(var i = 0; i != s.length; ++i) {
		view[i] = s.charCodeAt(i) & 0xFF;
	}
	return buf;
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。  
function getCharCol(n) {
	let temCol = '',
		s = '',
		m = 0
	while(n > 0) {
		m = n % 26 + 1
		s = String.fromCharCode(m + 64) + s
		n = (n - m) / 26
	}
	return s
}
/*操作excels end*/

//加载高德地图

function loadMapScript() {
	map = new AMap.Map('over-map-content', {
		resizeEnable: true,
		zoom: 13
	});
}
