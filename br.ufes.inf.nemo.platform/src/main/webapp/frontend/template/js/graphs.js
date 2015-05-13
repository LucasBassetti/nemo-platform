var graphs = [];

function addGraph(index, graph){
	graphs[index] = graph;
};
	
function removeGraph(index){
	graphs.splice(index, 1);
};

function updateGraph(oldIndex, newIndex, graph){
	removeGraph(oldIndex);
	addGraph(newIndex, graph)
};


