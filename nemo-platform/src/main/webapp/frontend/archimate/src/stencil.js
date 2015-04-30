var Stencil = {};

Stencil.groups = {
	businessLayer: { index: 1, label: 'Business Layer' }
};

Stencil.shapes = {

    businessLayer: [
        new joint.shapes.archimate.Actor({name: 'Actor', attrs: { '.name-text': { 'font-size': 9 } }}),
        new joint.shapes.archimate.Role({name: 'Role', attrs: { '.name-text': { 'font-size': 9 } }}),
        new joint.shapes.archimate.Collaboration({name: 'Collaboration', attrs: { '.name-text': { 'font-size': 8 } }}),
        
//        new joint.shapes.uml.Class({ name: 'Class', attributes: ['+attr1'], methods: ['-setAttr1()'], attrs: { '.uml-class-name-text': { 'font-size': 9 }, '.uml-class-attrs-text': { 'font-size': 9 }, '.uml-class-methods-text': { 'font-size': 9 } } }),
//        new joint.shapes.uml.Interface({ name: 'Interface', attributes: ['+attr1'], methods: ['-setAttr1()'], attrs: { '.uml-class-name-text': { 'font-size': 9 }, '.uml-class-attrs-text': { 'font-size': 9 }, '.uml-class-methods-text': { 'font-size': 9 } } }),
//        new joint.shapes.uml.Abstract({ name: 'Abstract', attributes: ['+attr1'], methods: ['-setAttr1()'], attrs: { '.uml-class-name-text': { 'font-size': 9 }, '.uml-class-attrs-text': { 'font-size': 9 }, '.uml-class-methods-text': { 'font-size': 9 } } }),
//        new joint.shapes.uml.State({ name: 'State', events: ['entry/','create()'], attrs: { '.uml-state-name': { 'font-size': 10 }, '.uml-state-events': { 'font-size': 10 } } })
    ]
    
};
