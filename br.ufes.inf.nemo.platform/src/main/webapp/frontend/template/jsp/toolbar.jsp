<!-- TOOLBAR -->
<nav class="navbar navbar-default navbar-static-top noselect" role="navigation">

	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse"
			data-target=".navbar-collapse">
			<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>
			<span class="icon-bar"></span> <span class="icon-bar"></span>
		</button>
<!-- 		<a class="navbar-brand" href="index.htm">NEMO Platform</a> -->
		<a class="navbar-brand">NEMO Platform</a>

		<ul class="nav navbar-nav">
			<li style="margin-left: 30px">

				<div class="toolbar-container">

					<div class="btn-group" role="group">
						<button id="btn-undo" class="btn btn-default navbar-btn"
							data-tooltip="Undo">
							<img style="height: 20px" src="frontend/template/img/undo.png"
								alt="Undo">
						</button>
						<button id="btn-redo" class="btn btn-default navbar-btn"
							data-tooltip="Redo">
							<img style="height: 20px" src="frontend/template/img/redo.png"
								alt="Undo">
						</button>
<!-- 						<button id="btn-clear" class="btn btn-default navbar-btn" -->
<!-- 							data-tooltip="Clear"> -->
<!-- 							<img style="height: 20px" src="frontend/template/img/clear.png" -->
<!-- 								alt="Clear"> -->
<!-- 						</button> -->
						<button id="btn-zoom-in" class="btn btn-default navbar-btn"
							data-tooltip="Zoom in">
							<img style="height: 20px" src="frontend/template/img/zoomin.png"
								alt="Zoom in">
						</button>
						<button id="btn-zoom-out" class="btn btn-default navbar-btn"
							data-tooltip="Zoom out">
							<img style="height: 20px" src="frontend/template/img/zoomout.png"
								alt="Zoom out">
						</button>
					</div>
											
						<div class="panel-toolbar">
			              <span id="zoom-level">100</span>
			              <span>%</span>
			            </div>
		
					<div class="btn-group" role="group">
						<button id="btn-zoom-to-fit" class="btn btn-default navbar-btn"
							data-tooltip="Zoom To Fit">
							<img style="height: 20px"
								src="frontend/template/img/zoomtofit.png" alt="Zoom To Fit">
						</button>
						
						<div class="btn-group">
						
							<button type="button" class="btn btn-default navbar-btn"
								data-toggle="dropdown">
								<img style="height: 20px" src="frontend/template/img/to-front-to-back.png"
											alt="Auto-layout Graph">
								Options <span class="caret"></span>
							</button>
						
							<ul class="dropdown-menu">
								<li>
									<a id="btn-to-front"
										data-tooltip="Bring Object to Front">
										to front
									</a>
								</li>
								<li>
									<a id="btn-to-back"
										data-tooltip="Send Object to Back">
										to back
									</a>
								</li>
								<li>
									<a id="btn-layout"
										data-tooltip="Auto-layout Graph">
										layout
									</a>
								</li>
							</ul>
							
							<button id="btn-toggle-all-panes" class="btn btn-default navbar-btn"
								data-tooltip="Toggle All Panes" style="margin-left:-1px;">
								<img style="height:20px;" src="frontend/template/img/show_hide.png"
									alt="Toggle All Panes">
							</button>
							
						</div>

					</div>
					
	
				</div>

			</li>
		</ul>

	</div>
	
	
	<!-- /.navbar-header -->

</nav>

<nav class="navbar navbar-default noselect">
	<div class="container-fluid">

		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown" role="button" aria-expanded="false">File
						<span class="caret"></span>
				</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#" id="btn-open">Open</a></li>
						<li><a href="#" id="btn-save">Save</a></li>
						<li><a href="#" id="btn-saveAs">Save as</a></li>
						<li class="divider"></li>
						<li><a href="#" id="btn-print">Print</a></li>
						<li class="divider"></li>
						<li><a href="index.htm" id="btn-exit">Exit</a></li>
					</ul></li>
			</ul>
			
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown" role="button" aria-expanded="false">Tool
						<span class="caret"></span>
				</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#" id="btn-png">Export to PNG</a></li>
						<li><a href="#" id="btn-svg">Export to SVG</a></li>
					</ul></li>
			</ul>
			
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown" role="button" aria-expanded="false">Help
						<span class="caret"></span>
				</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#">About</a></li>
					</ul></li>
			</ul>
		</div>
		
	</div>
</nav>

<!-- LAYOUT -->
<div class="layout noselect">

	<!-- TABS/PAPER -->
	<div class="ui-layout-center" >
		<div id="tabs">
			<ul>
				<li><a href="#diagram" id="diagram1">Diagram</a> <span
					class="ui-icon ui-icon-close"></span></li>
			</ul>
			<div id="diagram">
				<!-- PAPER  -->
				<div id="content">
					<div class="paper-container"></div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- VIEWS:(ex.:CONSOLE) -->
	<div class="ui-layout-south">
	</div>
	
	<!-- STENCIL -->
	<div class="ui-layout-east">
		<div class="stencil-container">
			<button class="btn-expand" title="Expand all">+</button>
			<button class="btn-collapse" title="Collapse all">-</button>
		</div>
	</div>
	
	<!-- INSPECTOR -->
	<div class="ui-layout-west">
		<div class="inspector-container"></div>
		<div class="inspector-paper"></div>
	</div>
</div>

