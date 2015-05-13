
function toolbar(paper, graph){
	
	var inspectorCollapsed = false;
	var inpectorType = undefined;
	
	paper.on('blank:pointerclick', function(evt, x, y) {
		inpectorType = "paper";
		
		if(!inspectorCollapsed){
			$('.inspector-paper-container').show();
			$('.inspector-container').hide();
		}
	});
	
	paper.on('cell:pointerclick', function(cellView, evt, opt) {
				
		inpectorType = "cell"
		if(!inspectorCollapsed){
			$('.inspector-paper-container').hide();
			$('.inspector-container').show();
		}
	});	
	
	$("#inspector-icon").click(
			function() {
				if ($(".inspector-container").is(":visible") || $(".inspector-paper-container").is(":visible")){
					
					if ($(".inspector-paper-container").is(":visible")){
						inpectorType = "paper";
						$(".inspector-container").hide();
						$(".inspector-paper-container").hide();
					}
					
					else if($(".inspector-container").is(":visible")){
						inpectorType = "cell";
						$(".inspector-container").hide();
						$(".inspector-paper-container").hide();
					}

					$(this).css({
						marginRight : "30px"
					});
					$("#tabs").css({
						right : "0"
					});
					
					inspectorCollapsed = true;
				} else{
					if(inpectorType == "paper"){
						$(".inspector-paper-container").show();
					}
					else if(inpectorType == "cell"){
						$(".inspector-container").show();
					}
					$(this).css({
						marginRight : "260px"
					});
					$("#tabs").css({
						right : "240px"
					});
					inspectorCollapsed = false;
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
							$("#tabs").css({
								left : "250px"
							});
						} else if ($("nav.sidebar").hasClass(
						"sidebar-menu-expanded")) {
							collapseMyMenu();
							hideMenuTexts();
							$(this).css({
								margin : "20px"
							});
							$("#tabs").css({
								left : "0"
							});
						}
						return false;
					});
		});

	}).call(this);
	
}

