var score = 0;
var checkTimer = null;
var speedTimber = null;
var speedDownTimer = null;
var ul_bottom_last = 0;
var ul_bottom = 0;
var area_flag = 'yellow';
var animation_stop_flag = false;

$(document).ready(function(){
    generateElements();
});

function generateElements(){
    var r,r1,r2,r_number;
    var template = $('#template');
    for(var i=0; i<254; i++){
        var li_node = template.clone().removeClass('displayNone');
        li_node.attr('id','item' + i);
        if(i<70){
            r = Math.round(Math.random());
            r_number = randomNumber();
            r1 = r+1;
            r2 = 2-r;
//            li_node.css('background-color', 'green');
            li_node.find('.btn' + r1).attr('src', 'images/green0.png').attr('btn_type', 0).addClass('green');
            li_node.find('.btn' + r2).attr('src', 'images/green'+r_number+'.png').attr('btn_type', 5).addClass('empty');
            if(r_number>1){
                li_node.find('.btn' + r2).addClass('speed');
            }
        }else if(i<130){
            r = Math.round(Math.random());
            r_number = randomNumber();
            r1 = r+1;
            r2 = 2-r;
//            li_node.css('background-color', 'purple');
            li_node.find('.btn' + r1).attr('src', 'images/purple0.png').attr('btn_type', 0).addClass('purple');
            li_node.find('.btn' + r2).attr('src', 'images/purple'+r_number+'.png').attr('btn_type', 4).addClass('empty');
            if(r_number>1){
                li_node.find('.btn' + r2).addClass('speed');
            }
        }else if(i<180){
            r = Math.round(Math.random());
            r_number = randomNumber();
            r1 = r+1;
            r2 = 2-r;
//            li_node.css('background-color', 'blue');
            li_node.find('.btn' + r1).attr('src', 'images/blue0.png').attr('btn_type', 0).addClass('blue');
            li_node.find('.btn' + r2).attr('src', 'images/blue'+r_number+'.png').attr('btn_type', 3).addClass('empty');
            if(r_number>1){
                li_node.find('.btn' + r2).addClass('speed');
            }
        }else if(i<220) {
            r = Math.round(Math.random());
            r_number = randomNumber();
            r1 = r+1;
            r2 = 2-r;
//            li_node.css('background-color', 'yellow');
            li_node.find('.btn' + r1).attr('src', 'images/yellow0.png').attr('btn_type', 0).addClass('yellow');
            li_node.find('.btn' + r2).attr('src', 'images/yellow'+r_number+'.png').attr('btn_type', 2).addClass('empty');
            if(r_number>1){
                li_node.find('.btn' + r2).addClass('speed');
            }
        }else if(i<250) {
            r = Math.round(Math.random());
            r_number = randomNumber2();
            r1 = r+1;
            r2 = 2-r;
//            li_node.css('background-color', 'red');
            li_node.find('.btn' + r1).attr('src', 'images/red0.png').attr('btn_type', 0).addClass('red');
            li_node.find('.btn' + r2).attr('src', 'images/red'+r_number+'.png').attr('btn_type', 1).addClass('empty');
            if(r_number>1){
                li_node.find('.btn' + r2).addClass('speed');
            }
        }else{
//            li_node.css('background-color', 'red');
            li_node.find('.btn1').attr('src', 'images/red0.png').attr('btn_type', 0);
            li_node.find('.btn2').attr('src', 'images/red0.png').attr('btn_type', 0);
        }
        $('#animation').append(li_node);
    }
}

window.onload = function(){
    $('#animation').removeClass('displayNone');
    ul_bottom_last = parseInt($('#animation').height()) - parseInt(winHeight);
    ul_bottom = ul_bottom_last;

    checkTimer = window.setInterval(function(){
        $('.empty').each(function(index){
            if($(this).offset().top + $(this).height() > winHeight + 10){
                gameOver();
                return false;
            }
        });

        if($('#item0').offset().top + 10 > winHeight){
            gameOver();
        }
    }, 300);

    speedTimber = window.setInterval(function(){
        $('.imgBtn').each(function(){
            if(!animation_stop_flag && area_flag == 'yellow' && $(this).hasClass('yellow') && $(this).offset().top + $(this).height() > 0){
                ul_bottom = ul_bottom_last*2;
                $('#animation').css('bottom',  '-' + ul_bottom + 'px');
                area_flag = 'blue';
                return false;
            }else if(!animation_stop_flag && area_flag == 'blue' && $(this).hasClass('blue') && $(this).offset().top + $(this).height() > 0){
                ul_bottom = ul_bottom_last*3;
                $('#animation').css('bottom',  '-' + ul_bottom + 'px');
                area_flag = 'purple';
                return false;
            }else if(!animation_stop_flag && area_flag == 'purple' && $(this).hasClass('purple') && $(this).offset().top + $(this).height() > 0){
                ul_bottom = ul_bottom_last*4;
                $('#animation').css('bottom',  '-' + ul_bottom + 'px');
                area_flag = 'green';
                return false;
            }else if(!animation_stop_flag && area_flag == 'green' && $(this).hasClass('green') && $(this).offset().top + $(this).height() > 0){
                ul_bottom = ul_bottom_last*5;
                $('#animation').css('bottom',  '-' + ul_bottom + 'px');
                area_flag = 'red';
                return false;
            }
        });
    }, 500);

    setTimeout(function(){
//        setTimeout(function(){
            bindEvent();
            animate();
//        }, 1500);
    }, 1500);
};

