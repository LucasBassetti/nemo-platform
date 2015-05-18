

function paperTabs(paper, graph){
	
	$ui('.inspector-paper').resizable();
	
	GLOBAL.tabs.delegate( ".ui-tabs-anchor", "click", function() {
		
		var tabId = $(this).attr('id');
		
		if(tabId === GLOBAL.currentTab) return;

		if(GLOBAL.currentTab != ""){
			GLOBAL.graphs[GLOBAL.currentTab] = graph.toJSON();
			graph.clear();
		}
		if(GLOBAL.graphs[tabId] != undefined){
			graph.fromJSON(GLOBAL.graphs[tabId]);
		}
		
		GLOBAL.currentTab = tabId;
		
	});
	
	GLOBAL.tabs.delegate( "span.ui-icon-close", "click", function() {
		
        var tabId = $( this ).closest( "li" ).remove().attr( "aria-labelledby" );
        
        //CLEAR GRAPH
		if(GLOBAL.currentTab !== tabId){
			GLOBAL.graphs[GLOBAL.currentTab] = graph.toJSON();
			//graph.clear();
		}
        
		$ui("#tabs").tabs("refresh");
        var num_tabs = $("div#tabs ul li").length;
        
        var curTabId = $(".ui-tabs-active").find("a").attr("id");
        $ui('#' + curTabId).click();
        
        if (num_tabs < 1) {
            $("#tabs").hide();
            GLOBAL.currentTab = "";
        }
    });
	
	//Handle with double click on diagrams
	$ui('.inspector-paper').bind("dblclick.jstree", function  (event) {
		
		var node = $(event.target).closest("li");
		var diagram = GLOBAL.tree.get_node(node[0].id);
		
		if(diagram.type !== 'diagram') return;
		
		var num_tabs = $("div#tabs ul li").length + 1;
		
		if(num_tabs == 1){
			 $("#tabs").show();
		}
		
		if($('#tabs #' + diagram.id).attr("id") == undefined) {
	        $("div#tabs ul").append(
	            '<li>' +
	            	'<a href="#diagram" id="' + diagram.id + '">' + diagram.text + '</a>' +
	            	'<span class="ui-icon ui-icon-close"></span>' +
	            '</li>'
	        );
	        
	        $ui("#tabs").tabs("refresh");
		}
        
        $ui('#tabs #' + diagram.id).click();
		
	});
	
	
}