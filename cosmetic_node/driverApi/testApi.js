var DriverApi = require('./index.js');
var setting = require('../configuration').setting;
var utils = require('../utils/index');
var globalAPIParams = setting['globalAPIParams'];
var globalAppKey = globalAPIParams['appKey'];
var globalAppVer = globalAPIParams['appVer'];
var globalToken = globalAPIParams['token'];

//下单接口
DriverApi.addOrder({
    token:globalToken,
    appKey:globalAppKey,
    appVer:globalAppVer,
    conding:'P0103529',
    product_uuid:'IJ45014z98',
    product_name:'SEKKISEI 雪肌精水敷容纸膜14粒装3包 5包 压缩面膜 正品保证',
    product_pic_urls:'http://img03.taobaocdn.com/bao/uploaded/i3/2203256980/TB2YG3XaFXXXXXuXpXXXXXXXXXX_!!2203256980.jpg',
    isRegular:'1',
    count:'2',
    sku_uuid:'j19lB5823R',
    sku_name:'1包',
    sku_type:'颜色分类',
    price:'28',
    total_price: 56,
    pay_point: 0,
    back_point:56,
    bat_uuid:utils.createNoncestr(16) + new Date().getTime(),
    user_label:'97901u1kAn',
    user_nick: '汪吉灵',
    payed: '0',
    post_fee: 10,
    receiver_name: '汪吉灵',
    receiver_state: '上海',
    receiver_city: '上海',
    receiver_district: '闵行',
    receiver_address: '兴迪大厦',
    receiver_mobile: '15216779471'
},function(returnData){
    console.log('addOrder: ' + JSON.stringify(returnData));
});

////微信登陆接口
//DriverApi.wxLogin({"weixin_id":"oT8GMjqTpFuZfmL9M28Su-6jtRBw","weixin_nick":"汪吉灵","weixin_pic":"http://wx.qlogo.cn/mmopen/9Qgaibq4OTBTYfRHiaIMOOibbwlLG9vjSxMOkYmuedn5sEeyNAUkObSWjFFSHqpq8PtjshrjicxThzMXdMFhsz64DcuKzMxjVNpib/0",appKey:globalAppKey,appVer:globalAppVer},function(returnData){
//     console.log('wxLogin:'+JSON.stringify(returnData));
//});

////修改微信用户信息接口
//DriverApi.setUserInfo({uuid: '97901u1kAn', "weixin_nick":"吉灵","weixin_pic":"http://wx.qlogo.cn/mmopen/9Qgaibq4OTBTYfRHiaIMOOibbwlLG9vjSxMOkYmuedn5sEeyNAUkObSWjFFSHqpq8PtjshrjicxThzMXdMFhsz64DcuKzMxjVNpib/0",appKey:globalAppKey,appVer:globalAppVer},function(returnData){
//     console.log('setUserInfo:'+JSON.stringify(returnData));
//});

////手机绑定接口
//DriverApi.bindPhone({uuid: '97901u1kAn', phone: '15216779471', appKey:globalAppKey,appVer:globalAppVer},function(returnData){
//     console.log('bindPhone:'+JSON.stringify(returnData));
//});

////商品列表接口
//DriverApi.getListProducts({brand_uuid: '16B3435E78',appKey:globalAppKey,appVer:globalAppVer},function(returnData){
////    console.log('getListProducts: '+JSON.stringify(returnData));
//});

////单个商品信息查询接口
//DriverApi.getProductInfo({uuid: 'IJ45014z98',appKey:globalAppKey,appVer:globalAppVer},function(returnData){
//    console.log('getProductInfo: ' + JSON.stringify(returnData));
//});
////商品详细-推荐商品接口
//DriverApi.getRecommandList({uuid: 'IJ45014z98', appKey:globalAppKey, appVer:globalAppVer},function(returnData){
//    console.log('getRecommandList: ' + JSON.stringify(returnData));
//});
////商品详细-商品评价接口
//DriverApi.getCommentList({uuid: 'IJ45014z98', limit: '10', type: '1', appKey:globalAppKey, appVer:globalAppVer},function(returnData){
//    // console.log('getCommentList: ' + JSON.stringify(returnData));
//});
////商品详细-商品图文详情获得接口
//DriverApi.getDetailData({uuid: 'IJ45014z98',last_modified: '0', appKey:globalAppKey, appVer:globalAppVer},function(returnData){
//    // console.log('getDetail: ' + JSON.stringify(returnData));
//});
////筛选器接口
//DriverApi.getFilter({ appKey:globalAppKey, appVer:globalAppVer},function(returnData){
//    // console.log('getFilter: ' + JSON.stringify(returnData));
//});
////美妆街-美妆旗舰店展示
//DriverApi.getBrandList({ appKey:globalAppKey, appVer:globalAppVer,update_time:'20140801',user_label:'userXXXX'},function(returnData){
//    // console.log('getBrandList: ' + JSON.stringify(returnData));
//});
////我的收藏-保存收藏
//DriverApi.addFavor({token:globalToken, appKey:globalAppKey, appVer:globalAppVer,type:'product',user_uuid:'44rPVH2uw1',uuids:'3Nx9550oI3'},function(returnData){
//   console.log('addFavor: ' + JSON.stringify(returnData));
//});
////我的收藏-查询我收藏的商品
// DriverApi.getFavorList({client_type:'anywhere', appKey:globalAppKey, appVer:globalAppVer,user_label:'userXXXX'},function(returnData){
//    console.log('getFavorList: ' + JSON.stringify(returnData));
// });
////专场秀
//DriverApi.getShows({appKey:globalAppKey, appVer:globalAppVer,update_time:'20140801',client_type:'anywhere'},function(returnData){
//    // console.log('getShows: ' + JSON.stringify(returnData));
//});
////广告商品
//DriverApi.getAdProducts({appKey:globalAppKey, appVer:globalAppVer,update_time:'20140801',client_type:'anywhere'},function(returnData){
//    // console.log('getAdProducts: ' + JSON.stringify(returnData));
//});
////版本查询接口
//DriverApi.getAppVersion({appKey:globalAppKey, appVer:globalAppVer,update_time:'20140801',client_type:'anywhere'},function(returnData){
//    // console.log('getAppVersion: ' + JSON.stringify(returnData));
//});
////我的收藏-查询我收藏的品牌
//DriverApi.getFavorBrandList({client_type:'anywhere', appKey:globalAppKey, appVer:globalAppVer,user_label:'userXXXX'},function(returnData){
//    // console.log('getFavorBrandList: ' + JSON.stringify(returnData));
//});
////商品详细-商品图文详情获得接口
//DriverApi.getDetial({appKey:globalAppKey, appVer:globalAppVer,uuid:'IJ45014z98',client_type:'anywhere'},function(returnData){
//    // console.log('getDetial: ' + JSON.stringify(returnData));
//});
////商品详细-商品SKU信息获得接口
//DriverApi.getSkuInfo({appKey:globalAppKey, appVer:globalAppVer,update_time:'20140801',client_type:'anywhere'},function(returnData){
//    // console.log('getSkuInfo: ' + JSON.stringify(returnData));
//});
////热门关键字接口
//DriverApi.getKeywordList({appKey:globalAppKey, appVer:globalAppVer,update_time:'20140801',client_type:'anywhere'},function(returnData){
//    // console.log('getKeywordList: ' + JSON.stringify(returnData));
//});
////用户预注册接口【隐私】【HTTPS】
//DriverApi.preReg({appKey:globalAppKey, appVer:globalAppVer,phone:'13699421383'},function(returnData){
//    // console.log('preReg: ' + JSON.stringify(returnData));
//});