function embed(paper, graph){
	
	paper.on('cell:pointerup', function(cellView, evt, opt) {
		
		if(cellView.model instanceof joint.shapes.basic.Generic){
			
			var cell = cellView.model;
			console.log('cell: ' + cell.get('name'));
			
			var elements = [];
			
			$.each(graph.getElements(), function(index, element){
				
				elements[index] = element;
				
			});
			
			for(var i = elements.length-1; i >= 0; i--){
				
				if(cell.isEmbeddedIn(elements[i])){
					console.log('UN: ' + elements[i].get('name'));
					elements[i].unembed(cell);
					
					if(elements[i].getEmbeddedCells().length == 0){
						elements[i].attr('.name-text/ref-x', .5);
						elements[i].attr('.name-text/ref-y', .5);
						elements[i].attr('.name-text/text-anchor', "middle");
						elements[i].attr('.name-text/y-alignment', "middle");
					}

				}
				
			}
			
			
			//console.log(cellView.model.id);
			var position = cell.get('position');
			var size = cell.get('size');
			var area = g.rect(position.x, position.y, size.width, size.height);
			var count = 0;
			
			var hasParent = false;
			var parent = [];			
			_.each(graph.getElements(), function(e) {

				var position = e.get('position');
				var size = e.get('size');
				if (e.id !== cell.id && area.intersect(g.rect(position.x, position.y, size.width, size.height))) {
					
					hasParent = true;
					parent[count] = e;
					count++;
					
				}
				
			});

			
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
					
					console.log('EM: ' + parent[maxParent].get('name'));

					console.log(cell.get('z'));
					console.log(parent[maxParent].get('z'));
					
					parent[maxParent].embed(cell);
					
					parent[maxParent].attr('.name-text/ref-x', .001);
					parent[maxParent].attr('.name-text/ref-y', 1);
					parent[maxParent].attr('.name-text/text-anchor', "start");
					parent[maxParent].attr('.name-text/y-alignment', "top");
					
				}	
				
			}
		}
		
	});
	
	// some types of the elements need resizing after they are dropped
	graph.on('add', function(cell, collection, opt) {

		if (!opt.stencil) return;
		if(cell.get('type') === 'link') return;
		
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
			
			//alert(JSON.stringify(parent.attr('.name-text')));
			
			parent.attr('.name-text/ref-x', .001);
			parent.attr('.name-text/ref-y', 1);
			parent.attr('.name-text/text-anchor', "start");
			parent.attr('.name-text/y-alignment', "top");
		}
	});
	
}