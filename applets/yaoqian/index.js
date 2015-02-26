new Image().src="decode.png";
new Image().src="234.png";
var start, showDecode, jumpToDecode, lastTime, lastAcc, isStarted = false;

start = function() {
	isStarted = true;
	$('.decode').hide();
	$('.result').show();
	setTimeout(showDecode, 3000);
};

showDecode = function(){
	$('.result').hide();
	$('.decode').show();
	setTimeout(jumpToDecode, 3000);
};

jumpToDecode = function(){
	var urls = ["http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205750406&idx=1&sn=b481dae8c2afa07b694b89ea982e0b73#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751001&idx=1&sn=674215907b5b747dd0a278f169594423#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205750406&idx=1&sn=b481dae8c2afa07b694b89ea982e0b73#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751416&idx=1&sn=5b0010a2198dc49e3d23d331095df7c3#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751457&idx=1&sn=bba680dd5d7cf9c58f88e7ee74758c8e#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751552&idx=1&sn=98477ae938a05d10d22cfd95072945f6#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751607&idx=1&sn=76fe6d9aa2843643ff5eefbf2556ac10#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751653&idx=1&sn=a98d9f059d8364a09be887af5d1c6aac#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751712&idx=1&sn=a2201071a4b646d77b18a1c42c2c0f0d#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751858&idx=1&sn=b143fe6c430e5f125c4e83dc9ff9bbe5#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751913&idx=1&sn=bf1e79ed87452576c33ff3ffb9574585#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205751958&idx=1&sn=5d5dbb07e1866a56db6a90b81af81ce5#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752008&idx=1&sn=3a55b612248acbd7103833fc736fafb2#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752068&idx=1&sn=b2f6685d4f626b9d85d71b78eca2fe90#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752120&idx=1&sn=4a24f7a4c83f8da5ffd6bf052dfa69ef#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752176&idx=1&sn=5d20296f627b7eccbb7f7b4defe489f3#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752216&idx=1&sn=e2018076a9d05e0fba02984e855b33d2#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752287&idx=1&sn=cc1bcd83d464b8f8c15f3b025e6a7192#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752345&idx=1&sn=e06579635d7544d9f33e16a564cb9cad#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752405&idx=1&sn=3b86d3e190dc53e880231fcc575834d6#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752433&idx=1&sn=79798ebe3c9472b7aff63bdf2439b4b8#rd",
				"http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=205752459&idx=1&sn=c5031745b19c77ae50c906c033836933#rd"
				];
	var jumpTo = urls[parseInt(Math.random() * urls.length)];
	window.location = jumpTo;
};

$('.do').click(start);

//摇一摇
$(window).on('deviceorientation', function(e) {
	if (isStarted) {
		return true;
	}
	if (!lastAcc) {
		lastAcc = e;
		return true;
	}
	var speed = e.alpha + e.beta + e.gamma - lastAcc.alpha - lastAcc.beta - lastAcc.gamma;
	if (Math.abs(speed) > 360) {
		start();
	}
	lastAcc = e;
});