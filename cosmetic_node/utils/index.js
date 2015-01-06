var setting = require('../configuration').setting;
var qs = require('querystring');
var crypto = require('crypto');

exports.getClientIp = function(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

var getSign = exports.getSign = function(package){
//    var stringPackage = qs.stringify(package);
    var buff = '';
    var stringPackage = '';
    if(package){
        for(var key in package){
            buff = buff + key + '=' + package[key] + '&';
        }
        if(buff.length > 0 ){
            stringPackage = buff.substr(0,buff.length-1);
            console.log('stringPackage : ' + stringPackage);
        }
    }
    var stringSignTemp = stringPackage + '&key='+ setting.wxParams.partnerKey;
    var sign = crypto.createHash('md5').update(stringSignTemp,'utf8').digest('hex').toUpperCase();
    console.log('sign : ' + sign);
    return sign;
};

var jsonToXml = exports.jsonToXml = function(jsonData){
    var xml = '<xml>';
    if(jsonData){
        for(var key in jsonData){
            if(!isNaN(jsonData[key])){
                xml = xml + "<" + key + ">" + jsonData[key] + "</" + key + ">";
            }else{
                xml = xml + "<" + key + "><![CDATA[" + jsonData[key] + "]]></" + key + ">";
            }
        }
    }
    xml = xml + '</xml>';
    console.log('xml : ' + xml);
    return xml;
};

var createNoncestr = exports.createNoncestr = function(length){
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var str ="";
    for ( var i = 0; i < length; i++ )  {
        str = str + chars.substr(randomNumber(chars.length-1), 1);
    }
    console.log('str : ' + str);
    return str;
};

function randomNumber(number){
    var r_number = Math.round(Math.random()*number);
    return r_number;
}

//var package = {
//    "appId": "wx8888888888888888",
//    "timeStamp": "1414411784",
//    "nonceStr": "gbwr71b5no6q6ne18c8up1u7l7he2y75",
//    "package": "prepay_id=wx201410272009395522657a690389285100",
//    "signType": "MD5"
//};
//getSign(package);
//jsonToXml(package);
//createNoncestr(32);