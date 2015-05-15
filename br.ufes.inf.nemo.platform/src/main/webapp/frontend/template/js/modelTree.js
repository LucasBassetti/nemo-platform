/**
 * @param paper
 * @param graph
 */

function modelTree(paper, graph, validator){

	$ui('#modelTree')
	    .draggable()
	    .resizable();
	
	//Model Tree
	$ui('.inspector-paper').jstree({ 
		'core' : {
			"dblclick_toggle" : false,
			"check_callback" : true,
			'data': [
			         { "id": "root", "icon":"glyphicon glyphicon-folder-close", "parent": "#", "text": "Model", "state": {"opened": true},  "data" : { "id":"root" } },
			         { "id": "diagram1", "icon":"glyphicon glyphicon-list-alt", "parent": "root", "text": "Diagram", "type":"diagram", "data" : { /*"id":"diagram1"*/ } },
			 ]
		},
		"types" : {
			"#": {
				"max_children": 1,
				"valid_children" : ["diagram", "folder", "node"]
			},
			"diagram": {
				"max_children": 0,
				"valid_children": ["none"],
			},
			"node":{
				"max_children": 0,
				"valid_children": ["none"],
			},
			"link":{
				"max_children": 0,
				"valid_children": ["none"],
			}
		},
	
		"plugins" : [ "sort", "json_data", "dnd", "contextmenu", "wholerow", "types" ],
	
		"contextmenu" : { "items" : customMenu }
	
	});
	
	//GLOBAL VAR
	GLOBAL.tree = $ui('.inspector-paper').jstree(true);
	
	//Custom menu to Create/Rename/Delete folders and diagrams
	function customMenu(node) {
	
		// The default set of all items
		var items = {
				createItem: { // The "create" menu item
					label: "New Folder",
					icon: "glyphicon glyphicon-plus",
					action: function (data) {
						
						var inst = $ui.jstree.reference(data.reference);
						obj = inst.get_node(data.reference);
						inst.create_node(obj, {}, "last", function (new_data) {
							//new_data.data = {};
							new_data.icon = "glyphicon glyphicon-folder-close";
							new_data.text = "New Folder";
							setTimeout(function () { inst.edit(new_data); },0);
						});
					}
				},
				createDiagramItem: { // The "create" menu item
					label: "New Diagram",
					icon: "glyphicon glyphicon-plus",
					action: function (data) {
						var inst = $ui.jstree.reference(data.reference),
						obj = inst.get_node(data.reference);
						inst.create_node(obj, {}, "last", function (new_data) {
							//new_data.data = {};
							new_data.icon = "glyphicon glyphicon-list-alt";
							new_data.text = "New Diagram";
							new_data.type = "diagram";
							setTimeout(function () { inst.edit(new_data); },0);
						});
					}
				},
				renameItem: { // The "rename" menu item
					label: "Rename",
					icon: "glyphicon glyphicon-edit",
					action: function (data) {
						var inst = $ui.jstree.reference(data.reference),
						obj = inst.get_node(data.reference);
						inst.edit(obj);
					}
				},
				deleteItem: { // The "delete" menu item
					label: "Delete",
					icon: "glyphicon glyphicon-remove",
					action: function (data) {
						var inst = $ui.jstree.reference(data.reference),
						obj = inst.get_node(data.reference);
						if(inst.is_selected(obj)) {
							inst.delete_node(inst.get_selected());
						}
						else {
							inst.delete_node(obj);
						}
					}
				}
		};
		
		//FILE
		if (node.type === 'node' || node.type === 'link') {
			delete items.createItem;
			delete items.createDiagramItem;
			delete items.renameItem;
		}
		//ROOT
		else if(node.id === 'root'){
			delete items.deleteItem;
			delete items.renameItem;
		}
		//DIAGRAM
		else if(node.type === 'diagram'){
			delete items.createItem;
			delete items.createDiagramItem;
		}
		//FOLDER
		else{
			
		}
	
		return items;
	}
	
	validator.validate('change:flowType', function(err, command, next) {

		var link = graph.getCell(command.data.id);
		if(link.isLink()) changeLink();
		
		function changeLink(){
			
			var source = graph.getCell(link.get('source').id);
			var target = graph.getCell(link.get('target').id);
			
			if(!(source && target)){return;}
			
			var node = GLOBAL.tree.get_node(link.id);
			node.data = link;
			changeAllGraphs();
			
		};
		
		function changeAllGraphs(){

			var curTabId = $(".ui-tabs-active").find("a").attr("id");
			if(curTabId == GLOBAL.currentTab) {
				GLOBAL.graphs[GLOBAL.currentTab] = graph.toJSON();
			}
			
			$.each(GLOBAL.graphs, function(index, g){
				graph.fromJSON(GLOBAL.graphs[index]);
				if(graph.getCell(link.id)){
					link.remove();
					graph.addCell(link);
					renameLink(link);
					GLOBAL.graphs[index] = graph.toJSON();
				}
				
			});
			
			graph.fromJSON(GLOBAL.graphs[GLOBAL.currentTab]);
			
		};
		
	});
	
	isRenamedNode = false;
	cellRenamed = {};
	
	//When rename Node name
	graph.on('change:name', function(cell) { 
		
		var node = GLOBAL.tree.get_node(cell.id);
		if(!node) return;
		
		if(cell.isLink()) renameLink(cell);
		else renameNode();
		
		function renameNode(){
			var cRenamed = graph.getCell(cell.id);
			isRenamedNode = true;
			cellRenamed = cRenamed;
		}
		
	});
	
	$(document).click(function() {
		if(isRenamedNode){
			updateNodeName(cellRenamed);
			updateAllGraphsCellName(cellRenamed);
			isRenamedNode = false;
			cellRenamed = {};
		}
	});
	
	function updateNodeName(cell){
		
		var node = GLOBAL.tree.get_node(cell.id);
		var newNodeName = cell.get('name') + " (" + cell.get('subType') + ")"
		GLOBAL.tree.rename_node(node, newNodeName);
		node.data = cell;
		
		$.each(graph.getLinks(), function(index, link){
			renameLink(link);
		});
		
	}
	
	//Rename Cell in all Graphs
	function updateAllGraphsCellName(cellRenamed){
		
		var curTabId = $(".ui-tabs-active").find("a").attr("id");
		
		if(curTabId == GLOBAL.currentTab){
			GLOBAL.graphs[GLOBAL.currentTab] = graph.toJSON();
		}
		
		$.each(GLOBAL.graphs, function(index, g){
			
			var graphChanged = new joint.dia.Graph; 
			graphChanged.fromJSON(GLOBAL.graphs[index]);
			cell = graphChanged.getCell(cellRenamed.id);
			if (cell){
				cell.set('name', cellRenamed.get('name'));
			}
			GLOBAL.graphs[index] = graphChanged.toJSON();
			
		});
		
		graph.fromJSON(GLOBAL.graphs[GLOBAL.currentTab]);
	}
	
	//Rename link on tree
	function renameLink(link){
		var linkNode = GLOBAL.tree.get_node(link.id);
		
		var source = graph.getCell(link.get('source').id);
		var target = graph.getCell(link.get('target').id);
		
		if(!(source && target)) return;
		
		var newLinkName = link.get('flowType') + " (" + source.get('name') + " -> " +  target.get('name') + ")"
		GLOBAL.tree.rename_node(linkNode, newLinkName);
	}
	
	//Procedure to delete link without source or target of tree
	graph.on('remove', function(cell) { 
		
		if(cell.isLink()){
			
			var sourceId = cell.get('source').id;
			var targetId = cell.get('target').id;
			
			if(!(sourceId && targetId)){
				var node = GLOBAL.tree.get_node(cell.id);
				GLOBAL.tree.delete_node(node);
			}
			
		}
		
	})
	
	//Add cell on model Tree
	graph.on('add', function(cell, collection, opt) {

		var node = GLOBAL.tree.get_node(cell.id);
		if(node) return;
		var cTab = GLOBAL.tree.get_node(GLOBAL.currentTab);

		//Check if is a Node or LInk
		if(cell.isLink()) addLink();
		else addNode();
		
		//Add Link
		function addLink(){
			
			var source = graph.getCell(cell.get('source').id);
			
			var new_data = { 
					"id": cell.id, 
					"text": cell.get('flowType') + " (" + source.get('name') + " -> )",
					"icon":"glyphicon glyphicon-arrow-right", 
					"type":"link", 
					"data" : graph.getCell(cell.id) 
			};
			
			GLOBAL.tree.create_node(cTab.parent, new_data, "last", function (new_data) {});
			
		}
		
		//Add Node
		function addNode(){ 
			
			var new_data = { 
					"id": cell.id, 
					"text": cell.get('name') + " (" + cell.get('subType') + ")",
					"icon":"glyphicon glyphicon-stop", 
					"type":"node", 
					"data" : graph.getCell(cell.id) 
			};
			
			GLOBAL.tree.create_node(cTab.parent, new_data, "last", function (new_data) {});
		}
	});
	
	// Procedure to rename diagrams tab when the node is renamed
	$ui('.inspector-paper').on('rename_node.jstree', function (e, data) {
		
		var node = data.node;
		if(node.type === 'diagram'){
			$( "#tabs #" + node.id ).text(node.text);
		}
		
	});
	
	// When the node is deleted in tree, the GLOBAL.graphs will be updated.
	$ui('.inspector-paper').on('delete_node.jstree', function (e, data) {
		
		$.each(data.node.children_d, function(index, nodeId){
			var node = GLOBAL.tree.get_node(nodeId);
			deleteNode(node);
		});
		
		deleteNode(data.node);
		
		function deleteNode(node){
			
			//Folder
			if(node.type === 'default'){} 
			
			//Diagram
			else if(node.type === 'diagram'){
				$( "#" + node.id ).closest( "li" ).remove().attr( "aria-labelledby" );
				
				//Refresh Tabs
				var num_tabs = $("div#tabs ul li").length;
				GLOBAL.currentTab = "";
				$ui("#tabs").tabs("refresh");
		        var curTabId = $(".ui-tabs-active").find("a").attr("id");
		        $ui('#' + curTabId).click();
		        
		        if (num_tabs < 1) {
		            $("#tabs").hide();
		            graph.clear();
		            GLOBAL.currentTab = "";
		        }
			}
			
			//Node or Link
			else {
				cellId = node.id
				
				var curTabId = $(".ui-tabs-active").find("a").attr("id");
				if(curTabId == GLOBAL.currentTab) {
					GLOBAL.graphs[GLOBAL.currentTab] = graph.toJSON();
				}
				
				$.each(GLOBAL.graphs, function(index, g){
					graph.fromJSON(GLOBAL.graphs[index]);
					cell = graph.getCell(cellId);
					if(cell){
						cell.remove();
						GLOBAL.graphs[index] = graph.toJSON();
					}
				});
				
				removeConnectedLink(cellId);
				graph.fromJSON(GLOBAL.graphs[GLOBAL.currentTab]);
				
			} 
			
		}
		
	});
	
	function removeConnectedLink(cellId){
		
		var root = GLOBAL.tree.get_node('root');
		
		var deletedNode = {};
		$.each(root.children_d, function(index, child){
			var node = GLOBAL.tree.get_node(child)
			
			if(node.type === 'link'){
				var cell = $.parseJSON(JSON.stringify(node.data));
				
				var sourceId = cell.source.id;
				var targetId = cell.target.id;
				
				if(cellId === sourceId || cellId === targetId){
					deletedNode[index] = node;
				}
			}
		});
		
		$.each(deletedNode, function(index, dn){
			GLOBAL.tree.delete_node(deletedNode[index]);
		});
	}
	
	
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
		
	    var elementId = $(data.element).closest("li").attr("id");
		var node = GLOBAL.tree.get_node(elementId);
		
		if(node.type !== 'node') return;
		
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
			
			var root = GLOBAL.tree.get_node('root');
			$.each(root.children_d, function(index, child){
				
				var c = GLOBAL.tree.get_node(child)
				
				if(c.type === 'link'){
					
					var link = $.parseJSON(JSON.stringify(c.data));
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
	
};