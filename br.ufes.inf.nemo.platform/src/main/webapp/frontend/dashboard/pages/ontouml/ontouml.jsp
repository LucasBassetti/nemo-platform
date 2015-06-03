<!DOCTYPE html>
<html lang="en">

<head>
	<%@include file="/frontend/dashboard/content/header.jsp"%>
</head>

<body>

	<div id="wrapper">
		<%@include file="/frontend/dashboard/content/menu.jsp"%>
		<%@include file="/frontend/dashboard/pages/ontouml/ontouml-content.jsp"%>
	</div>
	<!-- /#wrapper -->
	
	<%@include file="/core/sb-admin/sb-admin-script.jsp"%>
	<%@include file="/frontend/template/jsp/script.jsp"%>
	
	<script>
		
		var dashboard = new nemo.dashboard.Model();
		dashboard.start("ontouml");
	
	</script>
	
</body>

</html>


