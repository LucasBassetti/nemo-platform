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

nemo.platform.File = Backbone.Model.extend({

	app : undefined,
	
	initialize : function() {
	
	},

	//Method do set the nemo.platform.App
	setApp : function(app) {
		this.app = app;
	},
	
	//Method to get parameters from url
	getUrlParameter : function(sParam)
	{
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) 
		{
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) 
			{
				return sParameterName[1];
			}
		}
	},
	
	//saveAs tree core data in file
	saveAsTree : function() {
		
		var $this = this;
		
		var content = '<div id="save-dialog" title="Save Model">'
			+ 'Name: <input type="text" id="save-filename" value="' + $('#filename').val() + '"/>'
			+ '</div>'
			+ '<div id="name-error-message">' + 'Name cannot be empty!' + '</div>';
			
		var dialog = new joint.ui.Dialog({
			width: 300,
			type: 'neutral',
			title: 'Save Model',
			content: content,
			buttons: [
				{ action: 'cancel', content: 'Cancel', position: 'left' },
				{ action: 'save', content: 'Save', position: 'left' }
			]
		});
		
		dialog.on('action:save', save);
		dialog.on('action:cancel', cancel);
		dialog.open();
		
		function cancel(){
			dialog.close();
		}

		function save() {
			if($('#save-filename').val() === "") {
				$('#name-error-message').show();
			}
			else {
				$('#filename').val($('#save-filename').val());
				$this.checkTreeExist(dialog);
			}
		}
	},
	
	//save in TripleStore
	saveInTripleStore : function() {
		
		var lod = this.app.lod;
		var connection = this.app.connection;
		
		var namedGraph = location.protocol + '//' + location.host + location.pathname + '?model=' + $('#filename').val();
		var triples = lod.parseTreeToTripleFormat(namedGraph);
		
		connection.save(namedGraph, triples);
		
	},
	
	//check if tree file exist
	checkTreeExist : function(dialog) {
		
		var model = this.app.model;
		var $this = this;
		
		$.ajax({
			type: "POST",
			url: "checkModelFile.htm",
			data: {
				'stencil' : model.stencil,
				'filename': $("#filename").val(),
			},
			success: function(data){ 		   

				if(data == "exist"){		   
					if (confirm('The file already exist, do you want to replace it?')) {
						$this.saveTree();
						dialog.close();
					} 
				}
				else{
					$this.saveTree();
					dialog.close();
				}
			},
			error : function(e) {
				alert("error: " + e.status);
				dialog.close();
			}
		});
		
	},
	
	//save tree core data in a file
	saveTree : function() {
		
		var model = this.app.model;
		var $this = this;
		
		var jsonTree = model.getJSONTree();
		
		var saveDialog = new joint.ui.Dialog({
			type: 'neutral' ,
			width: 420,
			draggable: false,
			title: 'Model Saved! ',
			content: 'The model ' + $('#filename').val() + ' was saved!',
			open: function() {}
		});
		
		$.ajax({
		   type: "POST",
		   async: false,
		   url: 'saveTree.htm',
		   data: {
			 'stencil': model.stencil,
			 'filename': $('#filename').val(),
			 'tree': JSON.stringify(jsonTree)
		   },
		   success: function(){ 		   
			   console.log('SAVE: ' + JSON.stringify(jsonTree));
			   $this.saveGraph();
			   
			   //save in triplestore
			   $this.saveInTripleStore();
			   
			   saveDialog.open();
		   },
		   error : function(e) {
			   alert("error: " + e.status);
		   }
		});
		
	},
	
	//open tree from dialog
	openTreeFromDialog : function() {
		
		var model = this.app.model;
		var $this = this;
		
		$.ajax({
			type: "POST",
			url: "getAllModels.htm",
			dataType: 'json',
			data: {
				'stencil': model.stencil,
			},
			success: function(data){ 		   
				generateOpenTreeDialog(data);
			},
			error : function(e) {
				alert("error: " + e.status);
			}
		});
		
		function generateOpenTreeDialog(data) {
			
			var content = '<form id="open">';
			for(var i = 0; i < Object.keys(data).length; i++){
				if(i == 0){
					content = content + '<input type="radio" name="model" value="' + data[i].model + '" checked>' 
					+ '<label>' + data[i].model + '</label> <br>';
				}
				else{
					content = content + '<input type="radio" name="model" value="' + data[i].model + '">' 
					+ '<label>' + data[i].model + '</label><br>';
				}

			}
			content = content +  '</form>';

			var dialog = new joint.ui.Dialog({
				width: 300,
				type: 'neutral',
				title: 'Open Model',
				content: content,
				buttons: [
				          { action: 'cancel', content: 'Cancel', position: 'left' },
				          { action: 'open', content: 'Open', position: 'left' }
				          ]
			});
			dialog.on('action:open', open);
			dialog.on('action:cancel', dialog.close);
			dialog.open();
			
			function open() {
				var filename = $('input[name=model]:checked', '#open').val();
				$this.openTree(filename);
				dialog.close();
			}
		}
		
	},
	
	//open tree core data
	openTree : function(filename) {
		
		var model = this.app.model;
		var $this = this;
		
		$.ajax({
		   type: "POST",
		   async: false,
		   url: 'openTree.htm',
		   data: {
			 'stencil': model.stencil,
			 'filename': filename,
		   },
		   //dataType: 'json',
		   success: function(jsonTree){ 	
			   
			   //set filename
			   $("#filename").val(filename);
			   //clean tabs
			   $('.ui-tabs-nav').empty();
			   $('#tabs').hide();
			   //load tree
			   model.setJSONTree(JSON.parse(jsonTree));
			   //load graph
			   $this.openGraph(filename);
		   },
		   error : function(e) {
			   alert("error: " + e.status);
		   }
		});
		
	},
	
	//save graph in a file
	saveGraph : function() {
		
		var model = this.app.model;
		var $this = this;
		
		var jsonGraph = model.getGraph();
		
		$.ajax({
		   type: "POST",
		   async: false,
		   url: 'saveGraph.htm',
		   data: {
			 'stencil': model.stencil,
			 'filename': $('#filename').val(),
			 'graph': JSON.stringify(jsonGraph),
		   },
		   success: function(){ 		   
			   console.log('SAVE: ' + JSON.stringify(jsonGraph));
		   },
		   error : function(e) {
			   alert("error: " + e.status);
		   }
		});
		
	},
	
	//open graph
	openGraph : function(filename) {
		
		var model = this.app.model;
		var $this = this;
		
		$.ajax({
		   type: "POST",
		   async: false,
		   url: 'openGraph.htm',
		   data: {
			 'stencil': model.stencil,
			 'filename': filename,
		   },
		   //dataType: 'json',
		   success: function(jsonGraph){ 	
			   model.setGraph(JSON.parse(jsonGraph));
			   //just to tab index not be empty
			   model.updateCurrentTabIndex("loaded");
		   },
		   error : function(e) {
			   alert("error: " + e.status);
		   }
		});
		
	},
	
	//open XML window
	openXMLWindow : function(content) {
		var win = window.open(
		   'data:application/xml,' + encodeURIComponent(
		     content
		   ),
		   '_blank', "resizable=yes,width=600,height=600,toolbar=0,scrollbars=yes"
		);
	},
	
	//open download windoes
	openDownloadWindows : function(content, file) {
		var blob = new Blob([content]);
		var link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = file;
		link.click();
	},
	
	
});