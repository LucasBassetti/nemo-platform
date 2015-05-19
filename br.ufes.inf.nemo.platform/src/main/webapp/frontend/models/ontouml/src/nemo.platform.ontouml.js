nemo.platform.OntoUML = Backbone.View.extend({
	
	app: undefined,
	nemoApp: undefined,
	
	initialize: function() {
		
	},

	start: function(app, nemoApp) {
		
		this.app = app;
		this.nemoApp = nemoApp;
		
		this.initializeResizingProcedures();
		
	},
	
	initializeResizingProcedures: function() {
		
		var graph = this.app.graph;
		var model = this.nemoApp.model;
		
		graph.on('add', function(cell, collection, opt) {

			if (!opt.stencil) return;
			if(cell.get('type') === 'link') return;
			
			//Set font-size
			cell.attr('.stereotype/font-size', 12);
			cell.attr('.name-text/font-size', 12);
			
			var originalSize = cell.get('size');
			
			cell.set('size', {
				width: originalSize.width * 2,
				height: originalSize.height * 2
			});
			
		});
			
	}	
	
});
