<!DOCTYPE html>
<html>
<head>
	<meta charset="utf8" />
	<title>MLT</title>
	
    <%@include file="/frontend/template/template-header.jsp"%>

</head>
<body>

	<%@include file="/frontend/template/template-body.jsp"%>
	<script src="frontend/archimate/src/archimate.js"></script>
	<script src="frontend/mlt/src/stencil.js"></script>

	<script>
		// Uncomment the following line and comment the line after if you
		// want to use channels.
		//var app = new Rappid({ channelUrl: 'ws://localhost:4141' });
		var app = new Rappid;
		Backbone.history.start();
	</script>

</body>
</html>
