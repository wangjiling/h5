var _previousScrollTop = 0;

function detectNaveBarState() {
    var scrollTop = $(window).scrollTop(),
        scrollDelta = scrollTop - _previousScrollTop;

    _previousScrollTop = scrollTop;

    if (scrollDelta < 0) {
        $('#navbar').removeClass('navbar-bg');
    } else if (scrollDelta > 0) {
        $('#navbar').addClass('navbar-bg');
    }

}

$(document).ready(function () {
    // navbar
    $('#navbar-btn').click(function () {
        if (!$(this).hasClass('nav-close')) {
            $('body').addClass('of-hidden');
            $('#navbar-collapse').addClass('ds-block fadeIn');
            $('#navbar-nav').addClass('fadeInDown');
            $(this).addClass('nav-close');
        } else {
            $('#navbar-collapse').removeClass('ds-block fadeIn');
            $('#navbar-nav').removeClass('fadeInDown');
            $(this).removeClass('nav-close');
            $('body').removeClass('of-hidden');
        }
    });

    // prevent scroll
    $('.prevent-scroll').on('touchmove', function (event) {
        event.preventDefault();
    });
});


$(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
        $('#navbar').addClass('navbar-bg');
    } else {
        $('#navbar').removeClass('navbar-bg');
    }
});