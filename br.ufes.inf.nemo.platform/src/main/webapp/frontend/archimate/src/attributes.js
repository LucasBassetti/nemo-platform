function attributes(paper, graph){
	
	
	paper.on('cell:pointerdblclick', function(cellView, evt, opt) {
		showAttributeDialog(cellView.model);
	});
	
	graph.on('add', function(cell) {
		
		console.log(cell.get('type') )
		
		if(cell.get('type') === 'archimate.Relationships') return;
		
		showAttributeDialog(cell);
	});
	
	function showAttributeDialog(cell){
		
		console.log(JSON.stringify(cell));
		
		var name = cell.get('name');
		
		var content = '<div class="attributes">'
		content = content + '<label class="name-label">Name:</label> <textarea rows="1" class="name" onclick="this.focus();this.select()">' + name + "</textarea>"
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
		
		function setName(){
			cell.set('name', $('.name').val());
			dialog.close();
		}
	}
	
}