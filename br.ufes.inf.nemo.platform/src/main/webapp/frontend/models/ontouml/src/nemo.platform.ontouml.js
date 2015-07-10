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

nemo.platform.OntoUML = Backbone.View.extend({
	
	app: undefined,
	nemoApp: undefined,
	
	initialize: function() {
		
	},

	start: function(app, nemoApp) {
		
		this.app = app;
		this.nemoApp = nemoApp;
		
		this.initializeResizingProcedures();
		this.initializeContexMenuProcedures();
		
	},
	
	//Procedure to handle with resizing
	initializeResizingProcedures: function() {
		
		var graph = this.app.graph;
		var model = this.nemoApp.model;
		
		$.each(['show', 'hide'], function (i, ev) {
			var el = $.fn[ev];
			$.fn[ev] = function () {
				this.trigger(ev);
				return el.apply(this, arguments);
			};
		});
		
		graph.on('add', function(cell, collection, opt) {

			if (!opt.stencil) return;
			if(cell.get('type') === 'link') return;
			
			//Set font-size
			cell.attr('.stereotype/font-size', 12);
			cell.attr('.name-text/font-size', 12);
			
			var originalSize = cell.get('size');
			
			cell.set('size', {
				width: originalSize.width * 2,
				height: originalSize.height * 1.5
			});
			
		});
		
	},
	
	//Extend default ContextMenu procedure
	initializeContexMenuProcedures : function() {
		
		var graph = this.app.graph;
		var paper = this.app.paper;

		var model = this.nemoApp.model;
		var lod = this.nemoApp.lod;
	
		$ui('.paper').contextmenu({
			delegate: '.rotatable',
		    menu: [
		        {title: "Delete from view", cmd: "deleteFromView", uiIcon: "ui-icon-circle-close"},
		        {title: "Delete from model", cmd: "deleteFromModel", uiIcon: "ui-icon-close"},
		        {title: "Show connected links", cmd: "showConnectedLinks", uiIcon: "ui-icon-shuffle"},
		        {title: "Show/hide attributes and methods", cmd: "showAttributesMethods", uiIcon: "ui-icon-bullet"},
		        {title: "----"},
		        {title: "Show LOD properties", cmd: "showLODProperties", uiIcon: "ui-icon-pencil"},
		        ],
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
		        else if(ui.cmd === 'showAttributesMethods') {
		        	showAttributesMethods();
		        }
		        else if(ui.cmd === 'showLODProperties') {
		        	showLODProperties();
		        }
		    }
		
		});
		
		var cellId;
		paper.$el.on('contextmenu', function(e) { 
		    e.stopPropagation(); // Stop bubbling so that the paper does not handle mousedown.
		    e.preventDefault();  // Prevent displaying default browser context menu.
		    var cellView = paper.findView(e.target);
		    if (cellView) {
		       cellId = cellView.model.id;
		    }
		});
		
		
		function showAttributesMethods() {
			var cell = graph.getCell(cellId);
			
			if(cell.attr('.attrs-rect/display') === 'none'){
				cell.attr('.attrs-rect/display', 'normal');
				cell.attr('.methods-rect/display', 'normal');
				cell.attr('.attrs-text/display', 'normal');
				cell.attr('.methods-text/display', 'normal');
				cell.attr('.name-text/ref-y', .8);
				
			}
			else{
				cell.attr('.attrs-rect/display', 'none');
				cell.attr('.methods-rect/display', 'none');
				cell.attr('.attrs-text/display', 'none');
				cell.attr('.methods-text/display', 'none');
				cell.attr('.name-text/ref-y', .5);
			}
			
			model.updateCurrentTab(graph);
			model.updateCurrentGraph(graph);
		}
		
		function deleteFromModel() {
			var node = model.getNode(cellId);
			model.deleteNode(node);
		}
		
		function deleteFromView() {
			var cell = graph.getCell(cellId);
			cell.remove();
		}
		
		function showLODProperties() {
			var cell = graph.getCell(cellId);
			
			console.log('CELL: ' + JSON.stringify(cell));
			lod.generatePropertiesDialog(cell);
		}
		
		function showConnectedLinks() {
			
			var cell = graph.getCell(cellId);
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
		
		
	}
	
});
