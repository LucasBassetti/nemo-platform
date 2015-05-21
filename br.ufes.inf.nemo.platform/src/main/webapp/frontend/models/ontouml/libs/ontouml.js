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

joint.shapes.ontouml = {}

joint.shapes.ontouml.Class = joint.shapes.basic.Generic.extend({

    markup: [
        '<g class="rotatable">',
          '<g class="scalable">',
            '<rect class="name-rect"/><rect class="attrs-rect"/><rect class="methods-rect"/>',
          '</g>',
          '<text class="stereotype"/>',
          '<text class="name-text"/><text class="attrs-text"/><text class="methods-text"/>',
        '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({

        type: 'ontouml.Class',
        subType: 'Class',

        attrs: {
            rect: { 'width': 200, 'height': 100 },

            '.scalable': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#FFFFFF', }, //'fill': '#FFFC79'
            '.name-rect': {},
            '.attrs-rect': { 'display': 'none' },
            '.methods-rect': { 'display': 'none' },

            '.name-text': {
                'ref': '.name-rect', 'ref-y': .5, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'middle', 'font-weight': 'normal',
                'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
            },
            '.attrs-text': {
                'ref': '.attrs-rect', 'ref-y': 5, 'ref-x': 5,
                'fill': 'black', 'font-size': 12, 'font-family': 'Arial', 'display': 'none' 
            },
            '.methods-text': {
                'ref': '.methods-rect', 'ref-y': 5, 'ref-x': 5,
                'fill': 'black', 'font-size': 12, 'font-family': 'Arial', 'display': 'none' 
            },
            '.stereotype': {
            	'ref': '.name-rect', 'ref-y': .05, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'top', 'font-weight': 'bold',
            	'fill': 'black', 'font-size': 8, 'font-family': 'Tahoma'
            }
        },

        name: [],
        attributes: [],
        methods: []

    }, joint.shapes.basic.Generic.prototype.defaults),

    initialize: function() {

        this.on('change:name change:attributes change:methods', function() {
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
            { type: 'name', text: this.getClassName() },
            { type: 'attrs', text: this.get('attributes') },
            { type: 'methods', text: this.get('methods') }
        ];

        var offsetY = 0;

        _.each(rects, function(rect) {

            var lines = _.isArray(rect.text) ? rect.text : [rect.text];
            var rectHeight = lines.length * 20 + 20;

            attrs['.' + rect.type + '-text'].text = lines.join('\n');
            attrs['.' + rect.type + '-rect'].height = rectHeight;
            attrs['.' + rect.type + '-rect'].transform = 'translate(0,'+ offsetY + ')';
            
            offsetY += rectHeight;
        });
    }

});

joint.shapes.ontouml.ClassView = joint.dia.ElementView.extend({

    initialize: function() {

        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'update', function() {
            this.update();
            this.resize();
        });
    }
});

/** SORTALS */

