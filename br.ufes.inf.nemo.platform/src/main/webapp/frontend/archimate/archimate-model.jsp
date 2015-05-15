<!DOCTYPE html>
<html>
<head>
	<meta charset="utf8" />
	<title>NP - ArchiMate</title>
	
    <%@include file="/frontend/template/template-header.jsp"%>
	<link href="frontend/archimate/css/style.css" rel="stylesheet">

</head>
<body>

	<%@include file="/frontend/template/template-body.jsp"%>
	
	<script src="frontend/archimate/libs/archimate.js"></script>
	<script src="frontend/archimate/libs/relationships.js"></script>
	<script src="frontend/archimate/libs/viewpoint.js"></script>
	
	<script src="frontend/archimate/src/core/main.js"></script>
	<script src="frontend/archimate/src/core/inspector.js"></script>
	<script src="frontend/archimate/src/core/keyboard.js"></script>
	<script src="frontend/archimate/src/core/stencil.js"></script>
	
	<script src="frontend/archimate/src/resizing.js"></script>
	<script src="frontend/archimate/src/embed.js"></script>
	<script src="frontend/archimate/src/attributes.js"></script>
	<script src="frontend/archimate/src/magicConnector.js"></script>
	<script src="frontend/archimate/src/viewpointHandle.js"></script>


	<script>
		// Uncomment the following line and comment the line after if you
		// want to use channels.
		//var app = new Rappid({ channelUrl: 'ws://localhost:4141' });
		var app = new Rappid;
		Backbone.history.start();
		
		
		
		modelTree(app.paper, app.graph, app.validator);
		paperTabs(app.paper, app.graph);
		toolbar(app.paper, app.graph);
		
		viewpointHanlde(app.graph);
		
		resizing(app.graph);
		embed(app.paper, app.graph);
		attributes(app.paper, app.graph);
		magicConnector(app.validator, app.graph);
		
		
		//$('.inspector-paper').create({ 
		
		
// 		$('.inspector-paper').bind("dblclick.jstree", function  (event) {
			
// 			var node = $(event.target).closest("li");
// 			console.log(node[0].id);
			
			
// 			var tree = $('.inspector-paper').jstree(true);
// 			var root = tree.get_node('root');
// 			var num_tabs = $("div#tabs ul li").length + 1;

			
			
// 	        $("div#tabs ul").append(
// 	            "<li><a href='#tab" + num_tabs + "'>#" + num_tabs + "</a></li>"
// 	        );
// 			$("div#tabs").append(
// 	            "<div id='tab" + num_tabs + "'>#" + num_tabs + "</div>"
// 	        );
// 	        $("div#tabs").tabs("refresh");
			
// 			tree.create_node(root, {}, "last", function (new_data) {
//             	//new_data = folder;
//                 new_data.data = {file: false};
//                 new_data.icon = "glyphicon glyphicon-folder-close";
//                 new_data.text = "New Folder";
//             });
			
			
// 			if(node[0].id === 'diagram'){
// 				alert('hello');	
// 			}
			
// 		});
		
		
	</script>

</body>
</html>
