$(document).ready(function() {

  var loadVisualization = $("#us-map").length > 0;
  if (!loadVisualization) {
    return;
  }

  // Defines the width and height of visualization
  var margin = {top: 20, right: 0, bottom: 160, left: 0},
      width = $("#us-map").width(),
      height = 1000 - margin.top - margin.bottom,
      centered;

  // Maps the latitude on longitude on the SVG and adjust scaling and rotation
  var projection = d3v3.geo.conicConformal()
    .rotate([98, 0])
    .center([0, 38])
    .parallels([22.5, 45.5])
    .scale(1200)
    .translate([width / 2, height / 2])
    .precision(.1);

  // Defines the paths of the maps
  var path = d3v3.geo.path()
    .projection(projection);

  // Dimensions of the SVG
  var svg = d3v3.select("#us-map").append("svg")
    .attr("width", width)
    .attr("height", height);

  var g = svg.append("g");

  // US map data
  d3v3.json("/us-10m.json", function(error, us) {

    // Ski resort data
    d3v3.csv("/ski_resorts/ski_resort_root_data.csv", function(error, data) {

      // Creates Markers using d3 symbols
      g.selectAll("g")
        .data(data)
        .enter()
        .append("path")
        .attr("id", "ball")
        .attr("d", d3v3.svg.symbol()
        .size(function(d) { return d.acres/10;})
        .type( function(d) { return d3v3.svg.symbolTypes[5]; }))
        .attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat])[0] + "," + projection([d.lon,d.lat])[1] + ")"; })
        .style("fill", "steelblue")
        .style("stroke", "black")
        .style("opacity", .7);

    });

    // Defines country border
    g.append("g")
      .attr("id", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path)
      .on("click", clicked);

    // Defines state borders
    g.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path);
  });


// On State Click Zoom in
  function clicked(d) {
    var x, y, k;

    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 5;
      centered = d;

      g.selectAll(".ball")
        .transition()
        .delay(0)
        .duration(750)

    }

    else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;

      g.selectAll("#ball")
        .transition()
        .delay(0)
        .duration(750)
        .size(function(d) { return d.acres/50;})

    }

    g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

    g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1 / k + "px");

  }
});
