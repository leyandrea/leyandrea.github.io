jQuery(document).ready(function() {
	
	//if submit button is clicked
	jQuery('#submit').click(function () {		
		
		//Get the data from all the fields
		var name = jQuery('input[name=name]');
		var email = jQuery('input[name=email]');
		var website = jQuery('input[name=website]');
		var comment = jQuery('textarea[name=comment]');

		//Simple validation to make sure user entered something
		//If error found, add hightlight class to the text field
		if (name.val()=='') {
			name.addClass('hightlight');
			return false;
		} else name.removeClass('hightlight');
		
		if (email.val()=='') {
			email.addClass('hightlight');
			return false;
		} else email.removeClass('hightlight');
		
		if (comment.val()=='') {
			comment.addClass('hightlight');
			return false;
		} else comment.removeClass('hightlight');
		
		//disabled all the text fields
		jQuery('.text').attr('disabled','true');
		
		//show the loading sign
		jQuery('.loading').show();

		jQuery.post(MyAjax.ajaxurl, {
            	action 	: 'teo-contact-form',
            	name	: name.val(),
            	email	: email.val(),
            	comment	: comment.val(),
        	},
        	function() {
                //we sent the data, now we update the button bg color and tooltip
                jQuery('.form').fadeOut('slow');					
				jQuery('.done').fadeIn('slow');
				jQuery('.contact-form form').fadeOut('slow');
            });
					
		return false;
						
		//cancel the submit button default behaviours
	});	
});	
