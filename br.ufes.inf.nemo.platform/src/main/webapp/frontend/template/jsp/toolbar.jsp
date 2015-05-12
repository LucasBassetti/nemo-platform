
<!-- TOOLBAR -->
<nav class="navbar navbar-default navbar-static-top" role="navigation">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse"
			data-target=".navbar-collapse">
			<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>
			<span class="icon-bar"></span> <span class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="index.htm">NEMO Platform</a>


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
						<button id="btn-clear" class="btn btn-default navbar-btn"
							data-tooltip="Clear">
							<img style="height: 20px" src="frontend/template/img/clear.png"
								alt="Clear">
						</button>
						<button id="btn-png" class="btn btn-default navbar-btn"
							data-tooltip="Open as PNG">
							<img style="height: 20px" src="frontend/template/img/pngfile.png"
								alt="Open as PNG">
						</button>
						<button id="btn-print" class="btn btn-default navbar-btn"
							data-tooltip="Open a Print Dialog">
							<img style="height: 20px" src="frontend/template/img/print.png"
								alt="Open a Print Dialog">
						</button>
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
							
						</div>

					</div>
					
	
				</div>

			</li>
		</ul>

	</div>
	
	
	<!-- /.navbar-header -->

</nav>

<!-- PAPER -->
<div id="content" class="span12">
	<div class="paper-container"></div>
</div>

<!-- STENCIL -->
<nav class='sidebar sidebar-menu-expanded'>
	<div class="stencil-container">
		<button class="btn-expand" title="Expand all">+</button>
		<button class="btn-collapse" title="Collapse all">-</button>
	</div>
</nav>

<div class="stencil-icon">
	<a href='#' id='stencil-icon'> <span
		class='glyphicon glyphicon-align-justify'></span>
	</a>
</div>

<!-- INSPECTOR -->
<div class="inspector-container"></div>

<div class="inspector-paper-container">
	<div class="inspector-paper">
		<div class="group" data-name="general">
		    <h3 class="group-label">Model Information</h3>
			<div class="field" data-field="name">
				<label>Name:</label>
				<textarea class="textarea" data-type="textarea" data-attribute="name"></textarea>
			</div>
			<div class="field" data-field="documentation">
				<label>Documentation:</label>
				<textarea class="textarea" data-type="textarea" data-attribute="documentation"></textarea>
			</div>
		</div>	
	</div>
</div>


<div class="inpector-icon">
	<a href='#' id='inspector-icon'> <span
		class='glyphicon glyphicon-align-justify'></span>
	</a>
</div>

<!-- STATUSBAR -->
<div class="statusbar-container"><span class="rt-colab"></span></div>


<!--  
<div class="toolbar-container">
     <button id="btn-undo" class="btn" data-tooltip="Undo"><img src="frontend/mlt/img/undo.png" alt="Undo"></button>
     <button id="btn-redo" class="btn" data-tooltip="Redo"><img src="frontend/mlt/img/redo.png" alt="Redo"></button>
     <button id="btn-clear" class="btn" data-tooltip="Clear Paper"><img src="frontend/mlt/img/clear.png" alt="Clear"></button>
     <button id="btn-svg" class="btn" data-tooltip="Open as SVG in a New Window">open as SVG</button>
     <button id="btn-png" class="btn" data-tooltip="Open as PNG in a New Window">open as PNG</button>
     <button id="btn-print" class="btn" data-tooltip="Open a Print Dialog"><img src="frontend/mlt/img/print.png" alt="Print"></button>
     <button id="btn-zoom-in" class="btn" data-tooltip="Zoom In"><img src="frontend/mlt/img/zoomin.png" alt="Zoom in"></button>
     <button id="btn-zoom-out" class="btn" data-tooltip="Zoom Out"><img src="frontend/mlt/img/zoomout.png" alt="Zoom out"></button>
     <div class="panel">
       <span id="zoom-level">100</span>
       <span>%</span>
     </div>
     <button id="btn-zoom-to-fit" class="btn" data-tooltip="Zoom To Fit"><img src="frontend/mlt/img/zoomtofit.png" alt="Zoom To Fit"></button>
     <button id="btn-fullscreen" class="btn" data-tooltip="Toggle Fullscreen Mode"><img src="frontend/mlt/img/fullscreen.png" alt="Fullscreen"></button>
     <button id="btn-to-front" class="btn" data-tooltip="Bring Object to Front">to front</button>
     <button id="btn-to-back" class="btn" data-tooltip="Send Object to Back">to back</button>
     <button id="btn-layout" class="btn" data-tooltip="Auto-layout Graph">layout</button>
     <label data-tooltip="Change Grid Size">Grid size:</label>
     <input type="range" value="10" min="1" max="50" step="1" id="input-gridsize">
     <output id="output-gridsize">10</output>
     <label data-tooltip="Enable/Disable Snaplines">Snaplines:</label>
     <input type="checkbox" id="snapline-switch" checked="">
 </div>
-->