// JavaScript Document


// Select Box 

 $ = jQuery.noConflict()

$("html").niceScroll({styler: "fb", cursorcolor: "#f05826", cursorwidth: '6', cursorborderradius: '10px', background: '#f05826', spacebarenabled: false, cursorborder: '', zindex: '1000'});

/*$('.select').on('click','.placeholder',function(){
  var parent = $(this).closest('.select');
  if ( ! parent.hasClass('is-open')){
    parent.addClass('is-open');
    $('.select.is-open').not(parent).removeClass('is-open');
  }else{
    parent.removeClass('is-open');
  }
}).on('click','ul>li',function(){
  var parent = $(this).closest('.select');
  parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
});*/

//Tab for next - privious tabs  page

var $tabs = $('.tabbable li');

$('#prevtab').on('click', function() {
    $tabs.filter('.active').prev('li').find('a[data-toggle="tab"]').tab('show');
});

$('.nexttab').on('click', function() {
    $tabs.filter('.active').next('li').find('a[data-toggle="tab"]').tab('show');
});


 $(document).ready(function() {
      	/*$('#searchResults').bootstrapWizard({onTabShow: function(tab, navigation, index) {
    		var $total = navigation.find('li').length;
    		var $current = index+1;
    		var $percent = ($current/$total) * 100;
    		$('#searchResults').find('.bar').css({width:$percent+'%'});
    		
    		// If it's the last tab then hide the last button and show the finish instead
    		if($current >= $total) {
    			$('#searchResults').find('.pager .next').hide();
    			$('#searchResults').find('.pager .finish').show();
    			$('#searchResults').find('.pager .finish').removeClass('disabled');
    		} else {
    			$('#searchResults').find('.pager .next').show();
    			$('#searchResults').find('.pager .finish').hide();
    		}
    		
    	}});
    	$('#searchResults .finish').click(function() {
    		//alert('Finished!, Starting over!');
    		$('#searchResults').find("a[href*='']").trigger('click');
    	});*/
    });
	
	
 // accordion
 
 function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);	


 $(".option-content").hide();
    $(".arrow-up").hide();
    $(".option-heading").click(function(){
            $(this).next(".option-content").slideToggle(500);
            $(this).find(".arrow-up, .arrow-down").toggle();
    });

 $(".car-details").hide();
  //  $(".arrow-up").hide();
    $(".open-list").click(function(){
            $(this).next(".car-details").slideToggle(500);
          //  $(this).find(".arrow-up, .arrow-down").toggle();
    });	


