var express = require('express');
var router = express.Router();
var productController = require('../controller/product');
var weixinController = require('../controller/weixin');
var homeController = require('../controller/home');
var favoriteController = require('../controller/favorite');
var cartController = require('../controller/cart');
var orderController = require('../controller/order');

/* oauth */
router.get('/oauth', function(req, res) {
    res.render('oauth', { title: '美妆优选', scope:'snsapi_base'});
});

/* 微信共享地址. */
router.get('/addr', function(req, res) {
    res.render('addr', { ts:req.session.userInfo.access_token });
});

/* GET default index page. */
router.get('/', function(req, res) {
    homeController.getHotSalesBanner(req,res,renderView);
});

/* 首页. */
router.get('/home/:name?/:index?', function(req, res) {
    console.log("=====>"+req.params.name);
    switch(req.params.name){
        case "gift_exchange":
            homeController.getGiftList(req,res,renderView);
            break;
        case "brand_street":
            homeController.getBrandList(req,res,renderView);
            break;
        case "new_products":
            homeController.getNewList(req,res,renderView);
            break;
        case "hot_sales":
        default:
            homeController.getHotSalesBanner(req,res,renderView);
    }
});

// 首页热销榜JSON 四个类别 scat_uuid=activity05/6/7/8
router.get('/ajax/getHotSales/:scat_uuid',function(req,res){
    homeController.getHotSalesData(req,res,renderJson);
});
/* 品牌列表. */
router.get('/brand/list', function(req, res) {
    homeController.getBrandDetail(req,res,renderView);
});
// 收藏列表页
router.get('/user/favor', function(req, res) {
    favoriteController.getFavoriteList(req,res,renderView);
});
// 购物车列表
router.get('/user/cart', function(req, res) {
    cartController.getCartList(req,res,renderView);
});
// 添加收藏
router.get('/ajax/addFavor/:uuid', function(req, res) {
    favoriteController.addFavor(req,res,renderJson);
});
// 取消收藏
router.get('/ajax/delFavor/:uuid', function(req, res) {
    favoriteController.delFavor(req,res,renderJson);
});
/* GET users listing. */
router.get('/users', function(req, res) {
    res.send('respond with a resource');
});

/* oauth weixin user */
router.get('/weixin/oauth/:scope', function(req, res) {
    console.log('scope : ' + req.params.scope);
    if(req.params.scope == 'snsapi_base'){
        weixinController.oauthBase(req, res, renderView);
    }else{
        weixinController.oauthUserInfo(req, res, renderView);
    }
});

/* order confirm */
router.get('/order/confirm', function(req, res) {
    weixinController.orderConfirm(req, res, renderView);
});

/* weixin notify */
router.post('/weixin/notify', function(req, res) {
    weixinController.notify(req, res, renderJson);
});

/* GET product info page. */
router.get('/product/detail/:uuid', function(req, res) {
    res.render('product_detail', { title: '商品详情', uuid: req.params.uuid});
//    productController.getProductInfo(req, res, renderView);
});

/* GET product info data. */
router.get('/ajax/getProductInfo', function(req, res) {
    productController.getProductInfoData(req, res, renderJson);
});

/* GET product recommands data. */
router.get('/ajax/getRecommandList', function(req, res) {
    productController.getRecommandListData(req, res, renderJson);
});

/* GET product commends data. */
router.post('/ajax/getCommentList', function(req, res) {
    productController.getCommentListData(req, res, renderJson);
});

/* GET product detail data. */
router.get('/ajax/getDetial', function(req, res) {
    productController.getDetailData(req, res, renderJson);
});

//Order
/* Add order. */
router.post('/ajax/addOrder', function(req, res) {
    orderController.addOrder(req, res, renderJson);
});

/**
 * Render the view and append some common values.
 * @type {Function}
 */
var renderView = exports.renderView = function(req, res, module, view){
//    module.contextPath = setting.contextPath;
//    module.appRoot = __appdir
//    module.keywords = utils.whenUndefined(req.session.keywords, function(value){return '';})
//    module.utils = utils;
//    module.session = req.session;
//    module.cartNumber = 0;
//    module.totalMoney = 0;
//    module.loginNumber = 0;
//    if (req.session.userInfo) {
//        module.userName = req.session.userInfo.userName ? req.session.userInfo.userName : "";
//        module.cartNumber = req.session.userInfo.cartNumber ? req.session.userInfo.cartNumber : 0;
//        module.totalMoney = req.session.userInfo.totalMoney ? req.session.userInfo.totalMoney : 0;
//        module.loginNumber = req.session.userInfo.loginNumber ? req.session.userInfo.loginNumber : 0;
//    }
    res.render(view, module);
};

var renderJson = exports.renderJson = function(req, res, module){
    res.writeHead(200, {"Content-Type": 'text/plain; charset=utf-8'});
    res.end(JSON.stringify(module));
};

module.exports = router;
