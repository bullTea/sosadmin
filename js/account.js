/*
 * 账户信息管理
 */
/*
$(function() {
	Dm1VueAppInit();
});
*/
exports.initAccountFun = function() {
	Dm1VueAppInit();
	Dm2VueAppInit();
	Dm2Sub1InitPageTools();
}

function Dm1VueAppInit() {
	global_vue_D_m1_app = new Vue({
		el: '#D-m1',
		data: {
			accountArr: {}
		},
		methods: {

		}
	});
}

function Dm2VueAppInit() {
	global_vue_D_m2_app = new Vue({
		el: '#D-m2',
		data: {
			transactionMoneyArr: {},
			selectSearchType: "-1",
			search_start_tm: "",
			search_end_tm: ""

		},
		methods: {
			serachFun: function() {
				global_D_m2_sub1_page_tool_render_flag = true;
				var startTm = this.search_start_tm;
				startTm = startTm.replace("T", " ");
				var endTm = this.search_end_tm;
				endTm = endTm.replace("T", " ");
				var startTmData = new Date(startTm);
				startTm = (startTmData.getTime() / 1000).toString();
				var endTmData = new Date(endTm);
				endTm = (endTmData.getTime() / 1000).toString();
				if(startTm == "NaN") {
					startTm = "";
				}
				if(endTm == "NaN") {
					endTm = "";
				}
				var type = this.selectSearchType;
				var tool = require('./account.js');
				tool.Dm2Sub1getTransactionListSever(0, type, startTm, endTm);
			}
		}
	});
}

exports.Dm1Sub1getAccountListSever = function() {

	//服务器返回成功数据后
	if(global_vue_D_m1_app && global_vue_D_m1_app.accountArr) {
		global_vue_D_m1_app.accountArr = null;
		global_vue_D_m1_app.accountArr = new Object();
	}

	//测试数据
	/*
	var us1 = { id: 0, name: "张三", money: "13", updateTime: "2017-01-22 20:35:04", createTime: "2017-01-22 14:16:41" };
	Vue.set(global_vue_D_m1_app.accountArr, 0, us1);
	*/
	var ss = { Code: 10004, SessionId: global_sessionID, ManagerId: global_managerID, Action: 0 };
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
				var us1 = {
					id: json.Operators[0].Id,
					name: json.Operators[0].Name,
					money: json.Operators[0].Coupons,
					updateTime: json.Operators[0].UpdateTime,
					createTime: json.Operators[0].CreateTime
				};
				Vue.set(global_vue_D_m1_app.accountArr, 0, us1);

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

//初始化分页插件
function Dm2Sub1InitPageTools() {

	global_D_m2_sub1_page_tool_render_flag = true;
	global_D_m2_sub1_page_tool_obj = new Paging();
	global_D_m2_sub1_page_tool_obj.init({
		target: '#D-m2-sub1-page',
		pagesize: global_D_m2_sub1_page_tool_show_count,
		count: 0,
		callback: function(page, size, count) {
			//alert('当前第 ' + page + '页,每页 ' + size + '条,总页数：' + count + '页');
			if(page > 0) {
				var startTm = global_vue_D_m2_app.search_start_tm;
				startTm = startTm.replace("T", " ");
				var endTm = global_vue_D_m2_app.search_end_tm;
				endTm = endTm.replace("T", " ");
				var startTmData = new Date(startTm);
				startTm = (startTmData.getTime() / 1000).toString();
				var endTmData = new Date(endTm);
				endTm = (endTmData.getTime() / 1000).toString();
				if(startTm == "NaN") {
					startTm = "";
				}
				if(endTm == "NaN") {
					endTm = "";
				}
				var type = this.selectSearchType;
				var tool = require('./account.js');
				tool.Dm2Sub1getTransactionListSever(page-1, type, startTm, endTm);
			}
		}
	});
	$("#D-m2-sub1-page").hide();
}
//获取交易记录列表数据
exports.Dm2Sub1getTransactionListSever = function(page, type, startTm, endTm) {

	//服务器返回成功数据后
	if(global_vue_D_m2_app && global_vue_D_m2_app.transactionMoneyArr) {
		global_vue_D_m2_app.transactionMoneyArr = null;
		global_vue_D_m2_app.transactionMoneyArr = new Object();
	}
	//测试数据
	/*
	for(var i = 0; i < 35; i++) {
		var us1 = {
			id: i,
			SrcName: "经销商1",
			ManagerName: "张三",
			DstName: "李四",
			DstIdType: "运营商",
			Transtime: "2017-03-01 02:17:26",
			CurrEndtime:"2017-03-01 02:17:26",
			Pricesum:"24",
			TransType:"转账"
		};
		Vue.set(global_vue_D_m2_app.transactionMoneyArr, i, us1);
	}
   */
	var ss = {
		Code: 10311,
		SessionId: global_sessionID,
		ManagerId: global_managerID,
		Type: type,
		Page: page,
		PerPage: global_D_m2_sub1_page_tool_show_count,
		StartTime: startTm,
		EndTime: endTm
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
				for(var i = 0; i < json.Records.length; i++) {
					var us1 = {
						id: i,
						SrcName: json.Records[i].SrcName,
						ManagerName: json.Records[i].ManagerName,
						DstName: json.Records[i].DstName,
						DstIdType: json.Records[i].DstIdType,
						Transtime: json.Records[i].Transtime,
						CurrEndtime: json.Records[i].CurrEndtime,
						Pricesum: json.Records[i].Pricesum,
						TransType: json.Records[i].TransType
					};
					Vue.set(global_vue_D_m2_app.transactionMoneyArr, i, us1);
				}
				$("#D-m2-sub1-page").show();
				if(global_D_m2_sub1_page_tool_render_flag) {
					var pageSum = json.PageCount * global_D_m2_sub1_page_tool_show_count;
					global_D_m2_sub1_page_tool_obj.render({ count: pageSum });
					global_D_m2_sub1_page_tool_render_flag = false;
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