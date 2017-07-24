/*
 * 集团管理
 */
/*
$(function() {
	Bm1VueAppInit();
	Bm2VueAppInit();
	Bm2Sub1InitPageTools();
	Bm2Sub2InitPageTools();
	Bm2Sub4InitPageTools();
	Bm2Sub5InitPageTools();
	Bm2Sub6InitPageTools();

});
*/
exports.initCompanyFun = function() {
	$("#system-info-box").hide();
	$(".server-package-item-active").hide();
	Bm1VueAppInit();
	Bm2VueAppInit();
	Bm2Sub1InitPageTools();
	Bm2Sub2InitPageTools();
	Bm2Sub4InitPageTools();
	Bm2Sub5InitPageTools();
	Bm2Sub6InitPageTools();
	Bm2Sub8InitPageTools();

	$(".over-map-mask").click(function(e){
		if(e.target==e.currentTarget){
			$(".over-map-mask").hide();
		}
	});

}
//初始化新建集团vueApp
function Bm1VueAppInit() {
	global_vue_B_m1_app = new Vue({
		el: '#B-m1',
		data: {
			companyName: "",
			selectCity: ""
		},
		methods: {
			save: function() {
				//新建集团
				this.companyName = this.companyName.trim();
				this.selectCity = this.selectCity.trim();
				if(this.companyName == "") {
					globalFunTopBoxTipInfo("集团名称不能为空！");
					return;
				}
				var ss = { Code: 10100, SessionId: global_sessionID, ManagerId: global_managerID, Name: this.companyName, RegionId: this.selectCity };
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
							globalFunTopBoxTipInfo("创建成功!");

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

//初始化用户集团vueApp
function Bm2VueAppInit() {
	global_vue_B_m2_app = new Vue({
		el: '#B-m2',
		data: {
			//集团列表
			companyArr: {},
			//集团下用户列表
			userListArr: {},
			sub2_checkedUidArr: [],
			//集团下新建用户列表
			sub3_loginName: "",
			sub3_password: "",
			sub3_nicheng: "",
			sub3_heartTime: "",
			sub3_openLocation: "true",
			sub3_tel: "",
			sub3_packageArr: {},
			sub3_areaArr: {},
			sub3_selectArea: "1",
			sub3_venderArr: {},
			sub3_selectVender: "1",
			sub3_packSelectType: -1,
			//用户所属预定义组
			sub4_userInGroupList: {},
			sub4_editM1_priority: "1",
			sub4_nospeak: "false",
			//用户加入预定义组所有组列表
			sub4AddGropuArr: {},
			sub4_userAddGroup_priority: "1",
			sub4_userAddGroup_nospeak: "false",
			//立即定位
			sub2_nowLocation_style: "1",
			//更新定位配置
			sub2_updateLocationConfig_openLoc: "true",
			sub2_updateLocationConfig_heartTime: "",
			sub2_updateLocationConfig_ip: "",
			sub2_updateLocationConfig_port: "",
			sub2_updateLocationConfig_locStyle: "1",
			sub2_updateLocationConfig_starttime1: "",
			sub2_updateLocationConfig_endtime1: "",
			sub2_updateLocationConfig_starttime2: "",
			sub2_updateLocationConfig_endtime2: "",
			//修改集团成员密码
			sub2_setUserPwd_pwd1: "",
			sub2_setUserPwd_pwd2: "",
			//集团下用户基础信息编辑
			sub2_setUserOterInfo_name: "",
			sub2_setUserOterInfo_openLoc: "true",
			sub2_setUserOterInfo_heartTime: "",
			sub2_packageArr: {},
			sub2_packSelectType: -1,
			sub2_continue_packageArr: {},
			sub2_continue_packSelectType: -1,
			sub2_packSelectName: "",
			//用户所属预定义组界面选择的组ID
			sub4_select_gid: 0,
			//集团下预定义组
			sub5_groupArr: {},
			//新建预定义组
			sub5_createGroup_name: "",
			sub5_group_userArr: {},
			sub5_editGroup_userArr: {},
			sub5_addUserGroup_userArr: {},
			//修改预定义组属性
			sub5_editGroup_name: "",
			//集团管理员列表
			sub6_adminArr: {},
			//新建集团管理员
			sub6_login_name: "",
			sub6_login_password: "",
			//新建集团调度员
			sub6_dispatcher_login_name: "",
			sub6_dispatcher_login_password: "",
			sub6_relation_select_user: "",
			sub6_userArr: {},
			//批量创建用户
			sub7_newUserArr: {},
			sub7_packageArr: {},
			sub7_packSelectType: -1,
			sub7_errorJson: [],
			sub7_areaArr: {},
			sub7_selectArea: "1",
			sub7_venderArr: {},
			sub7_selectVender: "1",
			//警务站
			sub8_waringArr: {},
			sub8_selectGroup: "1",
			sub8_groupArr: {},
			sub8_saveWaringID: "0"

		},
		methods: {
			//同步提示框
			systemBoxClose: function() {
				$("#system-info-box").hide();
			},
			showCompanyUserList: function(id) {
				Bm2Sub2SOpenUI(id);
			},
			createAdminSave: function() {
				//创建集团下用户成员
				$("#B-m2-sub1").hide();
				$("#B-m2-sub2").hide();
				$("#B-m2-sub3").show();
				Bm2Sub3GetServerPackageList();
			},
			createMoreAdminSave: function() {
				//批量创建集团下用户成员
				$("#B-m2-sub1").hide();
				$("#B-m2-sub2").hide();
				$("#B-m2-sub3").hide();
				$("#B-m2-sub7").show();
				Bm2Sub6GetServerPackageList();
				if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_newUserArr) {
					global_vue_B_m2_app.sub7_newUserArr = null;
					global_vue_B_m2_app.sub7_newUserArr = new Object();
				}
			},
			serverPackageMoneySave: function() {
				//$("#B-m2-sub2-setUserPackage-menu").modal("show");
				//Bm2Sub2UserGetContinueServerPackageList();
				//查询消耗点券
				var us = [];
				for(var i = 0; i < this.sub2_checkedUidArr.length; i++) {
					us.push({ Uid: this.sub2_checkedUidArr[i] });
				}
				var ss = {
					Code: 10308,
					SessionId: global_sessionID,
					ManagerId: global_managerID,
					Type: 1,
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

							SimplePop.confirm("需要消耗" + json.TotalCount + "点券,确定续费?", {
								cancel: function() {},
								confirm: function() {
									var ss = {
										Code: 10211,
										SessionId: global_sessionID,
										ManagerId: global_managerID,
										TeamId: global_B_m2_sub2_select_gid,
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
												globalFunTopBoxTipInfo("创建成功,消耗" + json.ActualCount + "点券!");

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
			},
			goBackSub1: function() {
				$("#B-m2-sub1").show();
				$("#B-m2-sub2").hide();
				$("#B-m2-sub3").hide();

				global_B_m2_sub1_page_tool_render_flag = true;
				//Bm2Sub1getCompanyListSever(0);
				var tools = require('./company.js');
				tools.Bm2Sub1getCompanyListSever(0);
				global_vue_B_m2_app.sub2_checkedUidArr.splice(0);
			},
			sub3save: function() {
				//新建集团成员
				this.sub3_loginName = this.sub3_loginName.trim();
				//this.sub3_password = this.sub3_password.trim();
				this.sub3_nicheng = this.sub3_nicheng.trim();
				//this.sub3_heartTime = this.sub3_heartTime.trim();
				this.sub3_openLocation = this.sub3_openLocation.trim();
				if(this.sub3_loginName == "" || this.sub3_nicheng == "") {
					globalFunTopBoxTipInfo("含有未填数据，请填写！");
					return;
				}
				if(global_vue_B_m2_app.sub3_packSelectType == -1) {
					globalFunTopBoxTipInfo("请选择套餐！");
					return;
				}
				//查询消耗点券
				var ss = {
					Code: 10308,
					SessionId: global_sessionID,
					ManagerId: global_managerID,
					Type: 3,
					MenuId: global_vue_B_m2_app.sub3_packSelectType,
					Users: [{ Uid: 1 }]
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

							SimplePop.confirm("需要消耗" + json.TotalCount + "点券,确定新建?", {
								cancel: function() {},
								confirm: function() {
									var ss = {
										Code: 10200,
										SessionId: global_sessionID,
										ManagerId: global_managerID,
										TeamId: global_B_m2_sub2_select_gid,
										LoginName: global_vue_B_m2_app.sub3_loginName,
										Name: global_vue_B_m2_app.sub3_nicheng,
										Password: "123456",
										Mdn: global_vue_B_m2_app.sub3_tel,
										MenuId: global_vue_B_m2_app.sub3_packSelectType,
										RegionId: global_vue_B_m2_app.sub3_selectArea,
										VenderId: global_vue_B_m2_app.sub3_selectVender
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
												globalFunTopBoxTipInfo("创建成功,消耗" + json.ActualCount + "点券!");

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
			sub3goBack: function() {
				global_vue_B_m2_app.sub3_packSelectType = -1;
				global_vue_B_m2_app.sub7_packSelectType = -1;
				$(".server-package-item-active").hide();
				$(".server-package-item-content").css({ "color": "black", "border-color": "gray" });
				Bm2Sub2SOpenUI(global_B_m2_sub2_select_gid);
			},
			showSub4UserInGroupList: function(id) {
				Bm2Sub4SOpenUI(id);
			},
			goBackSub4: function() {
				$("#B-m2-sub2").show();
				$("#B-m2-sub4").hide();
			},
			showSub4EditMenu: function(id) {
				$("#B-m2-sub4-edit-m1").modal("show");
				this.sub4_select_gid = id;
			},
			saveSub4EditMenuData: function() {
				$("#B-m2-sub4-edit-m1").modal("hide");
				var priority = global_vue_B_m2_app.sub4_editM1_priority;
				var speak = global_vue_B_m2_app.sub4_nospeak;
				var ss = {
					Code: 10306,
					SessionId: global_sessionID,
					ManagerId: global_managerID,
					Uid: global_B_m2_sub2_select_uid,
					Members: [{ Gid: this.sub4_select_gid, Priority: priority, ForbidSpeak: speak }],
					Action: 3
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
							var isSpeak = "否";
							if(speak == "true") {
								isSpeak = "是";
							} else {
								isSpeak = "否";
							}

							var myId = global_vue_B_m2_app.sub4_select_gid;
							var us1 = {
								id: myId,
								sub4_groupName: global_vue_B_m2_app.sub4_userInGroupList[myId].sub4_groupName,
								sub4_priority: priority,
								sub4_nospeak: isSpeak
							};
							Vue.set(global_vue_B_m2_app.sub4_userInGroupList, myId, us1);
							globalFunTopBoxTipInfo("修改成功!");

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
			showSub4DelMenu: function(id) {
				SimplePop.confirm("确认删除？", {
					cancel: function() {},
					confirm: function() {
						//Vue.delete(global_vue_B_m2_app.sub4_userInGroupList, id);
						var ss = {
							Code: 10306,
							SessionId: global_sessionID,
							ManagerId: global_managerID,
							Uid: global_B_m2_sub2_select_uid,
							Members: [{ Gid: id }],
							Action: 2
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
									global_B_m2_sub4_page_tool_render_flag = true;
									Bm2Sub4getCompanyUserListSever(0);
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
			sub4AddGroupOpenMenu: function() {
				$("#B-m2-sub4-addGroup-menu").modal("show");
				Bm2Sub4getCompanyGroupListSever();
			},
			saveSub4AddGroupMenuData: function() {
				$("#B-m2-sub4-addGroup-menu").modal("hide");
				Bm2Sub4userAddGroupSave();
			},
			saveSub2NowLocationSedMenuData: function() {
				$("#B-m2-sub2-nowLocation-menu").modal("hide");
			},
			showSub2NowSendLocationMenuUI: function(id) {
				$("#B-m2-sub2-nowLocation-menu").modal("show");
			},
			saveSub2UpdateLocationConfigMenuData: function() {
				$("#B-m2-sub2-updateLocationConfig-menu").modal("hide");
			},
			showSub2UpdateLocationConfigMenuUI: function() {
				$("#B-m2-sub2-updateLocationConfig-menu").modal("show");
			},
			saveSub2SetUserPwdMenuData: function() {

				$("#B-m2-sub2-setUserPwd-menu").modal("hide");
				this.sub2_setUserPwd_pwd1 = this.sub2_setUserPwd_pwd1.trim();
				this.sub2_setUserPwd_pwd2 = this.sub2_setUserPwd_pwd2.trim();
				if(this.sub2_setUserPwd_pwd1 == "") {
					globalFunTopBoxTipInfo("请输入密码!");
					return;
				}
				if(this.sub2_setUserPwd_pwd1 != this.sub2_setUserPwd_pwd2) {
					globalFunTopBoxTipInfo("新密码和确认密码不相同!");
					return;
				}
				var ss = { Code: 10202, SessionId: global_sessionID, ManagerId: global_managerID, Uid: global_B_m2_sub2_select_uid, Password: this.sub2_setUserPwd_pwd1 };
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
			showSub2SetUserPwdMenuUI: function(id) {
				global_B_m2_sub2_select_uid = id;
				$("#B-m2-sub2-setUserPwd-menu").modal("show");
			},
			saveSub2SetUserOterInfoMenuData: function() {
				$("#B-m2-sub2-setUserOterInfo-menu").modal("hide");
				this.sub2_setUserOterInfo_name = this.sub2_setUserOterInfo_name.trim();
				/*
				if(this.sub2_setUserOterInfo_name == "") {
					globalFunTopBoxTipInfo("昵称不能为空！");
					return;
				}
				*/
				//this.sub2_setUserOterInfo_heartTime = this.sub2_setUserOterInfo_heartTime.trim();
				var myid = global_B_m2_sub2_select_uid;
				var isLoc = "是";
				if(this.sub2_setUserOterInfo_openLoc == "true") {
					isLoc = "是";
				} else {
					isLoc = "否";
				}
				var ss = {
					Code: 10202,
					SessionId: global_sessionID,
					ManagerId: global_managerID,
					Uid: global_B_m2_sub2_select_uid,
					Name: this.sub2_setUserOterInfo_name,
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
							var name = global_vue_B_m2_app.sub2_setUserOterInfo_name;
							if(name == "") {
								name = global_vue_B_m2_app.userListArr[myid].userName;
							} else {

							}
							var us1 = {
								id: myid,
								userLoginName: global_vue_B_m2_app.userListArr[myid].userLoginName,
								userName: name,
								mdn: global_vue_B_m2_app.userListArr[myid].mdn,
								menuName: global_vue_B_m2_app.userListArr[myid].menuName,
								createUser: global_vue_B_m2_app.userListArr[myid].createUser,
								createTime: global_vue_B_m2_app.userListArr[myid].createTime,
								overTime: global_vue_B_m2_app.userListArr[myid].overTime,
								regionName: global_vue_B_m2_app.userListArr[myid].regionName,
								venderName: global_vue_B_m2_app.userListArr[myid].venderName
							};
							Vue.set(global_vue_B_m2_app.userListArr, myid, us1);
							globalFunTopBoxTipInfo("修改成功!");

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
			showSub2SetUserOtherInfoMenuUI: function(id, name) {
				global_B_m2_sub2_select_uid = id;
				this.sub2_setUserOterInfo_name = name;
				global_vue_B_m2_app.sub2_packSelectType = -1;
				$(".server-package-item-active").hide();
				$(".server-package-item-content").css({ "color": "black", "border-color": "gray" });
				$("#B-m2-sub2-setUserOterInfo-menu").modal("show");

				Bm2Sub2EditUserGetServerPackageList();
			},
			showSub2DeleteUserMenuUI: function(id) {
				SimplePop.confirm("确认删除此用户？", {
					cancel: function() {},
					confirm: function() {
						//Vue.delete(global_vue_B_m2_app.userListArr, id);
						var ss = { Code: 10201, SessionId: global_sessionID, ManagerId: global_managerID, Uid: id };
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
									Bm2Sub2SOpenUI(global_B_m2_sub2_select_gid);
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
			showCompanyGroupList: function(id) {
				Bm2Sub5SOpenUI(id);
			},
			saveSub5CreateGroupMenuData: function() {
				$("#B-m2-sub5-createGroup-menu").modal("hide");
				this.sub5_createGroup_name = this.sub5_createGroup_name.trim();
				if(this.sub5_createGroup_name == "") {
					globalFunTopBoxTipInfo("请输入群组名称");
					return;
				}
				var userArr = [];
				$(".B-m2-sub5-group-user-list-item-detail").each(function(index, item) {
					if($(item).is(':checked')) {
						userArr.push($(item).attr("uID"));

					}

				});
				var ss = { Code: 10300, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: global_B_m2_sub2_select_gid, Name: this.sub5_createGroup_name, UserArr: userArr };
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
							global_B_m2_sub5_page_tool_render_flag = true;
							Bm2Sub5getCompanyGroupListSever(0);
							globalFunTopBoxTipInfo("创建成功!");

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
			ShowSub5CreateGroupUI: function() {
				$("#B-m2-sub5-createGroup-menu").modal("show");
				Bm2Sub5GetCreateGroupUserList();
			},
			goBackSub5: function() {
				$("#B-m2-sub1").show();
				$("#B-m2-sub5").hide();
				global_B_m2_sub1_page_tool_render_flag = true;
				//Bm2Sub1getCompanyListSever(0);
				var tools = require('./company.js');
				tools.Bm2Sub1getCompanyListSever(0);

			},
			saveSub5EditGroupMenuData: function() {
				this.sub5_editGroup_name = this.sub5_editGroup_name.trim();
				if(this.sub5_editGroup_name == "") {
					globalFunTopBoxTipInfo("名称不能为空！");
					return;
				}

				$("#B-m2-sub5-editGroup-menu").modal("hide");
				var ss = { Code: 10302, SessionId: global_sessionID, ManagerId: global_managerID, Gid: global_B_m2_sub5_select_group_id, Name: this.sub5_editGroup_name };
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
							var gid = global_B_m2_sub5_select_group_id;
							var keyid = global_B_m2_sub5_select_group_keyid;
							var us1 = { keyID: keyid, id: gid, groupName: global_vue_B_m2_app.sub5_editGroup_name };
							Vue.set(global_vue_B_m2_app.sub5_groupArr, keyid, us1);
							globalFunTopBoxTipInfo("修改成功!");

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
			moveUserSub5EditGroupMenuData: function() {
				var userArr = [];
				$(".B-m2-sub5-editGroup-user-list-item-detail").each(function(index, item) {
					if($(item).is(':checked')) {
						userArr.push({ Uid: $(item).attr("uID") });

					}
					/*
					$item = $(item); // 再次变为Jquery对象    注意,用webpack打包后此处会报错item undefined
					if($item.is(':checked')) {
						userArr.push({ Uid: $item.attr("uID") });

					}
                    */
				});
				var ss = { Code: 10304, SessionId: global_sessionID, ManagerId: global_managerID, Gid: global_B_m2_sub5_select_group_id, Members: userArr, Action: 2 };
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
							Bm2Sub5GetEditGroupUserList();
							globalFunTopBoxTipInfo("移除成功!");

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
			sub5EditGroupOneUserMenuData: function(id) {
				var priority = global_vue_B_m2_app.sub5_editGroup_userArr[id].priority;
				var forbidSpeak = global_vue_B_m2_app.sub5_editGroup_userArr[id].forbidSpeak;
				var members = [{ Uid: id, Priority: priority, ForbidSpeak: forbidSpeak }];
				var ss = { Code: 10304, SessionId: global_sessionID, ManagerId: global_managerID, Gid: global_B_m2_sub5_select_group_id, Members: members, Action: 3 };
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
							//Bm2Sub5GetEditGroupUserList();
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
			},
			showSub5EditGroupMenuUI: function(id, keyID, name) {
				global_B_m2_sub5_select_group_id = id;
				global_B_m2_sub5_select_group_keyid = keyID;
				this.sub5_editGroup_name = name;
				$("#B-m2-sub5-editGroup-menu").modal("show");
				Bm2Sub5GetEditGroupUserList();
			},
			showSub5AddGroupMenuUI: function(id) {
				global_B_m2_sub5_select_group_id = id;
				$("#B-m2-sub5-addUserGroup-menu").modal("show");
				Bm2Sub5GetAddGroupUserList();
			},
			showSub5DeleteGroupMenuUI: function(id) {
				SimplePop.confirm("确认删除？", {
					cancel: function() {},
					confirm: function() {
						var ss = { Code: 10301, SessionId: global_sessionID, ManagerId: global_managerID, Gid: id };
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
									//Vue.delete(global_vue_B_m2_app.sub5_groupArr, id);
									global_B_m2_sub5_page_tool_render_flag = true;
									Bm2Sub5getCompanyGroupListSever(0);
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
			saveSub5AddGroupMenuData: function() {
				var userArr = [];
				$(".B-m2-sub5-addUserGroup-user-list-item-detail").each(function(index, item) {
					if($(item).is(':checked')) {

						userArr.push({ Uid: $(item).attr("uID") });

					}

				});
				var ss = { Code: 10304, SessionId: global_sessionID, ManagerId: global_managerID, Gid: global_B_m2_sub5_select_group_id, Members: userArr, Action: 1 };
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
							Bm2Sub5GetAddGroupUserList();
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
			},
			showCompanyAdminList: function(id) {
				Bm2Sub6SOpenUI(id);
			},
			showWaringAdminList: function(id) {
				Bm2Sub8SOpenUI(id);
			},
			goBackSub6: function() {
				$("#B-m2-sub1").show();
				$("#B-m2-sub6").hide();
				Bm2Sub1GetAllTeamSysinfo();

			},
			sub6DeleteOne: function(id) {
				SimplePop.confirm("确认删除？", {
					cancel: function() {},
					confirm: function() {
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
									global_B_m2_sub6_page_tool_render_flag = true;
									Bm2Sub5getCompanyAmdminListSever(0);
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
			saveSub6CreateAdminMenuData: function() {
				//新建集团管理员
				this.sub6_login_name = this.sub6_login_name.trim();
				this.sub6_login_password = this.sub6_login_password.trim();
				if(this.sub6_login_name == "" || this.sub6_login_password == "") {
					globalFunTopBoxTipInfo("登录名和密码不能为空!");
					return;
				}

				$("#B-m2-sub6-createAdmin-menu").modal("hide");
				var ss = { Code: 10307, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: global_B_m2_sub2_select_gid, LoginName: this.sub6_login_name, Password: this.sub6_login_password, Action: 1 };
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
							Bm2Sub6SOpenUI(global_B_m2_sub2_select_gid);
							globalFunTopBoxTipInfo("创建成功!");

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
			ShowSub6CreateAdminUI: function() {
				$("#B-m2-sub6-createAdmin-menu").modal("show");
			},
			saveSub6CreateDispatcherMenuData: function() {
				//新建集团调度员

				$("#B-m2-sub6-createDispatcher-menu").modal("hide");

				this.sub6_dispatcher_login_name = this.sub6_dispatcher_login_name.trim();
				this.sub6_dispatcher_login_password = this.sub6_dispatcher_login_password.trim();
				if(this.sub6_dispatcher_login_name == "" || this.sub6_dispatcher_login_password == "") {
					globalFunTopBoxTipInfo("登录名和密码不能为空!");
					return;
				}
				var uid = $(".B-m2-sub6-user-list-item-detail[type='radio']:checked").attr("uID");
				var ss = {
					Code: 10307,
					SessionId: global_sessionID,
					ManagerId: global_managerID,
					TeamId: global_B_m2_sub2_select_gid,
					LoginName: this.sub6_dispatcher_login_name,
					Password: this.sub6_dispatcher_login_password,
					Uid: uid,
					Action: 2
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
							Bm2Sub6SOpenUI(global_B_m2_sub2_select_gid);
							globalFunTopBoxTipInfo("创建成功!");

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
			ShowSub6CreateDispatcherpUI: function() {
				$("#B-m2-sub6-createDispatcher-menu").modal("show");
				Bm2Sub6GetUserList();
			},
			showCompanyEditNameUI: function(id) {
				SimplePop.prompt("请输入集团名称", {
					cancel: function() {},
					confirm: function(msg) {
						msg = msg.trim();
						if(msg == "") {
							globalFunTopBoxTipInfo("集团名称不能为空！");
							return;
						}
						var ss = { Code: 10102, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: id, Name: msg, Status: 1 };
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
									var us1 = { id: id, campanyName: msg, money: global_vue_B_m2_app.companyArr[id].money, distributorName: global_vue_B_m2_app.companyArr[id].distributorName, areaName: global_vue_B_m2_app.companyArr[id].areaName, createUser: global_vue_B_m2_app.companyArr[id].createUser, createTime: global_vue_B_m2_app.companyArr[id].createTime };
									Vue.set(global_vue_B_m2_app.companyArr, id, us1);
									globalFunTopBoxTipInfo("修改成功!");

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
			showDeleteCompany: function(id) {
				SimplePop.confirm("确认删除？", {
					cancel: function() {},
					confirm: function() {
						//Vue.delete(global_vue_B_m2_app.companyArr, id);
						var ss = { Code: 10101, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: id };
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
									global_B_m2_sub1_page_tool_render_flag = true;
									//Bm2Sub1getCompanyListSever(0);
									var tools = require('./company.js');
									tools.Bm2Sub1getCompanyListSever(0);
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
			CompanySync: function(id) {
				var ss = { Code: 10106, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: id };
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
							global_vue_B_m2_app.companyArr[id].sync = "0";
							var us1 = {
								id: global_vue_B_m2_app.companyArr[id].id,
								campanyName: global_vue_B_m2_app.companyArr[id].campanyName,
								money: global_vue_B_m2_app.companyArr[id].money,
								distributorName: global_vue_B_m2_app.companyArr[id].distributorName,
								areaName: global_vue_B_m2_app.companyArr[id].areaName,
								createUser: global_vue_B_m2_app.companyArr[id].createUser,
								createTime: global_vue_B_m2_app.companyArr[id].createTime,
								sync: global_vue_B_m2_app.companyArr[id].sync
							};
							Vue.set(global_vue_B_m2_app.companyArr, id, us1);
							globalFunTopBoxTipInfo("同步成功!");
							Bm2Sub1GetAllTeamSysinfo();

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
			CompanyAllotMoey: function(id) {
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
							DstType: 2,
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
									global_B_m2_sub1_page_tool_render_flag = true;
									//Bm2Sub1getCompanyListSever(0);
									var tools = require('./company.js');
									tools.Bm2Sub1getCompanyListSever(0);
									global_vue_B_m2_app.sub2_checkedUidArr.splice(0);
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
			},
			sub7_goBack: function() {
				global_vue_B_m2_app.sub3_packSelectType = -1;
				global_vue_B_m2_app.sub7_packSelectType = -1;
				$(".server-package-item-active").hide();
				$(".server-package-item-content").css({ "color": "black", "border-color": "gray" });
				Bm2Sub2SOpenUI(global_B_m2_sub2_select_gid);
			},
			sub7_selectPackage: function(type) {
				this.sub7_packSelectType = type;
				$(".server-package-item-content").css({ "color": "black", "border-color": "gray" });
				$(".server-package-item-active").hide();
				var str1 = ".server-package-item-active[selectType='";
				str1 += type;
				str1 += "']";
				$(str1).show();
				var str2 = ".server-package-item-content[selectType='";
				str2 += type;
				str2 += "']";
				$(str2).css({ "color": "red", "border-color": "red" });

			},
			sub3_selectPackage: function(type) {
				this.sub3_packSelectType = type;
				$(".server-package-item-content").css({ "color": "black", "border-color": "gray" });
				$(".server-package-item-active").hide();
				var str1 = ".server-package-item-active[selectType='";
				str1 += type;
				str1 += "']";
				$(str1).show();
				var str2 = ".server-package-item-content[selectType='";
				str2 += type;
				str2 += "']";
				$(str2).css({ "color": "red", "border-color": "red" });

			},
			sub2_selectPackage: function(type, name) {
				this.sub2_packSelectType = type;
				this.sub2_packSelectName = name;
				$(".server-package-item-content").css({ "color": "black", "border-color": "gray" });
				$(".server-package-item-active").hide();
				var str1 = ".server-package-item-active[selectType='";
				str1 += type;
				str1 += "']";
				$(str1).show();
				var str2 = ".server-package-item-content[selectType='";
				str2 += type;
				str2 += "']";
				$(str2).css({ "color": "red", "border-color": "red" });

			},
			saveSub2SetUserPackageMenuData: function() {
				if(this.sub2_packSelectType == -1) {
					globalFunTopBoxTipInfo("请选择套餐！");
					return;
				}
				var myid = global_B_m2_sub2_select_uid;
				//查询花费金额
				var ss = {
					Code: 10308,
					SessionId: global_sessionID,
					ManagerId: global_managerID,
					Type: 2,
					MenuId: this.sub2_packSelectType,
					Users: [{ Uid: myid }]
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
							SimplePop.confirm("变更套餐需要消耗" + json.TotalCount + "点券,确定变更?", {
								cancel: function() {},
								confirm: function() {
									var ss = {
										Code: 10202,
										SessionId: global_sessionID,
										ManagerId: global_managerID,
										Uid: global_B_m2_sub2_select_uid,
										MenuId: global_vue_B_m2_app.sub2_packSelectType,
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

												var us1 = {
													id: myid,
													userLoginName: global_vue_B_m2_app.userListArr[myid].userLoginName,
													userName: global_vue_B_m2_app.userListArr[myid].userName,
													mdn: global_vue_B_m2_app.userListArr[myid].mdn,
													menuName: global_vue_B_m2_app.sub2_packSelectName,
													createUser: global_vue_B_m2_app.userListArr[myid].createUser,
													createTime: global_vue_B_m2_app.userListArr[myid].createTime,
													overTime: global_vue_B_m2_app.userListArr[myid].overTime,
													regionName: global_vue_B_m2_app.userListArr[myid].regionName,
													venderName: global_vue_B_m2_app.userListArr[myid].venderName
												};
												Vue.set(global_vue_B_m2_app.userListArr, myid, us1);
												globalFunTopBoxTipInfo("修改成功,消耗了" + json.ActualCount + "点券!");
												$("#B-m2-sub2-setUserOterInfo-menu").modal("hide");

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
				//

			},
			sub2_continue_selectPackage: function(type) {
				this.sub2_continue_packSelectType = type;
				$(".server-package-item-content").css({ "color": "black", "border-color": "gray" });
				$(".server-package-item-active").hide();
				var str1 = ".server-package-item-active[selectType='";
				str1 += type;
				str1 += "']";
				$(str1).show();
				var str2 = ".server-package-item-content[selectType='";
				str2 += type;
				str2 += "']";
				$(str2).css({ "color": "red", "border-color": "red" });

			},
			saveSub2SetUserContinuePackageMenuData: function() {
				//保存成功
				$("#B-m2-sub2-setUserPackage-menu").modal("hide");
				alert(this.sub2_checkedUidArr);
				global_vue_B_m2_app.sub2_continue_packSelectType = -1;
				global_vue_B_m2_app.sub2_checkedUidArr.splice(0);

			},
			goBackSub8: function() {
				$("#B-m2-sub1").show();
				$("#B-m2-sub8").hide();
				Bm2Sub1GetAllTeamSysinfo();

			},
			sub8EdintOne: function(id) {
				this.sub8_saveWaringID = id;
				$("#B-m2-sub8-editGroup-menu").modal("show");
				Bm2Sub8getCompanyGroupListSever();
			},
			saveSub8EditData: function() {
				$("#B-m2-sub8-editGroup-menu").modal("hide");
				var ss = {
					Code: 10314,
					SessionId: global_sessionID,
					ManagerId: global_managerID,
					Pid: global_vue_B_m2_app.sub8_saveWaringID,
					Gid: global_vue_B_m2_app.sub8_selectGroup,
					Action: 1
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
							globalFunTopBoxTipInfo("修改成功");
							Bm2Sub8SOpenUI(global_B_m2_sub2_select_gid);
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
			sub8DelOne: function(id) {
				var ss = {
					Code: 10314,
					SessionId: global_sessionID,
					ManagerId: global_managerID,
					Pid: id,
					Action: 2
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
							globalFunTopBoxTipInfo("移除成功");
							Bm2Sub8SOpenUI(global_B_m2_sub2_select_gid);

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
			sub8LocationOne: function(id) {
				$(".over-map-mask").show();
				var lng=parseFloat(global_vue_B_m2_app.sub8_waringArr[id].Longitude);
				var lat=parseFloat(global_vue_B_m2_app.sub8_waringArr[id].Latitude);
				lng=TO_GLNG(lng,lat);
				lat=TO_GLAT(lng,lat);
				var pos = [lng,lat];
				showOneUserPosInMap(pos);
			}
		}
	});
}

//初始化分页插件
function Bm2Sub1InitPageTools() {

	global_B_m2_sub1_page_tool_render_flag = true;
	global_B_m2_sub1_page_tool_obj = new Paging();
	global_B_m2_sub1_page_tool_obj.init({
		target: '#B-m2-sub1-page',
		pagesize: global_B_m2_sub1_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				//Bm2Sub1getCompanyListSever(page - 1);
				var tools = require('./company.js');
				tools.Bm2Sub1getCompanyListSever(page - 1);
			}
		}
	});
	$("#B-m2-sub1-page").hide();
}

function Bm2Sub2InitPageTools() {

	global_B_m2_sub2_page_tool_render_flag = true;
	global_B_m2_sub2_page_tool_obj = new Paging();
	global_B_m2_sub2_page_tool_obj.init({
		target: '#B-m2-sub2-page',
		pagesize: global_B_m2_sub2_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				Bm2Sub2getCompanyUserListSever(page - 1);
			}
		}
	});
	$("#B-m2-sub2-page").hide();
}

function Bm2Sub4InitPageTools() {

	global_B_m2_sub4_page_tool_render_flag = true;
	global_B_m2_sub4_page_tool_obj = new Paging();
	global_B_m2_sub4_page_tool_obj.init({
		target: '#B-m2-sub4-page',
		pagesize: global_B_m2_sub4_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				Bm2Sub4getCompanyUserListSever(page - 1);
			}
		}
	});
	$("#B-m2-sub4-page").hide();
}

function Bm2Sub5InitPageTools() {

	global_B_m2_sub5_page_tool_render_flag = true;
	global_B_m2_sub5_page_tool_obj = new Paging();
	global_B_m2_sub5_page_tool_obj.init({
		target: '#B-m2-sub5-page',
		pagesize: global_B_m2_sub5_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				Bm2Sub5getCompanyGroupListSever(page - 1);
			}
		}
	});
	$("#B-m2-sub5-page").hide();
}

function Bm2Sub6InitPageTools() {

	global_B_m2_sub6_page_tool_render_flag = true;
	global_B_m2_sub6_page_tool_obj = new Paging();
	global_B_m2_sub6_page_tool_obj.init({
		target: '#B-m2-sub6-page',
		pagesize: global_B_m2_sub6_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				Bm2Sub6getCompanyAdminListSever(page - 1);
			}
		}
	});
	$("#B-m2-sub6-page").hide();
}
//获取用户集团列表数据
exports.Bm2Sub1getCompanyListSever = function(page) {

	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.companyArr) {
		global_vue_B_m2_app.companyArr = null;
		global_vue_B_m2_app.companyArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { id: i, campanyName: "测试集团", money: 24, distributorName: "经销商啊", areaName: "chromww", createUser: "asdsad", createTime: "2017-01-22 15:19:34" };
		Vue.set(global_vue_B_m2_app.companyArr, i, us1);
	}
	*/
	var ss = { Code: 10103, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: 0, Page: page, PerPage: global_B_m2_sub1_page_tool_show_count };
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
				for(var i = 0; i < json.Teams.length; i++) {
					var us1 = {
						id: json.Teams[i].TeamId,
						campanyName: json.Teams[i].Name,
						money: json.Teams[i].Money,
						distributorName: json.Teams[i].DistributorName,
						areaName: json.Teams[i].AreaName,
						createUser: json.Teams[i].CreateUser,
						createTime: json.Teams[i].CreateTime,
						sync: json.Teams[i].Sync
					};
					Vue.set(global_vue_B_m2_app.companyArr, json.Teams[i].TeamId, us1);
				}
				Bm2Sub1GetAllTeamSysinfo();
				$("#B-m2-sub1-page").show();
				if(global_B_m2_sub1_page_tool_render_flag) {
					var pageSum = json.PageCount * global_B_m2_sub1_page_tool_show_count;
					global_B_m2_sub1_page_tool_obj.render({ count: pageSum });
					global_B_m2_sub1_page_tool_render_flag = false;
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

//打开所属集团下的用户列表
function Bm2Sub2SOpenUI(id) {
	global_B_m2_sub2_page_tool_render_flag = true;
	global_B_m2_sub2_select_gid = id;
	Bm2Sub2getCompanyUserListSever(0);
	$("#B-m2-sub1").hide();
	$("#B-m2-sub2").show();
	$("#B-m2-sub3").hide();
	$("#B-m2-sub7").hide();

}
//查看所属集团下的用户列表

function Bm2Sub2getCompanyUserListSever(page) {

	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.userListArr) {
		global_vue_B_m2_app.userListArr = null;
		global_vue_B_m2_app.userListArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { id: i, userLoginName: "usera", userName: "用户啊", heartTime: "24", openLocation: "是", createUser: "asdsad", createTime: "2017-01-22 15:19:34", overTime: "2017-01-22 15:19:34" };
		Vue.set(global_vue_B_m2_app.userListArr, i, us1);
	}
	*/
	var ss = { Code: 10104, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: global_B_m2_sub2_select_gid, Page: page, PerPage: global_B_m2_sub2_page_tool_show_count };
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
				for(var i = 0; i < json.Users.length; i++) {
					/*
					var isLoc = "否";
					if(json.Users[i].OpenLocation == "1") {
						isLoc = "是";
					} else {
						isLoc = "否";
					}
					*/
					var us1 = {
						id: json.Users[i].Uid,
						userLoginName: json.Users[i].LoginName,
						userName: json.Users[i].Name,
						mdn: json.Users[i].MDN,
						menuName: json.Users[i].MenuName,
						createUser: json.Users[i].CreateUser,
						createTime: json.Users[i].CreateTime,
						overTime: json.Users[i].OverTime,
						regionName: json.Users[i].RegionName,
						venderName: json.Users[i].VenderName,
					};
					Vue.set(global_vue_B_m2_app.userListArr, json.Users[i].Uid, us1);
				}
				$("#B-m2-sub2-page").show();
				if(global_B_m2_sub2_page_tool_render_flag) {
					var pageSum = json.PageCount * global_B_m2_sub2_page_tool_show_count;
					global_B_m2_sub2_page_tool_obj.render({ count: pageSum });
					global_B_m2_sub2_page_tool_render_flag = false;
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

//打开所属集团下的用户所属预定义组列表
function Bm2Sub4SOpenUI(id) {
	global_B_m2_sub4_page_tool_render_flag = true;
	global_B_m2_sub2_select_uid = id;
	Bm2Sub4getCompanyUserListSever(0);
	$("#B-m2-sub4").show();
	$("#B-m2-sub2").hide();

}
//查看所属集团下的用户所属预定义组列表

function Bm2Sub4getCompanyUserListSever(page) {

	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub4_userInGroupList) {
		global_vue_B_m2_app.sub4_userInGroupList = null;
		global_vue_B_m2_app.sub4_userInGroupList = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { id: i, sub4_groupName: "组组", sub4_priority: "中", sub4_nospeak: "是" };
		Vue.set(global_vue_B_m2_app.sub4_userInGroupList, i, us1);
	}
	*/
	var ss = {
		Code: 10204,
		SessionId: global_sessionID,
		ManagerId: global_managerID,
		Uid: global_B_m2_sub2_select_uid,
		Action: 0,
		Page: page,
		PerPage: global_B_m2_sub4_page_tool_show_count
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
				for(var i = 0; i < json.Groups.length; i++) {
					var isSpeak = "否";
					if(json.Groups[i].Speak == "1") {
						isSpeak = "是";
					} else {
						isSpeak = "否";
					}
					var us1 = { id: json.Groups[i].Gid, sub4_groupName: json.Groups[i].Name, sub4_priority: json.Groups[i].Priority, sub4_nospeak: isSpeak };
					Vue.set(global_vue_B_m2_app.sub4_userInGroupList, json.Groups[i].Gid, us1);
				}
				$("#B-m2-sub4-page").show();
				if(global_B_m2_sub4_page_tool_render_flag) {
					var pageSum = json.PageCount * global_B_m2_sub4_page_tool_show_count;
					global_B_m2_sub4_page_tool_obj.render({ count: pageSum });
					global_B_m2_sub4_page_tool_render_flag = false;
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
//用户加入预定义组返回集团下所有预定义组
function Bm2Sub4getCompanyGroupListSever() {
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub4AddGropuArr) {
		global_vue_B_m2_app.sub4AddGropuArr = null;
		global_vue_B_m2_app.sub4AddGropuArr = new Object();
	}
	//服务器返回成功数据后
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { gid: i, groupName: "预定义组" };
		Vue.set(global_vue_B_m2_app.sub4AddGropuArr, i, us1);
	}
	*/
	var ss = {
		Code: 10204,
		SessionId: global_sessionID,
		ManagerId: global_managerID,
		Uid: global_B_m2_sub2_select_uid,
		Action: 1
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
				for(var i = 0; i < json.Groups.length; i++) {
					var us1 = { gid: json.Groups[i].Gid, groupName: json.Groups[i].Name };
					Vue.set(global_vue_B_m2_app.sub4AddGropuArr, json.Groups[i].Gid, us1);
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
//用户加入预定义组保存
function Bm2Sub4userAddGroupSave() {
	var priority = global_vue_B_m2_app.sub4_userAddGroup_priority;
	var speak = global_vue_B_m2_app.sub4_userAddGroup_nospeak;
	var powerArr = [];
	$(".B-m2-sub4-addGroup-list-item-detail").each(function(index, item) {
		if($(item).is(':checked')) {
			powerArr.push({ Gid: $(item).attr("groupID") });

		}

	});
	var ss = { Code: 10306, SessionId: global_sessionID, ManagerId: global_managerID, Uid: global_B_m2_sub2_select_uid, Members: powerArr, Priority: priority, Speak: speak, Action: 1 };
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
				//服务器返回保存成功后，刷新用户预定义组列表
				global_B_m2_sub4_page_tool_render_flag = true;
				Bm2Sub4getCompanyUserListSever(0);
				globalFunTopBoxTipInfo("添加成功!");

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

//打开所属集团对应的预定义组列表
function Bm2Sub5SOpenUI(id) {
	global_B_m2_sub2_select_gid = id;
	global_B_m2_sub5_page_tool_render_flag = true;
	Bm2Sub5getCompanyGroupListSever(0);
	$("#B-m2-sub5").show();
	$("#B-m2-sub1").hide();

}
//查看所属集团对应的预定义组列表

function Bm2Sub5getCompanyGroupListSever(page) {

	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub5_groupArr) {
		global_vue_B_m2_app.sub5_groupArr = null;
		global_vue_B_m2_app.sub5_groupArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { id: i, groupName: "预定义组" };
		Vue.set(global_vue_B_m2_app.sub5_groupArr, i, us1);
	}
	*/
	var ss = { Code: 10105, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: global_B_m2_sub2_select_gid, Page: page, PerPage: global_B_m2_sub5_page_tool_show_count };
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
				for(var i = 0; i < json.Groups.length; i++) {
					/*
					var us1 = { id: json.Groups[i].Gid, groupName: json.Groups[i].Name };
					Vue.set(global_vue_B_m2_app.sub5_groupArr, json.Groups[i].Gid, us1);
					*/
					//上面写法vue默认会按照id自动升序
					var us1 = { keyID: i, id: json.Groups[i].Gid, groupName: json.Groups[i].Name };
					Vue.set(global_vue_B_m2_app.sub5_groupArr, i, us1);
				}
				$("#B-m2-sub5-page").show();
				if(global_B_m2_sub5_page_tool_render_flag) {
					var pageSum = json.PageCount * global_B_m2_sub5_page_tool_show_count;
					global_B_m2_sub5_page_tool_obj.render({ count: pageSum });
					global_B_m2_sub5_page_tool_render_flag = false;
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

//打开所属集团管理员列表
function Bm2Sub6SOpenUI(id) {
	global_B_m2_sub2_select_gid = id;
	global_B_m2_sub6_page_tool_render_flag = true;
	Bm2Sub5getCompanyAmdminListSever(0);
	$("#B-m2-sub6").show();
	$("#B-m2-sub1").hide();

}
//查看所属集团管理员列表

function Bm2Sub5getCompanyAmdminListSever(page) {

	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub6_adminArr) {
		global_vue_B_m2_app.sub6_adminArr = null;
		global_vue_B_m2_app.sub6_adminArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { id: i, loginName: "sad", identity: "运营商", relationUser: "张涛" };
		Vue.set(global_vue_B_m2_app.sub6_adminArr, i, us1);
	}
	*/
	var ss = { Code: 10307, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: global_B_m2_sub2_select_gid, Page: page, PerPage: global_B_m2_sub6_page_tool_show_count, Action: 0 };
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
				for(var i = 0; i < json.Members.length; i++) {
					var identityStr = "开发商"; //0=开发商,1=运营商,2=经销商,3=用户管理员，4=调度管理员
					if(json.Members[i].Identity == "0") {
						identityStr = "开发商";
					} else if(json.Members[i].Identity == "1") {
						identityStr = "运营商";
					} else if(json.Members[i].Identity == "2") {
						identityStr = "经销商";
					} else if(json.Members[i].Identity == "3") {
						identityStr = "用户管理员";
					} else if(json.Members[i].Identity == "4") {
						identityStr = "调度管理员";
					}
					var us1 = { id: json.Members[i].Uid, loginName: json.Members[i].loginName, identity: identityStr, relationUser: json.Members[i].RelationUser };
					Vue.set(global_vue_B_m2_app.sub6_adminArr, json.Members[i].Uid, us1);
				}
				$("#B-m2-sub6-page").show();
				if(global_B_m2_sub6_page_tool_render_flag) {
					var pageSum = json.PageCount * global_B_m2_sub6_page_tool_show_count;
					global_B_m2_sub6_page_tool_obj.render({ count: pageSum });
					global_B_m2_sub6_page_tool_render_flag = false;
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
//获取创建调度员时选择关联的用户列表
function Bm2Sub6GetUserList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub6_userArr) {
		global_vue_B_m2_app.sub6_userArr = null;
		global_vue_B_m2_app.sub6_userArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 5000; i++) {
		var us1 = { id: i, userName: "用户啊" };
		Vue.set(global_vue_B_m2_app.sub6_userArr, i, us1);
	}
	*/
	$(".B-m2-sub6-user-list .loading-gif").show();
	var ss = { Code: 10104, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: global_B_m2_sub2_select_gid };
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
				$(".B-m2-sub6-user-list .loading-gif").hide();
				for(var i = 0; i < json.Users.length; i++) {
					var us1 = { id: json.Users[i].Uid, userName: json.Users[i].Name };
					Vue.set(global_vue_B_m2_app.sub6_userArr, json.Users[i].Uid, us1);
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

//获取创建预定义组时集团的用户列表
function Bm2Sub5GetCreateGroupUserList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub5_group_userArr) {
		global_vue_B_m2_app.sub5_group_userArr = null;
		global_vue_B_m2_app.sub5_group_userArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 5000; i++) {
		var us1 = { id: i, userName: "用户啊" };
		Vue.set(global_vue_B_m2_app.sub5_group_userArr, i, us1);
	}
	*/
	$(".B-m2-sub5-group-user-list .loading-gif").show();
	var ss = { Code: 10104, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: global_B_m2_sub2_select_gid };
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
				$(".B-m2-sub5-group-user-list .loading-gif").hide();
				for(var i = 0; i < json.Users.length; i++) {
					var us1 = { id: json.Users[i].Uid, userName: json.Users[i].Name };
					Vue.set(global_vue_B_m2_app.sub5_group_userArr, json.Users[i].Uid, us1);
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

//获取编辑预定义组时组内的用户列表
function Bm2Sub5GetEditGroupUserList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub5_editGroup_userArr) {
		global_vue_B_m2_app.sub5_editGroup_userArr = null;
		global_vue_B_m2_app.sub5_editGroup_userArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 5000; i++) {
		var us1 = { id: i, userName: "用户啊" };
		Vue.set(global_vue_B_m2_app.sub5_editGroup_userArr, i, us1);
	}
	*/
	$(".B-m2-sub5-editGroup-user-list .loading-gif").show();
	var ss = { Code: 10305, SessionId: global_sessionID, ManagerId: global_managerID, Gid: global_B_m2_sub5_select_group_id, Action: 0 };
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
				$(".B-m2-sub5-editGroup-user-list .loading-gif").hide();
				for(var i = 0; i < json.Members.length; i++) {
					var us1 = { id: json.Members[i].Uid, userName: json.Members[i].Name, priority: json.Members[i].Priority, forbidSpeak: json.Members[i].ForbidSpeak };
					Vue.set(global_vue_B_m2_app.sub5_editGroup_userArr, json.Members[i].Uid, us1);
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
//获取编辑预定义组时非组内的用户列表
function Bm2Sub5GetAddGroupUserList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub5_addUserGroup_userArr) {
		global_vue_B_m2_app.sub5_addUserGroup_userArr = null;
		global_vue_B_m2_app.sub5_addUserGroup_userArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 5000; i++) {
		var us1 = { id: i, userName: "用户啊" };
		Vue.set(global_vue_B_m2_app.sub5_addUserGroup_userArr, i, us1);
	}
	*/
	$(".B-m2-sub5-addUserGroup-user-list .loading-gif").show();
	var ss = { Code: 10305, SessionId: global_sessionID, ManagerId: global_managerID, Gid: global_B_m2_sub5_select_group_id, Action: 1 };
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
				$(".B-m2-sub5-addUserGroup-user-list .loading-gif").hide();
				for(var i = 0; i < json.Members.length; i++) {
					var us1 = { id: json.Members[i].Uid, userName: json.Members[i].Name };
					Vue.set(global_vue_B_m2_app.sub5_addUserGroup_userArr, json.Members[i].Uid, us1);
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

//获取批量创建用户用错误列表
exports.Bm2Sub6GetCreateUserErrorList = function(userArr) {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_newUserArr) {
		global_vue_B_m2_app.sub7_newUserArr = null;
		global_vue_B_m2_app.sub7_newUserArr = new Object();
	}

	global_vue_B_m2_app.sub7_errorJson.splice(0);
	var excelHeader = { LoginName: "MEID", Name: "Name", Mdn: "Mdn" };
	global_vue_B_m2_app.sub7_errorJson.push(JSON.parse(JSON.stringify(excelHeader)));
	for(var i = 0; i < userArr.length; i++) {
		var us1 = { id: i, LoginName: userArr[i].LoginName, Name: userArr[i].Name, Mdn: userArr[i].Mdn, Reason: userArr[i].Reason };
		Vue.set(global_vue_B_m2_app.sub7_newUserArr, i, us1);
		var us2 = { LoginName: userArr[i].LoginName, Name: userArr[i].Name, Mdn: userArr[i].Mdn };
		global_vue_B_m2_app.sub7_errorJson.push(JSON.parse(JSON.stringify(us2)));
	}

}
//获取批量创建用户时套餐列表
function Bm2Sub6GetServerPackageList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_packageArr) {
		global_vue_B_m2_app.sub7_packageArr = null;
		global_vue_B_m2_app.sub7_packageArr = new Object();
	}
	//测试数据
	/*
		for(var i = 0; i < 9; i++) {
			var us1 = { id: i, type: i, name: "套餐名称", detail: "套餐详细介绍" };
			Vue.set(global_vue_B_m2_app.sub7_packageArr, i, us1);
		}
	*/
	var ss = { Code: 10309, SessionId: global_sessionID, ManagerId: global_managerID };
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
				for(var i = 0; i < json.Menus.length; i++) {
					var us1 = { id: i, type: json.Menus[i].Id, name: json.Menus[i].Title, detail: json.Menus[i].Detail };
					Vue.set(global_vue_B_m2_app.sub7_packageArr, i, us1);
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
	Bm2Sub7GetServerAreaList();
	Bm2Sub7GetServerVenderList();
}

function Bm2Sub7GetServerAreaList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_areaArr) {
		global_vue_B_m2_app.sub7_areaArr = null;
		global_vue_B_m2_app.sub7_areaArr = new Object();
	}
	//测试数据
	/*
		for(var i = 0; i < 9; i++) {
			var us1 = { Id: i, Name: "套餐名称" };
			Vue.set(global_vue_B_m2_app.sub7_areaArr, i, us1);
		}
	*/
	var ss = { Code: 10212, SessionId: global_sessionID, ManagerId: global_managerID };
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
				for(var i = 0; i < json.Regions.length; i++) {
					var us1 = { Id: json.Regions[i].Id, Name: json.Regions[i].Name };
					Vue.set(global_vue_B_m2_app.sub7_areaArr, json.Regions[i].Id, us1);
				}
				if(json.Regions.length > 0) {
					global_vue_B_m2_app.sub7_selectArea = json.Regions[0].Id;
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

function Bm2Sub7GetServerVenderList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub7_venderArr) {
		global_vue_B_m2_app.sub7_venderArr = null;
		global_vue_B_m2_app.sub7_venderArr = new Object();
	}
	//测试数据
	/*
		for(var i = 0; i < 9; i++) {
			var us1 = { Id: i, Name: "套餐名称" };
			Vue.set(global_vue_B_m2_app.sub7_venderArr, i, us1);
		}
	*/
	var ss = { Code: 10213, SessionId: global_sessionID, ManagerId: global_managerID };
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
				for(var i = 0; i < json.Venders.length; i++) {
					var us1 = { Id: json.Venders[i].Id, Name: json.Venders[i].Name };
					Vue.set(global_vue_B_m2_app.sub7_venderArr, json.Venders[i].Id, us1);
				}
				if(json.Venders.length > 0) {
					global_vue_B_m2_app.sub7_selectVender = json.Venders[0].Id;
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

function Bm2Sub2EditUserGetServerPackageList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub2_packageArr) {
		global_vue_B_m2_app.sub2_packageArr = null;
		global_vue_B_m2_app.sub2_packageArr = new Object();
	}
	//测试数据
	/*
		for(var i = 0; i < 9; i++) {
			var us1 = { id: i, type: i, name: "套餐名称", detail: "套餐详细介绍" };
			Vue.set(global_vue_B_m2_app.sub2_packageArr, i, us1);
		}
	*/
	var ss = { Code: 10309, SessionId: global_sessionID, ManagerId: global_managerID };
	$.ajax({
		type: "POST",
		url: "v1/station",
		dataType: "json",
		data: JSON.stringify(ss),
		beforeSend: function() {},
		success: function(json) {
			// console.log(json);
			if(json.Result == 2411) {
				globalFunUserLoginInvalid();
			} else if(json.Result == 2000) {

				//成功
				for(var i = 0; i < json.Menus.length; i++) {
					var us1 = { id: json.Menus[i].Id, type: json.Menus[i].Id, name: json.Menus[i].Title, detail: json.Menus[i].Detail };
					Vue.set(global_vue_B_m2_app.sub2_packageArr, json.Menus[i].Id, us1);

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

function Bm2Sub2UserGetContinueServerPackageList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub2_continue_packageArr) {
		global_vue_B_m2_app.sub2_continue_packageArr = null;
		global_vue_B_m2_app.sub2_continue_packageArr = new Object();
	}
	//测试数据
	/*
		for(var i = 0; i < 9; i++) {
			var us1 = { id: i, type: i, name: "套餐名称", detail: "套餐详细介绍" };
			Vue.set(global_vue_B_m2_app.sub2_continue_packageArr, i, us1);
		}
	*/
	var ss = { Code: 10309, SessionId: global_sessionID, ManagerId: global_managerID };
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
				for(var i = 0; i < json.Menus.length; i++) {
					var us1 = { id: i, type: json.Menus[i].Id, name: json.Menus[i].Title, detail: json.Menus[i].Detail };
					Vue.set(global_vue_B_m2_app.sub2_continue_packageArr, i, us1);
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

function Bm2Sub3GetServerPackageList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub3_packageArr) {
		global_vue_B_m2_app.sub3_packageArr = null;
		global_vue_B_m2_app.sub3_packageArr = new Object();
	}
	//测试数据
	/*
		for(var i = 0; i < 9; i++) {
			var us1 = { id: i, type: i, name: "套餐名称", detail: "套餐详细介绍" };
			Vue.set(global_vue_B_m2_app.sub3_packageArr, i, us1);
		}
	*/
	var ss = { Code: 10309, SessionId: global_sessionID, ManagerId: global_managerID };
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
				for(var i = 0; i < json.Menus.length; i++) {
					var us1 = { id: i, type: json.Menus[i].Id, name: json.Menus[i].Title, detail: json.Menus[i].Detail };
					Vue.set(global_vue_B_m2_app.sub3_packageArr, i, us1);
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
	Bm2Sub3GetServerAreaList();
	Bm2Sub3GetServerVenderList();
}

function Bm2Sub3GetServerAreaList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub3_areaArr) {
		global_vue_B_m2_app.sub3_areaArr = null;
		global_vue_B_m2_app.sub3_areaArr = new Object();
	}
	//测试数据
	/*
		for(var i = 0; i < 9; i++) {
			var us1 = { Id: i, Name: "套餐名称" };
			Vue.set(global_vue_B_m2_app.sub3_areaArr, i, us1);
		}
	*/
	var ss = { Code: 10212, SessionId: global_sessionID, ManagerId: global_managerID };
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
				for(var i = 0; i < json.Regions.length; i++) {
					var us1 = { Id: json.Regions[i].Id, Name: json.Regions[i].Name };
					Vue.set(global_vue_B_m2_app.sub3_areaArr, json.Regions[i].Id, us1);
				}
				if(json.Regions.length > 0) {
					global_vue_B_m2_app.sub3_selectArea = json.Regions[0].Id;
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

function Bm2Sub3GetServerVenderList() {
	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub3_venderArr) {
		global_vue_B_m2_app.sub3_venderArr = null;
		global_vue_B_m2_app.sub3_venderArr = new Object();
	}
	//测试数据
	/*
		for(var i = 0; i < 9; i++) {
			var us1 = { Id: i, Name: "套餐名称" };
			Vue.set(global_vue_B_m2_app.sub3_venderArr, i, us1);
		}
	*/
	var ss = { Code: 10213, SessionId: global_sessionID, ManagerId: global_managerID };
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
				for(var i = 0; i < json.Venders.length; i++) {
					var us1 = { Id: json.Venders[i].Id, Name: json.Venders[i].Name };
					Vue.set(global_vue_B_m2_app.sub3_venderArr, json.Venders[i].Id, us1);
				}
				if(json.Venders.length > 0) {
					global_vue_B_m2_app.sub3_selectVender = json.Venders[0].Id;
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
//获取集团同步信息
function Bm2Sub1GetAllTeamSysinfo() {
	var ss = { Code: 10107, SessionId: global_sessionID, ManagerId: global_managerID };
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
				var systemInfoStr = "";
				for(var i = 0; i < json.Name.length; i++) {
					systemInfoStr += json.Name[i].name;
					if(i != json.Name.length - 1) {
						systemInfoStr += ",";
					}
				}
				if(systemInfoStr.length > 0) {
					systemInfoStr += "需要同步";
					$(".system-info-box-info").html(systemInfoStr);
					$("#system-info-box").show();
				} else {
					$("#system-info-box").hide();
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

//警务站
//打开所属集团管理员列表
function Bm2Sub8SOpenUI(id) {
	global_B_m2_sub2_select_gid = id;
	global_B_m2_sub8_page_tool_render_flag = true;
	Bm2Sub8getCompanyWaringListSever(0);
	$("#B-m2-sub8").show();
	$("#B-m2-sub1").hide();

}
//查看所属集团管理员列表
function Bm2Sub8InitPageTools() {

	global_B_m2_sub8_page_tool_render_flag = true;
	global_B_m2_sub8_page_tool_obj = new Paging();
	global_B_m2_sub8_page_tool_obj.init({
		target: '#B-m2-sub8-page',
		pagesize: global_B_m2_sub8_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				Bm2Sub8getCompanyWaringListSever(page - 1);
			}
		}
	});
	$("#B-m2-sub8-page").hide();
}

function Bm2Sub8getCompanyWaringListSever(page) {

	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub8_waringArr) {
		global_vue_B_m2_app.sub8_waringArr = null;
		global_vue_B_m2_app.sub8_waringArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 20; i++) {
		var us1 = { ID: i, Name: "sad", GroupName: "sadas", Longitude: "145.23" ,Latitude:"23.323"};
		Vue.set(global_vue_B_m2_app.sub8_waringArr, i, us1);
	}
	*/

	var ss = {
		Code: 10312,
		SessionId: global_sessionID,
		ManagerId: global_managerID,
		TeamId: global_B_m2_sub2_select_gid,
		Page: page,
		PerPage: global_B_m2_sub8_page_tool_show_count
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
				for(var i = 0; i < json.Stations.length; i++) {

					var us1 = {
						Id: json.Stations[i].Id,
						Name: json.Stations[i].Name,
						GroupName: json.Stations[i].GroupName,
						Longitude: json.Stations[i].Longitude,
						Latitude: json.Stations[i].Latitude
					};
					Vue.set(global_vue_B_m2_app.sub8_waringArr, json.Stations[i].Id, us1);
				}
				$("#B-m2-sub8-page").show();
				if(global_B_m2_sub8_page_tool_render_flag) {
					var pageSum = json.PageCount * global_B_m2_sub8_page_tool_show_count;
					global_B_m2_sub8_page_tool_obj.render({ count: pageSum });
					global_B_m2_sub8_page_tool_render_flag = false;
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

//查看所属集团对应的预定义组列表(警务站)

function Bm2Sub8getCompanyGroupListSever() {

	//服务器返回成功数据后
	if(global_vue_B_m2_app && global_vue_B_m2_app.sub8_groupArr) {
		global_vue_B_m2_app.sub8_groupArr = null;
		global_vue_B_m2_app.sub8_groupArr = new Object();
	}
	var ss = { Code: 10105, SessionId: global_sessionID, ManagerId: global_managerID, TeamId: global_B_m2_sub2_select_gid };
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
				for(var i = 0; i < json.Groups.length; i++) {

					var us1 = { Id: json.Groups[i].Gid, Name: json.Groups[i].Name };
					Vue.set(global_vue_B_m2_app.sub8_groupArr, json.Groups[i].Gid, us1);

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

//显示一个用户在地图中的位置
function showOneUserPosInMap(showPos) {
	if(map == null) {
		return;
	}
	map.clearMap(); // 清除地图覆盖物

	var my_nowpos_markerobj = new AMap.Marker({
		icon: new AMap.Icon({
			size: new AMap.Size(19, 31), //图标大小
			image: "img/mainFrame/mark_r.png",
			imageOffset: new AMap.Pixel(0, 0),
			imageSize: new AMap.Size(19, 31)
		}),
		position: showPos
	});
	my_nowpos_markerobj.setMap(map);
	map.setCenter(showPos);
	map.setFitView();
}
