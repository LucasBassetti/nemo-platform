var Stencil = {};
var ns = 'http://localhost:8080/nemo-platform/ontology#';
var attr = { '.name-text': { 'font-size': 8 } };

Stencil.groups = {
		
	businessLayer: { index: 1, label: 'Business Layer' },
	applicationLayer: { index: 2, label: 'Application Layer' },
	technologyLayer: { index: 3, label: 'Technology Layer' },
	motivationalLayer: { index: 4, label: 'Motivational Layer' },
	migrationLayer: { index: 5, label: 'Migration Layer' },
	relationships: { index: 6, label: 'Relationships' },
	
};

Stencil.shapes = {

    businessLayer: [
        new joint.shapes.archimate.BusinessActor({name: 'Actor', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessRole({name: 'Role', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessCollaboration({name: 'Collaboration', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessInterface({name: 'Interface', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.Location({name: 'Location', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessProcess({name: 'Process', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessFunction({name: 'Function', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessInteraction({name: 'Interaction', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessEvent({name: 'Event', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessService({name: 'Service', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.BusinessObject({name: 'Object', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.Representation({name: 'Representation', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.Value({name: 'Value', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.Meaning({name: 'Meaning', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.Product({name: 'Product', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.Contract({name: 'Contract', namespace: ns, attrs: attr}),
    ],

	applicationLayer: [
	    new joint.shapes.archimate.ApplicationComponent({name: 'Component', namespace: ns, attrs: attr}),     
	    new joint.shapes.archimate.ApplicationCollaboration({name: 'Collaboration', namespace: ns, attrs: attr}),
	    new joint.shapes.archimate.ApplicationInterface({name: 'Interface', namespace: ns, attrs: attr}),
	    new joint.shapes.archimate.ApplicationFunction({name: 'Function', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.ApplicationInteraction({name: 'Interaction', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.ApplicationService({name: 'Service', namespace: ns, attrs: attr}),
        new joint.shapes.archimate.DataObject({name: 'Object', namespace: ns, attrs: attr}),
	],
	
	technologyLayer: [
	   new joint.shapes.archimate.Node({name: 'Node', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Device({name: 'Device', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Network({name: 'Network', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.CommunicationPath({name: 'Com. Path', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.InfrastructureInterface({name: 'Interface', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.SystemSoftware({name: 'Software', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.InfrastructureFunction({name: 'Function', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.InfrastructureService({name: 'Service', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Artifact({name: 'Artifact', namespace: ns, attrs: attr}),
	],
	
	motivationalLayer: [
	   new joint.shapes.archimate.Stakeholder({name: 'Stakeholder', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Driver({name: 'Driver', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Assessment({name: 'Assessment', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Goal({name: 'Goal', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Requirement({name: 'Requirement', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Constraint({name: 'Constraint', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Principle({name: 'Principle', namespace: ns, attrs: attr}),
	],
	
	migrationLayer: [
	   new joint.shapes.archimate.WorkPackage({name: 'Work Package', namespace: ns, attrs: { '.name-text': { 'font-size': 7 } }}),
	   new joint.shapes.archimate.Deliverable({name: 'Deliverable', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Plateau({name: 'Plateau', namespace: ns, attrs: attr}),
	   new joint.shapes.archimate.Gap({name: 'Gap', namespace: ns, attrs: attr}),
	],
	
	relationships: [
	   new joint.shapes.archimate.Junction({namespace: ns, attrs: { '.name-text': { 'font-size': 7 } }}),     
	   new joint.shapes.archimate.Group({name: 'Group', namespace: ns, attrs: attr}),
	],
    
};
