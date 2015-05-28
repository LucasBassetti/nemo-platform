
nemo.platform.Model = Backbone.Model.extend({
	
	currentTabIndex : "",
	graph : {},
	
	layout: undefined,
	tree : undefined,
	tabs : undefined,
	
	
	initialize : function() {

		this.initializeLayout();
		this.initializeTree();
		this.initializeTabs();
		
		console.log("INITIALIZE NEMO PLATFORM MODEL!");
	},
	
	//Procedure to initialize the layout
	initializeLayout : function(){
		
	    this.layout = $ui('.layout').layout({ 
	    	applyDefaultStyles: true,
	    	east: {
	    		resizable: false,
	    	},
	    	south: {
	    		initClosed: true,
	    	}
	    });
	    
	    this.layout.sizePane('west', 240);
	    this.layout.sizePane('east', 260);
	    
	    this.layout
			.bindButton('#btn-toggle-all-panes', 'toggle', 'south')
			.bindButton('#btn-toggle-all-panes', 'toggle', 'west')
			.bindButton('#btn-toggle-all-panes', 'toggle', 'east')

	    
		$('.paper-scroller').css({ paddingLeft: 10 });
		
	},
	
	//Procedure to initialize model tabs
	initializeTabs : function(){
		
		$ui('#viewTabs').tabs();
		
		this.tabs = $ui("#tabs");
		this.tabs.tabs({
	        //heightStyle: "fill",
	    });
		
		console.log("INITIALIZE TABS!");
	},
	
	//Procedure to initialize the model tree
	initializeTree : function(){
		
		// Initialize tree
		this.tree = $ui('.inspector-paper').jstree({ 
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
				"cell":{
					"max_children": 0,
					"valid_children": ["none"],
				},
				"link":{
					"max_children": 0,
					"valid_children": ["none"],
				}
			},
		
			"sort" : this.sort,
			
			"plugins" : [ "sort", "json_data", "dnd", "contextmenu", "wholerow", "types" ],
		
			"contextmenu" : { "items" : this.customMenu }
		
		});
		
		this.tree = $ui('.inspector-paper').jstree(true);
		
	},
	
	//Procedure to sort by order (Diagram > Folder > Cell > Link)
	sort : function(a, b) {
		
		var nodeA = model.getNode(a);
		var nodeB = model.getNode(b);
		
		var textA = nodeA.text;
		var textB = nodeB.text;
		
		if(model.isDiagram(nodeA)) {
			
			if(model.isCell(nodeB)) {
				return -1;
			}
			
			if(model.isFolder(nodeB)) {
				return 1;
			}
			
			if(model.isLink(nodeB)) {
				return -1;
			}
			
		}
		
		if(model.isFolder(nodeA)) {
			
			if(model.isDiagram(nodeB)) {
				return -1;
			}
			
			if(model.isCell(nodeB)) {
				return -1;
			}
			
			if(model.isLink(nodeB)) {
				return -1;
			}
			
		}
		
		if(model.isCell(nodeA)) {
			
			if(model.isDiagram(nodeB)) {
				return 1;
			}
			
			if(model.isFolder(nodeB)) {
				return 1;
			}
			
			if(model.isLink(nodeB)){
				return -1;
			}
			
		}
		
		if(model.isLink(nodeA)) {
			
			if(model.isDiagram(nodeB)) {
				return 1;
			}
			
			if(model.isFolder(nodeB)) {
				return 1;
			}
			
			if(model.isCell(nodeB)){
				return 1;
			}
			
		}
		
		if(textA > textB) {
			return 1;
		}
		else {
			return -1;
		}
		
	},
	
	//Custom menu to Create/Rename/Delete folders and diagrams
	customMenu : function(node) {
	
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
		}
		
		//FILE
		if (node.type === 'cell' || node.type === 'link') {
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
		
	},
	
	/**
	 * TAB METHODS
	 */
	
	//Method to create a new tab
	newTab : function(index, graph) {
		if(!this.graph[index]){
			//graph.clear();
			var tab = $.parseJSON('{"cells":[]}');
			
			graph.fromJSON(tab);
			this.graph[index] = graph.toJSON();
			this.currentTabIndex = index;
			
			//LOG
			this.log(1, index, "ADD")
		}
		else{
			//LOG
			this.logError(1, "ADD")
		}
	},
	
	//Method to delete a tab
	deleteTab : function(index) {
		if(this.graph[index]){
			delete this.graph[index];
			
			//LOG
			this.log(1, index, "REMOVE")
		}
		else{
			//LOG
			this.logError(2, "REMOVE")
		}
	},
	
	getTabs : function(){
		return this.graph;
	},
	
	//Method to get the tab
	getTab : function(index) {
		
		if(this.graph[index]){
			//LOG
			this.log(1, index, "GET")
			
			return this.graph[index];
		}
		else{
			//LOG
			this.logError(2, "GET")
		}
		
	},
	
	//Method to get the current tab
	getCurrentTab : function() {
		return this.graph[this.currentTabIndex];
	},
	
	//Method to clear current tab index
	clearCurrentTabIndex : function() {
		this.currentTabIndex = "";
	},
	
	//Method to update/set the graph on the current tab;
	updateCurrentTab : function(graph) {
		
		if(this.graph[this.currentTabIndex]) {
			this.graph[this.currentTabIndex] = graph.toJSON();
			
			//LOG
			this.log(1, this.currentTabIndex, "UPDATE CURRENT TAB");
		}
	},
	
	//Method to update/set the graph on the tab;
	updateTab : function(index, graph) {
		if(this.graph[index]) {
			this.graph[index] = graph.toJSON();
			
			//LOG
			this.log(1, index, "UPDATE TAB");
		}
	},
	
	//Method to check if has tab with the index
	hasTab : function(index) {
		if(this.graph[index]){
			return true;
		}
		return false;
	},
	
	
	/**
	 * CURRENT TAB INDEX METHODS
	 */
	
	//Method to update/set the new current index tab;
	updateCurrentTabIndex : function(index) {
		this.currentTabIndex = index;
		
		//LOG
		this.log(2, this.currentTabIndex, "UPDATE INDEX");
	}, 
	
	//Method to check if current tab is empty
	isEmptyCurrentTabIndex : function(){
		console.log("currentTabIndex:" + this.currentTabIndex);
		if(this.currentTabIndex === "") {
			return true;
		}
		return false;
	},
	
	//Method to Check if the tab is the current
	isCurrentTabIndex : function(index) {
		if (this.currentTabIndex === index){
			return true;
		}
		return false;
	},
	
	/**
	 * JOINT GRAPH METHODS
	 */
	
	//Method to update the graph with the tab content;
	updateCurrentGraph : function(graph) {
		if(this.graph[this.currentTabIndex]) {
			graph.fromJSON(this.graph[this.currentTabIndex]);
			
			//LOG
			this.log(1, this.currentTabIndex, "UPDATE CURRENT GRAPH");
		}
	},
	
	//Method to update the graph with the tab content;
	updateGraph : function(index, graph) {
		if(this.graph[index]) {
			graph.fromJSON(this.graph[index]);
			
			//LOG
			this.log(1, index, "UPDATE GRAPH");
		}
	},
	
	updateGraphsCell : function(cellId, graph) {
		
		var cell = {};
		var $this = this;
		$.each(this.getTabs(), function(index, value){
			$this.updateGraph(index, graph);
			cell = graph.getCell(cellId);
			if(cell) {
				cell.remove();
				graph.addCell(cell);
				$this.renameTreeLink(cell, graph);
				$this.updateTab(index, graph);
			}
		});
		
	},
	
	deleteGraphsCell : function(cellId, graph) {
		var cell = {};
		var $this = this;
		$.each(this.getTabs(), function(index, value){
			$this.updateGraph(index, graph);
			cell = graph.getCell(cellId);
			if(cell){
				cell.remove();
				$this.updateTab(index, graph);
			}
		});
		
	},
	
	renameGraphsCell : function(cellRenamedName, cellId, graph){
		var cell = {};
		var $this = this;
		$.each(this.getTabs(), function(index, value){
			$this.updateGraph(index, graph);
			cell = graph.getCell(cellId);
			if (cell){
				cell.set('name', cellRenamedName);
				$this.updateTab(index, graph);
			}
		});
	},
	
	/**
	 * TREE METHODS
	 */
	
	//Method to rename tree cell
	renameTreeCell : function(cell, graph) {
		
		var node = this.getNode(cell.id);
		var newNodeName = cell.get('name') + " (" + cell.get('subType') + ")"
		var $this = this;
		
		//rename node
		this.renameTreeNode(node, newNodeName);
		
		//update node data
		node.data = cell;
		
		//rename all link connected to the cell
		$.each(graph.getLinks(), function(index, l){
			var link = graph.getCell(l.id);
			$this.renameTreeLink(link, graph);
		});
		
		
	},
	
	//Method to rename tree link
	renameTreeLink : function(link, graph) {
		var linkNode = this.getNode(link.id);
		
		var source = graph.getCell(link.get('source').id);
		var target = graph.getCell(link.get('target').id);
		
		if(!(source && target)) return;
		
		var newLinkName = link.get('flowType') + " (" + source.get('name') + " -> " +  target.get('name') + ")"
		this.renameTreeNode(linkNode, newLinkName);
	},
	
	//Method do rename tree node
	renameTreeNode : function(oldNodeName, newNodeName) {
		this.tree.rename_node(oldNodeName, newNodeName);
		console.log('NODE RENAMED!')
	},
	
	deleteTreeConnectedLinks : function(cellId){
		
		var root = this.getNode('root');
		var deletedNode = {};
		
		var $this = this;
		
		$.each(root.children_d, function(index, nodeId){
			var node = $this.getNode(nodeId)
			
			if($this.isLink(node)){
				var cell = $.parseJSON(JSON.stringify(node.data));
				
				var sourceId = cell.source.id;
				var targetId = cell.target.id;
				
				if(cellId === sourceId || cellId === targetId){
					deletedNode[index] = node;
				}
			}
		});
		
		$.each(deletedNode, function(index, dn){
			$this.deleteNode(deletedNode[index]);
		});
		
	},
	
	newCell : function(cell, graph) {
		var new_data = { 
				"id": cell.id, 
				"text": cell.get('name') + " (" + cell.get('subType') + ")",
				"icon":"glyphicon glyphicon-stop", 
				"type":"cell", 
				"data" : graph.getCell(cell.id) 
		};
		
		this.newNode(this.getCurrentDiagram(), new_data);
	},
	
	newLink : function(cell, graph) {
		var source = graph.getCell(cell.get('source').id);
		
		var new_data = { 
				"id": cell.id, 
				"text": cell.get('flowType') + " (" + source.get('name') + " -> )",
				"icon":"glyphicon glyphicon-arrow-right", 
				"type":"link", 
				"data" : graph.getCell(cell.id) 
		};
		
		this.newNode(this.getCurrentDiagram(), new_data);
	},
	
	//Method do add new node
	newNode : function(currentDiagram, node) {
		this.tree.create_node(currentDiagram.parent, node, "last")
	},
	
	//Method to delete a node
	deleteNode : function(nodeId) {
		this.tree.delete_node(nodeId);
	},
	
	//Method to get node by id
	getNode : function(nodeId) {
		return this.tree.get_node(nodeId);
	},
	
	//Method to get current diagram
	getCurrentDiagram : function() {
		return this.tree.get_node(this.currentTabIndex);
	},
	
	isDiagram : function(node) {
		if(node.type === "diagram") {
			return true;
		}
		return false;
	},
	
	isFolder : function(node) {
		if(node.type === "default") {
			return true;
		}
		return false;
	},
	
	isCell : function(node) {
		if(node.type === "cell") {
			return true;
		}
		return false;
	},
	
	isLink : function(node) {
		if(node.type === "link") {
			return true;
		}
		return false;
	},
	
	/**
	 * CONNECTION METHODS
	 */
	
	 getConnections: function(source, target){

		var connections = {};
		
		$.each(relationships[source][target], function (index, relationKey) {
			
			if(relationshipsKeys[relationKey]) {
				connections[index] = relationshipsKeys[relationKey];
			}
			else {
				connections[index] = relationKey;
			}
		});
		
		return connections;
	},
	
	/**
	 * LOG
	 */
	
	logError : function(opt, value) {
		
		switch(opt){
			case 1:
				console.log(value + ":\n	GRAPH ALREADY ADD")
				break;
			case 2:
				console.log(value + ":\n	GRAPH DOESN'T EXIST")
				break;
			default:
				break;
		}
		
	},
	
	log : function(opt, index, value) {
		
		switch(opt){
			case 1:
				console.log(value + ":\n	index: " + index + "\n	GRAPH: " + JSON.stringify(this.graph[index]));
				break;
			case 2:
				console.log(value + "\n		CURRENT index: " + index);
				break;
			default:
				break;
		}
	}
	
});