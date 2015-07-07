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

nemo.platform.Model = Backbone.Model.extend({
	
	app : undefined,
	
	//TEMPLATE VARS
	currentTabIndex : "",
	graph : {},
	layout: undefined,
	tree : undefined,
	tabs : undefined,
	
	//STENCIL VARS
	stencil : undefined,
	
	initialize : function() {

		this.initializeLayout();
		this.initializeTree();
		this.initializeTabs();
		
		console.log("INITIALIZE NEMO PLATFORM MODEL!");
		
		//var conn = new nemo.platform.Connection();
		//conn.testQuery();
	},
	
	setApp : function(app) {
		this.app = app;
	},
	
	//Set stencil (when start application)
	setStencil : function(stencil) {
		this.stencil = stencil;
	},
	
	//Procedure to initialize the layout
	initializeLayout : function(){
		
	    this.layout = $ui('.layout').layout({ 
	    	applyDefaultStyles: true,
	    	//Stencil
	    	east: {
	    		resizable: false,
	    	},
	    	//Inspector
	    	west: {
	    		
	    	},
	    	//View(ex.:Console)
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

		$('.paper-scroller').scrollLeft(265);
	    $('.paper-scroller').scrollTop(0);	
	    
	},
	
	//Procedure to initialize model tabs
	initializeTabs : function(){
		
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
	
	//Method to get the tabs
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
	
	//Method to update cell in all graphs
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
	
	//Method to delete cell in all graphs
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
	
	//Method to rename cell in all graphs
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
	
	//Method to update tree node data 
	updateTreeData : function(cell) {
		var node = this.getNode(cell.id);
		//update node data
		node.data = cell;
	},
	
	//Method to rename tree link
	renameTreeLink : function(link, graph) {
		var linkNode = this.getNode(link.id);
		
		var source = graph.getCell(link.get('source').id);
		var target = graph.getCell(link.get('target').id);
		
		if(!(source && target)) return;
		
		var newLinkName = undefined;
		
		if(source.get('name') && target.get('name') ) {
			newLinkName = link.get('flowType') + " (" + source.get('name') + " -> " +  target.get('name') + ")"
		}
		else if (source.get('name')) {
			newLinkName = link.get('flowType') + " (" + source.get('name') + " -> " +  target.get('subType') + ")"
		}
		else if (target.get('name')) {
			newLinkName = link.get('flowType') + " (" + source.get('subType') + " -> " +  target.get('name') + ")"
		}
		
		this.renameTreeNode(linkNode, newLinkName);
	},
	
	//Method do rename tree node
	renameTreeNode : function(oldNodeName, newNodeName) {
		this.tree.rename_node(oldNodeName, newNodeName);
		console.log('NODE RENAMED!')
	},
	
	//Method to delete tree connected links
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
	
	//Method to add new cell on tree
	newCell : function(cell, graph) {
		
		var text = undefined;
		if(cell.get('name')) {
			text = cell.get('name') + " (" + cell.get('subType') + ")";
		} else {
			text = cell.get('subType') + " (" + cell.get('subType') + ")";
		}
		
		var new_data = { 
				"id": cell.id, 
				"text": text,
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
	
	//Method to check if node is a diagram
	isDiagram : function(node) {
		if(node.type === "diagram") {
			return true;
		}
		return false;
	},
	
	//Method to check if node is a folder
	isFolder : function(node) {
		if(node.type === "default") {
			return true;
		}
		return false;
	},
	
	//Method to check if node is a cell
	isCell : function(node) {
		if(node.type === "cell") {
			return true;
		}
		return false;
	},
	
	//Method to check if node is a link
	isLink : function(node) {
		if(node.type === "link") {
			return true;
		}
		return false;
	},

	//Method to get tree core data in JSON format
	getJSONTree : function() {
		return this.tree.get_json();
	},
	
	//Method to set tree core data
	setJSONTree : function(jsonTree) {
		this.tree.settings.core.data = jsonTree;
		this.tree.refresh(-1);
	},
	
	//Method to get graph
	getGraph : function() {
		return this.graph;
		console.log('GET: ' + JSON.stringify(this.graph));
	},
	
	//Method to set graph
	setGraph : function(jsonGraph) {
		this.graph = jsonGraph;
		console.log('OPEN: ' + JSON.stringify(jsonGraph));
	},
	
	/**
	 * RELATIONSHIPS METHODS
	 */
	
	//Method to relationships
	getRelationships: function(source, target){

		var eRelationships = {};
		
		$.each(relationships[source][target], function (index, relationKey) {
			
			if(relationshipsKeys[relationKey]) {
				eRelationships[index] = relationshipsKeys[relationKey];
			}
			else {
				eRelationships[index] = relationKey;
			}
		});
		
		return eRelationships;
	},
	
	/**
	 * EXPORT METHODS
	 */
	
	//get all elements
	getAllTreeElements : function(jsonElements) {
		
		var $this = this;
		var elements = [];
		
		$.each(jsonElements, function(index, element) {
			
			elements.push(element);
			
			if(element.children !== "[]") {
				elements = $.merge(elements, $this.getAllTreeElements(element.children))
			}
			
		});
		
		return elements;
	},
	
	//replace special characteres in string
	cleanString : function(content) {
		
		var a = decodeURIComponent("%C3%A1%C3%A0%C3%A3%C3%A2%C3%A4"); //áàãâä
		var e = decodeURIComponent("%C3%A9%C3%A8%C3%AA%C3%AB"); //éèêë
		var i = decodeURIComponent("%C3%AD%C3%AC%C3%AE%C3%AF"); //íìîï
		var o = decodeURIComponent("%C3%B3%C3%B2%C3%B5%C3%B4%C3%B6"); //óòõôö
		var u = decodeURIComponent("%C3%BA%C3%B9%C3%BB%C3%BC"); //úùûü
		var c = decodeURIComponent("%C3%A7"); //ç
		
		var A = decodeURIComponent("%C3%81%C3%80%C3%83%C3%82%C3%84"); //ÁÀÃÂÄ
		var E = decodeURIComponent("%C3%89%C3%88%C3%8A%C3%8B"); //ÉÈÊË
		var I = decodeURIComponent("%C3%8D%C3%8C%C3%8E%C3%8F"); //ÍÌÎÏ
		var O = decodeURIComponent("%C3%93%C3%92%C3%95%C3%94%C3%96"); //ÓÒÕÔÖ
		var U = decodeURIComponent("%C3%9A%C3%99%C3%9B%C3%9C"); //ÚÙÛÜ
		var C = decodeURIComponent("%C3%87"); //Ç
		
		var specialChars = [
        	{val:"a",let: a},
        	{val:"e",let: e},
        	{val:"i",let: i},
        	{val:"o",let: o},
        	{val:"u",let: u},
        	{val:"c",let: c},
        	{val:"A",let: A},
        	{val:"E",let: E},
        	{val:"I",let: I},
        	{val:"O",let: O},
        	{val:"U",let: U},
        	{val:"C",let: C},
        ];
		
		var $spaceSymbol = '-';
		var regex;
		for (var i = 0; i < specialChars.length; i++) {
			regex = new RegExp("["+specialChars[i].let+"]", "g");
			content = content.replace(regex, specialChars[i].val);
			regex = null;
		}
		
		content = content
					.replace(/\ /g, "")
					.replace(/\n/g,"")
					.replace(/\r/g,"")
					.replace("->", "_")
					.replace(/\(/g, "_")
					.replace(/\)/g, "")
					.replace(/[^a-z0-9_\s]/gi, '')
					.replace(/[_\s]/g, '_')
					.replace(/__/g, '_')
					
					
		return content; 
		
	},
	
	
	/**
	 * WEB SPEECH METHODS
	 */
	
	speak: function(text) {
		speaker	= new RobotSpeaker();
		speaker.speak("en", text);
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