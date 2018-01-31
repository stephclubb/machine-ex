jQuery.noConflict();

(function($) {    
    $(document).ready(function() {
		
		if ($("div.inv iframe").length > 0){
			$("div.inv iframe").attr('onload','scroll(0,0)');	
		}
		
		
		// begin slideshow and tag stripping.  
		if ($("#slider").length > 0) {
			var content = $("#slider").html();
			var strippedImgs = '';
			var getImgs = /(<a[^>]*>)*(<img[^>]*>)(<\/a[ ]*>)*/gim;
			var theImgs = content.match(getImgs,"");
			$.each(theImgs, function() {
				var regex = /class=['"][a-zA-Z]*['"][ ]{1}/g;
				var slide = this.replace(regex,'');
				strippedImgs += slide;
			});
			$("#slider").html(strippedImgs);
			$('#slider').nivoSlider();
		} 
	 	// end slideshow and tag stripping				
		
		/* removes text from search form on focus and replaces it on unfocus - if text is entered then it does not get replaced with default on unfocus */
		$('#SearchForm_SearchForm_action_results').val('L');
		var searchField = $('#SearchForm_SearchForm_Search');
		var default_value = searchField.val();
		searchField.focus(function() {
			$(this).addClass('active');
			if(searchField.val() == default_value) {
				searchField.val('');
			}
		});
		searchField.blur(function() {
			  if(searchField.val() == '') {
					searchField.val(default_value);
			  }
		});
				
		if (!$.browser.msie || ($.browser.msie && (parseInt($.browser.version, 10) > 8))) {
			
			var searchBarButton = $("span.search-dropdown-icon");
			var searchBar = $('div.search-bar');
			var menuButton = $("span.nav-open-button");
			var menu = $('.header .primary ul');										 
			var mobile = false;
			var changed = false;
			
			$('body').append('<div id="media-query-trigger"></div>');
			
			function menuWidthCheck() {								  
				var header_w = $('header .inner').width();
				var elements_w = menu.width() + $('.brand').width();
				
				if ((header_w < elements_w) || ($(window).width() <= 768)) {
					$('body').addClass('tablet-nav');
				}
				else {
					$('body').removeClass('tablet-nav');				
				}
				
				mobile_old = mobile;
				if ($('#media-query-trigger').css('visibility') == 'hidden') {
					mobile = false;
				}
				else {
					mobile = true;
				}
				
				if (mobile_old != mobile) {
					changed = true;
				}
				else {
					changed = false;
				}
			}
			
			menuWidthCheck();
			
			$(window).resize(function() {
				menuWidthCheck();
				
				if (!mobile) {
					menu.show();
					searchBar.show();
				}
				else {
					if (changed) {
						menu.hide();
						searchBar.hide();	
					}
				}
			});
			
			/* toggle navigation and search in mobile view */		
			searchBarButton.click(function() {
				menu.slideUp();													 
				searchBar.slideToggle(200);
			});
			
			menuButton.click(function() {
				searchBar.slideUp();													 
				menu.slideToggle(200);
			});	

		}
		
    });
}(jQuery));
