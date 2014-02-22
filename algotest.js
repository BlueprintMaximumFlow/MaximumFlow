function run() {
	
}

// array of nodes as well as connections
function convert(nodes, connections) {
	var x = new Array(nodes.length);
	for(var i = 0; i < nodes.length; i++){
		x[i] = new Array(nodes.length);
	}

	// populate with zeroes
	for (var i = 0; i < x.length; i++) {
		for (var j = 0; j < x[i].length; j++) {
			x[i][j] = 0;
		}
	}

	for (var i = 0; i < connections.length; i++) {
		x[nodes.indexOf(connections[i].end)][nodes.indexOf(connections[i].start)] = connections[i].capacity;
	}

	console.log(x);
}