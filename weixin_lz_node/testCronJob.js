var WXUserSchema = require('./schemas/WXUser');
var PrizeSchema = require('./schemas/Prize');

var testSaveWxUser = exports.testSaveWxUser = function(req, res, renderFun){
    var PrizeTable = PrizeSchema.newHandler();
    PrizeTable.findOne({category:'1'}, function (err, prize) {
        try {
            if (!err && prize && prize.prizeNumber>0 &&  prize.prizeNumber<9 && prize.dayPrizeNumber>0) {
//            if (!err && prize && prize.prizeNumber>0 && prize.dayPrizeNumber>0) {
                var UserTable = WXUserSchema.newHandler();
                UserTable.find({phoneNumber:'18513851080'}, function (userErr, userData) {
                    if (!userErr) {
                        if (userData.length == 0) {
                            prize.prizeNumber = prize.prizeNumber - 1;
                            prize.dayPrizeNumber = prize.dayPrizeNumber - 1;

                            prize.save(function (err, prize) {
                                if (!err) {
                                    console.log("update prize is success!");
                                    var userSave = new UserTable({
                                        userName:'袁微',
                                        phoneNumber:'18513851080',
                                        address:'北京市朝阳区通惠河北路郎家园6号院2号楼A座3层',
                                        prize:'1',
                                        createDate: new Date(new Date().setMinutes(53))
                                    });
                                    userSave.save(function (err) {
                                        if (!err) {
                                            console.log("save user is success!");
                                        } else {
                                            console.log("save is failed!");
                                        }
                                    });
                                } else {
                                    console.log("update prize is failed!");
                                }
                            });
                        }
                    }
                });
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
        }
    });
};