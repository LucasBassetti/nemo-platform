/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Lucas Bassetti R. da Fonseca
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE. 
 */

nemo.platform.LOD = Backbone.Model.extend({

	app : undefined,
	
	//LOD VARS
	ontology : {
		prefix : "np",
		iri : "http://localhost:8080/nemo-platform/ontology#",
	},
	namespacePrefixes : {
		prefix : undefined,
		iri : undefined,
	},
	
	initialize : function() {
		
	},
	
	setApp : function(app) {
		this.app = app;
	},
	
	getWikipediaDefinition : function(cellName) {
		
		var definition = '';
		
		$.ajax({
		   type: "POST",
		   async: false,
		   url: "getDefinition.htm",
		   data: {
			   'cellName' : cellName,
		   },
		   success: function(data){
			   definition = data;
		   },
		   error : function(e) {
			   //alert("error: " + e.status);
		   }
		});
		
		return definition;
		
	},
	
	generatePropertiesDialog : function(cell) {
		
		var $this = this;
		var model = this.app.model;
		var cellName = model.cleanString(cell.get('name'));
		
		var content = '<div class=lod-properties">' +
				'IRI: (<a href="' +  cell.get('namespace') + cellName + '" target="_blank"> click here to follow the iri </a>)' +
				'<input type="text" id="lod-iri" value="' + cell.get('namespace') + cellName + '" readonly/>' + 
				'Documentation: (<a href="#" id="lod-wikipedia"> click here to get Wikipedia definition </a>)' +
					'<textarea id="lod-documentation" rows="8" value="' + cell.get('documentation') + '">' + 
					cell.get('documentation') + '</textarea>' +
			'</div>';
		
		var dialog = new joint.ui.Dialog({
			width: 500,
			type: 'neutral',
			title: 'LOD Properties',
			content: content,
			buttons: [
				{ action: 'cancel', content: 'Cancel', position: 'left' },
				{ action: 'ok', content: 'Ok', position: 'left' }
			]
		});
		
		dialog.on('action:ok', ok);
		dialog.on('action:cancel', cancel);
		dialog.open();
		
		$('#lod-wikipedia').click(function() {
			var definition = $this.getWikipediaDefinition(cell.get('name').replace(/\n/g,"").replace(/\r/g,""));
			
			definition = definition.replace(/\"/g,"")
									.replace(/\@en/g,"")
									.replace(/\&/g,"")
									.replace(/\?/g,"")
									.replace(/\\/g,"")
									.replace(/\;/g,"");
						
			$('#lod-documentation').text(definition);
			console.log('DEF: ' + definition)
		});
		
		function ok() {
			cell.set('documentation', $('#lod-documentation').val());
			dialog.close();
		}
		
		function cancel() {
			dialog.close();
		}
		
	},
	
	parseTreeToTripleFormat : function(namedGraph) {
		
		var $this = this;
		var model = this.app.model;
		var file = this.app.file;
		
		var jsonTree = model.getJSONTree();
		var jsonElements = model.getAllTreeElements(jsonTree);
		
		var triples = [];
		
		var namedGraphPredicate = '<' + $this.ontology.iri + 'isPresentIn>'
		
		$.each(jsonElements, function(index, e) {
			
			var element = $.parseJSON(JSON.stringify(e));
			
			if(element.type === 'cell' && element.data.name) {
				
				var subTypeIRI = '<' + $this.ontology.iri + element.data.subType.replace(' ', '') + '>';
				//var subTypeLabel = '"' + element.data.subType + '"';
				
				var subject = '<' + element.data.namespace + model.cleanString(element.data.name) + '>';
				
				var label = '"' + element.data.name.replace(/\n/g," ").replace(/\r/g," ") + '"';
				
				var documentation = "";
				if(element.data.documentation) {
					documentation = '"' + element.data.documentation.replace(/\n/g," ").replace(/\r/g," ") + '"';
				}
				
				triples.push(
				{
					"s" : subject,
					"p" : namedGraphPredicate,
					"o" : '<' + namedGraph + '>',
				},
				{
					"s" : subject,
					"p" : "rdf:type",
					"o" : "owl:Class",
				},	
				{
					"s" : subject,
					"p" : "rdf:type",
					"o" : "owl:NamedIndividual",
				},	
				{
					"s" : subject,
					"p" : "rdfs:subClassOf",
					"o" : subTypeIRI,
				},
				{
					"s" : subject,
					"p" : "rdfs:label",
					"o" : label,
				});
				
				if(documentation !== "") {
					console.log('Documentation: ' + documentation);
					
					triples.push({
						"s" : subject,
						"p" : "rdfs:comment",
						"o" : documentation
					});
				}
				
			}
			
			else if(element.type === 'link') {
				
				var s = model.getNode(element.data.source.id)
				var t = model.getNode(element.data.target.id)
				
				var source = $.parseJSON(JSON.stringify(s));
				var target = $.parseJSON(JSON.stringify(t));
				
				if(source.data.name && target.data.name) {
				
					var subTypeIRI = '<' + $this.ontology.iri + model.cleanString(element.data.relationshipType) + '>';
					//var subTypeLabel = '"' + element.data.relationshipType + '"';
					
					var sourceIri = '<' + source.data.namespace + model.cleanString(source.data.name) + '>';
					var targetIri = '<' + target.data.namespace + model.cleanString(target.data.name) + '>';
					
					var predicate = '<' + $this.ontology.iri + model.cleanString(element.text) + '>';
					var label = '"' + model.cleanString(element.text) + '"';
					
					if(element.relationshipType === 'specialization' || element.relationshipType === 'specialisation') {
						
						triples.push({
							"s" : sourceIri,
							"p" : 'rdfs:subClassOf',
							"o" : targetIri
						});
						
					}
					else {
						
						triples.push(
						{
							"s" : predicate,
							"p" : namedGraphPredicate,
							"o" : '<' + namedGraph + '>',
						},
						{
							"s" : predicate,
							"p" : "rdf:type",
							"o" : "owl:ObjectProperty"
						},
						{
							"s" : predicate,
							"p" : "rdfs:label",
							"o" : label
						},
						{
							"s" : predicate,
							"p" : "rdfs:subPropertyOf",
							"o" : subTypeIRI
						},
						{
							"s" : predicate,
							"p" : "rdfs:domain",
							"o" : sourceIri
						},
						{
							"s" : predicate,
							"p" : "rdfs:range",
							"o" : targetIri
						},
						{
							"s" : sourceIri,
							"p" : predicate,
							"o" : targetIri
						});
						
					}
					
				}
			}
			
		});
		
		return triples;
	},
	
	//Export to OWL
	exportToOWL : function() {
		
		var $this = this;
		var model = this.app.model;
		var file = this.app.file;
		
		var jsonTree = model.getJSONTree();
		var jsonElements = model.getAllTreeElements(jsonTree);
		
		var graph = { 
				'nodes' : [],
				'links' : [],
		}
			
		$.each(jsonElements, function(index, e) {
			
			var element = $.parseJSON(JSON.stringify(e));
			console.log('ELEMENT' + index + " :" + JSON.stringify(element));
			
			if(element.type === 'cell' && element.data.name) {
				graph['nodes'].push({
					"iri": element.data.namespace + model.cleanString(element.data.name),
					"id": element.data.id,
					"name": model.cleanString(element.data.name),
					"documentation": element.data.documentation,
				});
			}
			
			else if(element.type === 'link') {
				
				var s = model.getNode(element.data.source.id)
				var t = model.getNode(element.data.target.id)
				
				var source = $.parseJSON(JSON.stringify(s));
				var target = $.parseJSON(JSON.stringify(t));
				
				if(source.data.name && target.data.name) {
				
					var sourceIri = $this.ontology.iri + model.cleanString(source.data.name);
					var targetIri = $this.ontology.iri + model.cleanString(target.data.name);
					
					console.log('LINK: ' + JSON.stringify(element.data.label));
					
					graph['links'].push({
						"iri": $this.ontology.iri + model.cleanString(element.text),
						"id": element.data.id,
						"name": model.cleanString(element.text),
						"source": sourceIri,
						"target": targetIri
					});
					
				}
			}
			
		});
		
		$.ajax({
		   type: "POST",
		   url: "exportToOWL.htm",
		   data : {
			   "iri": $this.ontology.iri,
			   "prefix": $this.ontology.prefix,
			   "nodes": JSON.stringify(graph['nodes']),
			   "links": JSON.stringify(graph['links']),
		   },
		   success: function(data){   
			   file.openXMLWindow(data);
			   //$this.openDownloadWindows(data, "file.owl");
		   },
		   error : function(e) {
			   alert("error: " + e.status);
		   }
		});
		
	},
	
	loadOntology : function(prefix, iri) {
		
	},
	
});