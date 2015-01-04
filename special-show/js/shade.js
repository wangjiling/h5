
	var _w = $(window).width();
	var _h = $(window).height();
	$('#main').height(_h).width(_w);
	var canvas = $('#canvas');
	canvas.attr('width',_w);
	canvas.attr('height',_h);
	var context = canvas[0].getContext('2d');
	var clearing = false;
	var start,move,end,isDown;
	//判断是否能支持touch
	if('ontouchstart' in window){
		start = 'touchstart';
		move = 'touchmove';
		end = 'touchend';
	}else{
		start = 'mousedown';
		move = 'mousemove';
		end = 'mouseup';
	}

	function offsetLeft(elem){
	  return elem.offsetParent ? elem.offsetLeft + offsetLeft(elem.offsetParent) : elem.offsetLeft;
	}

	function offsetTop(elem){
	  return elem.offsetParent ? elem.offsetTop + offsetTop(elem.offsetParent) : elem.offsetTop;
	}
	function startEvent(e){
		isDown = true;
	}

	function fixEvent(e){
		var evt;
		if(e.changedTouches){
			evt = e.changedTouches[e.changedTouches.length - 1];
		}else{
			evt = e;
			evt.pageX = e.clientX + document.body.scrollLeft;
			evt.pageY = e.clientY + document.body.scrollTop;
		}
		return evt;
	}

	function getTransparentPercent(){
		var pixArray = context.getImageData(0,0,_w,_h).data;
		var len = pixArray.length;
		var k = 0;
		for(var i = 0;i < len; i = i + 4){
			if(pixArray[i] === 0 && pixArray[i+1] === 0 && pixArray[i+2] === 0 && pixArray[i+3] === 0){
				k++;
			}
		}
		return (k*100/(_w*_h)).toFixed(2);
	}

	function moveEvent(e){
		e.preventDefault();
		if(isDown){
			var evt = fixEvent(e);
			var x = evt.pageX - offsetLeft(this);
			var y = evt.pageY - offsetTop(this);
			context.beginPath();
    	context.arc(x, y, 30, 0, Math.PI * 2);
    	context.fill();
		}
	}

	function endEvent(e){
		isDown = false;
		var percent = getTransparentPercent();
		console.log(percent);
		if(percent > 30){//刮到百分比
			canvas.animate({opacity: 0.25}, 500,'ease-out');
			$("#page1").animate({opacity: 0}, 1000,'ease-out');
			setTimeout(function(){
                $("#page1").remove();
            },1000);
			var Media = document.getElementById("player");
			Media.play();
		}
	}
	//绘制模糊图片
	var img = new Image();
	img.src = 'images/start01.jpg';
	img.addEventListener('load',function(){
		context.drawImage(img,0,0,_w,_h);//绘制front图
		console.log('good good study');
		context.fillStyle = '#fff';
	  context.globalCompositeOperation = 'destination-out';
	},false);
	//绑定事件
	
	$('#page1').on(start,startEvent);
	$('#page1').on(move,moveEvent);
	$('#page1').on(end,endEvent);