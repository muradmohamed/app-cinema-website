// ----------  VALIDATE EMAIL -------------
window.validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// -----------   SHRINK NAVBAR ------------
$(window).scroll(() => {
  if ($(document).scrollTop() > 95) {
    $('nav').addClass('navbar-fixed-top');
    $('nav').addClass('my-shrink-nav');
    $('#my-dropdown-menu').addClass('my-shrink-dropdown-menu');
  } else {
    $('nav').removeClass('navbar-fixed-top');
    $('nav').removeClass('my-shrink-nav');
    $('#my-dropdown-menu').removeClass('my-shrink-dropdown-menu');
  }
});

// ---------   Show And Hide Something ---------------
window.hideBeforeLoadingComplete = () => { $('footer').hide(); };
window.showAfterLoadingComplete = () => { $('footer').fadeIn(400); };

// -------------  LOADER not CALLBACK   ----------------
window.showLoader = () => { $('.loader').fadeIn(500); };
window.hideLoader = () => { $('.loader').fadeOut(500); };

// ----------- SCROLL TO TOP ---------------
$(window).scroll(function () {
  if ($(this).scrollTop() > 1000) {
    $('#scroll-to-top').fadeIn(400);
  } else {
    $('#scroll-to-top').fadeOut(400);
  }
});

$(document).ready(() => {
  $('#scroll-to-top').click(() => {
    $('body').animate({
      scrollTop: 0
    }, 500);
  });
});

// -----------   TOGGLE INPUT SEARCH --------------
window.toggleInputSearch = () => {
  $('#input-search').animate({ width: 'toggle' }, 300);
};

// ------------ BỎ DẤU TIẾNG VIỆT -----------------
window.viToAlias = (str) => {
  if (str == null || str.length == 0) return '';
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
};
