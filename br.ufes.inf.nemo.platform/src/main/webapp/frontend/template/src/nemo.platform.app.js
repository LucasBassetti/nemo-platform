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

nemo.platform.App = Backbone.View.extend({
	
	model : undefined,
	
	initialize : function(){
		console.log("INITIALIZE APP!");
	},
	
	start : function(app, stencil) {

		console.log("START APP!");
		
		//create model
		this.model = new nemo.platform.Model;
		
		//set stencil
		this.model.setStencil(stencil);
		
		//initialize model
		this.model.newTab("diagram1", app.graph);
		
		this.initializeToolbarButtonsProcedures(app);
		this.initializeTreeProcedures(app);
		this.initializeTabsProcedures(app);
		this.initializeGraphProcedures(app);
		this.initializePaperProcedures(app);
		this.initializeRelationshipsProcedures(app);
		this.initializeLikedDataProcedures(app);
		
		//Open from url
		if (this.model.getUrlParameter('model')) {
			var filename = this.model.getUrlParameter('model');
			this.model.openTree(filename);
		}
		
	},
	
	/**
	 * Toolbar Buttons procedures
	 */
	initializeToolbarButtonsProcedures : function(app) {
		
		var graph = app.graph;
		var paper = app.paper;
		var model = this.model;
		
		//SaveAs tree
		$('#btn-saveAs').click(function(){
			model.updateCurrentTab(graph);
			model.saveAsTree();
		});
		
		//Save tree
		$('#btn-save').click(function(){
			model.updateCurrentTab(graph);
			if($('#filename').val() === "") {
				model.saveAsTree();
			} 
			else {
				model.saveTree();
			}
		});
		
		//Open tree
		$('#btn-open').click(function(){
			model.openTreeFromDialog();
		});
		
		//Show inpector paper when click on blank position  
		paper.on('blank:pointerclick', function(evt, x, y) {
			$('.inspector-paper').show();
			$('.inspector-container').hide();
		});
		
		//Show inpector container when click on cell position
		paper.on('cell:pointerclick', function(cellView, evt, opt) {
			$('.inspector-paper').hide();
			$('.inspector-container').show();
		});	
		
	},
	
	/**
	 * Tree procedures
	 */
	initializeTreeProcedures : function(app) {
		
		var graph = app.graph;
		var model = this.model;
		
		//Handle with delete nodes on tree
		$ui('.inspector-paper').on('delete_node.jstree', function (e, data) {
			
			$.each(data.node.children_d, function(index, nodeId){
				var node = model.getNode(nodeId);
				deleteNode(node);
			});
			
			deleteNode(data.node);
			
			function deleteNode(node){
				
				//Diagram
				if(model.isDiagram(node)){
					$( "#tabs #" + node.id ).closest( "li" ).remove().attr( "aria-labelledby" );
					
					//delete tab and clear current tab index if is the current tab
					model.deleteTab(node.id);
					if(model.isCurrentTabIndex(node.id)){
						model.clearCurrentTabIndex();
					}
					
					//refresh tabs
					$ui("#tabs").tabs("refresh");
					var num_tabs = $("div#tabs ul li").length;
					
					//get current tab view
			        var currentTabIndex = $(".ui-tabs-active").find("a").attr("id");
			        $ui('#' + currentTabIndex).click();
			        
			        //if number of tabs < 1, clear the graph
			        if (num_tabs < 1) {
			            $("#tabs").hide();
			            graph.clear();
			        }
				}
				
				//Cell or Link
				else if (model.isCell(node) || model.isLink(node)){
					cellId = node.id
					console.log("DELETE: " + node.text);
					
					//if tab is the current, update it
					var currentTabIndex = $(".ui-tabs-active").find("a").attr("id");
					if(model.isCurrentTabIndex(currentTabIndex)) {
						model.updateCurrentTab(graph);
					}
					
					//delete cell in all graphs
					model.deleteGraphsCell(cellId, graph);
					
					//load the updated current tab
					model.updateCurrentGraph(graph);
					
					if (model.isCell(node)){
						model.deleteTreeConnectedLinks(cellId);
					}
				} 
				
			}
			
		});
		
		
		/*
		 * ====================================
		 *  DRAG TREE/PAPER PROCEDURE
		 * ====================================
		 */
		
		var X1 = 0, Y1 = 0;
		var X2 = 0, Y2 = 0;
		var paperPosition = {};
		
		//Get mouse position on document
		$(document).mousemove(function(e){
			X1 = e.pageX;
			Y1 = e.pageY
		})

		//Get mouse position on paper
		$(".paper").mousemove(function(e){
			X2 = e.pageX;
			Y2 = e.pageY
			
			var pos   = $(this).offset();
		    var elPos = { X: pos.left , Y: pos.top };
		    paperPosition  = { X: e.clientX-elPos.X, Y: e.clientY-elPos.Y };
		});
		
		//When  drag a node (cell) element on paper;
		$ui(document).on('dnd_stop.vakata', function (e, data) {
			
		    var nodeId = $(data.element).closest("li").attr("id");
			var node = model.getNode(nodeId);
			
			if(!model.isCell(node)) return;
			
			var cell = node.data;
			if(cell.id != undefined){
				//Return if cell already is in graph
				if(graph.getCell(cell.id)) return;
				
				//If mouse position is in paper 
				if(X1 == X2 || Y1 == Y2){
					//cell.get('position').x = paperPosition.X;
					cell.position.x = paperPosition.X;
					cell.position.y = paperPosition.Y;
					graph.addCell(cell);
					addConnectedLinks(cell);
					model.updateCurrentTab(graph);
					model.updateCurrentGraph(graph);
				}
			}
			
			//Add connected link when drag a cell
			function addConnectedLinks(cell){
				
				var root = model.getNode('root');
				$.each(root.children_d, function(index, nodeId){
					
					var node = model.getNode(nodeId)
					
					if(model.isLink(node)){
						
						var link = $.parseJSON(JSON.stringify(node.data));
						var source = graph.getCell(link.source.id);
						var target = graph.getCell(link.target.id);
						
						if(source && target){
							if(source.id == cell.id || target.id == cell.id){
								graph.addCell(link);
							}
						}
						
					}
					
				});
				
			}
			
		});
		
	},
	
	/**
	 * Tabs Procedures
	 */
	initializeTabsProcedures : function(app){
		
		var model = this.model;
		var tabs = this.model.tabs;
		var layout = this.model.layout;
		var graph = app.graph;
		
		//Procedure to handle with double click on tabs;
		tabs.delegate( ".ui-tabs-anchor", "dblclick", function() {
			
			if(layout.state.west.isClosed && layout.state.east.isClosed && layout.state.south.isClosed) {
				layout.open('east');
				layout.open('west');
				layout.open('south');
			} 
			else {
				layout.close('east');
				layout.close('west');
				layout.close('south');
			}
		});
		
		//Procedure to handle with tab changes on click
		tabs.delegate( ".ui-tabs-anchor", "click", function() {
			
			var tabIndex = $(this).attr('id');
			
			//If tab index is the current, just ignore;
			if(model.isCurrentTabIndex(tabIndex)) { return; }
			
			//If current tab index is NOT empty, update the current tab
			if(!(model.isEmptyCurrentTabIndex())) {
				model.updateCurrentTab(graph);
			}
			
			//If the new tab already exist, update the graph with the new tab content
			if(model.hasTab(tabIndex)){
				model.updateGraph(tabIndex, graph);
				model.getTab(tabIndex);
			}
			//Else, add new Tab
			else{
				model.newTab(tabIndex, graph);
			}
			
			//update current tab index
			model.updateCurrentTabIndex(tabIndex);
			
			
		});
		
		//Procedure to handle with close tabs
		tabs.delegate( "span.ui-icon-close", "click", function() {
			
			//remove tab
			var tabIndex = $(this).closest("li").remove().attr("aria-labelledby");
	        
			//refresh tabs view
			model.tabs.tabs("refresh");
	        var num_tabs = $("div#tabs ul li").length;
	        
	        //get current tab view
	        var currentTabIndex = $(".ui-tabs-active").find("a").attr("id");
	        $ui('#' + currentTabIndex).click();
	        
	        //if number of tabs < 1, update current tab and hide tabs view
	        if (num_tabs < 1) {
	        	model.updateCurrentTab(graph);
	            $("#tabs").hide();
	            model.clearCurrentTabIndex();
	            
	            $('.inspector-paper-container').show();
	        }
			
	        //Show inpector container (tree)
	        $('.inspector-container').hide();
	        $('.inspector-paper').show();
	        
		});
		
		//Handle with double click on diagrams
		$ui('.inspector-paper').bind("dblclick.jstree", function  (event) {
			
			var node = $(event.target).closest("li");
			var diagram = model.tree.get_node(node[0].id);
			
			if(diagram.type !== 'diagram') return;
			
			var num_tabs = $("div#tabs ul li").length + 1;
			
			if(num_tabs == 1){
				 $("#tabs").show();
			}
			
			if($('#tabs #' + diagram.id).attr("id") == undefined) {
		        $("div#tabs ul").append(
		            '<li>' +
		            	'<a href="#diagram" id="' + diagram.id + '">' + diagram.text + '</a>' +
		            	'<span class="ui-icon ui-icon-close"></span>' +
		            '</li>'
		        );
		        
		        $ui("#tabs").tabs("refresh");
			}
	        
	        $ui('#tabs #' + diagram.id).click();
			
		});
		
		// Procedure to rename diagrams tab when the node is renamed
		$ui('.inspector-paper').on('rename_node.jstree', function (e, data) {
			
			var node = data.node;
			if(model.isDiagram(node)){
				$( "#tabs #" + node.id ).text(node.text);
			}
			
		});
	},
	
	/**
	 * Graphs Procedures
	 */
	initializeGraphProcedures : function(app) { 

		var graph = app.graph;
		var model = this.model;
		
		//Procedure do add node on tree 
		graph.on('add', function(cell){
		
			var node = model.getNode(cell.id);
			if(node) return;
			
			//get current diagram
			var currentDiagram = model.getCurrentDiagram();

			//Check if is a Node or LInk
			if(cell.isLink()) {
				model.newLink(cell, graph);
			}
			else {
				model.newCell(cell, graph);
			}
			
		});
		
		//Procedure to delete link without source or target on tree
		graph.on('remove', function(cell) { 
			
			if(cell.isLink()){
				
				var sourceId = cell.get('source').id;
				var targetId = cell.get('target').id;
				
				if(!(sourceId && targetId)){
					model.deleteNode(cell.id);
				}
			}
			
			$('.inspector-container').hide();
			$('.inspector-paper').show();
			
		})
		
		
		isRenamedNode = false;
		cellRenamed = {};
		
		//When rename Node name
		graph.on('change:name', function(cell) { 
			
			var node = model.getNode(cell.id);
			if(!node) return;
			
			if(cell.isLink()) {
				model.renameTreeLink(cell);
			}	
			else{
				var cRenamed = graph.getCell(cell.id);
				isRenamedNode = true;
				cellRenamed = cRenamed;
			}
			
		});
		
		//Rename all graphs when click on document
		$(document).click(function() {
			if(isRenamedNode){
				model.renameTreeCell(cellRenamed, graph);
				//updateAllGraphsCellName(cellRenamed);
				
				var currentTabIndex = $(".ui-tabs-active").find("a").attr("id");
				if(model.isCurrentTabIndex(currentTabIndex)) {
					model.updateCurrentTab(graph);
				}
				
				//rename the name in all graphs
				model.renameGraphsCell(cellRenamed.get('name'), cellRenamed.id, graph)
				
				//load the updated current tab
				model.updateCurrentGraph(graph);
				
				isRenamedNode = false;
				cellRenamed = {};
			}
		});
		
		//When change link label, refresh node;
		graph.on('change:label', function(cell) { 
			
			if(cell.isLink()) {
				var label = cell.get('label');
				if(label){
					var node = model.getNode(cell.id);
					node.data = cell;
				}
			}
		});
		
	},
	
	/**
	 * Paper Procedures
	 */
	initializePaperProcedures : function(app) {
		
		graph = app.graph;
		paper = app.paper;
		model = this.model;
		
		//Create paper contextmenu
		$ui('.paper').contextmenu({
			delegate: '.rotatable',
		    menu: [
		        {title: "Delete from view", cmd: "deleteFromView", uiIcon: "ui-icon-circle-close"},
		        {title: "Delete from model", cmd: "deleteFromModel", uiIcon: "ui-icon-close"},
		        {title: "----"},
		        {title: "Show connected links", cmd: "showConnectedLinks", uiIcon: "ui-icon-shuffle"},
		        {title: "----"},
		        {title: "Show LOD properties", cmd: "showLODProperties", uiIcon: "ui-icon-pencil"},
//		        {title: "More", children: [
//		            {title: "Sub 1", cmd: "sub1"},
//		            {title: "Sub 2", cmd: "sub1"}
//		            ]}
		        ],
		    //Call methods when selected
		    select: function(event, ui) {
		        if(ui.cmd === 'deleteFromModel') {
		        	deleteFromModel();
		        }
		        else if(ui.cmd === 'deleteFromView') {
		        	deleteFromView();
		        }
		        else if(ui.cmd === 'showConnectedLinks') {
		        	showConnectedLinks();
		        }
		        else if(ui.cmd === 'showLODProperties') {
		        	showLODProperties();
		        }
		    }
		
		});
		
		var cellId;
		
		//Set cell id when click with moude right button
		paper.$el.on('contextmenu', function(e) { 
		    e.stopPropagation(); // Stop bubbling so that the paper does not handle mousedown.
		    e.preventDefault();  // Prevent displaying default browser context menu.
		    var cellView = paper.findView(e.target);
		    if (cellView) {
		       cellId = cellView.model.id;
		    }
		});
		
		//Delete cell from model
		function deleteFromModel() {
			var node = model.getNode(cellId);
			model.deleteNode(node);
		}
		
		//Delete cell from view
		function deleteFromView() {
			var cell = graph.getCell(cellId);
			cell.remove();
		}
		
		//Show cell connected links
		function showConnectedLinks() {
			
			var cell = graph.getCell(cellId);
			var root = model.getNode('root');
			
			//Show link connected to the cell
			$.each(root.children_d, function(index, nodeId){
				
				var node = model.getNode(nodeId)
				
				if(model.isLink(node)){
					
					var link = $.parseJSON(JSON.stringify(node.data));
					var source = graph.getCell(link.source.id);
					var target = graph.getCell(link.target.id);
					
					if(source && target){
						if(source.id == cell.id || target.id == cell.id){
							graph.addCell(link);
						}
					}
					
				}
				
			});
		}
		
		function showLODProperties() {
			
			
			
		}
		
		var ed;
		
		//Create textbox to change the name when double click on cell
		paper.on('cell:pointerdblclick', function(cellView, evt) {
		    
			var text = joint.ui.TextEditor.getTextElement(evt.target);
			
		    if (text) {
		        if (ed){
		        	ed.remove();   // Remove old editor if there was one.
		        }
		        ed = new joint.ui.TextEditor({ text: text });
		        ed.render(paper.el);

		        ed.on('text:change', function(newText) {
		            // Set the new text to the property that you use to change text in your views.
		            cellView.model.set('name', newText);
		        });	        
		    }
		    
		    
		});
		
		//Remove textbox when click on blank position of paper
		paper.on('blank:pointerclick', function(cellView, evt) {
			if (ed){
	        	ed.remove();   // Remove old editor if there was one.
	        }
		});
		
		//Remove textbox when click on cell
		paper.on('cell:pointerclick', function(cellView, evt) {
			if (ed){
	        	ed.remove();   // Remove old editor if there was one.
	        }
		});
		
	},
	
	/**
	 * Relationships procedures
	 */
	initializeRelationshipsProcedures: function(app) {
		
		var graph = app.graph;
		var validator = app.validator;
		var model = this.model;
		
		//Create relatiohips options 
		validator.validate('change:target change:source', function(err, command, next) {

			var link = graph.getCell(command.data.id);
			
			if(!(link.isLink())){
				return;
			}

			var sourceElement = graph.getCell(link.get('source').id);
			var targetElement = graph.getCell(link.get('target').id);

			//Remove if link does't have source or target
			if(!(sourceElement && targetElement)){
				link.remove();
				return;
			}
			
			var sourceSubType = sourceElement.get('subType').replace(" ", "");
			var targetSubType = targetElement.get('subType').replace(" ", "");
			
			console.log('OI 2');
			
			//Remove if link does't present in relationships source
			if(!relationships[sourceSubType]) {
				link.remove();
				model.deleteNode(link.id);
				return;
			}
			
			console.log('OI 3');
			
			//Remove if link does't present in relationships target
			if(!relationships[sourceSubType][targetSubType]) {
				link.remove();
				model.deleteNode(link.id);
				return;
			}
			
			//Get relationships
			var eRelationships = model.getRelationships(sourceSubType, targetSubType);
			
			var source = sourceElement.get('name');
			var target = targetElement.get('name');
				
			if(target === undefined){
				target = targetElement.get('subType');
			}
			
			var content = '<table class="relationships-container">' +
							'<tr><th>' + source + ' -> ' + target + '</tr></th>';
			
			$.each(eRelationships, function(index, value){
				content = content + '<tr><td id="'+ value + '">' + value + '</td></tr>';
			});
				
			content = content +  '</table>';
			
			var dialog = new joint.ui.Dialog({
				width: 300,
				type: 'neutral',
				title: 'Create Relationship',
				content: content,
				buttons: [
				          { action: 'cancel', content: 'Cancel', position: 'left' },
				          ]
			});
			dialog.on('action:cancel', cancel);
			dialog.on('action:close', cancel);
			dialog.open();
			
			function cancel() {
				link.remove();
				model.deleteNode(link.id, graph);
				dialog.close();
			};
			
			$('.relationships-container td').click(function(){
				
				var relationshipType = $(this).attr('id');
				
				link.set('flowType', relationshipType);
				
				var node = model.getNode(link.id);
				node.data = link;
				
				//Update current tab
				model.updateCurrentTab(graph);
				
				//update cell in all graphs
				model.updateGraphsCell(link.id, graph);
				
				//load updated current graph
				model.updateCurrentGraph(graph);
				
				//close dialog
				dialog.close();
				
			});
		});
		
	},
	
	/**
	 * Liked Data Procedures
	 */
	initializeLikedDataProcedures : function(app) {
		
		var graph = app.graph;
		var model = this.model;
		
		$('#btn-owl-exporter').click(function() {
			
			var jsonTree = model.getJSONTree();
			var jsonElements = model.getAllTreeElements(jsonTree);
			
			var content = '<form class="export">';
			content = content + 'Prefix: <input type="text" id="ontologyPrefix" name="iri" value="' + model.ontology.prefix + '" readonly/>'
			content = content + ' IRI: <input type="text" id="ontologyIRI" name="iri" value="' + model.ontology.iri + '" readonly/> <br>'
			
			var firstLink = true, firstElement = true;
			$.each(jsonElements, function(index, e) {
				var element = $.parseJSON(JSON.stringify(e));
				
				if(element.type === 'cell') {
					
					if(firstElement) {
						content = content + '<h4> Elements </h4>';
						firstElement = false;
					}
					
					content = content + '<input type="checkbox" id="exportElement" name="element" value="' + element.id + '" checked>'
					+ '<label>' + element.text + '</label> <br>';
					
				}
				else if(element.type === 'link') {
					
					if(firstLink) {
						content = content + '<h4> Relationships </h4>';
						firstLink = false;
					}
					
					content = content + '<input type="checkbox" id="exportElement" name="element" value="' + element.id + '" checked>'
					+ '<label>' + element.text + '</label> <br>'; 
				}
			});
			
			content = content +  '</form>';

			var $this = this;
			var dialog = new joint.ui.Dialog({
				width: 600,
				type: 'neutral',
				title: 'OWL Exporter Wizard',
				content: content,
				buttons: [
				          { action: 'cancel', content: 'Cancel', position: 'left' },
				          { action: 'export', content: 'Export', position: 'left' }
				]
			});
			dialog.on('action:export', exportElements);
			dialog.on('action:cancel', dialog.close);
			dialog.open();
			
			function exportElements() {
				model.exportToOWL();
				dialog.close();
			};
		
		});
		
		$('btn-prefix').click(function(){
			
			
			
		});
		
	},
	
})