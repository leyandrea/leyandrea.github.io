var TeoThemes = {
    init : function() {
        jQuery('.bs-tooltip').tooltip();

        jQuery('#contact_submit').addClass('btn btn-primary');
        jQuery('p.form-submit, p.comment-notes').wrap('<div class="col-sm-12"></div>');

        this.resizeContent();
        this.initRatings();
        this.initFlexsliders();
        this.homepageShowcase();
        this.newsletter();

        jQuery('.downloads .changelog-text .text, .homepage-showcase.hidden-xs aside').mCustomScrollbar({
            horizontalScroll: false,
            scrollButtons: false,
            advanced:{
                updateOnContentResize: true,
                updateOnBrowserResize: true
            },
            mouseWheelPixels: 300,
            scrollInertia : 1000
        });

        jQuery('.downloads .changelog').click(TeoThemes.openChangelog);
        jQuery('.downloads .changelog-text .close').click(TeoThemes.closeChangelog);

        jQuery('.login-container .checkbox').on('click', function(event) {
            var checkboxValue =  jQuery(this).find('.fa').css('opacity');
            if(checkboxValue == '1') {
                jQuery(this).find('.fa').css('opacity','0');
                jQuery('#subscribe').val('false');
            } else {
                jQuery(this).find('.fa').css('opacity','1');
                jQuery('#subscribe').val('true');
            }
        });

        jQuery('.add-theme').on('click', function() {
            jQuery('.add-theme-form').fadeToggle(400);
        });
    },
    openChangelog : function(e) {
        var el = jQuery(this);
        var id = el.attr('rel');
        var selected = jQuery('.changelog-row[rel="'+id+'"]');
        if(!selected.is(":visible")) {
            selected.fadeIn('500', function() {
                jQuery(this).find('.text').mCustomScrollbar('update');
            });
        }
        e.preventDefault();
    },
    newsletter: function() {
        // PREPARE THE NEWSLETTER AND SEND DATA TO MAILCHIMP
        jQuery('.not_subscribed').submit(function() {
            var form = jQuery(this),
                form_fname = form.find('.user_fname'),
                form_lname = form.find('.user_lname'),
                form_email = form.find('.user_email'),
                ret = 0;

            if (form_fname.val()=='') {
                form_fname.addClass('highlight');
                ret = 1;
            } else form_fname.removeClass('highlight');
            
            if (form_lname.val()=='') {
                form_lname.addClass('highlight');
                ret = 1;
            } else form_lname.removeClass('highlight');
            
            if (form_email.val()=='') {
                form_email.addClass('highlight');
                ret = 1;
            } else form_email.removeClass('highlight');

            if(ret === 1) {
                return false;
            }

            jQuery.post(MyAjax.ajaxurl, {
                    action: 'newsletter-add',
                    fname: form_fname.attr('value'),
                    lname: form_lname.attr('value'),
                    email: form_email.attr('value')
                },
                function(){
                    form.find('.submit_newsletter').prop('disabled', true);
                    form_fname.prop('disabled', true);
                    form_lname.prop('disabled', true);
                    form_email.prop('disabled', true);
                    form.find('.newsletter_subscribed').fadeIn();
                }
            );
            return false;
        });
    },
    closeChangelog : function(e) {
        var el = jQuery(this);
        var id = el.attr('rel');
        var selected = jQuery('.changelog-row[rel="'+id+'"]');
        if(selected.is(":visible")) {
            selected.fadeOut('300');
        }
        e.preventDefault();
    },
    resizeContent : function() {
        jQuery('body').css('padding-top', jQuery('.navbar').outerHeight()+"px");
        jQuery('.main-container').css('min-height', jQuery(window).height() - jQuery('.navbar').outerHeight() - jQuery('.page-title').outerHeight() - jQuery('.main-footer').outerHeight() - jQuery('.copyright').outerHeight());
    },
    initIsotope : function() {
        var $container = jQuery('.themes').isotope({
            // options
            itemSelector : '.theme-item',
            layoutMode : 'fitRows'
        });
        jQuery('.themes-selector a').click(function() {
            jQuery('.themes-selector').find('.active').removeClass('active');
            var $el = jQuery(this);
            $el.parent().addClass('active');
            var selector = $el.attr('data-filter');
            $container.isotope({ filter: selector });
            return false;
        });
    },
    initRatings : function() {
        jQuery('.raty').raty({
            starHalf    : 'http://teothemes.com/website/wp-content/themes/teothemes/img/star-half.png',
            starOff     : 'http://teothemes.com/website/wp-content/themes/teothemes/img/star-off.png',
            starOn      : 'http://teothemes.com/website/wp-content/themes/teothemes/img/star-on.png',
            hints : ['', '', '', '', ''],
            size : 26,
            readOnly : true,
            score: function() {
                return jQuery(this).attr('data-score');
            }
        });
        jQuery('.raty-grey').raty({
            starHalf    : 'http://teothemes.com/website/wp-content/themes/teothemes/img/star-half-grey.png',
            starOff     : 'http://teothemes.com/website/wp-content/themes/teothemes/img/star-off-grey.png',
            starOn      : 'http://teothemes.com/website/wp-content/themes/teothemes/img/star-on-grey.png',
            hints : ['', '', '', '', ''],
            size : 26,
            readOnly : true,
            score: function() {
                return jQuery(this).attr('data-score');
            }
        });
    },
    initFlexsliders : function() {
        jQuery('.testimonial-slider').flexslider({
            animation: "fade",
            controlNav: true,
            directionNav : false,
            animationLoop: true,
            slideshow: true,
            slideshowSpeed: 5000
        });
        jQuery('.screenshots-slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        jQuery('.theme-slider .slider-controls .left').click(function() {
            jQuery('.screenshots-slider').flexslider('prev');
        });
        jQuery('.theme-slider .slider-controls .right').click(function() {
            jQuery('.screenshots-slider').flexslider('next');
        });
        jQuery('.image-slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        jQuery('.image-slider .slider-controls .left').click(function() {
            jQuery('.image-slider').flexslider('prev');
        });
        jQuery('.image-slider .slider-controls .right').click(function() {
            jQuery('.image-slider').flexslider('next');
        });
        jQuery('.twitter-slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        jQuery('.twitter-line .slider-controls .left').click(function() {
            jQuery('.twitter-slider').flexslider('prev');
        });
        jQuery('.twitter-line .slider-controls .right').click(function() {
            jQuery('.twitter-slider').flexslider('next');
        });
        jQuery('.activity-wrap').flexslider({
            animation: "fade",
            controlNav: false,
            directionNav : false,
            animationLoop: false,
            slideshow: false
        });
        jQuery('.activity-widget .slider-controls .left').click(function() {
            jQuery('.activity-wrap').flexslider('prev');
        });
        jQuery('.activity-widget .slider-controls .right').click(function() {
            jQuery('.activity-wrap').flexslider('next');
        });
        TeoThemes.initFlexByName(jQuery('.homepage-showcase.hidden-xs .theme-detail:visible'));
    },
    initFlexByName : function(el) {
        el.find('.homepage-slider').flexslider({
            animation: "fade",
            controlNav: false,
            directionNav : false,
            animationLoop: true,
            slideshow: false
        });
        el.find('.slider-controls .left').click(function() {
            el.find('.homepage-slider').flexslider('prev');
        });
        el.find('.slider-controls .right').click(function() {
            el.find('.homepage-slider').flexslider('next');
        });
    },
    homepageShowcase : function() {
        var showcase = jQuery('.homepage-showcase.hidden-xs');
        showcase.find('.theme-names').find('button').click(function(e) {
            var el = jQuery(this);
            var id = el.attr("rel");
            showcase.find('.theme-names').find('.active').removeClass('active');
            el.parent().addClass('active');
            showcase.find('.theme-detail:visible').fadeOut(400, function() {
                jQuery(this).find('.homepage-slider').flexslider('destroy');
                showcase.find('.theme-detail[rel="'+id+'"]').fadeIn(400, function() {
                    TeoThemes.initFlexByName(jQuery(this));
                });
            });
            e.preventDefault();
        });
    }
};
jQuery(document).ready(function() {
   TeoThemes.init();
});
jQuery(window).load(function() {
   TeoThemes.initIsotope();
});
jQuery(window).resize(function() {
   TeoThemes.resizeContent();
});