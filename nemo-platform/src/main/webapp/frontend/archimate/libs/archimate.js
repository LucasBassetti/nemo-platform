if (typeof exports === 'object') {

    var joint = {
        util: require('core/rappid-api/src/core').util,
        shapes: {
            basic: require('core/rappid-api/joint.shapes.basic')
        },
        dia: {
            ElementView: require('core/rappid-api/src/joint.dia.element').ElementView,
            Link: require('core/rappid-api/src/joint.dia.link').Link
        }
    };
    var _ = require('lodash');
}


joint.shapes.archimate = {}


/** BUSINESS LAYER */

//ACTOR

joint.shapes.archimate.Actor = joint.shapes.basic.Generic.extend({
	
	markup: [
		'<g class="rotatable">',
        	'<g class="scalable">',
	        	'<rect class="name-rect"/>',	
			'</g>',
			'<g class="object" id="actor" style="fill:none;stroke:#000000;stroke-width:1.2;stroke-opacity:1">',
			    '<circle id="head" cx="-6" cy="5" r="4" />',
			    '<path d="m -6.1,9.680806 0,7.854701" id="body"/>',
			    '<path d="m -1.887592,12.145657 -8.375184,0" id="arms"/>',
			    '<path d="m -1.391844,20.663667 -5.112996,-4.423328" id="rightleg"/>',
			    '<path d="m -10.603848,20.663667 5.112996,-4.423328" id="leftleg"/>',
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
	            '.object': {
	            	'ref': '.name-rect', 'ref-y': 1, 'ref-x': 0.999, 'text-anchor': 'end',
	            }
	            
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

joint.shapes.basic.GenericView = joint.dia.ElementView.extend({
	
    initialize: function() {

        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'update', function() {
            this.update();
            this.resize();
        });
    }
});

//ROLE

joint.shapes.archimate.Role = joint.shapes.basic.Generic.extend({
	
	markup: [
		'<g class="rotatable">',
        	'<g class="scalable">',
	        	'<rect class="name-rect"/>',
			'</g>',
			'<g class="object" id="role" text-anchor="end" style="fill:none;stroke:#000000;stroke-width:1.2;stroke-opacity:1">',
				'<circle id="c" cx="-6" cy="5" r="4" />',
				'<path d="M-16,9 L-4,9 M-16,1 L-4,1"/>',
				'<path d="M-16,9 Q-20,5 -16,1"/>',
			'</g>',
			'<text class="name-text"/>',
		'</g>'
	].join(''),
	
	 defaults: joint.util.deepSupplement({
		 
		 subType: 'Role',

	        attrs: {
	        	rect: {
	                width: 100,
	                height: 100
	            },
	            '.name-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffb5' },
	            '.name-text': {
	            	'ref': '.name-rect', 'ref-y': .5, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'middle', 'font-weight': 'normal',
	                'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
	            },
	            '.object': {
	            	'ref': '.name-rect', 'ref-y': 1, 'ref-x': .999, 'text-anchor': 'end',
	            }
	            
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

//COLLABORATION

joint.shapes.archimate.Collaboration = joint.shapes.basic.Generic.extend({
	
	markup: [
		'<g class="rotatable">',
        	'<g class="scalable">',
	        	'<rect class="name-rect"/>',
//	        	'<g style="fill:none;stroke:#000000;stroke-width:1.2;stroke-opacity:1">',
//		            '<circle id="head" cx="84.5" cy="11" r="4" />',
//		            '<circle id="head" cx="89" cy="11" r="4" />',
//		        '</g>',
			'</g>',
        	'<g class="object" style="fill:none;stroke:#000;stroke-width:1.2;stroke-opacity:1">',
	            '<circle id="head" cx="-11.5" cy="5" r="4" />',
	            '<circle id="head" cx="-6" cy="5" r="4" />',
	        '</g>',
			'<text class="name-text"/>',
		'</g>'
	].join(''),
	
	 defaults: joint.util.deepSupplement({
		 
		 subType: 'Collaboration',

	        attrs: {
	        	rect: {
	                width: 100,
	                height: 100
	            },
	            '.name-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffb5' },
	            '.name-text': {
	                'ref': '.name-rect', 'ref-y': .5, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'middle', 'font-weight': 'normal',
	                'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
	            },
	            '.object': {
	            	'ref': '.name-rect', 'ref-y': 1, 'ref-x': .999, 'text-anchor': 'end',
	            }
	            
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

/** RELATIONSHIPS */

joint.shapes.archimate.Relationships = joint.dia.Link.extend({

    defaults: {

        type: "archimate.Relationships",

        attrs: {

            '.marker-source': {
                d: 'M 0 0'
            },
            '.marker-target': {
                d: 'M 0 0',
            },
            '.connection': {
                'stroke-dasharray': ' ',
                'stroke-width': 1
            },
            '.connection-wrap': {
                style: '',
                onMouseOver: '',
                onMouseOut: ''
            }
        },

        flowType: "association"
    },

    initialize: function() {

        joint.dia.Link.prototype.initialize.apply(this, arguments);

        this.listenTo(this, 'change:flowType', this.onFlowTypeChange);

        this.onFlowTypeChange(this, this.get('flowType'));
    },

    onFlowTypeChange: function(cell, type) {

        var attrs;

        switch (type) {

        case 'association':

        	attrs = {};

            break;
        
        case 'access':

            attrs = {
        		'.marker-target': {
        			d: 'M 10 0 L 0 5 L 10 10',
                    fill: 'none'                  	
                },
                '.connection': {
                	'stroke-dasharray': '4,4'
                }
            };

            break;  
            
        case 'aggregation':

            attrs = {
        		'.marker-source': {
                    d: 'M 20 8 L 10 0 L 0 8 L 10 16 z',
                    fill: '#FFF'
                }
            };

            break; 
            
        case 'assignment':

            attrs = {
        		'.marker-source': {
                    d: 'M 5, 5 m -2.5, 0 a 2.5,2.5 0 1,0 10,0 a 2.5,2.5 0 1,0 -10,0',
                    fill: '#000'
                },
	            '.marker-target': {
	            	d: 'M 5, 5 m -2.5, 0 a 2.5,2.5 0 1,0 10,0 a 2.5,2.5 0 1,0 -10,0',
	                fill: '#000'
	            }
            };

            break; 
            
        case 'composition':

            attrs = {
        		'.marker-source': {
                    d: 'M 20 8 L 10 0 L 0 8 L 10 16 z',
                    fill: '#000'
                }
            };

            break;  
            
        case 'flow':

            attrs = {
        		'.marker-target': {
                    d: 'M 10 0 L 0 5 L 10 10 z',
                    fill: '#000'
                },
                '.connection': {
                	'stroke-dasharray': '4,4'
                }
            };

            break;  
            
        case 'realization':

            attrs = {
        		'.marker-target': {
        			d: 'M 20 0 L 0 10 L 20 20 z',
                    fill: '#FFF'                  	
                },
                '.connection': {
                	'stroke-dasharray': '4,4'
                }
            };

            break; 
            
        case 'specialization':

            attrs = {
        		'.marker-target': {
        			d: 'M 20 0 L 0 10 L 20 20 z',
                    fill: '#FFF'                  	
                },
            };

            break; 
            
        case 'triggering':

            attrs = {
        		'.marker-target': {
        			d: 'M 10 0 L 0 5 L 10 10 z',
                    fill: '#000'                  	
                },
            };

            break; 
               
        case 'usedBy':

            attrs = {
        		'.marker-target': {
        			d: 'M 10 0 L 0 5 L 10 10',
                    fill: 'none'                  	
                },
            };

            break;  
            
            
            
            
            

        case 'conditional':

            attrs = {
                '.marker-source': {
                    d: 'M 20 8 L 10 0 L 0 8 L 10 16 z',
                    fill: '#FFF'
                }
            };

            break;

        case 'normal':

            attrs = {};

            break;

        case 'message':

            attrs = {
                '.marker-target': {
                    fill: '#FFF'
                },
                '.connection': {
                    'stroke-dasharray': '4,4'
                }
            };

            break;

        case 'association':

            attrs = {
                '.marker-target': {
                    d: 'M 0 0'
                },
            };

            break;

        case 'conversation':

            // The only way how to achieved 'spaghetti insulation effect' on links is to
            // have the .connection-wrap covering the inner part of the .connection.
            // The outer part of the .connection then looks like two parallel lines.
            attrs = {
                '.marker-target': {
                    d: 'M 0 0'
                },
                '.connection': {
                    'stroke-width': '7px'
                },
                '.connection-wrap': {
                    // As the css takes priority over the svg attributes, that's only way
                    // how to overwrite default jointjs styling.
                    style: 'stroke: #fff; stroke-width: 5px; opacity: 1;',
                    onMouseOver: "var s=this.style;s.stroke='#000';s.strokeWidth=15;s.opacity=.4",
                    onMouseOut: "var s=this.style;s.stroke='#fff';s.strokeWidth=5;s.opacity=1"
                }
            };

            break;

        default:

            throw "ArchiMate: Unknown Connector Type: " + type;
        }

        cell.attr(_.merge({}, this.defaults.attrs, attrs));
    }

});
