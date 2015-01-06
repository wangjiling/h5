var driverApi = require('../driverApi');
var setting = require('../configuration').setting;
// 品牌街
exports.getBrandList = function(req,res,renderFun){
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.update_time = '20141201';
	params.user_label = 'userXXXX';
	try{
		driverApi.getBrandList(params,function(data){
			var brandList = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				brandList = data;
				renderFun(req,res,{
					title:'品牌街',
					brandListData:brandList
				},'home_brand_street');
			}
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	}
};
// 品牌列表
exports.getBrandDetail = function(req,res,renderFun){
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.brand_uuid = req.query.brand_uuid;
	params.page = 2;
	console.log('========>'+params.brand_uuid);
	try{
		driverApi.getListProducts(params,function(data){
			var brandDetail = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				brandDetail = data;
				renderFun(req,res,{
					title:'品牌列表',
					brandDetailData:brandDetail
				},'brand_list');
			}
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	}
};
// 积分兑换
exports.getGiftList = function(req,res,renderFun){
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.scat_uuid = 'activity04';
	params.show_point = 'true';
	params.show_gift = 'true';
	try{
		driverApi.getListProducts(params,function(data){
			var giftList = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				giftList = data;
				renderFun(req,res,{
					title:'积分兑换',
					giftListData:giftList
				},'home_gift_exchange');
			}
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	}
};
// 新品首发
exports.getNewList = function(req,res,renderFun){
	console.log('====>init getNewList');
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.scat_uuid = "activity03";
	params.show_memo = "true";
	console.log('========>INIT TRY');
	try{
		driverApi.getListProducts(params,function(data){
			var newList = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				newList = data;
				console.log("=====>TO RENDER");
				renderFun(req,res,{
					title:'新品首发',
					newListData:newList
				},'home_new_products');
			}
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	}
};
// 热销榜 
// banner
exports.getHotSalesBanner = function(req,res,renderFun){
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.scat_uuid = "activity02";
	params.show_ad_pic = "true";
	try{
		driverApi.getListProducts(params,function(data){
			var hotSales = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				hotSales = data;
				renderFun(req,res,{
					title:'热销榜',
					hotSalesData:hotSales
				},'home_hot_sales');
			}
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	}
};
//首页热销榜data
exports.getHotSalesData = function(req, res, renderFun){
    var params = {};
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.scat_uuid = req.params.scat_uuid;
    try {
        driverApi.getListProducts(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};