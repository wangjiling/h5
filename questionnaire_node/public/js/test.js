$(document).ready(function(){
    saveUser();
    getUserExist();
});

function saveUser(){
    $.ajax({
        type: 'POST',
        url: '/question/saveUser',
        data: JSON.stringify({
            sex:'男',
            answer:['a','b','b','a','skip','a','b','a','c']
        }),
        contentType: 'application/json',
        dataType: 'json',
        timeout: 3000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){//res: {"success":"true","userType":"宅男"}
            console.log('res: ' + JSON.stringify(res));
            alert(JSON.stringify(res));
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function getUserExist(){
    $.ajax({
        type: 'GET',
        url: '/question/qUserExist',
        data:{},
        dataType: 'json',
        timeout: 3000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){//res: {"success":"true","userType":"宅男"}
            console.log('res: ' + JSON.stringify(res));
            alert(JSON.stringify(res));
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}
