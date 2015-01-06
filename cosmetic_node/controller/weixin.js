var Driver = require('../driver/index');
var driverApi = require('../driverApi');
var setting = require('../configuration').setting;
var utils = require('../utils/index');

exports.oauthBase = function(req, res, renderFun){
    var state = req.query.state;
    var redirect_url = '/home';
    if(req.session.globalParams){
        redirect_url = req.session.globalParams.redirect_url;
    }
    console.log('oauthBase redirect_url : ' + redirect_url);

    var token_params = {};
    console.log('oauthBase code : '+ req.query.code);
    token_params.code = req.query.code;
    token_params.appid = setting.wxParams.appId;
    token_params.secret = setting.wxParams.appSecret;
    token_params.grant_type = 'authorization_code';
    try{
        Driver.queryByPost('https://api.weixin.qq.com/sns/oauth2/access_token', token_params, function(tokenData){
            console.log('oauthBase tokenData : ' + JSON.stringify(tokenData));
            var user_params = {};
            user_params.access_token = tokenData.access_token;
            console.log('oauthBase access_token: ' + tokenData.access_token);
            user_params.openid = tokenData.openid;
            req.session.userInfo = {};
            req.session.userInfo.openid = tokenData.openid;

            var wxLoginParams = {};
            wxLoginParams.weixin_id = tokenData.openid;
            wxLoginParams.weixin_nick = '';
            wxLoginParams.weixin_pic = '';
            wxLoginParams.appKey = setting.globalAPIParams.appKey;
            wxLoginParams.appVer = setting.globalAPIParams.appVer;
            console.log('oauthBase wxLoginParams : ' + JSON.stringify(wxLoginParams));
            driverApi.wxLogin(wxLoginParams, function(wxLoginData){
                console.log('oauthBase wxLoginData: ' + JSON.stringify(wxLoginData));
                if((wxLoginData && wxLoginData.success == undefined) || (wxLoginData && wxLoginData.success && wxLoginData.success == 'true')){
                    //save userInfo to session
                    req.session.userInfo.uuid = wxLoginData.uuid;
                    req.session.userInfo.openid = wxLoginData.weixin_id;
                    req.session.userInfo.phone = wxLoginData.phone;
                    req.session.userInfo.point = wxLoginData.point;
                    if(wxLoginData.weixin_nick && wxLoginData.weixin_pic){
                        req.session.userInfo.weixin_nick = wxLoginData.weixin_nick;
                        req.session.userInfo.weixin_pic = wxLoginData.weixin_pic;
                        res.redirect(redirect_url);
                    }else{
                        req.session.userInfo.weixin_nick = '';
                        req.session.userInfo.weixin_pic = '';
                        renderFun(req,res, {
                            title: '美妆优选',
                            scope:'snsapi_userinfo'
                        }, 'oauth');
                    }
                }
            });
        });
    }catch(err){
        console.log("error : " + JSON.stringify(err));
    }
};

