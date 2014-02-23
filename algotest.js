function run() {
	
}

// array of nodes as well as connections
function convert(nodes, connections) {
	var x = new Array(nodes.length+1);
	for(var i = 0; i < nodes.length+1; i++){
		x[i] = new Array(nodes.length+1);
	}

	// populate with zeroes
	for (var i = 0; i < x.length; i++) {
		for (var j = 0; j < x[i].length; j++) {
			x[i][j] = 0;
		}
	}

	for (var i = 1; i < connections.length+1; i++) {
		x[nodes.indexOf(connections[i-1].start)+1][nodes.indexOf(connections[i-1].end)+1]
		 = connections[i-1].capacity;
	}


	console.log(x);

	var cap = x;	
	console.log("cap legth is: " + cap.length);
/////////////////////////////////////////////////////////////////////////

	// convert Kevin's art
	var info = {
//		cap: new Array(10),
		rest: new Array(cap.length),
		num: 0,
		active: new Array(cap.length),
		label: new Array(cap.length),
		inflow: new Array(cap.length)
	}
	// remember to 2-Dfy it
	for (var i = 0; i < cap.length; i++) {

		info.rest[i] = new Array(info.rest.length);
		info.label[i]= 0;
		info.inflow[i]= 0;
		info.active[i] = 0;

		for(var j = 0; j < cap.length; j++){
			info.rest[i][j] = cap[i][j];
		}
	}
	
	console.log("testing rest: " + info.rest);

	console.log(info);

	var method = {
		height: function() {
			var p1, p2, count, temp, layer;
			var conflict = new Array(cap.length-1);
			for (var i = 1; i < cap.length-1; i++) {
				conflict[i] = 0;
			}
			count = 0;
			p1 = 0;
			p2 = 0;
			layer = 0;
			var q = new Array(999);
			for  (var i=0;i<999;i++){
				q[i]=0;
			}
			q[0] = cap.length-1;
			console.log("entering loop");
			while (count < cap.length - 2) {
				//console.log("count is"+ count);
				layer = layer + 1;
				temp = 0;
				for (var i = p1; i <= p2; i++) {
					for (var j = 1; j < cap.length-1; j++) {
						
						if ((info.rest[j][q[i]] > 0) && (conflict[j] == 0)) {
							count = count + 1;
							temp = temp + 1;
							q[p2 + temp] = j;
							info.label[j] = layer;
							conflict[j] = 1;
						}
					}
				}
				p1 = p2 + 1;
				p2 = p2 + temp;
			}
		},

		init: function() {
			for (var i = 1; i <= cap.length-1; i++) {
				if (cap[1][i] > 0) {
					info.rest[i][1] = cap[1][i];
					info.rest[1][i] = 0;
					info.inflow[i] = cap[1][i];
					info.active[i] = 1;
				}
			}
			info.label[1] = cap.length-1;
		},

		judgerelabel: function(act) {
			var i; 
			for (i = 1; i <= cap.length-1; i++) {
				if (info.rest[act][i] > 0) {
					return true;
				}
			}
			return false;
		},

		refreshVoid: function() {
			var i;
			for (i = 1; i <= cap.length-1; i++) {
				if (info.inflow[i] > 0) {
					info.active[i] = 1;
				} else {
					info.active[i] = 0;
				}
			}
		},

		refresh: function(act) {
			if (info.inflow[act] == 0) {
				info.active[act] = 0;
			} else {
				info.active[act] = 1;
			}
		},

		relabel: function(act) {
			info.label[act] += 1;
		},

		push: function(start, end) {
			var k;
			k = info.inflow[start];
			if (k > info.rest[start][end]) {
				info.inflow[start] = k - +info.rest[start][end];
				info.inflow[end] = info.inflow[end] + +info.rest[start][end];
				info.rest[end][start]=info.rest[end][start] + +cap[start][end];
				info.rest[start][end]=0;
				method.refresh(start);
				method.refresh(end);
			} else {
				info.inflow[start]=0;
				info.inflow[end]=info.inflow[end] + k;
				info.rest[end][start]=info.rest[end][start] + k;
				info.rest[start][end]=info.rest[start][end] - k;
				method.refresh(start);
				method.refresh(end);
			}
		},

		judge: function() {
			console.log("judge() called");
			for ( i = 2; i <= cap.length - 2; i++) {
				console.log(+ info.active[i]);
				if (info.active[i] == 1) {
					return true;
				}
			}
			return false;
		}
	}

	console.log("Reached equivalent to main method");

	var i, j;

	for (i = 1; i < cap.length; i++) {
		info.active[i] = 0;
		info.inflow[i] = 0;

		for (var j = 1; j < cap.length; j++) {

			info.rest[i][j] = cap[i][j];
		}
	}

	console.log("before height");
	method.height();
	console.log("about to init");
	method.init();
	console.log("about to judge");

	console.log(method.judge());
	while(method.judge()) {
		console.log("ran push");
		for (i = 2; i <= cap.length - 2; i++) {
			while (info.active[i] == 1) {
				for (j = 1; j <= cap.length-1; j++) {
					console.log("ran push");
					if (info.label[i] == info.label[j] + 1) {
						console.log("ran push");
						if (info.rest[i][j] > 0) {
							console.log("ran push");
							method.push(i, j);
						}
					}
					console.log("loop");
				}
				if ((info.inflow[i] > 0) && (method.judgerelabel(i))) {
					method.relabel(i);
				}
				method.refresh(i);
			}
		}
		method.refreshVoid();
	}
	var tot = 0; 
	console.log("Output matrix: " + info.rest);
	tot= info.inflow[cap.length-1];
	console.log("The optimal flow is: "+ tot);
	alert("The optimal flow is: " + tot);
	

}
