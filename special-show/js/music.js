
function musicOpen(){
	var Media = document.getElementById("player")
	$(".musicIcon").addClass('musicStart');
	Media.play();
	$('.note').show().html('打开');
	setTimeout(function(){
				$('.note').hide()
	},2000);
}

function musicClose(){
	var Media = document.getElementById("player")
	$(".musicIcon").removeClass('musicStart');
	Media.pause();
	$('.note').show().html('关闭');
	setTimeout(function(){
				$('.note').hide()
	},2000);
}