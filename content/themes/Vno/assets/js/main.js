$(document).ready(function() {

  $('body').removeClass('no-js');

  $('a.blog-button').click(function() {
    // If already in blog, return early without animate overlay panel again.
    if (location.hash && location.hash == "#blog") return;
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
    $('.main-post-list').removeClass('hidden');
    currentWidth = $('.panel-cover').width();
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed');
      $('.content-wrapper').addClass('animated slideInRight');
    } else {
      $('.panel-cover').css('max-width',currentWidth);
      $('.panel-cover').animate({'max-width': '700px', 'width': '30%'}, 400, swing = 'swing', function() {} );
    }
  });

  if (window.location.hash && window.location.hash == "#blog") {
    $('.panel-cover').addClass('panel-cover--collapsed');
    $('.main-post-list').removeClass('hidden');
  }

  if (window.location.pathname.substring(0, 5) == "/tag/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu__icon').click(function() {
    if ($('.navigation-wrapper').css('display') == "block") {
      $('.navigation-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
      });
      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

    } else {
      $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    }
    $('.btn-mobile-menu__icon').toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
  });

  $('.navigation-wrapper .blog-button').click(function() {
    if ($('.navigation-wrapper').css('display') == "block") {
      $('.navigation-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
      });

      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');
    }
    
    $('.btn-mobile-menu__icon').toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
  });
});
$(document.links).filter(function() {
    return this.hostname != window.location.hostname;
}).attr('target', '_blank');

    /*返回顶部*/
    var STR_TO_TOP='我要飞到最高';
    var coverHeight=$(window).height();//获得图片高度
        $('.cover-slide-more').click(function(){
            $('html,body').animate({scrollTop:coverHeight},500);
            return false;
        })
        $('.cover-slide-more').hover(function(){
            cleanMask();
            $(this).addClass('hoverLight');
            $('.post-cover-info').addClass('animated fadeOutUp');
            $('.cover-slide-more h4').show().addClass('animated fadeInDown');
        },function(){
            console.log('重现');
            $(this).removeClass('hoverLight');
            $('.post-cover-info').removeClass('fadeOutUp');
            $('.post-cover-info').addClass('fadeInDown');
            $('.cover-slide-more h4').hide();
        });

    $(function(){
     var button = $('<a href="#" id="to-top" title="' + STR_TO_TOP + '">↑</a>').appendTo('body');
     $(window).scroll(function(){
            if($(window).scrollTop()>$(window).height()) button.fadeIn(500);
            else button.fadeOut(500);
     });

     button.click(function(e){
        e.preventDefault();
        $('html,body').animate({
            scrollTop:coverHeight-100
        },1000,function(){
            window.location.hash='#';
        });
        console.log('我跳');
     })
    })

/*判断是否是站内连接*/

function isSiteDomain(url){

}

/*模拟键盘上下滚动*/
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '74') {
        $('html,body').stop();
        $('html,body').animate({
            scrollTop: $(window).stop().scrollTop() + 200
        },'fast')
    }
    else if (e.keyCode == '75') {
        $('html,body').stop();
        $('html,body').animate({
            scrollTop: $(window).stop().scrollTop() - 200
        },'fast')
    }

}

function cleanMask(){
 $('.post-header-mask').css('opacity','0');
}

$('.post-cover-info').hover(function(){
    console.log('清楚遮罩');
    cleanMask();
})