function bindEvent(){
    $('.imgBtn').each(function(index){
        $(this).on('touchstart mousedown', function(e){
//        $(this).on('touchend mouseup', function(e){
            var btnType = parseInt($(this).attr('btn_type'));
            if(btnType > 0 && $(this).hasClass('speed')){
                var ul_bottom_speed = ul_bottom - ul_bottom_last;
                if(ul_bottom_speed<ul_bottom_last/2){
                    ul_bottom_speed = ul_bottom_last/2;
                }
                $('#animation').css('bottom',  '-' + ul_bottom_speed + 'px');
                speedDownTimer = window.setTimeout(function(){
                    if(!animation_stop_flag){
                        $('#animation').css('bottom',  '-' + ul_bottom + 'px');
                    }
                }, 3000);
            }
            switch (btnType){
                case 0:
                    gameOver();
                    break;
                case 1:
                    $(this).attr('btn_type', 0).attr('src','images/red0.png').removeClass('empty');
                    score = score + 50;
                    $('#scoreNumber').text(score);
                    break;
                case 2:
                    $(this).attr('btn_type', 0).attr('src','images/yellow0.png').removeClass('empty');
                    score = score + 100;
                    $('#scoreNumber').text(score);
                    break;
                case 3:
                    $(this).attr('btn_type', 0).attr('src','images/blue0.png').removeClass('empty');
                    score = score + 150;
                    $('#scoreNumber').text(score);
                    break;
                case 4:
                    $(this).attr('btn_type', 0).attr('src','images/purple0.png').removeClass('empty');
                    score = score + 200;
                    $('#scoreNumber').text(score);
                    break;
                case 5:
                    $(this).attr('btn_type', 0).attr('src','images/green0.png').removeClass('empty');
                    score = score + 300;
                    $('#scoreNumber').text(score);
                    break;
            }

            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    });

    $('#again').on('click', function(e){
        $('#mask').addClass('displayNone');
        $('#gameOver').addClass('displayNone');
        window.location.href = 'animate.html?from=timeline&isappinstalled=0';
    })
}

function gameOver(){
    animation_stop_flag = true;

    if(speedTimber){
        window.clearInterval(speedTimber);
    }
    if(speedDownTimer){
        window.clearTimeout(speedDownTimer);
    }
    if(checkTimer){
        window.clearInterval(checkTimer);
    }

    $('.imgBtn').each(function(index){
        $(this).off();
    });

//    setTimeout(function(){
        var animation_bottom = parseInt($('#animation').height()) - parseInt(winHeight) + parseInt($('#animation').offset().top);
//    $('#animation').css('transition', 'bottom 0s linear');
        $('#animation').css('bottom',  '-' + animation_bottom + 'px');
//    }, 50);

//    alert('game over!');
    $('#shareScore').text($('#scoreNumber').text());
    $('#mask').removeClass('displayNone');
    $('#gameOver').removeClass('displayNone');
}


function animate(){
    $('#readyGo').animate({
        scale:'0,0'
        },1000, 'ease-in', function(){
        $('#readyGo').addClass('displayNone');
        $('#animation').animate({
            bottom: '-' + ul_bottom_last + 'px'
        }, 180000, 'linear');
    });
}

// 1 - 5
function randomNumber(){
    var r_number = Math.round(Math.random()*40);
    if(r_number>5 || r_number==0){
        r_number = 1;
    }
    return r_number;
}

// 1 - 5
function randomNumber2(){
    var r_number = Math.round(Math.random()*50);
    if(r_number>5 || r_number==0){
        r_number = 1;
    }
    return r_number;
}