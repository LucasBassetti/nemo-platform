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
            rect: { 'width': 200 },

            '.name-rect': { 'stroke': 'black', 'stroke-width': 2, 'fill': '#3498db' },
            '.attrs-rect': { 'stroke': 'black', 'stroke-width': 2, 'fill': '#2980b9' },
            '.methods-rect': { 'stroke': 'black', 'stroke-width': 2, 'fill': '#2980b9' },

            '.name-text': {
                'ref': '.name-rect', 'ref-y': .5, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'middle', 'font-weight': 'normal',
                'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
            },
            '.attrs-text': {
                'ref': '.attrs-rect', 'ref-y': 5, 'ref-x': 5,
                'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
            },
            '.methods-text': {
                'ref': '.methods-rect', 'ref-y': 5, 'ref-x': 5,
                'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
            },
            '.stereotype': {
            	'ref': '.name-rect', 'ref-y': 1, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'top', 'font-weight': 'bold',
            	'fill': 'black', 'font-size': 8, 'font-family': 'Arial'
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

joint.shapes.ontouml.Kind = joint.shapes.ontouml.Class.extend({

    defaults: joint.util.deepSupplement({
        type: 'ontouml.Kind',
        subType: 'Kind',
        
        attrs: {
        	'.stereotype': { text: "<<Kind>>" }
//            '.uml-class-name-rect': { fill : '#f1c40f' },
//            '.uml-class-attrs-rect': { fill : '#f39c12' },
//            '.uml-class-methods-rect': { fill : '#f39c12' }
        }
    }, joint.shapes.ontouml.Class.prototype.defaults),

//    getClassName: function() {
//        return ['<<Kind>>', this.get('name')];
//    }

});
joint.shapes.ontouml.KindView = joint.shapes.ontouml.ClassView;