var mongoose = require('mongoose');
var myUtils = require("../utils");

var tableName = exports.tableName = 'prize';

var Schema = exports.Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: String,
    prizeNumber: Number,
    dayPrizeNumber : Number
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