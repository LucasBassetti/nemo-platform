joint.shapes.archimate.Actor = joint.shapes.basic.Generic.extend({
	
	markup: [
		'<g class="rotatable">',
        	'<g class="scalable">',
	        	'<rect class="name-rect"/>',
				'<g id="actor" style="fill:none;stroke:#000000;stroke-width:1.2;stroke-opacity:1">',
				    '<circle id="head" cx="84.5" cy="11" r="4" />',
				    '<path d="m 84.6,15.680806 0,7.854701" id="body"/>',
				    '<path d="m 88.787592,18.145657 -8.375184,0" id="arms"/>',
				    '<path d="M 89.291844,26.663667 84.178848,22.240339" id="rightleg"/>',
				    '<path d="m 79.903848,26.663667 5.112996,-4.423328" id="leftleg"/>',
				'</g>',
			'</g>',
			'<text class="name-text"/>',
		'</g>'
	].join(''),
	
	 defaults: joint.util.deepSupplement({
		 
		 subType: 'Actor',

	        attrs: {
	        	rect: {
//	            	rx: 8,
//	                ry: 8,
	                width: 100,
	                height: 100
	            },
	            '.name-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffb5' },
	            '.name-text': {
	                'ref': '.name-rect', 'ref-y': .5, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'middle', 'font-weight': 'normal',
	                'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
	            },
	            
	        },
	        
	        name: [],
		 
	 }, joint.shapes.basic.Generic.prototype.defaults),
	
	 initialize: function() {

	        this.on('change:name', function() {
	            this.updateRectangles();
		    this.trigger('update');
	        }, this);

	        this.updateRectangles();

		 	joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
	    },

	    getClassName: function() {
	        return this.get('name');
	    },

	    updateRectangles: function() {

	        var attrs = this.get('attrs');

	        var rects = [
	            { type: 'name', text: this.getClassName() }
	        ];

	        var offsetY = 0;

	        _.each(rects, function(rect) {

	            var lines = _.isArray(rect.text) ? rect.text : [rect.text];
		    var rectHeight = lines.length * 20 + 20;

	            attrs['.' + rect.type + '-text'].text = lines.join('\n');
	            //attrs['.' + rect.type + '-rect'].height = rectHeight;
	            attrs['.' + rect.type + '-rect'].transform = 'translate(0,'+ offsetY + ')';

	            offsetY += rectHeight;
	        });
	    }

});

joint.shapes.archimate.ActorView = joint.dia.ElementView.extend({

    initialize: function() {

        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

	this.listenTo(this.model, 'update', function() {
            this.update();
            this.resize();
        });
    }
});