exports.oauthUserInfo = function(req, res, renderFun){
    var state = req.query.state;
    var redirect_url = '/home';
    if(req.session.globalParams){
        redirect_url = req.session.globalParams.redirect_url;
    }
    console.log('oauthUserInfo redirect_url : ' + redirect_url);

    var token_params = {};
    console.log('oauthUserInfo code : '+ req.query.code);
    if(!req.query.code){
        res.redirect(redirect_url);
    }else{
        token_params.code = req.query.code;
        token_params.appid = setting.wxParams.appId;
        token_params.secret = setting.wxParams.appSecret;
        token_params.grant_type = 'authorization_code';
        try{
            Driver.queryByPost('https://api.weixin.qq.com/sns/oauth2/access_token', token_params, function(tokenData){
                var user_params = {};
                user_params.access_token = tokenData.access_token;
                console.log('oauthUserInfo access_token: ' + tokenData.access_token);
                user_params.openid = tokenData.openid;
                Driver.queryByPost('https://api.weixin.qq.com/sns/userinfo', user_params, function(userData){
                    var userInfo = {};
                    if(!userData.errmsg){
                        var setUserInfoParams = {};
                        setUserInfoParams.uuid = req.session.userInfo.uuid;
                        setUserInfoParams.weixin_nick = userData.nickname;
                        setUserInfoParams.weixin_pic = userData.headimgurl;
                        setUserInfoParams.appKey = setting.globalAPIParams.appKey;
                        setUserInfoParams.appVer = setting.globalAPIParams.appVer;
                        console.log('oauthUserInfo setUserInfoParams : ' + JSON.stringify(setUserInfoParams));
                        driverApi.setUserInfo(setUserInfoParams, function(setUserInfoData){
                            console.log('oauthUserInfo wxLoginData: ' + JSON.stringify(setUserInfoData));
                            if(setUserInfoData && setUserInfoData.success && setUserInfoData.success == 'true'){
                                req.session.userInfo.weixin_nick = userData.nickname;
                                req.session.userInfo.weixin_pic = userData.headimgurl;
//                            req.session.userInfo.access_token = tokenData.access_token;
//                            req.session.userInfo.refresh_token = tokenData.refresh_token;
                                console.log('oauthUserInfo req.session.userInfo : ' + JSON.stringify(req.session.userInfo));

//                            userInfo = userData;
//                            renderFun(req,res, {
//                                title: '用户信息',
//                                userInfo: userInfo
//                            }, 'index');

//                            res.redirect("/product/detail/IJ45014z98");
                                res.redirect(redirect_url);
                            }
                        });
                    }
                });
            });
        }catch(err){
            console.log("error : " + JSON.stringify(err));
        }
    }
};

exports.orderConfirm = function(req, res, renderFun){
    renderFun(req,res, {
        title:'确认订单',
        jsApiParameters: {}
    }, 'order_confirm');
//    var unifiedOrderUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
//    var unifiedOrderParams = {};
//    unifiedOrderParams.appid = setting.wxParams.appId;
//    unifiedOrderParams.body = '贡献一分钱';
//    unifiedOrderParams.mch_id = setting.wxParams.mchid;
//    unifiedOrderParams.nonce_str = utils.createNoncestr(32);
//    unifiedOrderParams.notify_url = setting.wxParams.notify_url;
//    unifiedOrderParams.openid = req.session.userInfo.openid;
//    unifiedOrderParams.out_trade_no = setting.wxParams.appId + new Date().getTime();
//    console.log('client ip : ' + utils.getClientIp(req));
//    unifiedOrderParams.spbill_create_ip = utils.getClientIp(req);
//    unifiedOrderParams.total_fee = 1;
//    unifiedOrderParams.trade_type = 'JSAPI';
//    unifiedOrderParams.sign = utils.getSign(unifiedOrderParams);
//
//    var unifiedOrderXmlParams = utils.jsonToXml(unifiedOrderParams);
//
//    try{
//        Driver.queryByPostXml(unifiedOrderUrl, unifiedOrderXmlParams, function(unifiedOrderData){
//            console.log('unifiedOrderData : ' + JSON.stringify(unifiedOrderData));
//            if(unifiedOrderData.xml.return_code[0] == 'SUCCESS' && unifiedOrderData.xml.result_code[0] == 'SUCCESS'){
//                var jsApiParameters = {};
//                jsApiParameters.appId = setting.wxParams.appId;
//                jsApiParameters.nonceStr = utils.createNoncestr(32);
//                jsApiParameters.package = 'prepay_id=' + unifiedOrderData.xml.prepay_id[0];
//                console.log('prepay_id: ' + unifiedOrderData.xml.prepay_id[0]);
//                jsApiParameters.signType = 'MD5';
//                jsApiParameters.timeStamp = parseInt(new Date().getTime()/1000).toString();
//                jsApiParameters.paySign = utils.getSign(jsApiParameters);
//                console.log('jsApiParameters: ' + JSON.stringify(jsApiParameters));
//                renderFun(req,res, {
//                    title:'确认订单',
//                    jsApiParameters: jsApiParameters
//                }, 'order_confirm');
//            }
//        });
//    }catch(err){
//        console.log("error : " + JSON.stringify(err));
//    }
};

exports.notify = function(req, res, renderFun){
    console.log('weixin notify : ' +  JSON.stringify(req.body));
    res.writeHead(200, {"Content-Type": 'text/xml; charset=utf-8'});
    res.end(utils.jsonToXml({'return_code':'SUCCESS'}));
};