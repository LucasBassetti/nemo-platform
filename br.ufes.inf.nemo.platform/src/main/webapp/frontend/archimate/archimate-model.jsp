<!DOCTYPE html>
<html>
<head>
	<meta charset="utf8" />
	<title>NP - ArchiMate</title>
	
    <%@include file="/frontend/template/template-header.jsp"%>

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
		
		resizing(app.graph);
		embed(app.paper, app.graph);
		attributes(app.paper, app.graph);
		magicConnector(app.validator, app.graph);
		
		$('#btn-t').click(function(){
			viewpointHanlde(app.graph, "Total");
		});
		
		$('#btn-o').click(function(){
			viewpointHanlde(app.graph, "Organisation");
		});
		
	</script>

</body>
</html>
