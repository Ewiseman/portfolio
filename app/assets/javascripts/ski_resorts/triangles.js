$(document).ready(function() {

  var loadVisualization = $("#triangles").length > 0;
  if (!loadVisualization) {
    return;
  }

  // Defines the width and height of visualization
  var margin = {top: 20, right: 0, bottom: 40, left: 0},
      width = $("#triangles").width()/.55,
      height = ($("#triangles").width());

  var svg = d3v3.select("#triangles")
      .append("svg")
      .attr("viewBox", "-0 -100 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
      .append("g")



  // Maps the latitude on longitude on the SVG and adjust scaling and rotation
  var projection = d3v3.geo.conicConformal()
    .rotate([98, 0])
    .center([0, 38])
    .parallels([29.5, 45.5])
    .scale(width)
    .translate([width / 2, height / 2])
    .precision(.1);

  // Defines the paths of the maps
  var path = d3v3.geo.path()
    .projection(projection);

  var g = svg.append("g");

  // US map data
  d3v3.json("/us-10m.json", function(error, us) {

    // Ski resort data
    d3v3.csv("/ski_resorts/ski_resort_root_data.csv", function(error, data) {

    //Convert strings to numbers
    data.forEach(function(d) {
      d.resort_name = d.resort_name;
      d.acres = +d.acres;
      d.vertical = +d.vertical
      d.summit = +d.summit
      d.base = +d.base
    });

      //Draw Triangles
    g.selectAll("g")
      .data(data)
      .enter()
      .append("path")
      .attr("d", d3v3.svg.symbol()
      .size(function(d) { return d.acres/10;})
      .type( function(d) { return d3v3.svg.symbolTypes[5]; }))
      .attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat])[0] + "," + projection([d.lon,d.lat])[1] + ")"; })
      .attr("class", "ball")
      .style("fill", "steelblue")
      .style("stroke", "black")
      .style("opacity", .7);

      //On button click arrange triangles flat Y axis
      d3v3.selectAll("#tri-acres")
        .on("click", function () {
          svg.selectAll(".ball")
            .transition()
            .delay(0)
            .duration(2000)
            .attr("transform", function(d) { return "translate(" + 400 + "," + projection([d.lon,d.lat])[1] + ")"; })
      });

      //On button click arrange triangles flat Y axis
      d3v3.selectAll("#tri-vertical")
        .on("click", function () {
          svg.selectAll(".ball")
            .transition()
            .delay(0)
            .duration(2000)
            .attr('d', function(d, i) {
              var x = (d.vertical)/6,
                  y = 400,
                  p = (d.acres)/20,
                  f = (((d.summit * 10)-((d.acres/20)+(d.summit*10)))/2),
                  j = -(d.vertical/30),
                  l;
                  return "M " + x +" "+ y + " l "+p+" 0 l "+f+" "+j+" z"
            ;})
      });

      //On button click arrange triangles by summit height
      d3v3.selectAll("#tri-summit")
        .on("click", function () {
          svg.selectAll(".ball")
            .transition()
            .delay(0)
            .duration(2000)
            .attr('d', function(d, i) {
              var x = (d.acres)/11,
                  y = (d.summit)/16,
                  p = (d.acres)/20,
                  f = (((d.summit * 10)-((d.acres/20)+(d.summit*10)))/2),
                  j = -(d.vertical/30),
                  l;
                  return "M " + x +" "+ y + " l "+p+" 0 l "+f+" "+j+" z"
            ;})
      });


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
