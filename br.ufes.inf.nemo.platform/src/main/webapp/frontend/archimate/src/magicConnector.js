function magicConnector(validator, graph){
	
	validator.validate('change:target change:source', function(err, command, next) {

		if(!(command.data.type === "archimate.Relationships")) return;

		var link = graph.getCell(command.data.id);
		createMagicConnection(link);
		
	});
	
	function createMagicConnection(link){
		
		var sourceElement = graph.getCell(link.get('source').id);
		var targetElement = graph.getCell(link.get('target').id);

		var source = sourceElement.get('subType').replace(" ", "");
		var target = targetElement.get('subType').replace(" ", "");

		var connections = getConnections(source, target);
		generateMagicConnectionDialog(sourceElement.get('name'), targetElement.get('name'), connections, link);
		
	}

	function generateMagicConnectionDialog(source, target, connections, link){

		console.log(JSON.stringify(connections));
		var content = '<form class="magic-connector">';

		var content = content + '<label>' + source + '</label> -> <label>' + target + '</label><br>';
		
		$.each(connections, function(index, value){
			console.log(value)
			if(index == 0){
				content = content + '<input type="radio" name="connection" value="' + value + '" checked>' 
				+ '<label>' + value + '</label><br>';
			}
			else{
				content = content + '<input type="radio" name="connection" value="' + value + '">' 
				+ '<label>' + value + '</label><br>';
			}
		});

		content = content +  '</form>';

		var dialog = new joint.ui.Dialog({
			width: 300,
			type: 'neutral',
			title: 'Magic Connector',
			content: content,
			buttons: [
			          { action: 'cancel', content: 'Cancel', position: 'left' },
			          { action: 'ok', content: 'OK', position: 'left' }
			]
		});
		dialog.on('action:ok', createConnection);
		dialog.on('action:cancel', cancel);
		dialog.on('action:close', cancel);
		dialog.open();

		$(".magic-connector").keypress(function(e) {
		    if(e.which == 13) {
		    	createConnection();
		    }
		});
		
		
		function createConnection(){
			var connectionType = $('input[name=connection]:checked', '.magic-connector').val();
			link.set('flowType', connectionType);
			dialog.close();
		}

		function cancel(){
			link.remove();
			dialog.close();
		}

		
	}
	
	function getConnections(source, target){

		var connections = [];
		
		$.each(relationships[source][target], function (index, relationKey) {
			connections[index] = relationshipsKeys[relationKey];
		});
		
		return connections;
	}

}

