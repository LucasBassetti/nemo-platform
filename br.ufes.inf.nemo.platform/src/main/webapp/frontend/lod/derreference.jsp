<!DOCTYPE html>
<html>
<head>
	<meta charset="utf8" />
	<title>NEMO Platform</title>
	
    <%@include file="/frontend/template/template-header.jsp"%>
	<link href="frontend/models/archimate/css/style.css" rel="stylesheet">
	
	<style type="text/css">
		.content {
			font-size: 16px;
			width: 100%;
/* 			width: 100% */
		}
		
		.page-header, h2 {
			border: 0;
		}
		
		.page-header {
			margin-left: 30px;
		}
		
		.panel-body {
		  	padding: 0;
		}
		
		.content tr {
			width: 100%;
			border-top: 1px solid #F8F8F8;
			border-bottom: 1px solid #F8F8F8;
		}
		
		.content td:first-child {
			width: 15%;
		}
		
		.content tr:nth-child(even) {
			background-color: #FDFDFD;
		}
		
		.content tr:hover {
			background-color: #F8F8F8;
		}
		
		.content td {
			padding: 30px;
		}
	
	</style>

</head>
<body>

	<%@include file="/frontend/template/jsp/script.jsp"%>
	

	<div id="page-wrapper">
		<div class="row">
			<div class="col-lg-12">
				<h2 class="page-header">
				</h2>
			</div>
			<!-- /.col-lg-12 -->
			
			<div class="col-lg-12">
				<div class="panel panel-default">
					<div class="panel-body">
					
					</div>
				</div>
			</div>
			
		</div>
	</div>
	<!-- /#page-wrapper -->


	<script>
		
	
		$(window).load(function() {
			
			//console.log(location.protocol + '//' + location.host + location.pathname);
			
			var db = "lfonseca";
			var stardog = new nemo.platform.Connection();
			var connection = stardog.connection;
			
			connection.getNamespaces({
				database: db,
			},
			function(ns){
				
				var URL = document.URL;
				$.each(ns, function(key, value){
					//URL = URL.replace(value, key + ":");
					URL = URL.replace(value, "");
				});
				
				$('.page-header').append('About: <a href="' + document.URL + '">' + URL + '</a>');
				
// 				console.log(JSON.stringify(ns));
				
				//var query = 'SELECT * WHERE { GRAPH ?g { <' + document.URL + '> ?y ?z . } }';
				var query = 'SELECT * {' +
								' {' +
									' SELECT * {' +
							  		' GRAPH ?g {' +
							    		' <' + document.URL + '> ?y ?z .' +
							  		' }' +
								' }' +
								' }' +
								' UNION' +
								' {' +
									' SELECT * {' +
										' <' + document.URL + '> ?y ?z .' +
									' }' +
								' } ' +
							' }';
				
				connection.query({
					database: db,
					query: query,  
				},
				function (data) {
					
 					console.log(JSON.stringify(data));
					
 					var content = '<table class="content">';
 					//var content = '<table class="content"><tr><td>Property</td><td>Value</td></tr>';
					$.each(data.results.bindings, function(key, element) {
						
						//var x = element.x.value;
						var y = element.y.value;
						var z = element.z.value;
						$.each(ns, function(key, value){
							//x = x.replace(value, key + ":");
							y = y.replace(value, key + ":");
							z = z.replace(value, key + ":");
						});
						
						//$('.content').append(' <a href="' + element.x.value + '">' + x + '</a>');
						content = content + '<tr><td><a href="' + element.y.value + '">' + y + '</a></td>';
						
						if(element.z.type === 'uri'){
							content = content + '<td><a href="' + element.z.value + '">' + z + '</a></td></tr>';
						}
						else {
							content = content + '<td>' + element.z.value + '</td></tr>';
						}
						
						
					})
					
					content = content + '</table>';
					
					$('.panel-body').append(content);
					
// 					$('a').click(function() {
// 				         location.reload();
// 					});
					
					window.onpopstate = function() {
						location.reload();
					}
					
				});
				
			});
			
			var query = 'SELECT * WHERE { GRAPH ?g { <' + document.URL + '> ?y ?z . } }';
			
			connection.exportDB({
				database: db,
				query: query,
				//mimetype: "application/x-turtle"
				//mimetype: "text/plain"
				//mimetype: "application/ld+json"
				mimetype: "application/rdf+xml"
			},
			function (data) {
				console.log(JSON.stringify(data));
			});
			
			
			
			
			//$('.content').append(document.URL);
			
		});
		
	</script>

</body>
</html>
