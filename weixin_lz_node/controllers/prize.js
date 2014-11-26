var PrizeSchema = require('../schemas/Prize');
var Prize = require('../beans/prize.js');

exports.getPrizeInfo = function(req, res, renderFun){
    var PrizeTable = PrizeSchema.newHandler();
    PrizeTable.find({},function (err, prizeList) {
        try {
            if (!err) {
                if(prizeList.length>0){
                    var prizes = new Array();
                    for(var i = 0; i<prizeList.length; i++){
                        var prize = new Prize();
                        prize.category = prizeList[i].category;
                        prize.prizeNumber = prizeList[i].prizeNumber;
                        prize.dayPrizeNumber = prizeList[i].dayPrizeNumber;
                        prizes.push(prize);
                    }
                    renderFun(req, res, {prizeList: prizes});
                }else{
                    renderFun(req, res, {prizeList: prizeList});
                }
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
        }
    })
};