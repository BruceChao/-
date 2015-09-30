/*
 *DOCUMENT READY
**/
var is_mobile = false;
$(document).ready(function() {

	$(".epost").each(function(i) { 
		var address = $(this).text().replace(/\s+(alfakroll)\s+/g, '@').replace(/\s+((punktum)|(dot))\s+/g, '.');
		$(this).html('<a hr' + 'ef="mai' + 'lto:' + address +'">' + address + '</a>');
	});	
	$(".contactEmployee").each(function(i) { 
		var address = $(this).text().replace(/\s+(alfakroll)\s+/g, '@').replace(/\s+((punktum)|(dot))\s+/g, '.');
		var epostTitle = $(this).attr('epostTitle');
		$(this).html('<a class="shake" hr' + 'ef="mai' + 'lto:' + address +'">' + epostTitle + '</a>');
	});	


	if(	navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
	    navigator.userAgent.match(/iPhone/i) ||
	    navigator.userAgent.match(/iPod/i) ||
	    navigator.userAgent.match(/iPad/i) ||
	    navigator.userAgent.match(/BlackBerry/)
	) {
		is_mobile = true;
		$('body').addClass('is_mobile');	
	} else {
		$('body').addClass('is_desktop');		
	}

	/*
	 * Fade In Website
	**/
	
	var $container = $("#container");
	var $wrapper = $("#wrapper");
	var $logo = $(".logo");
	
	function fadeInWrapper(fadeInCallback) {
   		fadeInCallback();
    }  
	function fadeOutWrapper(fadeOutCallback) {
		fadeOutCallback();
   		// $wrapper.addClass('fadeOutFast');
    }  
	function fadeInLoader() {
		$logo.addClass('loading');
    }   
	function fadeOutLoader() {
	    setTimeout(function(){
			$logo.removeClass('loading');
		},1500);
    }
    fadeInLoader();

	var siteURL = "http://" + top.location.host.toString();

	var $internalLinks = $("a[href^='"+siteURL+"'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#'], :not(#grid a.openProject)");
	var $internalLinksWithoutHash = $("a[href^='"+siteURL+"'], a[href^='/'], a[href^='./'], a[href^='../']");
	var $fadeLinks = $('a.fade, .fade a');
	
	$fadeLinks.click(function(e) {
		var redirection = $(this).attr('href');

		fadeOutWrapper( function(){
			location.href = redirection;			
		});
		
		fadeInLoader();
		e.preventDefault();
		
	});
	
	
	function fadeInProjects() {
		$("#projects li").delay(1000).each(function(index) {
			$(this).delay(50*index).animate({ opacity: 1}, 1000);
		});
	}
	
	fadeInProjects();
	
	/*
	 * MENU FIXATION
	**/
	if($('body').is('.home')) {

		var stickyElement = '#menubar';
	    var menuOffset = $(stickyElement)[0].offsetTop;
	
	    $(document).bind('ready scroll',function(){
	    	var docScroll = $(document).scrollTop();
	    	var topSliderHeight = $('#topSlider').height();
	    	
	    if(docScroll >= topSliderHeight){
	    	$(stickyElement).addClass('fixed');
	    } else {
	    	$(stickyElement).removeClass('fixed');
	    }
	
	    });
	
	}  
	
   
	/*
	 * LOAD MAP WHEN REACH ABOUT
	**/	
	var no=1;
	var mapLink = $('#maptoggle a').attr('title') + ".php";
	var loadMap = location.protocol + '//' + location.host + '/';

	$(window).scroll(function(){
		var windowHeight = $(window).height();
		var documentHeight = $(document).height();
		var contactHeight = $('#contact').height();
		var mapHeight = $('#mapwrapper').height();
		var scrollTop = $(window).scrollTop();
		var reachTheContact = documentHeight - mapHeight - contactHeight -  windowHeight;
		var reachTheMap = documentHeight - mapHeight -  windowHeight;
				

		if (no==1) {
			if (scrollTop > reachTheContact){
				no=2;
				$("#frame").attr("src", loadMap + mapLink);

			}			
		}
	});


	/*
	 * LOAD MAPS
	**/	
	$('#maptoggle a').click(function(e) {
		e.preventDefault();
		var mapLink = $(this).attr('title') + ".php";

		$('#maptoggle a').removeClass('active');
		$(this).toggleClass('active');
		$("#frame").attr("src", loadMap + mapLink);
	});
	
	
		/*
	 * PLAX PARALLAX
	**/
	
	
	$('#wrapper404 .plaxitem').plaxify()
	$.plax.enable({ "activityTarget": $('#wrapper404')})
	
	
	/*
	 * Swiper
	**/	
	$(function(){
	
		var slideshow = $('.slideshow').swiper({
			speed: 750,
			mode: 'horizontal',
			loop: true,
			simulateTouch: true,
			onTouchMove: function(){ 
				$('.swipeit').fadeOut(300);
			}
		});
		
		if(slideshow.isSupportTouch() == true){
			$('.swipeit').css('display', 'block');
		}
		
		$('.slideshow .prev').click(function(e) {
	        e.preventDefault()
			slideshow.swipePrev()
	    });
	    
		$('.slideshow .next').click(function(e) {
	        e.preventDefault()
			slideshow.swipeNext()
	    });
	    
	    
	    var projectslider = $('.projectSlider').swiper({
			speed: 750,
			mode: 'horizontal',
			simulateTouch: true,
			keyboardControl: true
		});
	    
		$('.projectslideshow .next').click(function(e) {
	        e.preventDefault();
			projectslider.swipeNext();
	    });
		$('.projectslideshow .prev').click(function(e) {
	        e.preventDefault();
			projectslider.swipePrev();
	    });


		function resizeProjectSlider() {
			var windowWidth = $(window).width();
			var imageHeight = $('.projectSlider ul li img').height();
			var imageWidth = $('.projectSlider ul li img').width();
			var maxWidth = $('.projectSlider ul li img').attr("width");
			var percentRatioHeight = imageHeight / imageWidth;
			var newHeight =  percentRatioHeight * windowWidth;
			var newHeight = parseInt(newHeight);


			if(imageWidth > windowWidth){
				var imageHeight = newHeight;
				var imageWidth = windowWidth;
				$('.projectSlider img').css("margin","0px");
			}
			if(imageWidth < maxWidth){
				var imageHeight = newHeight;
				var imageWidth = windowWidth;
			}
						
			$('.projectSlider ul li').each(function() {
/*
				imageHeight = $(this).children("img").attr("height")
				imageWidth = $(this).children("img").attr("width")
*/

				$('.projectSlider .swiper-slide img').height(imageHeight).width(imageWidth);

				$('.projectslideshow, .projectSlider, .projectSlider ul .swiper-slide').height(imageHeight);
				$('.projectSlider, .projectSlider ul .swiper-slide').width(imageWidth);
				
				projectslider.reInit()
			});
			
		}

	    
	/*
	 * TOP SWIPER
	**/	
		
		var topSwiper = $('#topSlider .swiper-container').swiper({
			speed: 750,
			mode: 'horizontal',
			loop: true,
			simulateTouch: false,
			keyboardControl: true,
		    onSlideChangeStart : function() {
			    $('.sliderContent');
		    },
		    onSlideChangeEnd : function() {
			    $('.sliderContent');
		    }
		});

		$('.topswiper .prev').click(function(e) {
	        e.preventDefault()
			topSwiper.swipePrev()
	    });
	    
		$('.topswiper .next').click(function(e) {
	        e.preventDefault()
			topSwiper.swipeNext()
	    });
	    

	   	    
	    var clientSwiper = $('.clientswiper').swiper({
			scrollContainer : true,
		});
		

	    var postSlider = $('.postSlider').swiper({
			scrollContainer : true,
			slidesPerSlide:'auto',
			scrollbar: {
		        container : '.postSlider .swiper-scrollbar',
		        draggable : true,
		        hide: false,
		        snapOnRelease: false
		    }
		});
	    
	    
		function resizePostSlider() {
		    var windowWidth = $(window).width();
		    var windowHeight = $(window).height();
		    var tabletWidth
		    
			if ( $(window).width() < 641) {
			   sliderHeight = 300;
			} else if ( $(window).width() < 769) {
			   sliderHeight = 400;
			} else if ( $(window).width() < 1025) {
			   sliderHeight = 500;
			} else if ( $(window).width() < 1600) {
			   sliderHeight = 600;
			} else {
			   sliderHeight = 700;
			}
			
		    var sumImgWidth = 0;
		    if (windowHeight < sliderHeight) {
			    sliderHeight = windowHeight;
		    }
		    
		    $(".postSlider .swiper-slide img").each(function() {
				var swiperSlide = $('.postSlider .swiper-slide').height();
				var newHeight = sliderHeight;
				var maxWidth = $(this).attr("width");
				var maxHeight = $(this).attr("height");
			    var aspectRatio = maxWidth / maxHeight;
			    var newWidth = parseInt(newHeight * aspectRatio); 
			    var newWidthWithMargin = newWidth + 10;
	
			    $(this).height(newHeight);

			    $(this).width(newWidth);
			    
			    $('.postSlider .swiper-slide').height(newHeight);
			    
			    		    
		        sumImgWidth += newWidthWithMargin;
		    });
	
		    var totalSum = sumImgWidth + windowWidth;	    
	
		    $(".postSlider .swiper-wrapper, .postSlider .swiper-slide").width(totalSum);
		    $(".postSlider .swiper-slide .bgImage").width(windowWidth);
		    
		    postSlider.reInit();
		}
		
		
						
		
		
		
		
		$(window).resize(function() {
			resizeProjectSlider();
		});
				
		$(window).resize();
	});
	
	

		
/*
 * QUICKSAND SORTING EMPLOYEES
**/	
	var employees = document.getElementById('employees');
	if (employees != null) { // EMPLOYEES EXIST
	
		var items = $('#employees li'),
		itemsByTags = {};
		
		/* 	Looping though all the li items: */
		items.each(function(i){
			var elem = $(this),
				tags = elem.data('tags').split(',');
			
			/* 		Adding a data-id attribute. Required by the Quicksand plugin: */
			elem.attr('data-id',i);
	
			
			$.each(tags,function(key,value){
				
				/* Removing extra whitespace: */
				value = $.trim(value);
				
				if(!(value in itemsByTags)){
				/* Create an empty array to hold this item: */
					itemsByTags[value] = [];
				}
				
				/* Each item is added to one array per tag: */
				itemsByTags[value].push(elem);
			});
			
		});
	
		/* 	Creating the "Everything" option in the menu: */
		createList('Everybody',items);
	
		/* 	Looping though the arrays in itemsByTags: */
		$.each(itemsByTags,function(k,v){
			createList(k,v);
		});
		
	
		
		$('#filter a').live('click',function(e){
			var link = $(this);
			
			link.addClass('active').siblings().removeClass('active');
			/* Using the Quicksand plugin to animate the li items.
			It uses data('list') defined by our createList function:*/
			$('#employees').quicksand(link.data('list').find('li'), {
				adjustHeight: 'auto',
				duration: 1000,
				useScaling: true,
				retainExisting: false,
				easing: 'easeInOutCubic',
			});
			e.preventDefault();
		});
	}


		
	function createList(text,items){
		
		/* This is a helper function that takes the
		text of a menu button and array of li items
		Creating an empty unordered list: */
		var ul = $('<ul>',{'class':'none'});
		
		$.each(items,function(){
			/* Creating a copy of each li item
			and adding it to the list: */
			$(this).clone().appendTo(ul);
		});

		ul.appendTo('#employee-container');

		/* Creating a menu item. The unordered list is added
		as a data parameter (available via .data('list'): */
		var a = $('<a>',{
			html: text,
			href:'#',
			data: {list:ul}
		}).appendTo('#filter');
	}


	function updateHeight() {
		if (employees != null) { // EMPLOYEES EXIST

			var link = $('#filter a.active');
		

			$('#employees').quicksand(link.data('list').find('li'), {
				adjustHeight: 'auto',
				duration: 1000,
				useScaling: true,
				retainExisting: false,
				easing: 'easeInOutCubic',
			});
		}
	}


	$(window).resize(function() {
	    if(this.resizeTO) clearTimeout(this.resizeTO);
	    this.resizeTO = setTimeout(function() {

		    updateHeight();
		    
	    }, 1000);

	});
		

	/*
	 * SMOOTH SCROLL
	**/	
	$('a#logo').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {
	
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: $('#about').offset().top - 902
	            }, 400);
	            return false;
	        }
	    }
	});

	
	$('a.smooth, .smooth a').click(function(e) {
		e.preventDefault();
		console.log('clicked a');
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {
	
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: target.offset().top - 79
	            }, 400);
	            return false;
	        }
	    }
	});


	$(function(){
		$('#submenu').delay(1000).fadeIn(500);
	});
	
	$('.toggelMenu').click(function(e) {
		$('ul#subsubmenu').css('right','-300px');
		e.preventDefault();
	});
	
	$('.menuOpen').click(function(e) {
		$('.mobilemenu').fadeIn(300);
		console.log('clicked');
		e.preventDefault();
	});
	
	$('.menuClose').click(function(e) {
		$('.mobilemenu').fadeOut(300);
		e.preventDefault();
	});
		
	$("a.moreInfoTrigger").bind('click', function(e){
	    e.preventDefault();
	    var toShow = $(this).attr('href');
	    $(toShow).stop().slideToggle(500);
	    $(this).toggleClass('open');
	});
	
	$("a.moreInfoTrigger").parent('p').css('margin', '0');		

});