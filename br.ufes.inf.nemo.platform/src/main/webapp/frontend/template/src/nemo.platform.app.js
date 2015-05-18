nemo.platform.App = Backbone.View.extend({
	
	model : nemo.platform.Model,
	
	initialize : function(app){
		
		console.log("INITIALIZE APP!");
		
		//create model
		this.model = new nemo.platform.Model;
		
		//initialize model
		this.model.newTab("diagram1", app.graph);
		this.initializeTreeProcedures(app);
		this.initializeTabsProcedures(app);
		this.initializeGraphProcedures(app);
		this.initializeValidatorProcedures(app);
	},
	
	initializeTreeProcedures : function(app) {
		
		var graph = app.graph;
		var model = this.model;
		
		$ui('.inspector-paper').on('delete_node.jstree', function (e, data) {
			
			$.each(data.node.children_d, function(index, nodeId){
				var node = model.getNode(nodeId);
				deleteNode(node);
			});
			
			deleteNode(data.node);
			
			function deleteNode(node){
				
				//Diagram
				if(model.isDiagram(node)){
					$( "#" + node.id ).closest( "li" ).remove().attr( "aria-labelledby" );
					
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
					cell.get('position').x = paperPosition.X;
					cell.get('position').y = paperPosition.Y;
					graph.addCell(cell);
					addConnectedLinks(cell);
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
	
	initializeTabsProcedures : function(app){
		
		var model = this.model;
		var tabs = this.model.tabs;
		var graph = app.graph;
		
		//Procedure to handle with tab changes on click
		tabs.delegate( ".ui-tabs-anchor", "click", function() {
			
			var tabIndex = $(this).attr('id');
			
			//If tab index is the current, just ignore;
			if(model.isCurrentTabIndex(tabIndex)) { return; }
			
			//If current tab index is NOT empty, update the current tab
			console.log(!(model.isEmptyCurrentTabIndex()));
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
	        }
			
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
		
	},
	
	initializeGraphProcedures : function(app) { 

		var graph = app.graph;
		var model = this.model;
		
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
		
		$(document).click(function() {
			if(isRenamedNode){
				model.renameTreeCell(cellRenamed, graph);
				//updateAllGraphsCellName(cellRenamed);
				isRenamedNode = false;
				cellRenamed = {};
			}
		});
		
	},
	
	initializeValidatorProcedures : function(app) {
		
		var graph = app.graph;
		var validator = app.validator;
		var model = this.model;
		
		validator.validate('change:flowType', function(err, command, next) {

			var link = graph.getCell(command.data.id);
			
			if(link.isLink()) {
			
				var source = graph.getCell(link.get('source').id);
				var target = graph.getCell(link.get('target').id);
				
				if(!(source && target)) {return;}
				
				var node = model.getNode(link.id);
				node.data = link;
				
				//if tab is the current, update it
				var currentTabIndex = $(".ui-tabs-active").find("a").attr("id");
				if(model.isCurrentTabIndex(currentTabIndex)) {
					model.updateCurrentTab(graph);
				}
				
				//update cell in all graphs
				model.updateGraphsCell(link.id, graph);
				
				//load updated current graph
				model.updateCurrentGraph(graph);
				
			};
			
		});
		
		
	},
	
})