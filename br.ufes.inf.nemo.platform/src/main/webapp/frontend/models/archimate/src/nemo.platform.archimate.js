nemo.platform.ArchiMate = Backbone.View.extend({
	
	app: undefined,
	nemoApp: undefined,
	
	initialize: function() {
		
	},

	start: function(app, nemoApp) {
		
		this.app = app;
		this.nemoApp = nemoApp;
		
		this.initializeViewpointProcedures(app, nemoApp);
		this.initializeResizingProcedures(app);
		this.initializeEmbedProcedures(app);
		
	},
	
	initializeEmbedProcedures : function(app) {
		
		var graph = app.graph;
		var paper = app.paper;
		
		// EMBED ELEMENTS WHEN CELL POINTERUP
		paper.on('cell:pointerup', function(cellView, evt, opt) {
			
			if(cellView.model instanceof joint.shapes.basic.Generic){
				
				var cell = cellView.model;
				//console.log('cell: ' + cell.get('name'));
				
				var elements = {};
				
				// GET ALL ELEMENTS
				$.each(graph.getElements(), function(index, element){	
					elements[index] = element;
				});
				
				$.each(elements, function(index, value){
					
					// IF CELL IS EMBEDDED IN SOME ELEMENT -> UNEMBED THEM
					if(cell.isEmbeddedIn(elements[index])){
						//console.log('UN: ' + elements[index].get('name'));
						elements[index].unembed(cell);
						
						//AJUST POSITION IF ELEMENT DOES'T HAVE MORE EMBEDDED CELLS
						if(elements[index].getEmbeddedCells().length == 0){
							adjustmentPosition(elements[index], false);
						}

					}
					
				});
				
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
			
				var elements = {};
				
				$.each(graph.getElements(), function(index, element){		
					elements[index] = element;		
				});
				
				$.each(elements, function(index, e){
					
					if(cell.isEmbeddedIn(elements[index])){
						//console.log('UN: ' + elements[index].get('name'));
						elements[index].unembed(cell);
						
						if(elements[index].getEmbeddedCells().length == 0){
							adjustmentPosition(elements[index], false);
						}

					}
					
				});
				
			}
		});
		
		// EMEBED ELEMENTS ON ADD IF A CELL IS PUTTED INSIDE A ANOTHER CELL
		graph.on('add', function(cell) {

			cell.set('embeds', "");
			cell.set('parent', "");
			adjustmentPosition(cell, false);
			
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
					if(cell.isEmbeddedIn(parent)) return;
					
					parent.embed(cell);
					adjustmentPosition(parent, true);
				}
			}
		});
		
		/**
		 * Procedure to adjustment position of a cell
		 */
		function adjustmentPosition(cell, embedded){
			
			if(cell.get('subType') === 'Group') {
				return;
			}
			
			if(embedded){
				if(cell.get('subType') === 'Meaning') {
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
		
	},
	
	initializeResizingProcedures : function(app) {
		
		var graph = app.graph;
		
		// some types of the elements need resizing after they are dropped
		graph.on('add', function(cell, collection, opt) {

			if (!opt.stencil) return;
			if(cell.get('type') === 'link') return;
			
			//Set font-size
			cell.attr('.name-text/font-size', 12);
			
			var type = cell.get('type');
			
			var originalSize = cell.get('size');
			
			if(cell.get('subType') === "Junction"){
				cell.set('size', {
					width: originalSize.width/2,
					height: originalSize.height/2
				});
			}	
			else if(cell.get('subType') === "Business Service" || cell.get('subType') === "Application Service" || cell.get('subType') === "Infrastructure Service"  || cell.get('subType') === "Value"){
				cell.set('size', {
					width: originalSize.width * 2,
					height: (originalSize.height * 2)/1.5
				});
			}
			else{
				cell.set('size', {
					width: originalSize.width * 2,
					height: originalSize.height * 2
				});
			}
			
		}, this);
		
	},
	
	initializeViewpointProcedures : function(app, nemoApp) {
		
		var graph = app.graph;
		var model = nemoApp.model;
		
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
				'<label>Viewpoint:</label>' +
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
	
});