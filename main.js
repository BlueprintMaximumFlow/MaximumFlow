Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

var nodeCount = 0;

// prepopulate with source and terminal nodes
var nodes = [];
var connections = [];
var plotMode = true;
var node1Index = 0;
var node2Index = 0;

// true = first point; false = second point
var firstPoint = true; 

jQuery(document).ready(function() {
    $("#canvas").attr("height", $("#canvas").css("height"));
    $("#canvas").attr("width", $("#canvas").css("width"));

    $("#canvas").click(function(e) {
        if (plotMode) {
            var x = e.pageX - this.offsetLeft - 160;
            var y = e.pageY - this.offsetTop - 160;


            // plot the node
            var ctx = this.getContext("2d");
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.stroke();

            // 0-indexed node id
            nodes.push({x: x, y: y, id: nodeCount}); 
            nodeCount += 1;
        } else {
            // not in plot mode: draw the lines
            if (firstPoint) {
                // first point
                var x = e.pageX - this.offsetLeft - 160;
                var y = e.pageY - this.offsetTop - 160;
                var distances = [];

                for (var i = 0; i < nodes.length; i++) {
                    distances.push(dist(i, x, y));
                }
                node1Index = distances.indexOf(distances.min());
                console.log("first node index: " + node1Index);

                // flip the firstPoint because we done with first node
                firstPoint = !firstPoint;
            } else {
                // second point
                var x = e.pageX - this.offsetLeft - 160;
                var y = e.pageY - this.offsetTop - 160;
                var distances = [];

                for (var i = 0; i < nodes.length; i++) {
                    distances.push(dist(i, x, y));
                }
                node2Index = distances.indexOf(distances.min());
                console.log("seocnd node index: " + node2Index);

                firstPoint = !firstPoint;
            }

            // draw the line
            if (node1Index != node2Index && firstPoint) {
                var c = document.getElementById("canvas");
                var ctx = c.getContext("2d");
                ctx.moveTo(nodes[node1Index].x, nodes[node1Index].y);
                ctx.lineTo(nodes[node2Index].x, nodes[node2Index].y);
                ctx.stroke();
                var capacity = prompt("Capacity: ");
            }
        }
    });
});

function displayNodes() {
    console.log(nodes);
}

// calculate distance between click and point
function dist(i, x, y) {
    return Math.sqrt((nodes[i].x - x) * (nodes[i].x - x) + (nodes[i].y - y) * (nodes[i].y - y));
}

function toggleNode() {
    plotMode = !plotMode;
}