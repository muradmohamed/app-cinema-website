function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// -----------   SHRINK NAVBAR

$(window).scroll(function() {
    if ($(document).scrollTop() > 95) {
        // console.log('scroll');
        $('nav').addClass('navbar-fixed-top');
        $('nav').addClass('my-shrink-nav');
        $('#my-dropdown-menu').addClass('my-shrink-dropdown-menu');
    } else {
        $('nav').removeClass('navbar-fixed-top');
        $('nav').removeClass('my-shrink-nav');
        $('#my-dropdown-menu').removeClass('my-shrink-dropdown-menu');
    }
});

// ---------   Show And Hide Something When Complete Loading

function hideBeforeLoadingComplete() {
    $("footer").hide();
}

function showAfterLoadingComplete() {
    $("footer").fadeIn(400);
}


// -----------------   LOADER ----------------

jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
}

function showLoader() {
    $('.loader').center();
    $('.loader').fadeIn(500);
}

function hideLoader() {
    $('.loader').fadeOut(500);
}

// ----------- SCROLL TO TOP ---------------

$(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
        // console.log('scroll');
        $('#scroll-to-top').fadeIn(400);
    } else {
        $('#scroll-to-top').fadeOut(400);
    }
});

$(document).ready(function() {
    $('#scroll-to-top').click(function() {
        // console.log('scroll top');
        $('body').animate({
            scrollTop: 0
        }, 500);
    })
});


// -----------   TOGGLE INPUT SEARCH --------------

function toggleInputSearch() {
    // $('#input-search').toggleClass('input-search-show');
    $('#input-search').animate({ width: 'toggle' }, 300);
}

// ------------  FORMAT MONTH INPUT -------------