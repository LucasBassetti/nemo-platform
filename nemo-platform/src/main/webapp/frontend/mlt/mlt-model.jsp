<!DOCTYPE html>
<html>
<head>
	<meta charset="utf8" />
	<title>MLT</title>
	
	
<!-- 	
	<link rel="stylesheet" type="text/css" href="frontend/mlt/css/layout.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/paper.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/inspector.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/navigator.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/stencil.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/halo.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/selection.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/toolbar.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/statusbar.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/freetransform.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/style.css" />
  -->
    
    <!-- Bootstrap Core CSS -->
	<link
	href="core/sb-admin/bower-components/bootstrap/dist/css/bootstrap.min.css"
	rel="stylesheet">
    
<!--    	<link href="core/rappid-api/css/joint.ui.inspector.css" rel="stylesheet"> -->
<!--    	<link href="core/rappid-api/css/joint.ui.freeTransform.css" rel="stylesheet"> -->
    
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
   
    
    <link href="core/rappid-api/css/joint.css" rel="stylesheet">
    <link href="core/rappid-api/css/joint.ui.halo.css" rel="stylesheet">
    <link href="core/rappid-api/css/joint.ui.freeTransform.css" rel="stylesheet">
    <link href="core/rappid-api/css/joint.ui.selectionView.css" rel="stylesheet">
    <link href="core/rappid-api/css/joint.ui.tooltip.css" rel="stylesheet">
    <link href="core/rappid-api/css/joint.ui.navigator.css" rel="stylesheet">
    <link href="core/rappid-api/css/joint.ui.snaplines.css" rel="stylesheet">
    <link href="core/rappid-api/css/joint.ui.textEditor.css" rel="stylesheet">
    
    
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/toolbar.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/stencil.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/paper.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/inspector.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/halo.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/freetransform.css" />
    <link rel="stylesheet" type="text/css" href="frontend/mlt/css/selection.css" />
    
    
    
    
    
</head>
<body>

	<!-- jQuery -->
	<script src="core/sb-admin/bower-components/jquery/dist/jquery.min.js"></script>
	

	<!-- Bootstrap Core JavaScript -->
	<script
	src="core/sb-admin/bower-components/bootstrap/dist/js/bootstrap.min.js"></script>


	<%@include file="/frontend/mlt/template/toolbar.jsp"%>
	<%@include file="/core/rappid-api/rappid-api-script.jsp"%>
	
	<script src="frontend/mlt/js/keyboard.js"></script>
    <script src="frontend/mlt/js/inspector.js"></script>
    <script src="frontend/mlt/js/stencil.js"></script>
    <script src="frontend/mlt/js/main.js"></script>
	
	<script>
	
	
			$("#inspector-icon").click(
				function() {
					if ($(".inspector-container").is(":visible")){
						$(".inspector-container").hide();
						$(this).css({
							marginRight : "30px"
						});
					} else{
						$(".inspector-container").show();
						$(this).css({
							marginRight : "250px"
						});
					}
				});
		
		
	
		(function() {
			$(function() {
				var collapseMyMenu, expandMyMenu, hideMenuTexts, showMenuTexts;
				expandMyMenu = function() {
					return $("nav.sidebar").removeClass(
							"sidebar-menu-collapsed").addClass(
							"sidebar-menu-expanded");
				};
				collapseMyMenu = function() {
					return $("nav.sidebar")
							.removeClass("sidebar-menu-expanded").addClass(
									"sidebar-menu-collapsed");
				};
				showMenuTexts = function() {
					return $("nav.sidebar ul a span.expanded-element").show();
				};
				hideMenuTexts = function() {
					return $("nav.sidebar ul a span.expanded-element").hide();
				};
				return $("#stencil-icon").click(
						function(e) {
							if ($("nav.sidebar").hasClass(
									"sidebar-menu-collapsed")) {
								expandMyMenu();
								showMenuTexts();
								$(this).css({
									margin : "260px"
								});
							} else if ($("nav.sidebar").hasClass(
									"sidebar-menu-expanded")) {
								collapseMyMenu();
								hideMenuTexts();
								$(this).css({
									margin : "20px"
								});
							}
							return false;
						});
			});

		}).call(this);

		
		// Uncomment the following line and comment the line after if you
		// want to use channels.
		//var app = new Rappid({ channelUrl: 'ws://localhost:4141' });
		var app = new Rappid;
		Backbone.history.start();
	</script>

</body>
</html>
