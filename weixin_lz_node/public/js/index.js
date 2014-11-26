$(document).ready(function(){
    saveUser();
    getPrizeInfo();
});

function saveUser(){
    $.ajax({
        type: 'POST',
        url: '/weixin/saveWxUser',
        data: JSON.stringify({
            userName:'wjl',
            phoneNumber:'15216779471',
            address:'上海市徐汇区梅陇路130号',
            prize:'1'
        }),
        contentType: 'application/json',
        dataType: 'json',
        timeout: 3000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            alert(JSON.stringify(res));
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function getPrizeInfo(){
    $.ajax({
        type: 'GET',
        url: '/weixin/getPrizeInfo',
        data:{},
        dataType: 'json',
        timeout: 3000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){//res:{"prizeList":[{"category":"1","prizeNumber":10,"dayPrizeNumber":2},{"category":"2","prizeNumber":30,"dayPrizeNumber":5}]}
            console.log('res: ' + JSON.stringify(res));
            alert(JSON.stringify(res));
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}
