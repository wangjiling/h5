var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

//购物车列表
exports.getCartList = function(req, res, renderFun){
    var params = {};
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.token = setting.globalAPIParams.token;
    params.user_label = "97901u1kAn";
    params.type = "product";
    try {
		driverApi.getFavorList(params,function(data){
			var cartList = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				cartList = data;
				renderFun(req,res,{
					title:'购物车列表',
					cartListData:cartList
				},'cart_list');
			}
		});
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};
