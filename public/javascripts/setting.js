function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// SHRINK NAVBAR

$(window).scroll(function() {
    if ($(document).scrollTop() > 40) {
        // console.log('scroll');
        $('nav').addClass('my-shrink-nav');
        $('#my-dropdown-menu').addClass('my-shrink-dropdown-menu');
    } else {
        $('nav').removeClass('my-shrink-nav');
        $('#my-dropdown-menu').removeClass('my-shrink-dropdown-menu');
    }
});

// Show And Hide Something When Complete Loading

function hideBeforeLoadingComplete() {
    $("footer").hide();
}

function showAfterLoadingComplete() {
    $("footer").show();
}