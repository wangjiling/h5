var winHeight;
var winWidth;
if (window.innerWidth)
    winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
    winWidth = document.body.clientWidth;
// 获取窗口高度
if (window.innerHeight)
    winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
    winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
if (document.documentElement && document.documentElement.clientHeight  && document.documentElement.clientWidth){
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
}
$(function(){
    $('#page').height(winHeight).css('overflow','hidden');
    adaptScreen();
});

function adaptScreen(){
    var _width = document.getElementById('page').offsetWidth;
    var _height = document.getElementById('page').offsetHeight;
    var rW = _width/640;
    var rH = _height/1136;
    var areaLendth = document.getElementsByTagName('area').length;
    for(var k=0;k<areaLendth;k++){
        var coords=document.getElementsByTagName('area')[k].getAttribute('coords');
        var arrCoords=coords.split(',');
        for(var i=0;i<arrCoords.length;i++){
            arrCoords[i]=i%2==0?parseInt(arrCoords[i]*rW):parseInt(arrCoords[i]*rH);
        }
        document.getElementsByTagName('area')[k].setAttribute('coords',arrCoords.join(','));
    }
}

function alertDialog(content){
    $.dialog({
        content : content,
        title : 'ok',
        ok : function() {},
        lock : true
    });
}