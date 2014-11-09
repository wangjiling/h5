/*
** 变量值
*/
	/* 
	** 页面切换的效果控制 
	*/
var Msize = $(".m-page").size(), 	//页面的数目
	page_n			= 1,			//初始页面位置
	initP			= null,			//初值控制值
	moveP			= null,			//每次获取到的值
	firstP			= null,			//第一次获取的值
	newM			= null,			//重新加载的浮层
	p_b				= null,			//方向控制值
	indexP			= null, 		//控制首页不能直接找转到最后一页
	move			= null,			//触摸能滑动页面
	start			= true, 		//控制动画开始
	startM			= null,			//开始移动
	position		= null,			//方向值
	DNmove			= false,		//其他操作不让页面切换
	mapS			= null,			//地图变量值
	canmove			= 1,		//首页返回最后一页
	
	textNode		= [],			//文本对象
	textInt			= 1;			//文本对象顺序
	

	plugin_type		= {				//记录页面切换的数量
		'info_pic2':{num:0,id:0},
		'info_nomore':{num:0,id:0},
		'info_more':{num:0,id:0},
		'multi_contact':{num:0,id:0},
		'video':{num:0,id:0},
		'input':{num:0,id:0},
		'dpic':{num:0,id:0}
	};   


/* 
** 单页切换 各个元素fixed 控制body高度 
*/
	var v_h	= null;		//记录设备的高度
	
	function init_pageH(){ //初始化高度
		var fn_h = function() {
			if(document.compatMode == "BackCompat")
				var Node = document.body;
			else
				var Node = document.documentElement;
			 return Math.max(Node.scrollHeight,Node.clientHeight);
		}
		var page_h = fn_h();
		var m_h = $(".m-page").height();
		page_h >= m_h ? v_h = page_h : v_h = m_h ;
		
		//设置各种模块页面的高度，扩展到整个屏幕高度
		$(".m-page").height(v_h); 	
		$(".m-index").height(v_h);
		
	};
	init_pageH();


	

