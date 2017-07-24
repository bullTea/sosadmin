/*
 * 全局
 */

/*全局变量定义区start*/
var map=null;//高德地图
/*经销商界面相关start*/
var global_vue_A_m1_app = null; //初始化新建经销商vueApp
var global_vue_A_m2_app = null; //初始化查看下级经销商vueApp
var global_page_tools_render_flag = true; //是否重新渲染分页组件(查看经销商列表)
var global_A_m1_page_tool_show_count = 20; //查看经销商列表page显示条数
var global_A_m1_page_tool_obj = null; //查看经销商列表page插件
var global_A_m2_select_uid = 0; //选中的经销商id
var global_A_m2_page_tool_show_count = 20; //查看经销商下管理员列表page显示条数
var global_A_m2_page_tool_obj = null; //查看经销商下管理员列表page插件
var global_A_m2_page_tool_render_flag = true; //是否重新渲染分页组件(查看经销商列表下管理员)
/*经销商界面相关end*/

/*集团管理界面相关start*/
var global_vue_B_m1_app = null; //初始化新建集团vueApp
var global_vue_B_m2_app = null; //初始化用户集团集团vueApp
var global_B_m2_sub1_page_tool_render_flag = true; //是否重新渲染分页组件(查看用户集团列表)
var global_B_m2_sub1_page_tool_obj = null; //查看用户集团列表page插件
var global_B_m2_sub1_page_tool_show_count = 20; //查看用户集团列表page显示条数
var global_B_m2_sub2_select_gid = 0; //选中的集团id
var global_B_m2_sub2_page_tool_render_flag = true; //是否重新渲染分页组件(查看所属集团下的用户列表)
var global_B_m2_sub2_page_tool_obj = null; //查看所属集团下的用户列表page插件
var global_B_m2_sub2_page_tool_show_count = 20; //查看所属集团下的用户列表page显示条数
var global_B_m2_sub2_select_uid = 0; //选中的集团下的用户id
var global_B_m2_sub4_page_tool_render_flag = true; //是否重新渲染分页组件(查看所属集团下的用户所属预定义组列表)
var global_B_m2_sub4_page_tool_obj = null; //查看所属集团下的用户所属预定义组列表page插件
var global_B_m2_sub4_page_tool_show_count = 20; //查看所属属集团下的用户所属预定义组列表page显示条数

var global_B_m2_sub5_page_tool_render_flag = true; //是否重新渲染分页组件(查看所属集团对应的预定义组列表)
var global_B_m2_sub5_page_tool_obj = null; //查看所属集团对应的预定义组列表page插件
var global_B_m2_sub5_page_tool_show_count = 20; //查看所属集团对应的预定义组列表page显示条数
var global_B_m2_sub5_select_group_id = 0; //集团下选择的预定义组ID
var global_B_m2_sub5_select_group_keyid = 0; //集团下选择的预定义组keyID

var global_B_m2_sub6_page_tool_render_flag = true; //是否重新渲染分页组件(查看所属集团管理员列表)
var global_B_m2_sub6_page_tool_obj = null; //查看所属集团管理员列表page插件
var global_B_m2_sub6_page_tool_show_count = 20; //查看所属集团管理员列表page显示条数

var global_B_m2_sub8_page_tool_render_flag = true; //是否重新渲染分页组件(查看所属集团警务站列表)
var global_B_m2_sub8_page_tool_obj = null; //查看所属集团警务站列表page插件
var global_B_m2_sub8_page_tool_show_count = 20; //查看所属集团警务站列表page显示条数

/*集团管理界面相关end*/

/*管理员管理start*/
var global_vue_C_m1_app = null; //初始化管理员管理vueApp
var global_C_m1_sub1_page_tool_render_flag = true; //是否重新渲染分页组件(管理员模块列表)
var global_C_m1_sub1_page_tool_obj = null; //查看管理员模块列表page插件
var global_C_m1_sub1_page_tool_show_count = 20; //查看管理员模块列表page显示条数
/*管理员管理end*/

/*账户信息管理start*/
var global_vue_D_m1_app = null; //初始化账户信息管理vueApp
var global_vue_D_m2_app = null; //初始化交易记录vueApp
var global_D_m2_sub1_page_tool_render_flag = true; //是否重新渲染分页组件(交易记录模块列表)
var global_D_m2_sub1_page_tool_obj = null; //查看交易记录模块列表page插件
var global_D_m2_sub1_page_tool_show_count = 20; //查看交易记录模块列表page显示条数
/*账户信息管理end*/

//弹出框提示信息，无回调函数
function globalFunTopBoxTipInfo(txt) {
	SimplePop.alert(txt, {
		callback: function() {

		}
	});
}
//用户信息失效，重新登录
function globalFunUserLoginInvalid() {
	SimplePop.alert("您的用户信息在本网站已经失效，请退出重新登录!", {
		callback: function() {
			delCookie();
			window.location.assign("login.html");
		}
	});

}

//GPS坐标转为高德坐标
var TO_GLNG = function(lng, lat) {
	var wgs84togcj02 = coordtransform.wgs84togcj02(lng, lat);
	return wgs84togcj02[0];
}; //return lng - 0.0065;
var TO_GLAT = function(lng, lat) {
	var wgs84togcj02 = coordtransform.wgs84togcj02(lng, lat);
	return wgs84togcj02[1];
}; //return lat - 0.0060;