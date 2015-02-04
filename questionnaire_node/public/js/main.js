$(document).ready(function(){
//    if( window.localStorage.getItem("userType")){
//        window.localStorage.removeItem("userType");
//    }
    var userType = storage("userType");
     //加载完成隐藏loading
    $('#loading').hide();   
    //检测是否为已测试用户
    if(userType){
        getSelectResult(userType,true);
        $("#result_list").show();
        return;
    }

    //开始页
    $('#begin .enter').tap(function(){
        $('#begin').hide();
    });
    $('#result_list').hide();
    // $('#result_list li:nth-child(1)').show();    
    var options = {
        sex:"",
        answer:[]
    };
    //点击选择
    $('[data-sex]').tap(function(){
        if($(this).data('sex')=="男"){
            options.sex = "男";
            //根据性别选择性显示第5题
            //性别为男时
            $('#task_list li').eq(4).remove();       
        }else{
            options.sex = "女";
            //性别为女时
            $('#task_list li').eq(5).remove();   
        }
    })
    $('[data-select]').tap(function(){
        //选中样式
        $(this).addClass('active');
        var index = $(this).parents('li').index();
        //数据参数
        options.answer.push($(this).data('select'));
        if(options.answer.length==8){
            if(options.sex=="男"){
                options.answer.splice(4,0,"skip");
            }else{
                options.answer.splice(5,0,"skip");
            }
            //提交数据
            saveUser(options,function(res){
                //根据返回结果，显示对应结果页面
                getSelectResult(res.userType);
                // 本地存储测试结果
                storage("userType",res.userType);
            });             
        }
        //下一题
        // window.setTimeout(function(){
            // $('#task_list li').eq(index).addClass('out');
        // },1000);
        // window.setTimeout(function(){
            $('#task_list li').eq(index).next().addClass('in');
        // },12000);       
        //动画控制
        $('#animation').addClass("select"+(index+2));
        console.log(index);
        if(index==0){
            setTimeout(function(){
                $('.boy .tie').addClass('flextie');
            },1500);
            setTimeout(function(){
                $('.boy .tie').addClass('longtie');
            },200);            
        }
        if(index==1){
            $('.boy .eye').addClass('glasses');
            $('.girl').append('<div class="jiemao"></div>');
        }
        if(index==2){
            $('.girl').append('<div class="heart"></div>');
        };
        if(index==3){
            $('.boy .eye').removeClass('glasses');
            $('.boy .tie').removeClass('longtie');
             setTimeout(function(){
                $('.boy .tie').removeClass('flextie');
            },500);                
            $('.girl').find('.jiemao').remove();
            $('.girl').find('.heart').hide();            
            if(options.sex == "男"){
                $('.boy').append('<div class="line"></div>');
            }else{
                $('.girl').append('<div class="cheek"></div>');
            }
        }
        if(index==4){
            $('.girl .eye').addClass('smile');
            $('.boy').find('.line').remove();
        }
        if(index==5){
            $('.girl .eye').removeClass('smile');
            $('.boy').append('<div class="heart"></div>');
        }     
        if(index==6){
            $('#animation').removeClass('select2');
        };   
        if(index==6){
            $('#animation .boy').addClass('rock');
            $('#animation .girl').addClass('rock');
        }
    });
});

function saveUser(options,callback){
    var options = options;
    $.ajax({
        type: 'POST',
        url: '/question/saveUser',
        data: JSON.stringify(options),
        contentType: 'application/json',
        dataType: 'json',
        timeout: 3000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){//res: {"success":"true","userType":"宅男"}
            console.log('res: ' + JSON.stringify(res));
            callback(res);
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}
//返回测试结果页面
function getSelectResult(userType,flag){
    $('#result_list li').each(function(i,v){
        if($(v).data("style")==userType){
            if(flag){
                $(v).find('.title').addClass('stamp');
            }
            $('#result_list').show();
            $(v).show();
            console.log(userType);
        }
    });
}
//本地存/取数据
function storage(key,value){
    if(value){
        window.localStorage[key] = value;
    }else if(key && arguments.length==1){
        return  window.localStorage[key];
    }
}








