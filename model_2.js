
function Graph(width, height) {
	this.graph = [[1, 2, 3, 4],[0],[0],[0],[0]];
	this.myArea = [0,0,0,0,0]
	this.areas = [[0,1,2,3,4]];
	this.width = width;
	this.height = height;
}

Graph.prototype.make = function() {
		for (var i = 0; i < this.height; i++) {
		for (var j = 0; j < this.width; j++) {

			var e = i * this.width + j + 5;
			this.graph[e] = [];
			this.myArea.push(0);
			this.areas[0].push(e);

			if (j === 0) {
				this.graph[e].push(1)
				this.graph[1].push(e)
			} else {
				this.graph[e].push(e - 1)
			}

			if (j === this.width - 1) {
				this.graph[e].push(3)
				this.graph[3].push(e)
			} else {
				this.graph[e].push(e + 1)
			}

			if (i === 0) {
				this.graph[e].push(2)
				this.graph[2].push(e)
			} else {
				this.graph[e].push(e - this.width)
			}

			if (i === this.height - 1) {
				this.graph[e].push(4)
				this.graph[4].push(e)
			} else {
				this.graph[e].push(e + this.width)
			}
		}
	}
}

Graph.prototype.testNode = function testNode(thisNode, finalNode, knownNodes) {
	if (thisNode === finalNode){
		return true;
	} else {
		if (knownNodes.some(function(element) {
				return thisNode === element;
			})) {
			return false
		} else {
			knownNodes.push(thisNode);
			return this.graph[thisNode].some(function(element) {
				return this.testNode(element, finalNode, knownNodes);
			}, this);
		}
	}
};

Graph.prototype.isConnected = function(node1, node2) {
	var knownNodes = [];
	return this.testNode(node1, node2, knownNodes);
};

Graph.prototype.hasConnection = function(node1, node2) {
	return !(this.graph[node1].indexOf(node2) === -1 || 
		     this.graph[node2].indexOf(node1) === -1);
};

Graph.prototype.removeConnection = function(node1, node2) {
	if (this.hasConnection(node1, node2)) {
		var index1 = this.graph[node1],
	        index2 = this.graph[node2];

		index1.splice(index1.indexOf(node2), 1);
		index2.splice(index2.indexOf(node1), 1);
		return true;
	} else {
		return false;
	}
};

Graph.prototype.addConnection = function(node1, node2) {
	var index1 = this.graph[node1],
	    index2 = this.graph[node2];

	index1.push(node2);
	index2.push(node1);
};

Graph.prototype.hasConnections = function(connections) {
	return connections.map(function(element) {
		return this.hasConnection.apply(this, element);
	}, this)
};

Graph.prototype.removeConnections = function(connections) {
	connections.forEach(function(element) {
		this.removeConnection.apply(this, element);
	}, this)
};

Graph.prototype.addConnections = function(connections) {
	connections.forEach(function(element) {
		this.addConnection.apply(this, element);
	}, this)
};

Graph.prototype.makeNewArea = function(nodes) {
	var newArea = this.areas.length;
	this.areas.push(nodes);
	nodes.forEach(function(element) {
		var thisArea = this.areas[this.myArea[element]];
		thisArea.splice(thisArea.indexOf(element), 1);
		this.myArea[element] = newArea;
	}, this)
};

Graph.prototype.testNewArea = function(node) {
	var knownNodes = [];
	var isInArea = this.areas.some(function(element) {
		return this.testNode(node, element[0], knownNodes);
	}, this)
	if (!isInArea) {
		this.makeNewArea(knownNodes);
	}
};

Graph.prototype.removeConnectTest = function(connections) {
	connections.forEach(function(element) {
		this.removeConnection.apply(this, element);
		element.forEach(function(element) {
			this.testNewArea(element)
		}, this);
	}, this);
};

function testGraph() {
	var myTestGraph = new Graph(10,10);
	myTestGraph.make();
	console.log(myTestGraph.isConnected(0, 62));
	myTestGraph.removeConnectTest([[61, 62], [62, 63], [62, 52], [62, 72]]);
	console.log(myTestGraph.isConnected(0, 62));
	console.log(myTestGraph.myArea, myTestGraph.areas);
	myTestGraph.addConnections([[61, 62], [62, 63], [62, 52], [62, 72]]);
	console.log(myTestGraph.isConnected(0, 62));
}
