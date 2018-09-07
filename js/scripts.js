/*!
    Title: Dev Portfolio Template
    Version: 1.1.2
    Last Change: 03/21/17
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 1250);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    tippy('.tooltip', {
        size: 'big'
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1250);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 1250);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    var isSafari = navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/);

    $(window).scroll(function () {//Au scroll dans la fenetre on déclenche la fonction
        if ($(this).scrollTop() > 0) { 
            $('#menu').addClass("shadow"); 
            if(isSafari){
                $('header').addClass("translucent"); 
            }
            else
                $('header').addClass("opaque");
        } else{
            $('#menu').removeClass("shadow"); 
            if(isSafari)
                $('header').removeClass("translucent"); 
            else
                $('header').removeClass("opaque");
        }
        if ($(this).scrollTop() > 1500){
            $('#stars').addClass("animation-disabled"); 
            $('#stars2').addClass("animation-disabled"); 
            $('#stars3').addClass("animation-disabled"); 
        }else{
            $('#stars').removeClass("animation-disabled");
            $('#stars2').removeClass("animation-disabled");
            $('#stars3').removeClass("animation-disabled"); 
        }
    });

})(jQuery);
