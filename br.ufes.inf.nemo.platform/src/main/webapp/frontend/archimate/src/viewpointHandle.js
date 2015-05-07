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
		//var elementNameOpacity = '.name-text/opacity';
		//var elementIconOpacity = '.object/opacity';
		
		if(notExist){
			//console.log(cell.get('type'));
			cell.attr(elementOpacity, .3);
			//cell.attr(elementNameOpacity, .3);
			//cell.attr(elementIconOpacity, .3);
		}
		else{
			cell.attr(elementOpacity, 1);
			//cell.attr(elementNameOpacity, 1);
			//cell.attr(elementIconOpacity, 1);
		}
		
	});
	
	
}