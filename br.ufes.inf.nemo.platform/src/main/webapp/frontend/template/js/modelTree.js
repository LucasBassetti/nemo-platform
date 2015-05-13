/**
 * @param paper
 * @param graph
 */
function modelTree(paper, graph){

	graph.on('add', function(cell, collection, opt) {
		
		var tree = $ui('.inspector-paper').jstree(true);
		var root = tree.get_node('root');
		
		tree.create_node(root, {}, "last", function (new_data) {
         	//new_data = folder;
             new_data.data = {id: cell.id};
             new_data.icon = "glyphicon glyphicon-stop";
             new_data.text = cell.get('name');
             new_data.type = "file";
             //new_data.id = cell.id;
             //new_data.a_attr.id = cell.id + "_anchor";
             
            // console.log(new_data.type);
             
         });
		
	});
	
	$ui('.inspector-paper').jstree({ 
		'core' : {
			"dblclick_toggle" : false,
			"check_callback" : true,
			'data': [
			         { "id": "root", "icon":"glyphicon glyphicon-folder-close", "parent": "#", "text": "Model", "state": {"opened": true}, "data" : { "id":"root" } },
			         { "id": "diagram1", "type":"diagram", "icon":"glyphicon glyphicon-list-alt", "parent": "root", "text": "Diagram", "data" : { "id":"diagram1" } },
	
			         ]
		},
		"types" : {
			"#": {
				"max_children": 1,
				"valid_children" : ["diagram", "folder", "file"]
			},
			"folder": {
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
	
		"plugins" : [ "sort", "json_data", "dnd", "contextmenu",
		              "wholerow", "types" ],
	
		              "contextmenu" : {
		            	  "items" : customMenu
		              }
	
	});
	
	
	function customMenu(node) {
	
		var folder = '{ "icon":"glyphicon glyphicon-folder-close", "parent": "root", "text": "New Folder", "data" : { "diagram": false, "file" : false } }';
		// The default set of all items
		var items = {
				createItem: { // The "create" menu item
					label: "New Folder",
					icon: "glyphicon glyphicon-plus",
					action: function (data) {
						console.log(data.reference)
						var inst = $ui.jstree.reference(data.reference),
						obj = inst.get_node(data.reference);
						inst.create_node(obj, {}, "last", function (new_data) {
							//new_data = folder;
							new_data.data = {diagram: false, file: false};
							new_data.icon = "glyphicon glyphicon-folder-close";
							new_data.text = "New Folder";
							new_data.type = "folder";
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
							//new_data = folder;
							new_data.data = {diagram: true, file: false};
							//new_data.id = "diagram2";
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
		
		console.log(node.data.diagram);
	
		//FILE
		if (node.type === 'file') {
			delete items.createItem;
			delete items.createDiagramItem;
		}
		//FOLDER
		else if(node.type === 'folder'){
			delete items.renameItem;
		}
		//DIAGRAM
		else if(node.type === 'diagram'){
			delete items.deleteItem;
			delete items.createItem;
			delete items.createDiagramItem;
		}
		//ROOT
		else{
			delete items.deleteItem;
			delete items.renameItem;
		}
	
		return items;
	}
	
	
	$(document).on('dnd_stop.vakata', function (e, data) {
		
	    //alert($(data.element).text());
	});
	
	$(document).bind('dnd_move.vakata', function(e, data) {
	
		
		/*
				requires crrm plugin
	
				.o - the node being moved
				.r - the reference node in the move
				.ot - the origin tree instance
				.rt - the reference tree instance
				.p - the position to move to (may be a string - "last", "first", etc)
				.cp - the calculated position to move to (always a number)
				.np - the new parent
				.oc - the original node (if there was a copy)
				.cy - boolen indicating if the move was a copy
				.cr - same as np, but if a root node is created this is -1
				.op - the former parent
				.or - the node that was previously in the position of the moved node */
	
		var nodeType = data.element.type;
		console.log(nodeType);
	
		if (nodeType) {
	
			// TODO!
		}
	
	});
	
};