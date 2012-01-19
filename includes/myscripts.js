$(function(){
      
	 //assign isotope filter
      var $container = $('#portfolio');
      
      $container.isotope({
        itemSelector: '.project'
      });
	 
	//style dropdown
	$('select#selectFilter').selectmenu({style:'dropdown'});
	
	//update filter selected
	function updateFilter () {
		var selectedItem = $('select#selectFilter').val();
		$container.isotope({ filter: selectedItem });
	}
	
	//filter selection
	updateFilter();
	
	$('select#selectFilter').change(function() {
		updateFilter();		
	});
      
});