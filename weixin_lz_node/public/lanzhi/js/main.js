var indexArr = [];
var timer = 0;
var intrtval = null;
var prize = '0';
var pos = [];
$(function(){
	var ul = document.getElementById('list');
	var elem1,elem2;
	for(var i=0;i<9;i++){
		var li = document.createElement('li');
		indexArr.push(i+1);
		li.style.backgroundImage = 'url(images/jigsaw'+(i+1)+'.jpg)';
		li.dataset.num = i;
		ul.appendChild(li);
		pos.push({x:li.offsetLeft,y:li.offsetTop});
	}	
	//布局转换
	$('li').each(function(i,v){
		v.style.position = 'absolute';
		v.style.left = 0;
		v.style.top = 0;
		$(v).animate({
			translate3d: pos[i].x+'px,'+pos[i].y+'px,0'
		});
	})
	// 游戏逻辑
	$('li').tap(function(){
		//点第一个
		if($('.select').size()==0){
			$(this).addClass('select');
			elem1 = $(this);
		}
		//点第二个
		else if($('.select').size()==1){
			//相邻
			if(isNeighbor(elem1,$(this))){
				elem2 = $(this);
				//交换背景图
				swap(elem1,elem2);
				$('li').removeClass('select');
				if(isWin()){
					//清除计时
					window.clearInterval(intrtval);
					$('.p2').removeClass('currentPage').show();
					$('.p3').addClass('currentPage');
				};
			}
			//不相临	
			else{
				$(this).addClass('select').siblings().removeClass('select');
				elem1 = $(this);
			}
		}
	})	
	//第一页
	$('.p1').show();		
});
//事件流
$('.p1 .btn').tap(function(){
	$('.p1').removeClass('currentPage').show();
	$('.p2').addClass('currentPage');
});
$('#begin').tap(function(){
	$('.p2 .mask').hide();
	init();
});
$('.p3 .btn').tap(function(){
	location.reload([false])   
});
$('.add').tap(function(){
	$('.p4').removeClass('currentPage').show();
	$('.p5').addClass('currentPage');
	return false;	
});
$('.tianmao').tap(function(){
	//window.location.href='http://shop.m.taobao.com/shop/coupon.htm?&activityId=177000486&sellerId=1023696028';
	return false;
})
$('.p5 .btn').click(function(){
	var user = $('.p5 input').eq(0).val().trim();
	var phone = $('.p5 input').eq(1).val().trim();
	var address = $('.p5 input').eq(2).val().trim();
	$('.p5 .btn').text('提交中...')
	$.ajax({
		type:'POST',
		url:'/weixin/saveWxUser',
        dataType: 'json',		 
        data: JSON.stringify({
            userName:user,
            phoneNumber:phone,
            address:address,
            prize:prize
        }),
        contentType: 'application/json',
		success: function(res){
			if(res && res.success){
                $('.p5 .btn').text('下载APP').attr('href','http://app.meizhuangyouxuan.com/weixin/appdown.html').off();
			}else{
				$('.p5 .btn').text('对不起')
				if(res.error_code==2001){
					$('.p5 .hint').html('<p>您已经中过奖了哦！</p>');	
				}else{
					$('.p5 .hint').html('<p>系统错误！</p><p>您可以到天猫兰芝旗舰店领取优惠券</p>');
				}
			}
		}			
	});
})
$('#phone').on('input focus',function(){
	if(!/^(((13[0-9]{1})|159|153)+\d{8})$/.test($(this).val().trim())){
		$('span.hint').text("请输入正确手机号码！");			
	}else{
		$('span.hint').text('');
	}
});
//初始化游戏
function init(){
	//乱序，用来打乱图片位置
	indexArr = shuffle(indexArr);
	$('li').each(function(i,v){
		v.style.backgroundImage = 'url(images/jigsaw'+indexArr[i]+'.jpg)';
		v.dataset.sequence = indexArr[i]-1;
	});			
	intrtval = setInterval(function(){
		timer++;
		$('#timer span').text(timer);
	},1000)
}
// 游戏成功
function isWin(){
	var result =true;
	var reg=/\-?[0-9]+\.?[0-9]*/g;
	$('li').each(function(i,v){
		var nowPos = $(v).css('-webkit-transform').match(reg);
		// console.dir('pos:'+pos[v.dataset.sequence]);
		// console.log('nowPos:'+nowPos);
		if(pos[v.dataset.sequence].x != nowPos[1] || pos[v.dataset.sequence].y != nowPos[2]){
			result = false;
		}
	});
	return result;
}
//检测相邻
function isNeighbor(e1,e2){
	var result = false,
		l1 = e1.offset().left,
		t1 = e1.offset().top,
		l2 = e2.offset().left,
		t2 = e2.offset().top;
	if(t1 == t2 && Math.abs(l1-l2)<200 || l1 == l2 && Math.abs(t1-t2)<200){
		result = true;
	}	
	return result;
};
//数组乱序
function shuffle(o){ 
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
//交换背景与序号
function swap(e1,e2){
	var numCache = e1.data('num');
	var sequenceCache = e1.data('sequence');
	e1.data('num',e2.data('num'));
	e2.data('num',numCache);
	e1.data('sequence',e2.data('sequence'));
	e2.data('sequence',sequenceCache);
	e1.animate({
		translate3d:pos[e1.data('num')*1].x+'px,'+pos[e1.data('num')*1].y+'px,0'
	},200,'ease-in-out');
	e2.animate({
		translate3d:pos[e2.data('num')*1].x+'px,'+pos[e2.data('num')*1].y+'px,0'
	},200,'ease-in-out');	
}


// 需要分享的内容，请放到ready里
WeixinApi.ready(function(Api) {
    // 微信分享的数据
    var wxData = {
        "appId": "", // 服务号可以填写appId
        "imgUrl" : 'http://app.meizhuangyouxuan.com/lanzhi/images/min.jpg',
        "link" : 'http://app.meizhuangyouxuan.com/lanzhi/index.html',
        "desc" : '我在双十一兰芝水漾盛典『拼』出女神赢大奖了,你也来参加吧！拼出女神，就有奖哦！',
        "title" : "我在双十一兰芝水漾盛典『拼』出女神赢大奖了,你也来参加吧！拼出女神，就有奖哦！"
    };

    // 分享的回调
    var wxCallbacks = {
        // 分享操作开始之前
        ready : function() {
            // 你可以在这里对分享的数据进行重组
            // alert("准备分享");
        },
        // 分享被用户自动取消
        cancel : function(resp) {
            // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
            // alert("分享被取消，msg=" + resp.err_msg);
        },
        // 分享失败了
        fail : function(resp) {
            // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
            // alert("分享失败，msg=" + resp.err_msg);
        },
        // 分享成功
        confirm : function(resp) {
            // 分享成功了，我们是不是可以做一些分享统计呢？
            // alert("分享成功，msg=" + resp.err_msg);
            if(timer<20){
        		$.ajax({
       				type:'GET',
					url:'/weixin/getPrizeInfo',
					data:{},
      				dataType: 'json', 
      				timeout: 3000,
      				success: function(res){
      					// if(timer>0&&timer<5){
      					// 	prize = '1';
      					// 	$('.p4 .prize1').show();
      					// 	return;
      					// }
      					// if(timer>5&&timer<10){
      					// 	prize = '2';
      					// 	$('.p4 .prize2').show();
      					// 	return;
      					// }      					
      					if(res && res.prizeList[0].dayPrizeNumber>0&&timer<10&& (Math.random()*1000)>700){
      						prize = '1';
      						$('.p4 .prize1').show();
      					}
      					if(res && res.prizeList[1].dayPrizeNumber>0&&res.prizeList[0].dayPrizeNumber==0&&timer<10&& (Math.random()*1000)>700 || res.prizeList[1].dayPrizeNumber>0&&(Math.random()*1000)>600){
							prize = '2';
							$('.p4 .prize2').show();
      					}
      					if(prize=='0'){
      						$('.p4 .prize3').show();
      					}
      				},
      				error: function(){
      					$('.p4 .prize3').show();
      				}

        		});
            }else{
            	$('.p4 .prize3').show();
            }
			$('.p3').removeClass('currentPage').show();
			$('.p4').addClass('currentPage');
        },
        // 整个分享过程结束
        all : function(resp,shareTo) {
            // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
            // alert("分享" + (shareTo ? "到" + shareTo : "") + "结束，msg=" + resp.err_msg);
        }
    };

    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
    Api.shareToFriend(wxData, function(){});

    // 点击分享到朋友圈，会执行下面这个代码
    Api.shareToTimeline(wxData, wxCallbacks);

    // 点击分享到腾讯微博，会执行下面这个代码
    // Api.shareToWeibo(wxData, wxCallbacks);

    // iOS上，可以直接调用这个API进行分享，一句话搞定
    // Api.generalShare(wxData,wxCallbacks);

    // 有可能用户是直接用微信“扫一扫”打开的，这个情况下，optionMenu是off状态
    // 为了方便用户测试，我先来trigger show一下
    var elOptionMenu = document.getElementById('optionMenu');
    elOptionMenu.click(); // 先隐藏
    elOptionMenu.click(); // 再显示
});
