//// Sidebar Menu ////
$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
        document.getElementById("mySidenav").style.width = "0";
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
        document.getElementById("mySidenav").style.width = "250px";
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });

});
// Parallex Scrolling Header Fade //
  $(window).on('load scroll', function () {
    var scrolled = $(this).scrollTop();
    $('.home-intro').css({
      'transform': 'translate3d(0, ' + -(scrolled * .30) + 'px, 0)', // parallax (40% scroll rate)
      'opacity': 1 - scrolled / 550 // fade out at 600px from top
    });
    $('.parallax').css({
      'transform': 'translate3d(0, ' + -(scrolled * .15) + 'px, 0)', // parallax (40% scroll rate)
    });



  });