//Kind
joint.shapes.ontouml.Kind = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Kind',
        subType: 'Kind',
        
        attrs: {
        	'.stereotype': { text: "\xABKind\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.KindView = joint.shapes.ontouml.ClassView;

//Subkind
joint.shapes.ontouml.Subkind = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Subkind',
        subType: 'Subkind',
        
        attrs: {
        	'.stereotype': { text: "\xABSubkind\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.SubkindView = joint.shapes.ontouml.ClassView;

//Role
joint.shapes.ontouml.Role = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Role',
        subType: 'Role',
        
        attrs: {
        	'.stereotype': { text: "\xABRole\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.RoleView = joint.shapes.ontouml.ClassView;

//Phase
joint.shapes.ontouml.Phase = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Phase',
        subType: 'Phase',
        
        attrs: {
        	'.stereotype': { text: "\xABPhase\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.PhaseView = joint.shapes.ontouml.ClassView;

//Collective
joint.shapes.ontouml.Collective = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Collective',
        subType: 'Collective',
        
        attrs: {
        	'.stereotype': { text: "\xABCollective\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.CollectiveView = joint.shapes.ontouml.ClassView;

//Quantity
joint.shapes.ontouml.Quantity = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Quantity',
        subType: 'Quantity',
        
        attrs: {
        	'.stereotype': { text: "\xABQuantity\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.QuantityView = joint.shapes.ontouml.ClassView;

/** NON-SORTALS */

//Category
joint.shapes.ontouml.Category = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Category',
        subType: 'Category',
        
        attrs: {
        	'.stereotype': { text: "\xABCategory\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.CategoryView = joint.shapes.ontouml.ClassView;

//RoleMixin
joint.shapes.ontouml.RoleMixin = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.RoleMixin',
        subType: 'RoleMixin',
        
        attrs: {
        	'.stereotype': { text: "\xABRoleMixin\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.RoleMixinView = joint.shapes.ontouml.ClassView;

//Mixin
joint.shapes.ontouml.Mixin = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Mixin',
        subType: 'Mixin',
        
        attrs: {
        	'.stereotype': { text: "\xABMixin\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.MixinView = joint.shapes.ontouml.ClassView;

/** MOMENT */

//Relator
joint.shapes.ontouml.Relator = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Relator',
        subType: 'Relator',
        
        attrs: {
        	'.stereotype': { text: "\xABRelator\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.RelatorView = joint.shapes.ontouml.ClassView;

//Mode
joint.shapes.ontouml.Mode = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Mode',
        subType: 'Mode',
        
        attrs: {
        	'.stereotype': { text: "\xABMode\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.ModeView = joint.shapes.ontouml.ClassView;

//Quality
joint.shapes.ontouml.Quality = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Quality',
        subType: 'Quality',
        
        attrs: {
        	'.stereotype': { text: "\xABQuality\xBB" }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

});
joint.shapes.ontouml.QualityView = joint.shapes.ontouml.ClassView;

/** Relationships */

joint.shapes.ontouml.Relationships = joint.dia.Link.extend({
	
	defaults: {

        type: "ontouml.Relationships",

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
            },
        },

        label: '',
        sourceMultiplicity: '',
        targetMultiplicity: '',
        flowType: "association"
    },
    
    initialize: function() {

        joint.dia.Link.prototype.initialize.apply(this, arguments);

        this.listenTo(this, 'change:flowType', this.onFlowTypeChange);
        
        this.on('add change:label change:sourceMultiplicity change:targetMultiplicity', function() {
            this.updateLabel();
        }, this);
        
        this.onFlowTypeChange(this, this.get('flowType'));
    },
    
    getLabel: function() {
        return this.get('label');
    },
    
    getSourceMultiplicity: function() {
        return this.get('sourceMultiplicity');
    },
    
    getTargetMultiplicity: function() {
        return this.get('targetMultiplicity');
    },
    
    updateLabel: function() {
    	
    	this.label(0, {
            position: .5,
            attrs: {
                rect: { fill: 'white' },
                text: { fill: 'black', 'font-size': 11, text: this.getLabel() }
            }
        });
    	
    	this.label(1, {
            position: .01,
            attrs: {
                rect: { fill: 'white' },
                text: { fill: 'black', 'font-size': 10, text: this.getSourceMultiplicity() }
            }
        });
    	
    	this.label(2, {
            position: .99,
            attrs: {
                rect: { fill: 'white' },
                text: { fill: 'black', 'font-size': 10, text: this.getTargetMultiplicity() }
            }
        });
    	
    	
    },
    
    onFlowTypeChange: function(cell, type) {

        var attrs;

        switch (type) {

        case 'association':

        	attrs = {};

            break;
        
        case 'aggregation':

            attrs = {
        		'.marker-source': {
                    d: 'M 20 8 L 10 0 L 0 8 L 10 16 z',
                    fill: '#FFF'
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
            
        case 'specialization':

            attrs = {
        		'.marker-target': {
        			d: 'M 20 0 L 0 10 L 20 20 z',
                    fill: '#FFF'                  	
                },
            };

            break; 
            
        default:

            throw "OntoUml: Unknown Connector Type: " + type;
        }

        cell.attr(_.merge({}, this.defaults.attrs, attrs));
    }
	
});
joint.shapes.ontouml.RelationshipsView = joint.dia.LinkView;