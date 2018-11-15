var _vpHeight = 0;

// When the DOM is ready, run this function
$(document).ready(function () {
    // init height
    initHeight();

    $('.app-ios').click(function() {
        window.location.href = '#';
    });

    // subscribe device resize
    pubSub.on('device-resize', deviceResizeHandler);


    // face cursor
    $(".bg-wrap").faceCursor({
        perspective: "2rem",
    });
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
