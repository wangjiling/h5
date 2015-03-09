var https = require('https');
var sign = require('../utils/sign.js');
var setting = require("../setting.json");
var qs = require('querystring');
var urlModule = require('url');
/*
 *something like this
 *{
 *  jsapi_ticket: 'jsapi_ticket',
 *  nonceStr: '82zklqj7ycoywrk',
 *  timestamp: '1415171822',
 *  url: 'http://example.com',
 *  signature: '1316ed92e0827786cfda3ae355f33760c4f70c1f'
 *}
 */
global.WX_CACHE = {};
var queryDataByGet = function(url,data,fn){
    data=data||{};
    var content=qs.stringify(data);
    var parse_u=urlModule.parse(url,true);

    var options = {
        host:parse_u.hostname,
        port:parse_u.port||80,
        path: parse_u.path + '?' + content,
        method: 'GET'
    };

    var req = https.request(options, function (res) {

        var returnGetData = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            returnGetData = returnGetData + chunk;
            // console.log('chunk: ' + chunk);
        }).on('end', function (){
            returnGetData ? fn!=undefined && fn(JSON.parse(returnGetData)) : fn!=undefined && fn('');
            // console.log('returnGetData: ' + returnGetData);
        });
    });

    req.on('error', function (e) {
        // console.log('problem with request: ' + e.message);
    });

    req.end();
};

var tokenParams = {
	'grant_type':'client_credential',
	'appid': setting.globalAPIParams.appId,
	'secret': setting.globalAPIParams.appSecret
}
// queryDataByGet('https://api.weixin.qq.com/cgi-bin/token',tokenParams,function(data){
// 	console.log("==>"+data);
// 	console.log(data);
// })

var content=qs.stringify(tokenParams);

//获取微信Access_token
https.get('https://api.weixin.qq.com/cgi-bin/token?'+content, function(res){
	var obj = {};
	res.on('data', function(d) {
		obj = d;		

	}).on('end',function(){
		// console.log('access_token===>'+obj);
		// console.log('access_token===>'+JSON.parse(obj).access_token);
		//获取jsapi_ticket
		https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+JSON.parse(obj).access_token+'&type=jsapi',function(res){
			res.on('data',function(d){
				global.WX_CACHE.jsapi_ticket = JSON.parse(d).ticket;

			}).on('error', function(e) {
  				console.error(e);
			});
		});		
	});

}).on('error', function(e) {
  console.error(e);
});


exports.getConfig = function (req, res, renderFun) {
	console.log('url=======>'+req.headers.host);
	console.log('global.WX_CACHE.jsapi_ticket=======>'+global.WX_CACHE.jsapi_ticket);
	var configParams = sign(global.WX_CACHE.jsapi_ticket,req.headers.host);
	configParams.appId = setting.globalAPIParams.appId;	
    renderFun(req, res, {success: 'true', getConfig:configParams});
};