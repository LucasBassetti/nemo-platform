/**
 * @param graph
 * @param option
 */
function viewpointHanlde(graph, option){
	
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
		
	});
	
}

function addViewpointSelectionButton(graph){
	
	var content = '<div class="btn-viewpoint">' +
		//'<label>Vp:</label>' +
		'<select class="select-viewpoint">';
	
	$.each(viewpoint, function(index, value){
		content = content + '<option value="' + index + '">' + index + '</option>'
	});
	
	content = content + '</select></div>'
	
	$('.stencil-container').prepend(content);
	$( '.select-viewpoint').change(function(){
		viewpointHanlde(graph, $( '.select-viewpoint option:selected').text());
	});
	
}