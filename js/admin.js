/*
 * 管理员管理
 */
/*
$(function() {
	Cm1VueAppInit();
	Cm1Sub1InitPageTools();
});
*/
exports.initAdminFun = function() {
	Cm1VueAppInit();
	Cm1Sub1InitPageTools();
}

function Cm1VueAppInit() {
	global_vue_C_m1_app = new Vue({
		el: '#C-m1',
		data: {
			//管理员列表
			adminArr: {},
			//新建运营商管理账号
			sub2_loginName: "",
			sub2_loginPassword: "",
			//更新管理员
			sub3_name: "",
			sub3_openLoc: "true",
			sub3_selectID: 0
		},
		methods: {
			rsetPassword: function(id) {
				SimplePop.confirm("确定还原密码？", {
					cancel: function() {},
					confirm: function() {
						var ss = { Code: 10006, SessionId: global_sessionID, ManagerId: global_managerID, Mid: id, Action: 1 };
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
									globalFunTopBoxTipInfo("修改成功(默认密码:123456)!");

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
			},
			editMenu: function(id) {
				this.sub3_selectID = id;
				$("#C-m1-sub3-setAdminOterInfo-menu").modal("show");
			},
			deleteOne: function(id) {
				SimplePop.confirm("确定删除？", {
					cancel: function() {},
					confirm: function() {
						//Vue.delete(global_vue_C_m1_app.adminArr, id);
						var ss = { Code: 10008, SessionId: global_sessionID, ManagerId: global_managerID, Mid: id };
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
									globalFunTopBoxTipInfo("删除成功!");
									var tools = require('./admin.js');
									tools.Cm1Sub1SOpenUI();

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
			},
			sub2_createAdminSave: function() {
				this.sub2_loginName = this.sub2_loginName.trim();
				this.sub2_loginPassword = this.sub2_loginPassword.trim();
				var powerArr = [];
				/*
				$(".C-m1-powr-detail").each(function(index, item) {
					$item = $(item); // 再次变为Jquery对象    
					if($item.is(':checked')) {
						powerArr.push($item.attr("powerType"));

					}

				});
				*/
				if(this.sub2_loginName == "" || this.sub2_loginPassword == "") {
					globalFunTopBoxTipInfo("登录名和密码不能为空！");
					return;
				}
				var ss = { Code: 10007, SessionId: global_sessionID, ManagerId: global_managerID, Name: this.sub2_loginName, Password: this.sub2_loginPassword, PowerArr: powerArr, Action: 0 };
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
							globalFunTopBoxTipInfo("保存成功!");

						} else if(json.Result == 4009) {
							globalFunTopBoxTipInfo("数据长度不正确!");
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

			},
			sub2_goBack: function() {
				$("#C-m1-sub1").show();
				$("#C-m1-sub2").hide();
				var tools = require('./admin.js');
				tools.Cm1Sub1SOpenUI();
			},
			showsub2CreateAdminUI: function() {
				//$(".C-m1-powr-detail").prop("checked", true);
				$("#C-m1-sub1").hide();
				$("#C-m1-sub2").show();
			},
			saveSub3SetUserOterInfoMenuData: function() {
				this.sub3_name = this.sub3_name.trim();
				/*
				if(this.sub3_name == "") {
					globalFunTopBoxTipInfo("登录名称不能为空！");
					return;
				}
				*/
				var uid = this.sub3_selectID;
				
				var myName="";
				if(this.sub3_name == ""){
					myName=global_vue_C_m1_app.adminArr[uid].loginName;
				}else{
					myName=this.sub3_name;
				}
				
				var effStr = "是";
				if(this.sub3_openLoc == "true") {
					effStr = "是";
				} else {
					effStr = "否";
				}

				var ss = { Code: 10006, SessionId: global_sessionID, ManagerId: global_managerID, ManagerName: this.sub3_name, Vaid: this.sub3_openLoc, Mid: uid, Action: 1 };
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
							globalFunTopBoxTipInfo("修改成功!");
							var us1 = { id: uid, loginName: myName, identity: global_vue_C_m1_app.adminArr[uid].identity, effective: effStr };
							Vue.set(global_vue_C_m1_app.adminArr, uid, us1);

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

				$("#C-m1-sub3-setAdminOterInfo-menu").modal("hide");
			}
		}
	});
}
//初始化分页插件
function Cm1Sub1InitPageTools() {

	global_C_m1_sub1_page_tool_render_flag = true;
	global_C_m1_sub1_page_tool_obj = new Paging();
	global_C_m1_sub1_page_tool_obj.init({
		target: '#C-m1-sub1-page',
		pagesize: global_C_m1_sub1_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				Bm2Sub1getCompanyListSever(page - 1);
			}
		}
	});
	$("#C-m1-sub1-page").hide();
}

//打开管理员模块列表
exports.Cm1Sub1SOpenUI = function() {
	global_C_m1_sub1_page_tool_render_flag = true;
	Cm1Sub1getCompanyAllAdminListSever(0);

}
//查看管理员模块列表

function Cm1Sub1getCompanyAllAdminListSever(page) {

	//服务器返回成功数据后
	if(global_vue_C_m1_app && global_vue_C_m1_app.adminArr) {
		global_vue_C_m1_app.adminArr = null;
		global_vue_C_m1_app.adminArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { id: i, loginName: "张三", identity: "运营商", effective: "有效" };
		Vue.set(global_vue_C_m1_app.adminArr, i, us1);
	}
	*/
	var ss = { Code: 10005, SessionId: global_sessionID, ManagerId: global_managerID, Action: 0, Page: page, PerPage: global_C_m1_sub1_page_tool_show_count };
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
				for(var i = 0; i < json.Managers.length; i++) {
					var effStr = "是";
					if(json.Managers[i].Effective == "1") {
						effStr = "是";
					} else {
						effStr = "否";
					}

					var identityStr = "开发商管理员"; //0=开发商,1=运营商,2=经销商,3=用户管理员，4=调度管理员
					if(json.Managers[i].Identity == "0") {
						identityStr = "开发商管理员";
					} else if(json.Managers[i].Identity == "1") {
						identityStr = "运营商管理员";
					} else if(json.Managers[i].Identity == "2") {
						identityStr = "经销商管理员";
					} else if(json.Managers[i].Identity == "3") {
						identityStr = "用户管理员";
					} else if(json.Managers[i].Identity == "4") {
						identityStr = "调度管理员";
					}
					var us1 = { id: json.Managers[i].Uid, loginName: json.Managers[i].LoginName, identity: identityStr, effective: effStr };
					Vue.set(global_vue_C_m1_app.adminArr, json.Managers[i].Uid, us1);
				}
				$("#C-m1-sub1-page").show();
				if(global_C_m1_sub1_page_tool_render_flag) {
					var pageSum = json.PageCount * global_C_m1_sub1_page_tool_show_count;
					global_C_m1_sub1_page_tool_obj.render({ count: pageSum });
					global_C_m1_sub1_page_tool_render_flag = false;
				}

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