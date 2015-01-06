var http = require('http');
var qs = require('querystring');
var urlModule = require('url');
var xml2js = require('xml2js');

exports.queryDataByGet = function(url,data,fn){
    data=data||{};
    var content=qs.stringify(data);
    var parse_u=urlModule.parse(url,true);

    var options = {
        host:parse_u.hostname,
        port:parse_u.port||80,
        path: parse_u.path + '?' + content,
        method: 'GET'
    };

    var req = http.request(options, function (res) {

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

exports.queryDataByPost = function(url,data,fn){
    data=data||{};
    var content=qs.stringify(data);
    var parse_u=urlModule.parse(url,true);

    var options = {
        host:parse_u.hostname,
        port:parse_u.port||80,
        path:parse_u.path,
        method:'POST',
        headers: {
            'Connection':'Keep-Alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "Content-Length": content.length
        }
    };

    var req = http.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        var returnPostData = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            returnPostData = returnPostData + chunk;

        }).on('end', function (){
            returnPostData ? fn!=undefined && fn(JSON.parse(returnPostData)) : fn!=undefined && fn('');
            // console.log('returnPostData: ' + returnPostData);
        });
    });

    req.on('error', function (e) {
        // console.log('problem with request: ' + e.message);
    });

// write data to request body
    req.write(content);

    req.end();

};

exports.queryByPost = function(url,data,fn){
    data=data||{};
    var content=qs.stringify(data);
    var parse_u=urlModule.parse(url,true);
    var isHttp=parse_u.protocol=='http:';

    var options={
        host:parse_u.hostname,
        port:parse_u.port||(isHttp?80:443),
        path:parse_u.path,
        method:'POST',
        headers:{
            'Connection':'Keep-Alive',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length':content.length
        },
        rejectUnauthorized: false  
    };
    var req = require(isHttp?'http':'https').request(options,function(res){
        var _data='';
        res.on('data', function(chunk){
            _data += chunk;

        });
        res.on('end', function(){
           // console.log('_data : ' + _data);
            _data ? fn!=undefined && fn(JSON.parse(_data)) : fn!=undefined && fn('');
        });
    });
    req.write(content);

    req.end();
};

exports.queryByPostXml = function(url,xmlData,fn){
    xmlData=xmlData||'<xml></xml>';
    var content= xmlData;
    var parse_u=urlModule.parse(url,true);
    var isHttp=parse_u.protocol=='http:';

    var options={
        host:parse_u.hostname,
        port:parse_u.port||(isHttp?80:443),
        path:parse_u.path,
        method:'POST',
        headers:{
            'Connection':'Keep-Alive',
            'Content-Type':'application/xml; charset=UTF-8'
        }
    };

    var req = require(isHttp?'http':'https').request(options,function(res){
        var _data='';
        res.on('data', function(chunk){
            _data += chunk;
        });

        res.on('end', function(){
            var parseString = xml2js.parseString;
            parseString(_data, function(err, json) {
                if (err) {
                    err.status = 400;
                } else {
                    json ? fn!=undefined && fn(json) : fn!=undefined && fn('');
                }
            });
        });
    });

    req.write(content);

    req.end();
};