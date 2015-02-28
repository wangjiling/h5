var options = {
	sex:"",
	score:0
};

//window.onload = function(){
//    //加载完成隐藏loading
//    $('#loading').addClass("displayNone");   
//}

$(document).ready(function(){
	window.setTimeout(function(){
	    //加载完成隐藏loading
		$('#loading').addClass("displayNone");
        //首页
//        $('#first_page').addClass("animation-rotate-left");
        $('#first_page').addClass("animation-opacity");
        window.setTimeout(function(){
            $('.arrow').addClass("displayNone");
            $('#first_page').addClass("displayNone");
        }, 10000);
	}, 3000);

    //首页滑动动画
    $(document).on('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation();
    }, false);
    $('#first_page').swipeUp(function(){
        $('#first_page').removeClass("animation-opacity");
        $(this).addClass("animation-up");
        window.setTimeout(function(){
            $('#first_page').addClass("displayNone");
        }, 600);
        $('.arrow').addClass("displayNone");
    });

    //开始页
    $('#begin .enter').tap(function(){
        $('#begin').addClass("displayNone");
//        $('#select_sex').addClass("displayNone");
        $('#task_list li').eq(0).removeClass("displayNone");
        $('#progress_bar').removeClass("displayNone");
        $('#progress_bar .expression').addClass("rock");
    });

//    点击选择
//    $('[data-sex]').tap(function(){
//        if($(this).data('sex')=="男"){
//            options.sex = "男";
//            //性别为男时
//        }else{
//            options.sex = "女";
//            //性别为女时
//        }
//
//		$('#select_sex').addClass("displayNone");
//		$('#task_list li').eq(0).removeClass("displayNone");
//		$('#progress_bar').removeClass("displayNone");
//		$('#progress_bar .expression').addClass("rock");
//    })
    $('[data-select]').tap(function(){
        //解绑事件
        $(this).parent().find('[data-select]').off();
		var $this = $(this);
		//选中样式
        $(this).addClass('active');
        var index = $(this).parents('li').index()-2;
        //数据参数
        options.score += parseInt($(this).data('select'));
        //if(index==9){
		//	$(this).parents('li').addClass('displayNone');
		//	//根据得分，显示对应结果页面
        //    getSelectResult(options.score);          
        //}else{
			var barWidthVal = parseFloat($('#progress_bar .bar').css('width'));
			var stepWidthVal = barWidthVal/10;
			var leftVal = parseFloat($('#progress_bar .expression').css('left')) + stepWidthVal;
			var widthVal = parseFloat($('#progress_bar .inner_bar').css('width')) + stepWidthVal;
			//动画控制
			//if(index==8){
			//	$('#progress_bar .expression').css('left', leftVal);
			//	$('#progress_bar .inner_bar').css('width', barWidthVal);
			//}else{
				$('#progress_bar .expression').css('left', leftVal);
				$('#progress_bar .inner_bar').css('width', widthVal);
			//}
			//下一题
			window.setTimeout(function(){
				switch(true){                  
					case options.score<=20 :                             
						$('#progress_bar .expression').css("background-image", "url(images/expression1.png)");
						break;                       
					case options.score>20 && options.score<=35 :                       
						$('#progress_bar .expression').css("background-image", "url(images/expression2.png)");       
						break;	
					case options.score>35 && options.score<=50 :                       
						$('#progress_bar .expression').css("background-image", "url(images/expression3.png)");  							
						break;	
					case options.score>50 && options.score<=65 :                       
						$('#progress_bar .expression').css("background-image", "url(images/expression4.png)");           
						break;	
					case options.score>65 && options.score<=80 :                       
						$('#progress_bar .expression').css("background-image", "url(images/expression5.png)");          
						break;	
					case options.score>80 :                       
						$('#progress_bar .expression').css("background-image", "url(images/expression6.png)");            
						break;	
				}
				if(index==9){
                    $('#progress_bar').addClass("displayNone");
					//根据得分，显示对应结果页面
					getSelectResult(options.score);          
				}else{
					$('#task_list li').eq(index).next().removeClass('displayNone');
					var serial_number = index + 2;
					$('#progress_bar .serial_number').text(serial_number+"/10");
				}
				$this.parents('li').addClass('displayNone');
			},200);       
			console.log(index);
			console.log(options.score);
		//}
	});

    $('.add_contact').tap(function(){
        window.location.href = 'http://mp.weixin.qq.com/s?__biz=MjM5NzA5ODM2Mg==&mid=203467822&idx=1&sn=a411863fecfb3f220c6dd1ba526b97f5#rd';
    });
});

//返回测试结果页面
function getSelectResult(score){
	switch(true){                  
		case score<=20 :                             
			$('#result_list').css("background-image", "url(images/result1.jpg)");
			break;                       
		case score>20 && score<=35 :                       
			$('#result_list').css("background-image", "url(images/result2.jpg)");          
			break;	
		case score>35 && score<=50 :                       
			$('#result_list').css("background-image", "url(images/result3.jpg)");          
			break;	
		case score>50 && score<=65 :                       
			$('#result_list').css("background-image", "url(images/result4.jpg)");          
			break;	
		case score>65 && score<=80 :                       
			$('#result_list').css("background-image", "url(images/result5.jpg)");          
			break;	
		case score>80 :                       
			$('#result_list').css("background-image", "url(images/result6.jpg)");          
			break;	
	}
 
	$('#result_list').removeClass('displayNone');
	console.log(score);
}