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

nemo.dashboard.Model = Backbone.Model.extend({
	
	stencil : undefined,
	
	initialize : function() {
		
	},

	start : function(stencil) {
		
		this.stencil = stencil;
		this.initializeLoadingProcedure();
		this.initializeDashboard();
	},
	
	initializeDashboard : function() {
		
		console.log('STENCIL: ' + this.stencil);
		this.getModels();
	},
	
	initializeLoadingProcedure : function () {
		
		$('#loading')
	    .hide()  // hide it initially
	    .ajaxStart(function() {
	        $(this).show();
	    })
	    .ajaxStop(function() {
	        $(this).hide();
	    });
		
	},
	
	//get models from stencil folder
	getModels : function () {
		
		var $this = this;
		
		$.ajax({
		   type: "POST",
		   async: false,
		   url: "getAllModels.htm",
		   data: {
			   'stencil' : $this.stencil,
		   },
		   dataType: 'json',
		   success: function(data){ 		   
			   generateOptionsContent(data)
		   },
		   error : function(e) {
			   alert("error: " + e.status);
		   }
		});
		
		//generate models
		function generateOptionsContent(data){
			
			var url = $this.stencil + "-model.htm"
			content = '';
			
			for(var i = 0; i < Object.keys(data).length; i++){
				
				if(i == 0){
					content = '<hr style="margin-top:15px;"/>';
				}
				
				content = content + '<div class="btn-group">'
										+ '<a class="btn btn-edit" title="Edit" href="' + url + '?model=' + data[i].model + '"><i class="fa fa-pencil-square-o fa fw"></i></a>' 
										+ '<a class="btn btn-delete" title="Delete" value="' + data[i].model + '"><i class="fa fa-trash fa fw"></i></a>'
										+ '<label class="name">' + data[i].model + '</label>'
									+ '</div>'
									+ '<br/><hr/>'
			}
			
			$('#page-wrapper .panel-body').append(content);
		};
		
		//delete model
		$('.btn-delete').click(function(){
			
			var filename = $(this).attr('value');
			
			if (confirm('Are you sure you want to delete this file?')) {
				
				$.ajax({
				   type: "POST",
				   async: false,
				   url: "deleteModel.htm",
				   data: {
					   'stencil' : $this.stencil,
					   'filename' : filename
				   },
				   success: function(){
					   alert(filename + " deleted successfully!");
					   window.location.reload(true);
				   },
				   error : function(e) {
					   alert("error: " + e.status);
				   }
				});
			}
			
		});
		
	},
	
});