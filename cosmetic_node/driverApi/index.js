var Driver = require('../driver/index.js');
var host_port = require('../configuration').setting.globalAPIParams.host_port;
var https_host_port = require('../configuration').setting.globalAPIParams.https_host_port;
var path = require('../configuration').setting.globalAPIParams.path;
var path_h5 = require('../configuration').setting.globalAPIParams.path_h5;

//微信登陆接口
var wxLogin = exports.wxLogin = function(params, callback){
    Driver.queryByPost(host_port+path_h5+'/login.ss', params, callback);
};

//修改微信用户信息接口
var setUserInfo = exports.setUserInfo = function(params, callback){
    Driver.queryByPost(host_port+path+'/setUserInfo.ss', params, callback);
};

//手机绑定接口
var bindPhone = exports.bindPhone = function(params, callback){
    Driver.queryByPost(host_port+path_h5+'/bindPhone.ss', params, callback);
};

//商品列表查询接口					
var getListProducts = exports.getListProducts = function(params, callback){
    Driver.queryDataByGet(host_port+path+'/listProducts.ss', params, callback);
};

//单个商品信息查询接口
var getProductInfo = exports.getProductInfo = function(params, callback){
    Driver.queryDataByGet(host_port+path+'/getProductInfo.ss', params, callback);
};

//商品详细-推荐商品接口
var getRecommandList = exports.getRecommandList = function(params, callback){
    Driver.queryDataByGet(host_port+path+'/getRecommandList.ss', params, callback);
};

//商品详细-商品评价接口
var getCommentList = exports.getCommentList = function(params, callback){
    Driver.queryDataByPost(host_port+path+'/getCommentList.ss', params, callback);
};

//商品详细-商品图文详情获得接口
var getDetailData = exports.getDetailData = function(params, callback){
    Driver.queryDataByGet(host_port+path+'/getDetial.ss', params, callback);
};
//筛选器接口
var getFilter = exports.getFilter = function(params, callback){
    Driver.queryByPost(host_port+path+'/getFilter.ss', params, callback);
};
//美妆街-美妆旗舰店展示
var getBrandList = exports.getBrandList = function(params, callback){
    Driver.queryByPost(host_port+path+'/getBrandList.ss', params, callback);
};
//我的收藏-保存收藏
var addFavor = exports.addFavor = function(params, callback){
    Driver.queryByPost(https_host_port+path+'/addFavor.ss', params, callback);
};
//我的收藏-取消收藏
var delFavor = exports.delFavor = function(params, callback){
    Driver.queryByPost(https_host_port+path+'/delFavor.ss', params, callback);
};
//我的收藏-查询我收藏的商品
var getFavorList = exports.getFavorList = function(params, callback){
    Driver.queryByPost(host_port+path+'/getFavorList.ss', params, callback);
};
//专场秀
var getShows = exports.getShows = function(params, callback){
    Driver.queryByPost(host_port+path+'/getShows.ss', params, callback);
};
//广告商品
var getAdProducts = exports.getAdProducts = function(params, callback){
    Driver.queryByPost(host_port+path+'/getAdProducts.ss', params, callback);
};
//版本查询接口
var getAppVersion = exports.getAppVersion = function(params, callback){
    Driver.queryByPost(host_port+path+'/getAppVersion.ss', params, callback);
};
//我的收藏-查询我收藏的品牌
var getFavorBrandList = exports.getFavorBrandList = function(params, callback){
    Driver.queryByPost(https_host_port+path+'/getFavorBrandList.ss', params, callback);
};
//商品详细-商品图文详情获得接口
var getDetial = exports.getDetial = function(params, callback){
    Driver.queryByPost(host_port+path+'/getDetial.ss', params, callback);
};
//商品详细-商品SKU信息获得接口
var getSkuInfo = exports.getSkuInfo = function(params, callback){
    Driver.queryByPost(host_port+path+'/getSkuInfo.ss', params, callback);
};
//热门关键字接口
var getKeywordList = exports.getKeywordList = function(params, callback){
    Driver.queryByPost(host_port+path+'/getKeywordList.ss', params, callback);
};
//用户预注册接口【隐私】【HTTPS】
var preReg = exports.preReg = function(params, callback){
    Driver.queryByPost(host_port+path+'/preReg.ss', params, callback);
};
//用户完成注册接口【隐私】【HTTPS】
var doneReg = exports.doneReg = function(params, callback){
    Driver.queryByPost(host_port+path+'/doneReg.ss', params, callback);
};

//下单接口
var addOrder = exports.addOrder = function(params, callback){
    Driver.queryByPost(https_host_port+path_h5+'/order.ss', params, callback);
};