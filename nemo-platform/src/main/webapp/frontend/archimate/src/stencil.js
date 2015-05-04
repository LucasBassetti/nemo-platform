var Stencil = {};

Stencil.groups = {
	businessLayer: { index: 1, label: 'Business Layer' },
	applicationLayer: { index: 1, label: 'Application Layer' },
	technologyLayer: { index: 1, label: 'Technology Layer' }
};

Stencil.shapes = {

    businessLayer: [
        new joint.shapes.archimate.Actor({name: 'Actor', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.Role({name: 'Role', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.BusinessCollaboration({name: 'Collaboration', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.BusinessInterface({name: 'Interface', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.Location({name: 'Location', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.BusinessProcess({name: 'Process', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.BusinessFunction({name: 'Function', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.BusinessInteraction({name: 'Interaction', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.BusinessEvent({name: 'Event', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.BusinessService({name: 'Service', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.BusinessObject({name: 'Object', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.Representation({name: 'Representation', attrs: { '.name-text': { 'font-size': 7 } }}),
        new joint.shapes.archimate.Value({name: 'Value', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.Meaning({name: 'Meaning', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.Product({name: 'Product', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.Contract({name: 'Contract', attrs: { '.name-text': { 'font-size': 8 } }}),
    ],

	applicationLayer: [
	    new joint.shapes.archimate.ApplicationComponent({name: 'Component', attrs: { '.name-text': { 'font-size': 8 } }}),     
	    new joint.shapes.archimate.ApplicationCollaboration({name: 'Collaboration', attrs: { '.name-text': { 'font-size': 8 } }}),
	    new joint.shapes.archimate.ApplicationInterface({name: 'Interface', attrs: { '.name-text': { 'font-size': 8 } }}),
	    new joint.shapes.archimate.ApplicationFunction({name: 'Function', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.ApplicationInteraction({name: 'Interaction', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.ApplicationService({name: 'Service', attrs: { '.name-text': { 'font-size': 8 } }}),
        new joint.shapes.archimate.DataObject({name: 'Object', attrs: { '.name-text': { 'font-size': 8 } }}),
	],
	
	technologyLayer: [
	   new joint.shapes.archimate.Node({name: 'Node', attrs: { '.name-text': { 'font-size': 8 } }}),
	   new joint.shapes.archimate.Device({name: 'Device', attrs: { '.name-text': { 'font-size': 8 } }}),
	   new joint.shapes.archimate.Network({name: 'Network', attrs: { '.name-text': { 'font-size': 8 } }}),
	   new joint.shapes.archimate.CommunicationPath({name: 'Com. Path', attrs: { '.name-text': { 'font-size': 8 } }}),
	   new joint.shapes.archimate.InfrastructureInterface({name: 'Interface', attrs: { '.name-text': { 'font-size': 8 } }}),
	   new joint.shapes.archimate.SystemSoftware({name: 'Software', attrs: { '.name-text': { 'font-size': 8 } }}),
	   new joint.shapes.archimate.InfrastructureFunction({name: 'Function', attrs: { '.name-text': { 'font-size': 8 } }}),
	   new joint.shapes.archimate.InfrastructureService({name: 'Service', attrs: { '.name-text': { 'font-size': 8 } }}),
	   new joint.shapes.archimate.Artifact({name: 'Artifact', attrs: { '.name-text': { 'font-size': 8 } }}),
	]
    
};
