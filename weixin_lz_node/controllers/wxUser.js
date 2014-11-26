var WXUserSchema = require('../schemas/WXUser');
var PrizeSchema = require('../schemas/Prize');

exports.wxUserExist = function (req, res) {
    var UserTable = WXUserSchema.newHandler();
    var phoneNumber = req.query.phoneNumber;
    UserTable.find({phoneNumber:phoneNumber}, function (err, data) {
        if (!err) {
            if (data.length > 0) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write("true");
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write("false");
                res.end();
            }
        }
    });
};

exports.saveWxUser = function(req, res, renderFun){
    var PrizeTable = PrizeSchema.newHandler();
    PrizeTable.findOne({category:req.body.prize}, function (err, prize) {
        try {
            if (!err && prize && prize.prizeNumber>0 && prize.dayPrizeNumber>0) {
                var UserTable = WXUserSchema.newHandler();
                UserTable.find({phoneNumber:req.body.phoneNumber}, function (userErr, userData) {
                    if (!userErr) {
                        if (userData.length == 0) {
                            prize.prizeNumber = prize.prizeNumber - 1;
                            prize.dayPrizeNumber = prize.dayPrizeNumber - 1;

                            prize.save(function (err, prize) {
                                if (!err) {
                                    console.log("update prize is success!");
                                        var userSave = new UserTable({
                                            userName:req.body.userName,
                                            phoneNumber:req.body.phoneNumber,
                                            address:req.body.address,
                                            prize:req.body.prize,
                                            createDate: new Date()
                                        });
                                        userSave.save(function (err) {
                                            if (!err) {
                                                console.log("save user is success!");
                                                renderFun(req, res, {success: 'true', error_code:2000});
                                            } else {
                                                console.log("save is failed!");
                                                renderFun(req, res, {success: 'false', error_code:2002});
                                            }
                                        });
                                } else {
                                    console.log("update prize is failed!");
                                    renderFun(req, res, {success: 'false', error_code:2002});
                                }
                            });
                        }else {
                            renderFun(req, res, {success: 'false', error_code: 2001});
                        }
                    }else{
                        renderFun(req, res, {success: 'false', error_code:2002});
                    }
                });
            }else{
                renderFun(req, res, {success: 'false', error_code:2002});
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
            renderFun(req, res, {success: 'false', error_code:2002});
        }
    });
};