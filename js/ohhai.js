(function() {
	
	$(document).ready(function(e) {
		
		// Event to load content when left or right arrow keys are pressed
		$(document).keydown(function(e) {
			
			// Get current section
			var visibleSection = $('section:visible');
		
	    if (e.keyCode == 37) { 
				getPrevSection(visibleSection);		// left key pressed
	      return false;
	    } else if (e.keyCode == 39) {
				getNextSection(visibleSection);		// right key pressed
				return false;
			}
		}); // end keydown
		
		// Event to load content when clicked in the TOC
		$('#toc ul').click(function(e) {
			
			e.preventDefault();
			var sectionToShow = e.target.name,
					visibleSection = $('section:visible');
			
			checkTOC($(sectionToShow));
			$(visibleSection).hide(200, function() {
				$(sectionToShow).show(200, function() {
					checkHeader(visibleSection, $(sectionToShow));
				});
			});

		}); // end click

	}); // end ready
	
	// Load the next section
	function getNextSection(section) {
		
		// Find next section
		var nextSectionIndex = $('section').index(section) + 1;
		
		// Make sure we're not at the end
		if(nextSectionIndex == $('section').length)
			nextSectionIndex = 0;
		
		// Hide current section
		$(section).hide(200, function() {
			// Slide in next section
			var nextSection = $('section')[nextSectionIndex];
			$('body').animate({scrollTop: 0}, 50);
			$(nextSection).show(300, function() { });
			
			// Check to make sure we have the right header
			checkHeader(section, nextSection);
			checkTOC(nextSection);
		});	
		
	}
	
	// Load the previous section
	function getPrevSection(section) {
		
		// Find previous section
		var prevSectionIndex = $('section').index(section) -1;
		
		// Make sure we're not at the beginning
		if (prevSectionIndex == -1)
			prevSectionIndex = $('section').length - 1;
			
			// Hide current section
			$(section).hide(200, function() {
				// Slide in next section
				var prevSection = $('section')[prevSectionIndex];
				$('body').animate({scrollTop: 0}, 50);
				$(prevSection).show(300, function() { });
				
				// Check to make sure we have the right header
				checkHeader(section, prevSection);
				checkTOC(prevSection);
			});
		
	}
	
	// Check to see the correct header is showing based on section
	function checkHeader(oldSection, newSection) {
		
		// Parse id of sections to find which one to transition to
		var newHeaderId = $(newSection).attr('id').split('-')[0];
		newHeaderId = newHeaderId.split('l')[1];
		
		var oldHeaderId = $(oldSection).attr('id').split('-')[0];
		oldHeaderId = oldHeaderId.split('l')[1];
		
		// Only do transition if sections are different
		if (oldHeaderId != newHeaderId) {
			$('header.lessonTitle').hide(200, function() {
				$('#lesson' + newHeaderId).show(200, function() {});
			});
		}
				
	}
	
	// Check that the correct section is highlighted in the TOC based on the section
	function checkTOC(section) {
		
		var sectionId = $(section).attr('id');
		
		// Remove all existing active classes
		$('#toc nav a').removeClass('active');
		
		// Apply active class to new section
		$('#toc nav a[name=#' + sectionId + ']').addClass('active');
		
	}
	
})();