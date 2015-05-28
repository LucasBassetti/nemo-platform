nemo.platform.ArchiMate = Backbone.View.extend({
	
	app: undefined,
	nemoApp: undefined,
	
	initialize: function() {
		
	},

	start: function(app, nemoApp) {
		
		this.app = app;
		this.nemoApp = nemoApp;
		
		viewpointHanlde(app.graph, nemoApp.model);
		resizing(app.graph);
		embed(app.paper, app.graph);
		attributes(app.paper, app.graph);
		//magicConnector(app.validator, app.graph);
		
	},
	
});