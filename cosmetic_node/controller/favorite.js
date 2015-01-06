var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

//收藏页列表
exports.getFavoriteList = function(req, res, renderFun){
    var params = {};
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.token = setting.globalAPIParams.token;
    params.user_label = "97901u1kAn";
    params.type = "product";
    try {
		driverApi.getFavorList(params,function(data){
			var favorList = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				favorList = data;
				renderFun(req,res,{
					title:'收藏列表',
					favorListData:favorList
				},'favor_list');
			}
		});
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};
//添加收藏
exports.addFavor = function(req, res, renderFun){
    var params = {};
    params.token = setting.globalAPIParams.token;
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.type = "product";
    if(req.session.userInfo){
        params.user_uuid = req.session.userInfo.uuid;
    }else{
        params.user_uuid = "97901u1kAn";
    }
    params.uuids = req.params.uuid || "IJ45014z98";
    try {
        driverApi.addFavor(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};
//取消收藏
exports.delFavor = function(req, res, renderFun){
    var params = {};
    params.token = setting.globalAPIParams.token;
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.type = "product";
    params.user_uuid = "44rPVH2uw1";
    params.uuids = req.params.uuid || "3Nx9550oI3";
    try {
        driverApi.delFavor(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};