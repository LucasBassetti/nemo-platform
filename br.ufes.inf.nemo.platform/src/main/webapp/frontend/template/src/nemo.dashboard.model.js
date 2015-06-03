nemo.dashboard.Model = Backbone.Model.extend({
	
	stencil : undefined,
	
	initialize : function() {
		
	},

	start : function(stencil) {
		
		this.stencil = stencil;
		this.initializeDashboard();
	},
	
	initializeDashboard : function() {
		
		console.log('STENCIL: ' + this.stencil);
		this.getModels();
		
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