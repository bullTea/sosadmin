/*
 * 经销商
 */
/*
$(function() {
	Am1VueAppInit();
	Am2VueAppInit();
	Am2Sub1InitPageTools();
	Am2Sub2InitPageTools();
});
*/
exports.initDistributorFun = function() {
	Am1VueAppInit();
	Am2VueAppInit();
	Am2Sub1InitPageTools();
	Am2Sub2InitPageTools();
}
//初始化新建经销商vueApp
function Am1VueAppInit() {
	global_vue_A_m1_app = new Vue({
		el: '#A-m1',
		data: {
			nickName: "",
			loginName: "",
			loginPassword: ""
		},
		methods: {
			save: function() {
				this.nickName = this.nickName.trim();
				this.loginName = this.loginName.trim();
				this.loginPassword = this.loginPassword.trim();
				if(this.nickName == "" || this.loginName == "" || this.loginPassword == "") {
					globalFunTopBoxTipInfo("含有未填数据，请填写！");
					return;
				}
				var ss = { Code: 10001, SessionId: global_sessionID, ManagerId: global_managerID, Name: this.nickName, ManagerName: this.loginName, ManagerPassword: this.loginPassword };
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
			}
		}
	});
}

//初始化查看下级经销商vueApp
function Am2VueAppInit() {
	global_vue_A_m2_app = new Vue({
		el: '#A-m2',
		data: {
			distributorArr: {},
			adminArr: {},
			loginName: "",
			loginPassword: ""
		},
		methods: {
			edit: function(id) {
				SimplePop.prompt("请输入经销商名称", {
					cancel: function() {},
					confirm: function(msg) {
						msg = msg.trim();
						if(msg == "") {
							globalFunTopBoxTipInfo("经销商名称不能为空！");
							return;
						}
						var ss = { Code: 10003, SessionId: global_sessionID, ManagerId: global_managerID, OperatorId: id, Name: msg };
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
									var us2 = { id: id, name: msg, money: global_vue_A_m2_app.distributorArr[id].money, createName: global_vue_A_m2_app.distributorArr[id].createName, updateTime: global_vue_A_m2_app.distributorArr[id].updateTime, createTime: global_vue_A_m2_app.distributorArr[id].createTime };
									Vue.set(global_vue_A_m2_app.distributorArr, id, us2);
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

					}
				});
			},
			deleteOne: function(id) {
				SimplePop.confirm("确认删除此经销商？", {
					cancel: function() {},
					confirm: function() {
						//Vue.delete(global_vue_A_m2_app.distributorArr, id);
						var ss = { Code: 10002, SessionId: global_sessionID, ManagerId: global_managerID, OperatorId: id };
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
									global_page_tools_render_flag = true;
									//Am2Sub1getDistributorListSever(0);
									var tools = require('./distributor.js');
									tools.Am2Sub1getDistributorListSever(0);
									globalFunTopBoxTipInfo("删除成功!");

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
			add: function(id) {
				Am2Sub2OpenUI(id);
			},
			goBack: function() {
				global_page_tools_render_flag = true;
				var tools = require('./distributor.js');
				tools.Am2Sub1getDistributorListSever(0);
				//Am2Sub1getDistributorListSever(0);
				$("#A-m2-sub1").show();
				$("#A-m2-sub2").hide();
				$("#A-m2-sub3").hide();
			},
			createAdmin: function() {
				$("#A-m2-sub1").hide();
				$("#A-m2-sub2").hide();
				$("#A-m2-sub3").show();
				//$(".A-m2-powr-detail").prop("checked", true);

			},
			goBack2: function() {
				Am2Sub2OpenUI(global_A_m2_select_uid);
			},
			createAdminSave: function() {
				this.loginName = this.loginName.trim();
				this.loginPassword = this.loginPassword.trim();
				var powerArr = [];
				/*
				$(".A-m2-powr-detail").each(function(index, item) {
					$item = $(item); // 再次变为Jquery对象    
					if($item.is(':checked')) {
						powerArr.push($item.attr("powerType"));

					}

				});
                 */
				if(this.loginName == "" || this.loginPassword == "") {
					globalFunTopBoxTipInfo("登录名和密码不能为空！");
					return;
				}
				var ss = { Code: 10007, SessionId: global_sessionID, ManagerId: global_managerID, Name: this.loginName, OperatorId: global_A_m2_select_uid, Password: this.loginPassword, PowerArr: powerArr, Action: 1 };
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
			Am2Sub2AdminSetPwd: function(id) {
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
							globalFunTopBoxTipInfo("修改成功(默认密码：123456)!");

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
			allotMoey: function(id) {
				SimplePop.prompt("请输入点券数量", {
					cancel: function() {},
					confirm: function(msg) {
						msg = msg.trim();
						if(msg == "") {
							globalFunTopBoxTipInfo("点券数量不能为空！");
							return;
						}
						var ss = {
							Code: 10310,
							SessionId: global_sessionID,
							ManagerId: global_managerID,
							DstType: 1,
							DstId: id,
							Amount: msg
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
									//var us2 = { id: id, name: global_vue_A_m2_app.distributorArr[id].name, money: msg, createName: global_vue_A_m2_app.distributorArr[id].createName, updateTime: global_vue_A_m2_app.distributorArr[id].updateTime, createTime: global_vue_A_m2_app.distributorArr[id].createTime };
									//Vue.set(global_vue_A_m2_app.distributorArr, id, us2);
									global_page_tools_render_flag = true;
									//Am2Sub1getDistributorListSever(0);
									var tools = require('./distributor.js');
									tools.Am2Sub1getDistributorListSever(0);
									globalFunTopBoxTipInfo("分配成功!");

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
			}
		}
	});
}
//初始化分页插件
function Am2Sub1InitPageTools() {

	global_page_tools_render_flag = true;
	global_A_m1_page_tool_obj = new Paging();
	global_A_m1_page_tool_obj.init({
		target: '#A-m2-sub1-page',
		pagesize: global_A_m1_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				//Am2Sub1getDistributorListSever(page - 1);
				var tools = require('./distributor.js');
				tools.Am2Sub1getDistributorListSever(page - 1);
			}
		}
	});
	$("#A-m2-sub1-page").hide();
}

function Am2Sub2InitPageTools() {

	global_A_m2_page_tool_render_flag = true;
	global_A_m2_page_tool_obj = new Paging();
	global_A_m2_page_tool_obj.init({
		target: '#A-m2-sub2-page',
		pagesize: global_A_m2_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				Am2Sub2getDistributorAdminListSever(page - 1);
			}
		}
	});
	$("#A-m2-sub2-page").hide();
}
//获取经销商列表数据
exports.Am2Sub1getDistributorListSever = function(page) {

	//服务器返回成功数据后
	if(global_vue_A_m2_app && global_vue_A_m2_app.distributorArr) {
		global_vue_A_m2_app.distributorArr = null;
		global_vue_A_m2_app.distributorArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { id: i, name: "经销商1", money: 23, createName: "sdsd", updateTime: "2017-03-01 10:17:26", createTime: "2017-03-01 02:17:26" };
		Vue.set(global_vue_A_m2_app.distributorArr, i, us1);
	}
	*/
	var ss = { Code: 10004, SessionId: global_sessionID, ManagerId: global_managerID, Action: 1, Page: page, PerPage: global_A_m1_page_tool_show_count };
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
				for(var i = 0; i < json.Operators.length; i++) {
					var us1 = { id: json.Operators[i].Id, name: json.Operators[i].Name, money: json.Operators[i].Coupons, createName: json.Operators[i].CreateName, updateTime: json.Operators[i].UpdateTime, createTime: json.Operators[i].CreateTime };
					Vue.set(global_vue_A_m2_app.distributorArr, json.Operators[i].Id, us1);
				}
				$("#A-m2-sub1-page").show();
				if(global_page_tools_render_flag) {
					var pageSum = json.PageCount * global_A_m1_page_tool_show_count;
					global_A_m1_page_tool_obj.render({ count: pageSum });
					global_page_tools_render_flag = false;
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
//打开经销商下的管理员列表
function Am2Sub2OpenUI(id) {
	global_A_m2_page_tool_render_flag = true;
	global_A_m2_select_uid = id;
	Am2Sub2getDistributorAdminListSever(0);
	$("#A-m2-sub1").hide();
	$("#A-m2-sub2").show();
	$("#A-m2-sub3").hide();

}

//获取管理员列表
function Am2Sub2getDistributorAdminListSever(page) {

	//服务器返回成功数据后
	if(global_vue_A_m2_app && global_vue_A_m2_app.adminArr) {
		global_vue_A_m2_app.adminArr = null;
		global_vue_A_m2_app.adminArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { id: i, name: "管理十" };
		Vue.set(global_vue_A_m2_app.adminArr, i, us1);
	}
	*/
	var ss = { Code: 10005, SessionId: global_sessionID, ManagerId: global_managerID, OperatorId: global_A_m2_select_uid, Action: 1, Page: page, PerPage: global_A_m2_page_tool_show_count };
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
					var us1 = { id: json.Managers[i].Uid, name: json.Managers[i].LoginName };
					Vue.set(global_vue_A_m2_app.adminArr, json.Managers[i].Uid, us1);
				}
				$("#A-m2-sub2-page").show();
				if(global_A_m2_page_tool_render_flag) {
					var pageSum = json.PageCount * global_A_m2_page_tool_show_count;
					global_A_m2_page_tool_obj.render({ count: pageSum });
					global_A_m2_page_tool_render_flag = false;
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