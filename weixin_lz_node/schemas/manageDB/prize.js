var PrizeSchema = require('../Prize.js');

var savePrize = exports.savePrize = function(data){
    var PrizeTable = PrizeSchema.newHandler();
    for(var i=0; i<data.length; i++){
        var prizeSave = new PrizeTable({
            category: data[i].category,
            prizeNumber: data[i].prizeNumber,
            dayPrizeNumber : data[i].dayPrizeNumber
        });
        prizeSave.save(function (err) {
            if (!err) {
                console.log("save is success!");
            } else {
                console.log("save is failed!");
            }
        });
    }
};

var prizeData = [
    {
    category: '1',
    prizeNumber: 10,
    dayPrizeNumber : 2
    },
    {
        category: '2',
        prizeNumber: 30,
        dayPrizeNumber : 5
    }
];

savePrize(prizeData);

