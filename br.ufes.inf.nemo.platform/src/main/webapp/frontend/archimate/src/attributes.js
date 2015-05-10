function attributes(paper, graph){
	
	paper.on('cell:pointerdblclick', function(cellView, evt, opt) {
		
		if(cellView.model.get('type') === 'archimate.Relationships') return;
		if(cellView.model.get('type') === 'archimate.Junction') return;
		
		showAttributeDialog(cellView.model);
	});
	
	graph.on('add', function(cell) {
		
		$('.inspector-paper-container').hide();
		$('.inspector-container').show();
		
		if(cell.get('type') === 'archimate.Relationships') return;
		if(cell.get('type') === 'archimate.Junction') return;
		
		showAttributeDialog(cell);
	});
	
	
	function showAttributeDialog(cell){
		
		//console.log(JSON.stringify(cell));
		
		var name = cell.get('name');
		var documentation = cell.get('documentation');
		
		var content = '<div class="attributes">'
		content = content + '<label class="name-label">Name:</label> <textarea rows="1" class="name" onclick="this.focus();this.select()">' + name + "</textarea>"
		content = content + '<button id="definition" alt="Get definition from Wikipedia">Wikipedia</button><br>'
		content = content + '<label class="name-label">Documentation:</label> <textarea rows="4" class="documentation">' + documentation + "</textarea>"
		content = content + "</div>"
		 
		var dialog = new joint.ui.Dialog({
			width: 300,
			type: 'neutral',
			title: 'General',
			content: content,
			buttons: [
				{ action: 'cancel', content: 'Cancel', position: 'left' },
				{ action: 'ok', content: 'OK', position: 'left' }
			]
		});
		dialog.on('action:ok', setName);
		dialog.on('action:cancel', dialog.close);
		dialog.open();
		
		$('.name').focus();
		$('.name').select();
		
		$(".attributes").keypress(function(e) {
		    if(e.which == 13) {
		    	setName();
		    }
		});
		
		$(".attributes").keyup(function(e) {
		    if(e.which == 27){
		    	dialog.close();
		    }
		});
		
		$('#definition').click(function(){
			getWikipediaDefinition();
		});
		
		function getWikipediaDefinition(){
			
			//alert(JSON.stringify(cell));
			
			$.ajax({
			   type: "POST",
			   async: false,
			   url: "getDefinition.htm",
			   data: {
				   'cellName' : $('.name').val(),
			   },
			   success: function(data){
				   $('.documentation').val(data)
			   },
			   error : function(e) {
				   //alert("error: " + e.status);
			   }
			});
			
		}
		
		function setName(){
			cell.set('name', $('.name').val());
			cell.set('documentation', $('.documentation').val());
			dialog.close();
		}
	}
	
}