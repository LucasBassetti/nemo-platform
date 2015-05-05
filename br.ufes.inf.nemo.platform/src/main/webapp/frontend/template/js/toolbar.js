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