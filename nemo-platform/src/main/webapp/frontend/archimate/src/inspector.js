var CommonInspectorInputs = {

    size: {
        width: { type: 'number', min: 1, max: 500, group: 'geometry', label: 'width', index: 1 },
        height: { type: 'number', min: 1, max: 500, group: 'geometry', label: 'height', index: 2 }
    },
    position: {
        x: { type: 'number', min: 1, max: 2000, group: 'geometry', label: 'x', index: 3 },
        y: { type: 'number', min: 1, max: 2000, group: 'geometry', label: 'y', index: 4 }
    },
    custom: { type: 'text', group: 'data', index: 1, label: 'Custom data', attrs: { 'label': { 'data-tooltip': 'An example of setting custom data via Inspector.' } } }
};

var CommonInspectorGroups = {

    text: { label: 'Text', index: 1 },
    presentation: { label: 'Presentation', index: 2 },
    geometry: { label: 'Geometry', index: 3 },
    data: { label: 'Data', index: 4 }
};

var CommonInspectorTextInputs = {
    'text': { type: 'textarea', group: 'text', index: 1 },
    'font-size': { type: 'range', min: 5, max: 80, unit: 'px', group: 'text', index: 2 },
    'font-family': { type: 'select', options: ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Garamond', 'Tahoma', 'Lucida Console', 'Comic Sans MS'], group: 'text', index: 3 },
    'font-weight': { type: 'range', min: 100, max: 900, step: 100, defaultValue: 400, group: 'text', index: 4 },
    'fill': { type: 'color', group: 'text', index: 5 },
    'stroke': { type: 'color', group: 'text', index: 6, defaultValue: '#000000' },
    'stroke-width': { type: 'range', min: 0, max: 5, step: .5, defaultValue: 0, unit: 'px', group: 'text', index: 7 },
    'ref-x': { type: 'range', min: 0, max: .9, step: .1, defaultValue: .5, group: 'text', index: 8 },
    'ref-y': { type: 'range', min: 0, max: .9, step: .1, defaultValue: .5, group: 'text', index: 9 }
};

var InputDefs = {
    text: { type: 'textarea', label: 'Text' },
    'font-size': { type: 'range', min: 5, max: 80, unit: 'px', label: 'Font size' },
    'font-family': { type: 'select', options: ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Garamond', 'Tahoma', 'Lucida Console', 'Comic Sans MS'], label: 'Font family' },
    'font-weight': { type: 'range', min: 100, max: 900, step: 100, defaultValue: 400, label: 'Font weight' },
    'fill': { type: 'color', label: 'Fill color' },
    'stroke': { type: 'color', defaultValue: '#000000', label: 'Stroke' },
    'stroke-width': { type: 'range', min: 0, max: 5, step: .5, defaultValue: 0, unit: 'px', label: 'Stroke width' },
    'ref-x': { type: 'range', min: 0, max: .9, step: .1, defaultValue: .5, label: 'Horizontal alignment' },
    'ref-y': { type: 'range', min: 0, max: .9, step: .1, defaultValue: .5, label: 'Vertical alignment' },
    'ref-dx': { type: 'range', min: 0, max: 50, step: 1, defaultValue: 0, label: 'Horizontal offset' },
    'ref-dy': { type: 'range', min: 0, max: 50, step: 1, defaultValue: 0, label: 'Vertical offset' },
    'dx': { type: 'range', min: 0, max: 50, step: 1, defaultValue: 0, label: 'Horizontal distance' },
    'dy': { type: 'range', min: 0, max: 50, step: 1, defaultValue: 0, label: 'Vertical distance' },
    'stroke-dasharray': { type: 'select', options: ['0', '1', '5,5', '5,10', '10,5', '3,5', '5,1', '15,10,5,10,15'], label: 'Stroke dasharray' },
    rx: { type: 'range', min: 0, max: 30, defaultValue: 1, unit: 'px', label: 'X-axis radius' },
    ry: { type: 'range', min: 0, max: 30, defaultValue: 1, unit: 'px', label: 'Y-axis radius' },
    'xlink:href': { type: 'text', label: 'Image URL' }
};

function inp(defs) {
    var ret = {};
    _.each(defs, function(def, attr) {

        ret[attr] = _.extend({}, InputDefs[attr], def);
    });
    return ret;
}

var archimateInputs = {
		
	    inputs: _.extend({
	        attrs: {
	            '.name-text': inp({
	                'font-size': { group: 'name', index: 2 },
	                'font-family': { group: 'name', index: 3 }
	            }),
	            '.name-rect': inp({
	                fill: { group: 'name', index: 4 },
	                'stroke-width': { group: 'name', index: 5, min: 0, max: 30, defaultValue: 1 },
	                'stroke-dasharray': { group: 'name', index: 6 },
	            }),
	        },
	        name: { type: 'text', group: 'name', index: 1, label: 'Name' },
	    }),
	    groups: {
	        name: { label: 'name', index: 1 },
	    }
}

var InspectorDefs = {
		
	'archimate.Relationships': {
		
		inputs: _.extend({
			label: { 
				type: 'text', group: 'label', index: 1, label: 'Label' 
			},
			flowType: {
	            type: 'select',
	            options: ['access', 'aggregation', 'assignment', 'association', 'composition', 'flow', 'realization', 'specialization', 'triggering', 'usedBy'],
	            label: 'Type',
	            group: 'general',
	            index: 2
			},
	        
		})
    },
		
    //ArchiMate
    
	'archimate.Actor': archimateInputs,	
	'archimate.Role': archimateInputs,
    'archimate.BusinessCollaboration': archimateInputs,
    'archimate.BusinessInterface': archimateInputs,
    'archimate.Location': archimateInputs,
    'archimate.BusinessProcess': archimateInputs,
    'archimate.BusinessFunction': archimateInputs,
    'archimate.BusinessInteraction': archimateInputs,
    'archimate.BusinessEvent': archimateInputs,
    'archimate.BusinessService': archimateInputs,
    'archimate.BusinessObject': archimateInputs,
    'archimate.Representation': archimateInputs,
    'archimate.Value': archimateInputs,
    'archimate.Meaning': archimateInputs,
    'archimate.Product': archimateInputs,
    'archimate.Contract': archimateInputs,
    
    'archimate.ApplicationComponent': archimateInputs,     
    'archimate.ApplicationCollaboration': archimateInputs,
    'archimate.ApplicationInterface': archimateInputs,
    'archimate.ApplicationFunction': archimateInputs,
    'archimate.ApplicationInteraction': archimateInputs,
    'archimate.ApplicationService': archimateInputs,
    'archimate.DataObject': archimateInputs,
    
	'archimate.Node': archimateInputs,
	'archimate.Device': archimateInputs,
	'archimate.Network': archimateInputs,
	'archimate.CommunicationPath': archimateInputs,
	'archimate.InfrastructureInterface': archimateInputs,
	'archimate.SystemSoftware': archimateInputs,
	'archimate.InfrastructureFunction': archimateInputs,
	'archimate.InfrastructureService': archimateInputs,
	'archimate.Artifact': archimateInputs,
	
	'archimate.Stakeholder': archimateInputs,
	'archimate.Driver': archimateInputs,
	'archimate.Assessment': archimateInputs,
	'archimate.Goal': archimateInputs,
	'archimate.Requirement': archimateInputs,
	'archimate.Constraint': archimateInputs,
	'archimate.Principle': archimateInputs,
	
	'archimate.WorkPackage': archimateInputs,
	'archimate.Deliverable': archimateInputs,
	'archimate.Plateau': archimateInputs,
	'archimate.Gap': archimateInputs,

};