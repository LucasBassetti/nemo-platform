/**
 * @param paper
 * @param graph
 */

function modelTree(paper, graph){

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
				"valid_children" : ["diagram", "folder", "file"]
			},
			"diagram": {
				"max_children": 0,
				"valid_children": ["none"],
			},
			"file":{
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
							
							console.log(new_data.text);
							
							setTimeout(function () { inst.edit(new_data); },0);
						});
					}
				},
				createDiagramItem: { // The "create" menu item
					label: "New Diagram",
					icon: "glyphicon glyphicon-plus",
					action: function (data) {
						console.log(data.reference)
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
		if (node.type === 'file') {
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
	
	graph.on('change', function(cell) { 
		
		if(cell.get('type') === "link") return;
		if(cell.get('type') === "archimate.Relationships") return;
		
		var node = GLOBAL.tree.get_node(cell.id);
		if(!node) return;
		
		GLOBAL.tree.rename_node(node, cell.get('name') + " (" + cell.get('subType') + ")")
		
	});
	
	//Add cell on model Tree
	graph.on('add', function(cell, collection, opt) {

		if(cell.get('type') === "link") return;
		if(cell.get('type') === "archimate.Relationships") return;
		
		var node = GLOBAL.tree.get_node(cell.id);
		if(node) return;
		
		var cTab = GLOBAL.tree.get_node(GLOBAL.currentTab);
		
		var new_data = { 
				"id": cell.id, 
				"text": cell.get('name') + " (" + cell.get('subType') + ")",
				"icon":"glyphicon glyphicon-stop", 
				"type":"file", 
				"data" : graph.getCell(cell.id) 
		};
		GLOBAL.tree.create_node(cTab.parent, new_data, "last", function (new_data) {});
		
	});
	
	// When the node is deleted in tree, the GLOBAL.graphs will be updated.
	$ui('.inspector-paper').on('rename_node.jstree', function (e, data) {
		
		var node = data.node;
		if(node.type === 'diagram'){
			console.log(node.text);
			
			$( "#tabs #" + node.id ).text(node.text);
		}
		
	});
	
	// When the node is deleted in tree, the GLOBAL.graphs will be updated.
	$ui('.inspector-paper').on('delete_node.jstree', function (e, data) {
		
		$.each(data.node.children_d, function(index, nodeId){
			var node = GLOBAL.tree.get_node(nodeId) //GLOBAL.tree.get_node(nodeId)
			deleteNode(node);
		});
		
		deleteNode(data.node);
		
		function deleteNode(node){
			
			//Folder
			if(node.type === 'default'){
//				console.log(data.node);
			} 
			
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
			
			//File
			else {
				//console.log(data.node.id);
				cellId = node.id
				
				GLOBAL.graphs[GLOBAL.currentTab] = graph.toJSON();
				
				$.each(GLOBAL.graphs, function(index, g){
					graph.fromJSON(GLOBAL.graphs[index]);
					cell = graph.getCell(cellId);
					if(cell){
						cell.remove();
						GLOBAL.graphs[index] = graph.toJSON();
					}
				});
				
				graph.fromJSON(GLOBAL.graphs[GLOBAL.currentTab]);
			} 
			
		}
		
		
	});
	
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
		
		if(node.type !== 'file') return;
		
		var cell = node.data;
		if(cell.id != undefined){
			
			//Return if cell already is in graph
			if(graph.getCell(cell.id)) return;
			
			//If mouse position is in paper 
			if(X1 == X2 || Y1 == Y2){
				console.log(X1);
				console.log(Y1);
				cell.get('position').x = paperPosition.X;
				cell.get('position').y = paperPosition.Y;
				graph.addCell(cell);
			}
			
		}
		
	});
	
};