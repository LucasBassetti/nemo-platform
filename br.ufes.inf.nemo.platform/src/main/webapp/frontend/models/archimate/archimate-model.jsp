<!DOCTYPE html>
<html>
<head>
	<meta charset="utf8" />
	<title>NP - ArchiMate</title>
	
    <%@include file="/frontend/template/template-header.jsp"%>
	<link href="frontend/models/archimate/css/style.css" rel="stylesheet">
	

</head>
<body>

	<%@include file="/frontend/template/template-body.jsp"%>

	<script src="frontend/models/archimate/libs/archimate.js"></script>
	<script src="frontend/models/archimate/libs/relationships.js"></script>
	<script src="frontend/models/archimate/libs/viewpoint.js"></script>

	<script src="frontend/models/archimate/src/core/main.js"></script>
	<script src="frontend/models/archimate/src/core/inspector.js"></script>
	<script src="frontend/models/archimate/src/core/keyboard.js"></script>
	<script src="frontend/models/archimate/src/core/stencil.js"></script>
	
	<script src="frontend/models/archimate/src/resizing.js"></script>
	<script src="frontend/models/archimate/src/embed.js"></script>
	<script src="frontend/models/archimate/src/attributes.js"></script>
	<script src="frontend/models/archimate/src/magicConnector.js"></script>
	<script src="frontend/models/archimate/src/viewpointHandle.js"></script>

	<script src="frontend/models/archimate/src/nemo.platform.archimate.js"></script>

	<script>
		// Uncomment the following line and comment the line after if you
		// want to use channels.
		//var app = new Rappid({ channelUrl: 'ws://localhost:4141' });
		var app = new Rappid;
		Backbone.history.start();
		
		var nemoApp = new nemo.platform.App;
		nemoApp.start(app, "archimate");
		
		var archimate = new nemo.platform.ArchiMate;
		archimate.start(app, nemoApp);
		
	</script>

</body>
</html>
