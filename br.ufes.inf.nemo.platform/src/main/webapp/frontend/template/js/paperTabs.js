

function paperTabs(paper, graph){
	
	$ui('.inspector-paper').resizable();
	
	var tabs = $ui("#tabs").tabs({
        heightStyle: "fill"
    });
	
	tabs.delegate( ".ui-tabs-anchor", "click", function() {
		
		var tabId = $(this).attr('id');
		console.log(tabId + " " + GLOBAL.currentTab);
		
		if(tabId === GLOBAL.currentTab) return;

		if(GLOBAL.currentTab != ""){
			GLOBAL.graphs[GLOBAL.currentTab] = graph.toJSON();
			graph.clear();
		}
		if(GLOBAL.graphs[tabId] != undefined){
			console.log("GRAPH " + tabId + ": " + JSON.stringify(GLOBAL.graphs[tabId]));
			graph.fromJSON(GLOBAL.graphs[tabId]);
		}
		
		GLOBAL.currentTab = tabId;
		
	});
	
	tabs.delegate( "span.ui-icon-close", "click", function() {
		
        var tabId = $( this ).closest( "li" ).remove().attr( "aria-labelledby" );
        console.log("close: " + tabId);
        
        //CLEAR GRAPH
		//GLOBAL.graphs[tabId] = graph.toJSON();
		console.log("GRAPH CLOSE " + tabId + ": " + JSON.stringify(GLOBAL.graphs[tabId]));
		if(GLOBAL.currentTab === tabId){
			GLOBAL.graphs[GLOBAL.currentTab] = graph.toJSON();
			graph.clear();
		}
		GLOBAL.currentTab = "";
        
        //$( "#" + panelId ).remove();
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
		
		if($('#tabs #' + diagram.id).attr("id") != undefined){
			console.log($('#' + diagram.id).attr("id"));
		}
		else{
	        $("div#tabs ul").append(
	            '<li>' +
	            	'<a href="#diagram" id="' + diagram.id + '">' + diagram.text + '</a>' +
	            	'<span class="ui-icon ui-icon-close"></span>' +
	            '</li>'
	        );
		}
		
        console.log('DIAGRAM ID: ' + diagram.id)
		
        $ui("#tabs").tabs("refresh");
        $ui('#' + diagram.id).click();
		
	});
	
	
}