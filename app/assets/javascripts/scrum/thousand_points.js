// $(document).ready(function() {
//   // var data = [];
//   // 	d3.range(7000).forEach(function(el){
//   // 		data.push({ x: d3.randomNormal(5,3)(), y: d3.randomNormal(5,3)(), r: d3.randomNormal(3,1)() });
//   // 	});
//
//     d3.csv("/task_reports.csv").then(function(hello) {
//
//   	console.log(hello);
//
//   	var width = 1400,
//   		 height = 750;
//
//     var spacing = 6.2,
//         rows = 300,
//         column = 95,
//         randnum = Math.random();
//
//     var xScale = d3.scaleLinear()
//         .domain([0, width])
//         .range([spacing, width - spacing]);
//
//     var yScale = d3.scaleLinear()
//         .domain([0, width])
//         .range([spacing, width - spacing]);
//
//   	// main canvas
//   	var mainCanvas = d3.select('#container')
//   		.append('canvas')
//   		.classed('mainCanvas', true)
//   		.attr('width', width)
//   		.attr('height', height);
//
//
//   	// hidden canvas
//   	var hiddenCanvas = d3.select('#container')
//   		.append('canvas')
//   		.classed('hiddenCanvas', true)
//   		.attr('width', width)
//   		.attr('height', height);
//
//   	var customBase = document.createElement('custom');
//   	var custom = d3.select(customBase); // replacement of SVG
//
//   		// map to track color the nodes.
//   	var colorToNode = {};
//   	// function to create new colors for picking
//   	var nextCol = 1;
//   	function genColor(){
//   		var ret = [];
//   		if (nextCol < 16777215){
//   			ret.push(nextCol & 0xff); //R
//   			ret.push((nextCol & 0xff00) >> 8); //G
//   			ret.push((nextCol & 0xff0000) >> 16); //B
//
//   			nextCol += 1;
//   		}
//   		var col = "rgb(" + ret.join(',') + ")";
//   		return col;
//   	}
//
//   	var x = d3.scaleLinear()
//   		.domain([2, 20])
//   		.range([0, width]);
//
//   	var y = d3.scaleLinear()
//   		.domain([2,8])
//   		.range([height, 0]);
//
//       var colorScale = d3v3.scale.ordinal()
//           .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);
//
//   	databind(hello, xScale, yScale);
//   	draw(mainCanvas, false);
//
//   	function databind(data){
//   		var group = custom.selectAll('custon.rect')
//   			.data(hello)
//   	    .enter()
//   			.append('custom')
//   			.attr('class', 'rect')
//         .attr("width", 5)
//         .attr("height", 5)
//         .attr("rx", 0)
//         .attr("ry", 0)
//         .style("stroke-width", .5)
//         .attr("x", function(d, i) { return i % column * spacing })
//         .attr("y", function(d, i) { return Math.floor(i / column) % rows * spacing })
//         .attr("fill", function (d){ return colorScale(d.key); })
//
//         .on("click", function(d, i) {
//           custom.selectAll(".rect")
//               .transition()
//               .duration(2000)
//               .ease("elastic")
//               .attr("x", function(d, i) { x_coord = Math.random() * width-20;
//                 return xScale(x_coord); })
//               .attr("y", function(d, i) { y_coord = Math.random() * height*2;
//                 return yScale(y_coord); })
//         });
//   	}
//
//   	function draw(canvas, hidden){
//   		var context = canvas.node().getContext('2d');
//
//   		context.clearRect(0, 0, width, height);
//
//   		var elements = custom.selectAll('custom.rect');
//   		elements.each(function(d,i){
//   			var node = d3.select(this);
//   			context.fillStyle = node.attr('fill')
//   			context.beginPath();
//   			context.rect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('width'));
//   			context.fill();
//   		})
//   	}
//     });
// });
