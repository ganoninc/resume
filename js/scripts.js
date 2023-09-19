/*!
    Title: Dev Portfolio Template
    Version: 1.1.2
    Last Change: 03/21/17
    Author: Ryan Fitzgerald, Romain Giovanetti
    Repo: https://github.com/ganoninc/resume
    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

;(function ($) {
    // Remove no-js class
    $('html').removeClass('no-js')

    // Animate to section when nav is clicked
    $('header a').click(function (e) {
        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return

        e.preventDefault()
        var heading = $(this).attr('href')
        var scrollDistance = $(heading).offset().top

        $('html, body').animate(
            {
                scrollTop: scrollDistance + 'px',
            },
            1250,
        )

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active')
        }
    })

    // Animate to section when nav is clicked
    $('#lead-menu a').click(function (e) {
        console.log('test')
        e.preventDefault()
        var heading = $(this).attr('href')
        var scrollDistance = $(heading).offset().top

        $('html, body').animate(
            {
                scrollTop: scrollDistance + 'px',
            },
            1250,
        )
    })

    // Scroll to top
    $('#to-top').click(function () {
        $('html, body').animate(
            {
                scrollTop: 0,
            },
            1250,
        )
    })

    // Scroll to first element
    $('#lead-down span').click(function () {
        var scrollDistance = $('#lead').next().offset().top
        $('html, body').animate(
            {
                scrollTop: scrollDistance + 'px',
            },
            1250,
        )
    })

    // Create timeline
    $('#experience-timeline').each(function () {
        $this = $(this) // Store reference to this
        $userContent = $this.children('div') // user content

        // Create each timeline block
        $userContent.each(function () {
            $(this)
                .addClass('vtimeline-content')
                .wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>')
        })

        // Add icons to each block
        $this.find('.vtimeline-point').each(function () {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>')
        })

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function () {
            var location = $(this).data('location')
            if (location) {
                // Prepend if exists
                $(this)
                    .parent()
                    .prepend('<span class="vtimeline-location">' + location + '</span>')
            }
            var date = $(this).data('date')
            if (date) {
                // Prepend if exists
                $(this)
                    .parent()
                    .prepend('<span class="vtimeline-date">' + date + '</span>')
            }
        })
    })

    // Open mobile menu
    $('#mobile-menu-open').click(function () {
        $('header, body').addClass('active')
    })

    // Close mobile menu
    $('#mobile-menu-close').click(function () {
        $('header, body').removeClass('active')
    })

    $(window).scroll(function () {
        //Au scroll dans la fenetre on déclenche la fonction
        if ($(this).scrollTop() > $('#lead').height() + $('#about').height() - 25) {
            $('.stars').addClass('animation-disabled')
            $('header').addClass('visible')
            $('#mobile-menu-open').addClass('visible')
        } else {
            $('.stars').removeClass('animation-disabled')
            $('header').removeClass('visible')
            $('#mobile-menu-open').removeClass('visible')
        }
    })

    $('#show-more-experiences__button').click(function (e) {
        e.preventDefault()
        $('#show-more-experiences').hide()
        $('#experience').removeClass('partially-hidden')
        ga('send', 'event', 'UI', 'Show More', 'Experience')
    })

    $('.skill-data-type').hover(
        function () {
            $('.skill-data-type').addClass('skill-hover-event')
        },
        function () {
            $('.skill-data-type').removeClass('skill-hover-event')
        },
    )

    $('.skill-ux-type').hover(
        function () {
            $('.skill-ux-type').addClass('skill-hover-event')
        },
        function () {
            $('.skill-ux-type').removeClass('skill-hover-event')
        },
    )

    $('.skill-javascript-type').hover(
        function () {
            $('.skill-javascript-type').addClass('skill-hover-event')
        },
        function () {
            $('.skill-javascript-type').removeClass('skill-hover-event')
        },
    )

    $('.skill-MAMP-type').hover(
        function () {
            $('.skill-MAMP-type').addClass('skill-hover-event')
        },
        function () {
            $('.skill-MAMP-type').removeClass('skill-hover-event')
        },
    )

    $('.skill-other-type').hover(
        function () {
            $('.skill-other-type').addClass('skill-hover-event')
        },
        function () {
            $('.skill-other-type').removeClass('skill-hover-event')
        },
    )

    $('.skill-java-type').hover(
        function () {
            $('.skill-java-type').addClass('skill-hover-event')
        },
        function () {
            $('.skill-java-type').removeClass('skill-hover-event')
        },
    )
})(jQuery)
