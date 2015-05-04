/**
 * Procedure to embed cell on another
 * @param paper
 * @param graph
 */
function embed(paper, graph){
	
	// EMBED ELEMENTS WHEN CELL POINTERUP
	paper.on('cell:pointerup', function(cellView, evt, opt) {
		
		if(cellView.model instanceof joint.shapes.basic.Generic){
			
			var cell = cellView.model;
			console.log('cell: ' + cell.get('name'));
			
			var elements = [];
			
			// GET ALL ELEMENTS
			$.each(graph.getElements(), function(index, element){	
				elements[index] = element;		
			});
			
			for(var i = elements.length-1; i >= 0; i--){
				
				// IF CELL IS EMBEDDED IN SOMO ELEMENT -> UNEMBED THEM
				if(cell.isEmbeddedIn(elements[i])){
					//console.log('UN: ' + elements[i].get('name'));
					elements[i].unembed(cell);
					
					//AJUST POSITION IF ELEMENT DOES'T HAVE MORE EMBEDDED CELLS
					if(elements[i].getEmbeddedCells().length == 0){
						adjustmentPosition(elements[i], false);
					}

				}
				
			}
			
			var position = cell.get('position');
			var size = cell.get('size');
			var area = g.rect(position.x, position.y, size.width, size.height);
			var count = 0;
			
			var hasParent = false;
			var parent = [];		
			
			// GET ALL PARENTS
			_.each(graph.getElements(), function(e) {

				var position = e.get('position');
				var size = e.get('size');
				if (e.id !== cell.id && area.intersect(g.rect(position.x, position.y, size.width, size.height))) {
					
					hasParent = true;
					parent[count] = e;
					count++;
					
				}
				
			});

			// IF HAS PARENT -> EMBED THE PARENT WITH SIZE MORE NEXT TO SIZE OF CELL
			if(hasParent){
				
				var maxParentSize = 0;
				var maxParent = -1;
				
				for(var i = 0; i < parent.length; i++){
					
					if(cell.get('z') > parent[i].get('z') && parent[i].get('z') > maxParentSize){
						maxParentSize = parent[i].get('z');
						maxParent = i;
					}
					
				}
				
				if(maxParent >= 0){			
					//console.log('EM: ' + parent[maxParent].get('name'));
					parent[maxParent].embed(cell);
					adjustmentPosition(parent[maxParent], true);
				}	
			}
		}
		
	});
	
	// AJUST PARENT POSITION WHEN REMOV A CELL
	graph.on('remove', function(cell) {

		if(cell instanceof joint.shapes.basic.Generic){
		
			var elements = [];
			
			$.each(graph.getElements(), function(index, element){		
				elements[index] = element;		
			});
			
			for(var i = elements.length-1; i >= 0; i--){
				
				if(cell.isEmbeddedIn(elements[i])){
					console.log('UN: ' + elements[i].get('name'));
					elements[i].unembed(cell);
					
					if(elements[i].getEmbeddedCells().length == 0){
						adjustmentPosition(elements[i], false);
					}

				}
				
			}
			
		}
	});
	
	// EMEBED ELEMENTS ON ADD IF A CELL IS PUTTED INSIDE A ANOTHER CELL
	graph.on('add', function(cell) {

		if(cell instanceof joint.shapes.basic.Generic){
		
			var position = cell.get('position');
			var size = cell.get('size');
			var area = g.rect(position.x, position.y, size.width, size.height);
	
			var parent;			
			_.each(graph.getElements(), function(e) {
	
				var position = e.get('position');
				var size = e.get('size');
				if (e.id !== cell.id && area.intersect(g.rect(position.x, position.y, size.width, size.height))) {
					parent = e;
				}
			});
	
	
			if(parent) {
				parent.embed(cell);
				adjustmentPosition(parent, true);
			}
		}
	});
	
	/**
	 * Procedure to adjustment position of a cell
	 */
	function adjustmentPosition(cell, embedded){
		
		if(embedded){
			if(cell.get('subType') === 'Meaning'){
				cell.attr('.name-text/ref-x', .5);
				cell.attr('.name-text/ref-y', .2);
			}
			else if(cell.get('subType') === 'Business Object' || cell.get('subType') === 'Contract' ||  cell.get('subType') === 'Product'){
				cell.attr('.name-text/ref-x', .5);
				cell.attr('.name-text/ref-y', .2);
			}
			else{
				cell.attr('.name-text/ref-x', .5);
				cell.attr('.name-text/ref-y', .01);	
			}
			
			//cell.attr('.name-text/text-anchor', "start");
			cell.attr('.name-text/y-alignment', "top");
		}
		else{
			cell.attr('.name-text/ref-x', .5);
			cell.attr('.name-text/ref-y', .5);
			cell.attr('.name-text/text-anchor', "middle");
			cell.attr('.name-text/y-alignment', "middle");
		}
		
		
	}
	
}