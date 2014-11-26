var setting = require("../setting.json");
var mongoose = require("mongoose");

exports.sleep = function(milliSeconds){
    var startTime = new Date().getTime();
    while( new Date().getTime() < startTime + milliSeconds);
}

exports.whenUndefined = function(value, callback) {
    if(value == undefined){
        return callback(value);
    }

}

exports.add = function(a, b){
    return a + b;
}

exports.parseNumber = function(pValue, whenFailedFun){
    var val = pValue;
    try{
        val = new Number(val);
        if(!val && val != 0){
            if(whenFailedFun){
                return whenFailedFun();
            }
            return INVALID_NUMBER_VAL;
        }

    }catch(error){
        if(whenFailedFun){
            return whenFailedFun();
        }
        return INVALID_NUMBER_VAL;
    }

    return val;
}

var parseMongoDBUri = exports.parseMongoDBUri = function (dbset, dbname) {
    var dbsetting = setting;
    var schemaName = dbsetting.MONGODB.DB.weixin.name;
    if (dbset && dbset instanceof Object) {
        dbsetting = dbset;
    } else if (dbset && dbset instanceof String) {
        schemaName = dbset;
    }

    if (dbname && dbname instanceof String) {
        schemaName = dbname;
    }

    var uri = "mongodb://" + dbsetting.MONGODB.HOST
        + dbsetting.MONGODB.PORT
        + "/" + schemaName;
    console.log("dburi: " + uri);
    return uri;
}

var connectMongoDB = exports.connectMongoDB = function (dbset, dbname) {
//    var dbUri = parseMongoDBUri(dbset, dbname);
    var db = mongoose.createConnection('mongodb://127.0.0.1/weixin_lz');
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
    });

    return db;

}

exports.getDate = function(date) {
    try {
        var year  = date.getFullYear();
        var month = date.getMonth() + 1;
        var day   = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        month = (parseInt(month) < 10) ? ("0" + month) : (month);
        day   = (parseInt(day)   < 10) ? ("0" + day )  : (day);
        hour = (parseInt(hour) < 10) ? ("0" + hour) : (hour);
        minute = (parseInt(minute) < 10) ? ("0" + minute) : (minute);
        second = (parseInt(second) < 10) ? ("0" + second) : (second);

        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    } catch (err) {
        return "";
    }
}

exports.getTime = function(date) {
    try {
        var hour = date.getHours();
        var minute = date.getMinutes();

        hour = (parseInt(hour) < 10) ? ("0" + hour) : (hour);
        minute = (parseInt(minute) < 10) ? ("0" + minute) : (minute);

        return hour + ":" + minute;
    } catch (err) {
        return "";
    }
}

exports.getSecond = function(date){
    try {
        var second = date.getSeconds();

        second = (parseInt(second) < 10) ? ("0" + second) : (second);

        return ":" + second;
    } catch (err) {
        return "";
    }
}

