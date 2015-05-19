<!DOCTYPE html>
<html>
<head>
	<meta charset="utf8" />
	<title>NP - ArchiMate</title>
	
    <%@include file="/frontend/template/template-header.jsp"%>
<!-- 	<link href="frontend/models/ontouml/css/style.css" rel="stylesheet"> -->

</head>
<body>

	<%@include file="/frontend/template/template-body.jsp"%>
	
	<!-- LIBS -->
	<script src="frontend/models/ontouml/libs/ontouml.js"></script>
	
	<!-- CORE -->
	<script src="frontend/models/ontouml/src/core/main.js"></script>
	<script src="frontend/models/ontouml/src/core/inspector.js"></script>
	<script src="frontend/models/ontouml/src/core/keyboard.js"></script>
	<script src="frontend/models/ontouml/src/core/stencil.js"></script>
	
	<!-- SOURCE -->
	<script src="frontend/models/ontouml/src/nemo.platform.ontouml.js"></script>
	

	<script>
		// Uncomment the following line and comment the line after if you
		// want to use channels.
		//var app = new Rappid({ channelUrl: 'ws://localhost:4141' });
		var app = new Rappid;
		Backbone.history.start();
		
		var nemoApp = new nemo.platform.App;
		nemoApp.start(app);
		
		var ontouml = new nemo.platform.OntoUML;
		ontouml.start(app, nemoApp);
		
		
	</script>

</body>
</html>
