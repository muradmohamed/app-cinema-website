function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// SHRINK NAVBAR

$(window).scroll(function() {
    if ($(document).scrollTop() > 100) {
        // console.log('scroll');
        $('nav').addClass('my-shrink-nav');
    } else {
        $('nav').removeClass('my-shrink-nav');
    }
});