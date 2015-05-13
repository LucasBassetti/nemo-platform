var currentTab = "diagram1";

function paperTabs(paper, graph){
	
	var tabs = $ui("#tabs").tabs({
        heightStyle: "fill"
    });
	
	$('#tabs').click(function(){
		
		
		
	});
	
	tabs.delegate( ".ui-tabs-anchor", "click", function() {
		
		var tabId = $(this).attr('id');
		console.log(tabId + " " + currentTab);
		
		if(tabId === currentTab) return;

		if(currentTab != ""){
			graphs[currentTab] = graph.toJSON();
			graph.clear();
		}
		if(graphs[tabId] != undefined){
			console.log("GRAPH " + tabId + ": " + JSON.stringify(graphs[tabId]));
			graph.fromJSON(graphs[tabId]);
		}
		
		currentTab = tabId;
		
	});
	
	tabs.delegate( "span.ui-icon-close", "click", function() {
		
        var tabId = $( this ).closest( "li" ).remove().attr( "aria-labelledby" );
        console.log("close: " + tabId);
        
        //CLEAR GRAPH
		//graphs[tabId] = graph.toJSON();
		console.log("GRAPH CLOSE " + tabId + ": " + JSON.stringify(graphs[tabId]));
		if(currentTab === tabId){
			graphs[currentTab] = graph.toJSON();
			graph.clear();
		}
		currentTab = "";
        
        //$( "#" + panelId ).remove();
		$ui("#tabs").tabs("refresh");
        var num_tabs = $("div#tabs ul li").length;
        
        var curTabId = $(".ui-tabs-active").find("a").attr("id");
        $ui('#' + curTabId).click();
        
        if (num_tabs < 1) {
            $("#tabs").hide();
            currentTab = "";
        }
    });
	
	$ui('.inspector-paper').bind("dblclick.jstree", function  (event) {
		
		var node = $(event.target).closest("li");
		//var diagram = node[0];
		//console.log(node[0].id);
		
		var tree = $ui('.inspector-paper').jstree(true);
		var diagram = tree.get_node(node[0].id);
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
        
        //console.log('TAB: ' + currentTab);
        $ui('#' + diagram.id).click();
        //currentTab = diagram.id;
        
        //console.log(graphs[diagram.id]);
        //graph.fromJSON(graphs[diagram.id]);
		
	});
	
	
}