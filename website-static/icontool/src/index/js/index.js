var _vpHeight = 0;

// When the DOM is ready, run this function
$(document).ready(function () {
    // init height
    initHeight();

    $('.app-ios').click(function() {
        // _hmt.push(['_trackEvent', 'btn_ios', 'click']);
        // ga('send', 'event', 'btn_ios', 'click');
        window.location.href = 'https://fir.im/icontool';
    });

    $('.app-macos').click(function() {
        // _hmt.push(['_trackEvent', 'btn_ios', 'click']);
        // ga('send', 'event', 'btn_ios', 'click');
        window.location.href = '#';
    });

    // // ios app / google play download
    // if(util.isMobile) {
    //     $('.app-ios').click(function() {
    //         // _hmt.push(['_trackEvent', 'btn_ios', 'click']);
    //         // ga('send', 'event', 'btn_ios', 'click');
    //         window.location.href = 'https://fir.im/icontool';
    //     });
    //
    //     $('.app-googleplay').click(function() {
    //         // _hmt.push(['_trackEvent', 'btn_googleplay', 'click']);
    //         // ga('send', 'event', 'btn_googleplay', 'click');
    //         window.location.href = 'https://fir.im/icontool';
    //     });
    // } else {
    //     $('.app-ios').hover(function() {
    //         $(this).siblings('.ios-qrcode').show().addClass('animated fadeIn');
    //     },function() {
    //         $(this).siblings('.ios-qrcode').hide().removeClass('animated fadeIn');
    //     });
    //
    //     $('.app-googleplay').hover(function() {
    //         $(this).siblings('.googleplay-qrcode').show().addClass('animated fadeIn');
    //     },function() {
    //         $(this).siblings('.googleplay-qrcode').hide().removeClass('animated fadeIn');
    //     });
    // }
    //
    // // android app download
    // $('.app-android').click(function() {
    //     // _hmt.push(['_trackEvent', 'btn_android', 'click']);
    //     // ga('send', 'event', 'btn_android', 'click');
    //
    //     // if(util.isWX || util.isQQ) {
    //     //     $('.download-tips').show().addClass('animated fadeIn');
    //     //     if(!$(this).hasClass('is-table')) {
    //     //         $('body').addClass('of-hidden');
    //     //         $('#mask').show().addClass('animated fadeIn');
    //     //         // setTimeout(function(){
    //     //         //     $('.download-tips').hide().removeClass('animated fadeIn');
    //     //         //     $('#mask').hide().removeClass('animated fadeIn');
    //     //         // }, 2000)
    //     //     }
    //     // } else {
    //         window.location.href = 'https://fir.im/icontool';
    //     // }
    // });

    // subscribe device resize
    pubSub.on('device-resize', deviceResizeHandler);


    // // face cursor
    // $(".bg").faceCursor({
    //     perspective: "2rem",
    // });

    // // download dialog
    // $('.btn-download').click(function () {
    //     $('#download-dialog').show().addClass('animated fadeInUp');
    // });
    //
    // $('#btn-download-close').click(function (){
    //     $('#download-dialog').animateCss('fadeOutDown', function() {
    //         $('#download-dialog').removeClass('fadeInUp').hide();
    //     });
    // });
    //
    // // download modal
    // $('#downloadModal').on('hidden.bs.modal', function (e) {
    //     $('.download-tips').hide();
    // });
});

function initHeight() {
    _vpHeight = document.documentElement.clientHeight;
    // set section height to viewport height
    $('#section-slogan').css('height', _vpHeight + 'px');
}

function deviceResizeHandler (state) {
    initHeight();
}


$(window).load(function () {
});


$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});
