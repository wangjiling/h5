var mongoose = require('mongoose');
var myUtils = require("../utils");

var tableName = exports.tableName = 'question';

var Schema = exports.Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    qId : Number,
    qContent: String,
    aContent: String,
    bContent: String,
    cContent: String,
    dContent: String,
    aNum: Number,
    bNum: Number,
    cNum: Number,
    dNum: Number,
    aMNum: Number,
    bMNum: Number,
    cMNum: Number,
    dMNum: Number,
    sum: Number
});

var newHandler = exports.newHandler = function (pDb) {
    try {
        if (pDb) {
            var db = pDb;
        } else {
            var db = myUtils.connectMongoDB();
        }
        console.log("Success to get handler of %s", tableName);
        return db.model(tableName, Schema);
    } catch (err) {
        console.log("Failed to get handler of %s : %s", tableName, JSON.stringify(err));
    }
};