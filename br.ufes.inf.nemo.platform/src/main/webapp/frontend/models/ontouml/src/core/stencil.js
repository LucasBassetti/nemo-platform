var Stencil = {};

Stencil.groups = {
	sortal: { index: 1, label: 'Sortal' },
	nonSortal: { index: 2, label: 'Non-Sortal' },
	moment: { index: 3, label: 'Moment' },
};

Stencil.shapes = {

	sortal: [
         new joint.shapes.ontouml.Kind({name: 'Kind', attrs: { '.name-text': { 'font-size': 8 } }}),
         new joint.shapes.ontouml.Subkind({name: 'Subkind', attrs: { '.name-text': { 'font-size': 8 } }}),
         new joint.shapes.ontouml.Role({name: 'Role', attrs: { '.name-text': { 'font-size': 8 } }}),
         new joint.shapes.ontouml.Phase({name: 'Phase', attrs: { '.name-text': { 'font-size': 8 } }}),
         new joint.shapes.ontouml.Collective({name: 'Collective', attrs: { '.name-text': { 'font-size': 8 } }}),
         new joint.shapes.ontouml.Quantity({name: 'Quantity', attrs: { '.name-text': { 'font-size': 8 } }}),
    ],
    
    nonSortal: [
         new joint.shapes.ontouml.Category({name: 'Category', attrs: { '.name-text': { 'font-size': 8 } }}),  
         new joint.shapes.ontouml.RoleMixin({name: 'RoleMixin', attrs: { '.name-text': { 'font-size': 8 } }}),  
         new joint.shapes.ontouml.Mixin({name: 'Mixin', attrs: { '.name-text': { 'font-size': 8 } }}),  
    ],
    
    moment: [
        new joint.shapes.ontouml.Relator({name: 'Relator', attrs: { '.name-text': { 'font-size': 8 } }}),  
        new joint.shapes.ontouml.Mode({name: 'Mode', attrs: { '.name-text': { 'font-size': 8 } }}),  
        new joint.shapes.ontouml.Quality({name: 'Quality', attrs: { '.name-text': { 'font-size': 8 } }}),  
   ],

    
};
