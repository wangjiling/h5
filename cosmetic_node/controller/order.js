var driverApi = require('../driverApi');
var setting = require('../configuration').setting;
var Driver = require('../driver/index');
var utils = require('../utils/index');

exports.addOrder = function(req, res, renderFun){
    var params = {
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
    };
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.token = setting.globalAPIParams.token;

    try {
        driverApi.addOrder(params, function(orderData){
            console.log('orderData' + JSON.stringify(orderData));
            if((orderData && orderData.success == undefined) || (orderData && orderData.success && orderData.success == true)){
                console.log('out_trade_no: ' + orderData.order_no);
                var unifiedOrderUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
                var unifiedOrderParams = {};
                unifiedOrderParams.appid = setting.wxParams.appId;
                unifiedOrderParams.body = '贡献一分钱';
                unifiedOrderParams.mch_id = setting.wxParams.mchid;
                unifiedOrderParams.nonce_str = utils.createNoncestr(32);
                unifiedOrderParams.notify_url = setting.wxParams.notify_url;
                unifiedOrderParams.openid = req.session.userInfo.openid;
                unifiedOrderParams.out_trade_no = orderData.order_no;//商户系统内部的订单号,32个字符内、可包含字母,确保在商户系统唯一
                console.log('client ip : ' + utils.getClientIp(req));
                unifiedOrderParams.spbill_create_ip = utils.getClientIp(req);
                unifiedOrderParams.total_fee = 1;
                unifiedOrderParams.trade_type = 'JSAPI';
                unifiedOrderParams.sign = utils.getSign(unifiedOrderParams);

                var unifiedOrderXmlParams = utils.jsonToXml(unifiedOrderParams);

                Driver.queryByPostXml(unifiedOrderUrl, unifiedOrderXmlParams, function(unifiedOrderData){
                    console.log('unifiedOrderData : ' + JSON.stringify(unifiedOrderData));
                    if(unifiedOrderData.xml.return_code[0] == 'SUCCESS' && unifiedOrderData.xml.result_code[0] == 'SUCCESS'){
                        var jsApiParameters = {};
                        jsApiParameters.appId = setting.wxParams.appId;
                        jsApiParameters.nonceStr = utils.createNoncestr(32);
                        jsApiParameters.package = 'prepay_id=' + unifiedOrderData.xml.prepay_id[0];
                        console.log('prepay_id: ' + unifiedOrderData.xml.prepay_id[0]);
                        jsApiParameters.signType = 'MD5';
                        jsApiParameters.timeStamp = parseInt(new Date().getTime()/1000).toString();
                        jsApiParameters.paySign = utils.getSign(jsApiParameters);
                        console.log('jsApiParameters: ' + JSON.stringify(jsApiParameters));
                        renderFun(req,res,{
                            success:'true',
                            jsApiParameters: jsApiParameters});
                    }
                });
            }else{
                renderFun(req,res,{success:'false'});
            }
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

