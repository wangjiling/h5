var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

exports.getProductInfo = function(req, res, renderFun){
    var params = {};
    params.uuid = req.params.uuid;
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    try {
        driverApi.getProductInfo(params, function(data){
            console.log('data: ' + JSON.stringify(data));
            var product = {};
            if((data && data.success == undefined) || (data && data.success && data.success == 'true')){
                product = data;
                renderFun(req,res, {
                    title: '商品详情',
                    product: product
                },'product_detail');
            }
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

exports.getProductInfoData = function(req, res, renderFun){
    var params = {};
    params.uuid = req.query.uuid;
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    try {
        driverApi.getProductInfo(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

exports.getRecommandListData = function(req, res, renderFun){
    var params = {};
    params.uuid = req.query.uuid;
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    try {
        driverApi.getRecommandList(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

exports.getCommentListData = function(req, res, renderFun){
    var params = {};
    params.uuid = req.body.uuid;
    params.limit = req.body.limit;
    params.type = req.body.type;
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    try {
        driverApi.getCommentList(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

exports.getDetailData = function(req, res, renderFun){
    var params = {};
    params.uuid = req.query.uuid;
    params.last_modified = req.query.last_modified;
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    try {
        driverApi.getDetailData(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

