var QUserSchema = require('../schemas/QUser');
var QuestionSchema = require('../schemas/Question');
var async = require("async");
var utils = require('../utils');

exports.qUserExist = function (req, res, renderFun) {
    var UserTable = QUserSchema.newHandler();
    var userIp = utils.getClientIp(req);
    UserTable.find({userId:userIp}, function (err, data) {
        if (!err) {
            if (data.length > 0) {
                var type = data[0].type;
                renderFun(req, res, {success: 'true', userType:type});
            } else {
                renderFun(req, res, {success: 'false'});
            }
        }
    });
};

exports.saveUser = function(req, res, renderFun){
    var answerData = req.body;
//    var answerData = {
//        sex:'男',
//        answer:['a','b','b','a','skip','a','b','a','c']
//    };
    var UserTable = QUserSchema.newHandler();
    var userIp = utils.getClientIp(req);
    UserTable.find({userId:userIp}, function (userErr, userData) {
        try {
            if (!userErr) {
//                if (userData.length == 0) {
                    var answer = answerData.answer;
                    var type = '奇葩';
                    if(answerData.sex ==='男'){
                        if(answer[2] == 'b'){//3B 宅男
                            type = '宅男';
                        }else if(answer[2] == 'd'){//3D
                            if(answer[3] == 'a' || answer[3] == 'b'){//4A/B 渣男
                                type = '渣男';
                            }else{//4C/D 情场高手
                                type = '情场高手';
                            }
                        }
                    }else if(answerData.sex ==='女'){
                        if(answer[2] == 'a'){//3A
                            if(answer[4] == 'a' || answer[4] == 'b'){//5A/B 开放型
                                type = '开放型';
                            }else{//5C/D 保守
                                type = '保守';
                            }
                        }else if(answer[2] == 'c') {//3C
                            if (answer[4] == 'a' || answer[4] == 'b') {//5A/B 开放型
                                type = '开放型';
                            } else {//5C/D 闷骚型
                                type = '闷骚型';
                            }
                        }
                    }
                    var userSave = new UserTable({
                        userId:userIp,
                        sex:answerData.sex,
                        type:type,
                        answer:answerData.answer,
                        createDate: new Date()
                    });
                    userSave.save(function (err) {
                        if (!err) {
                            console.log("save user is success!");
                            renderFun(req, res, {success: 'true', userType:type});
                            updateQuestion(answerData.sex,answer);
                        } else {
                            console.log("save is failed!");
                            renderFun(req, res, {success: 'true', userType:type});
                        }
                    });
//                }else {
//                    renderFun(req, res, {success: 'true', userType:userData[0].type});
//                }
            }else{
                renderFun(req, res, {success: 'false'});
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
            renderFun(req, res, {success: 'false'});
        }
    });
};

var updateQuestion = exports.updateQuestion = function(sex, answerArr){
    var QuestionTable = QuestionSchema.newHandler();
    if(answerArr.length != 0){
        var answerArrNew = new Array();
        for(var i=0;i<answerArr.length;i++){
            var val = i+1 + ':' + answerArr[i];
            answerArrNew.push(val);
        }
        async.forEachSeries(answerArrNew,function(item,callback){
            var itemArr = item.split(':');
            QuestionTable.findOne({qId:itemArr[0]}, function(err, question){
                try{
                    if(!err && question){
                        var choose = itemArr[1];
                        switch (choose){
                            case 'a':
                                question.aNum = question.aNum + 1;
                                question.sum = question.sum + 1;
                                if(sex === '男'){
                                    question.aMNum = question.aMNum + 1;
                                }
                                break;
                            case 'b':
                                question.bNum = question.bNum + 1;
                                question.sum = question.sum + 1;
                                if(sex === '男'){
                                    question.bMNum = question.bMNum + 1;
                                }
                                break;
                            case 'c':
                                question.cNum = question.cNum + 1;
                                question.sum = question.sum + 1;
                                if(sex === '男'){
                                    question.cMNum = question.cMNum + 1;
                                }
                                break;
                            case 'd':
                                question.dNum = question.dNum + 1;
                                question.sum = question.sum + 1;
                                if(sex === '男'){
                                    question.dMNum = question.dMNum + 1;
                                }
                                break;
                        }

                        question.save(function(err, question){
                            if(!err){
                                console.log("update question success!");
                                callback();
                            }
                        })
                    }
                } catch (err) {
                    callback(JSON.stringify(err));
                    console.log("call back error : " + JSON.stringify(err));
                }
            })
        },function(err){
            if(!err){
                console.log("update all questions!");
            }else{
                console.log("async err: "+JSON.stringify(err));
            }
        })
    }
};