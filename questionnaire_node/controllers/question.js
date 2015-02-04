var QuestionSchema = require('../schemas/Question');

exports.getResult = function (req, res, renderFun) {
    var QuestionTable = QuestionSchema.newHandler();
    QuestionTable.find({}, {}, {sort: [['qId', 1]]}, function(err, questionData){
        if (!err) {
            if (questionData.length > 0) {
                renderFun(req,res, {
                    title: '调查结果',
                    questionList: questionData
                },'result');
            }else{
                renderFun(req,res, {
                    title: '调查结果',
                    questionList: []
                },'result');
            }
        }
    });
};