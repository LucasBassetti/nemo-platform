/**
 * @param graph
 * @param option
 */
function viewpointHanlde(graph, model){
	
	addViewpointSelectionButton();
	
	graph.on('add', function(cell){
		var option = $( '.select-viewpoint option:selected').text();
		updateCellOpacity(cell, option);
	});
	
	model.tabs.delegate( ".ui-tabs-anchor", "click", function() {
		var option = $( '.select-viewpoint option:selected').text();
		changeViewpoint(option);
	});
	
	function addViewpointSelectionButton(){
		
		var content = '<div class="btn-viewpoint">' +
			//'<label>Vp:</label>' +
			'<select class="select-viewpoint">';
		
		$.each(viewpoint, function(index, value){
			content = content + '<option value="' + index + '">' + index + '</option>'
		});
		
		content = content + '</select></div>'
		
		$('.stencil-container').prepend(content);
		$( '.select-viewpoint').change(function(){
			changeViewpoint($( '.select-viewpoint option:selected').text());
		});
		
	}
	
	
	function changeViewpoint(option){
		
		$.each(viewpoint["Total"], function(index, value){
			var elementClass = '.stencil-container .viewport .element.archimate.' + value;
			//console.log(element);
			$(elementClass).hide();
		});
		
		$.each(viewpoint[option], function (index, value) {
			var elementClass = '.stencil-container .viewport .element.archimate.' + value;
			$(elementClass).show();
		});
		
		$.each(graph.getElements(), function (index, cell) {
			updateCellOpacity(cell, option);
		});
		
	}
	
	function updateCellOpacity(cell, option){
		
		var notExist = true;
		
		$.each(viewpoint[option], function (index, value) {
			if(cell.get('type') == "archimate." + value){
				notExist = false;
			}
		});
		
		var elementOpacity = '.rotatable/opacity';
		
		if(notExist){
			cell.attr(elementOpacity, .3);
		}
		else{
			cell.attr(elementOpacity, 1);
		}
		
	}
	
}