/*
**模版切换页面的效果
*/
	//绑定事件
	function changeOpen(e){
		$(".m-page").on('mousedown touchstart',page_touchstart);
		$(".m-page").on('mousemove touchmove',page_touchmove);
		$(".m-page").on('mouseup touchend mouseout',page_touchend);
	};
	

	
	//开启事件绑定滑动
	changeOpen();
	
	//触摸（鼠标按下）开始函数
	function page_touchstart(e){
		if (e.type == "touchstart") {
			initP = window.event.touches[0].pageY;
		} else {
			initP = e.y || e.pageY;
			mousedown = true;
		}
		firstP = initP;	
	};
	
	//插件获取触摸的值
	function V_start(val){
		initP = val;
		mousedown = true;
		firstP = initP;		
	};
	
	//触摸移动（鼠标移动）开始函数
	function page_touchmove(e){
		e.preventDefault();
		e.stopPropagation();	

		//判断是否开始或者在移动中获取值
		if(start||startM){
			startM = true;
			if (e.type == "touchmove") {
				moveP = window.event.touches[0].pageY;
			} else { 
				if(mousedown) moveP = e.y || e.pageY;
			}
			page_n == 1 ? indexP = false : indexP = true ;	//true 为不是第一页 false为第一页
		}
		
		//设置一个页面开始移动
		if(moveP&&startM){
			
			//判断方向并让一个页面出现开始移动
			if(!p_b){
				p_b = true;
				position = moveP - initP > 0 ? true : false;	//true 为向下滑动 false 为向上滑动
				if(position){
				//向下移动
					if(indexP){								
						newM = page_n - 1 ;
						$(".m-page").eq(newM-1).addClass("active").css("top",-v_h);
						move = true ;
					}else{
						if(canmove){
							move = true;
							newM = Msize;
							$(".m-page").eq(newM-1).addClass("active").css("top",-v_h);
						}
						else move = false;
					}
							
				}else{
				//向上移动
					if(page_n != Msize){
						if(!indexP) $('.audio_txt').addClass('close');
						newM = page_n + 1 ;
					}else{
						newM = 1 ;
					}
					$(".m-page").eq(newM-1).addClass("active").css("top",v_h);
					move = true ;
				} 
			}
			
			//根据移动设置页面的值
			if(!DNmove){
				//滑动带动页面滑动
				if(move){	
					//开启声音
					if($("#car_audio").length>0&&audio_switch_btn&&Math.abs(moveP - firstP)>100){
						$("#car_audio")[0].play();
						audio_loop = true;
					}
				
					//移动中设置页面的值（top）
					start = false;

					//测试动画效果
					// var rox=(topV-v_h)/5
					// $(".m-page").eq(newM-2).animate({scale: scale,perspective:'400px',rotateX:+rox+'deg',origin:'0px'},0,'');
					// $('.m-page').css({'origin':'50% 0%'})

					var topV = parseInt($(".m-page").eq(newM-1).css("top"));
					var scale=1 - Math.abs((topV-v_h)*0.2/$(window).height());//缩放时的变量
					var ta=(topV-v_h)/5;//缩放时固定头部的变量
					//正在滑动时的状态
					if (position) {
					//当向下移动
						var topVab=Math.abs(topV);//设置绝对值
						var ta=Math.abs(topVab-v_h)/5;//缩放时固定头部的变量[ta值 0-96 ]
						var scale=1-Math.abs((topVab-v_h)*0.2/$(window).height());//缩放时的变量[1-0.8]
						//被切换页
						$(".m-page").eq(page_n-1).animate({scale: scale,translate:'0,'+ta+'px'},0,'');
						//展示页
						$(".m-page").eq(newM-1).css({'top':topV+moveP-initP});	
					}else{
					//当向上移动
						//被切换页
						$(".m-page").eq(page_n-1).animate({scale: scale,translate:'0,'+ta+'px'},0,'');
						//展示 的页面
						$(".m-page").eq(newM-1).css({'top':topV+moveP-initP});	
					}

					//查看变量
					$('.ddi').html(position+'<br> topV:'+topV+'<br> movep:'+moveP+'<br> ta:'+ta+'<br> scale:'+scale.toFixed(2))

					initP = moveP;
				}else{
					moveP = null;	
				}
			}else{
				console.log('2');
				moveP = null;	
			}
		}
	};

	//触摸结束（鼠标起来或者离开元素）开始函数
	function page_touchend(e){	
			
		//结束控制页面
		startM =null;
		p_b = false;
		
		//关闭声音
		// audio_close();
		
		//判断移动的方向
		var move_p;	
		position ? move_p = moveP - firstP > 100 : move_p = firstP - moveP > 100 ;
		if(move){
			//切画页面(移动成功状态)
			if( move_p && Math.abs(moveP) >5 ){	
				//上一页动画完成
				if(position)
					var taX="96px";
				else
					taX="-96px"
				
				//上一页的消失状态
				$(".m-page").eq(page_n-1).animate({'top':0,scale: 0.8,translate:'0,'+taX},500,'ease')

				//当前页自动完成动画
				$(".m-page").eq(newM-1).animate({'top':0,scale: 1,translate:'0,0px'},300,"easeOutSine",function(){
					
					//上一页状态初始化(该页已经不可见)
					$(".m-page").eq(page_n-1).animate({'top':0,scale: 1,translate:'0,0px'},0)
					
					//切换成功回调的函数
					success();
				})
			
				
				
			//返回页面(移动失败)
			}else if (Math.abs(moveP) >=5){	//页面退回去
				var an_time=100;//动画时间
				position ? $(".m-page").eq(newM-1).animate({'top':-v_h},an_time,"easeOutSine") : $(".m-page").eq(newM-1).animate({'top':v_h},an_time,"easeOutSine");
				
				//上一页状态初始化
				$(".m-page").eq(page_n-1).animate({scale: 1,translate:'0,0'},an_time,'ease');
				
				//延迟去除active 弹回去有动画效果
				setTimeout(function(){
					$(".m-page").eq(newM-1).removeClass("active");
				},an_time);

				start = true;
			}
		}
		/* 初始化值 */
		initP		= null,			//初值控制值
		moveP		= null,			//每次获取到的值
		firstP		= null,			//第一次获取的值
		mousedown	= null;			//取消鼠标按下的控制值
	};
/*
** 切换成功的函数
*/
	function success(){
		/*
		** 切换成功回调的函数
		*/							
		//修改完成后的状态
		$(".m-page").eq(page_n-1).removeClass("show active").addClass("hide");
		$(".m-page").eq(newM-1).removeClass("active hide").addClass("show");
		
		// 滑动成功加载多面的图片
		//lazy_bigP();
		
		//重新设置页面移动的控制值
		page_n = newM;
		start = true;

	}
