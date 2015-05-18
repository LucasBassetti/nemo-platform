
<!-- Navigation -->
<nav class="navbar navbar-default navbar-static-top" role="navigation"
	style="margin-bottom: 0">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse"
			data-target=".navbar-collapse">
			<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>
			<span class="icon-bar"></span> <span class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="index.htm">NEMO Platform</a>
	</div>
	<!-- /.navbar-header -->

	<ul class="nav navbar-top-links navbar-right">

		<li class="dropdown"><a class="dropdown-toggle"
			data-toggle="dropdown" href="#"> <i class="fa fa-user fa-fw"></i>
				<i class="fa fa-caret-down"></i>
		</a>
			<ul class="dropdown-menu dropdown-user">
				<li><a href="#"><i class="fa fa-user fa-fw"></i> User
						Profile</a></li>
				<li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a></li>
				<li class="divider"></li>
				<li><a href="#"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>
			</ul> <!-- /.dropdown-user --></li>
		<!-- /.dropdown -->
	</ul>
	<!-- /.navbar-top-links -->

	<div class="navbar-default sidebar" role="navigation">
		<div class="sidebar-nav navbar-collapse">
			<ul class="nav" id="side-menu">
				<li class="sidebar-search">
					<div class="input-group custom-search-form">
						<input type="text" class="form-control" placeholder="Search">
						<span class="input-group-btn">
							<button class="btn btn-default" type="button">
								<i class="fa fa-search"></i>
							</button>
						</span>
					</div> <!-- /input-group -->
				</li>
				
				<!-- HOME -->
				<li><a href="index.htm"><i class="fa fa-home fa-fw"></i>
						Home</a></li>
				
				<!-- MODELS -->
				<li id="dropdown">
                     <a data-toggle="collapse" href="#dropdown-lvl2">
                         <span class="fa fa-cogs fa-fw"></span> Models <span class="caret"></span>
                     </a>
                     <div id="dropdown-lvl2" class="panel-collapse collapse">
                     	<div class="panel-body">
						<ul class="nav" id="side-menu">
							<li><a href="archimate.htm">
								<span class="fa fa-sitemap fa-fw"></span> ArchiMate
							</a></li>
							<li><a href="ontouml.htm">
								<span class="fa fa-sitemap fa-fw"></span> OntoUML
							</a></li>
							<li><a href="models.htm">
								<span class="fa fa-cogs fa-fw"></span> Models 
							</a></li>
						</ul>
						</div>
					</div>
                 </li>
				
				<!-- ABOUT -->
				<li><a href="about.htm"><i class="fa fa-question-circle fa-fw"></i>
						About</a></li>
						
				
			</ul>
		</div>
		<!-- /.sidebar-collapse -->
	</div>
	<!-- /.navbar-static-side -->
</nav>


