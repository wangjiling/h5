var CronJob = require('cron').CronJob;
var testCronJob = require('./testCronJob');
var PrizeSchema = require('./schemas/Prize');

exports.cronJob = function(){
    new CronJob('00 00 00 * * *', function(){
            updatePrizeJob();
            console.log('You will see this message everyday on ' + new Date());
        }, function () {
            console.log('Job stop!');
            // This function is executed when the job stops
        },
        true /* Start the job right now */
    );
};

var updatePrizeJob = exports.updatePrizeJob = function(){
    var PrizeTable = PrizeSchema.newHandler();
    PrizeTable.find({}, function (err, prizeList) {
        try {
            if (!err) {
                if(prizeList.length>0){
                    for(var i = 0; i<prizeList.length; i++){
                        var prize = prizeList[i];
                        if(prize.category == 1){
                            if(prize.prizeNumber > 1){
                                prize.dayPrizeNumber = 2;
                            }else{
                                prize.dayPrizeNumber = prize.prizeNumber;
                            }
                        }else if(prize.category == 2){
                            if(prize.prizeNumber>4){
                                prize.dayPrizeNumber = 5;
                            }else{
                                prize.dayPrizeNumber = prize.prizeNumber;
                            }
                        }

                        prize.save(function(err, prizeData){
                            if(!err){
                                console.log("update prize job is success!");
                                if(prizeData.category == 1){
                                    testCronJob.testSaveWxUser();
                                }
                            }else{
                                console.log("update prize job is failed!");
                            }
                        });

                    }
                }
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
        }
    })
};