$(document).ready(function() {

  var loadVisualization = $("#real-data").length > 0;
  if (!loadVisualization) {
    return;
  }

  //////////// *** VARIABLES *** ////////////

  var format = d3v3.time.format("%Y-%m-%d");

  var width = $("#real-data").width(),
      height =1100;

  var svg = d3v3.select("#real-data")
      .attr("style", "padding-bottom: " + Math.ceil(height * 10 / width) + "%")
      .append("svg")
      .attr("viewBox", "-40 20 " + (width) + " " + (height))
      .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var y = d3v3.time.scale().range([0, width]);

  var m = d3v3.scale.ordinal().rangePoints([0, width]);

  var x = d3v3.scale.linear().range([height, 0]);

  var z = d3v3.scale.ordinal()
      .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);

  var yAxis = d3v3.svg.axis()
      .scale(m)
      // .ticks(d3v3.time.years)
      // .tickFormat(d3v3.time.format(">"))
      .orient("left");

  var xAxis = d3v3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(0);

  var randum = Math.random()

  var stack = d3v3.layout.stack()
      .offset("wiggle")
      .values(function(d) { return d.values; })
      .x(function(d) { return d.date; })
      .y(function(d) { return d.value_1991; });

  var stack_two = d3v3.layout.stack()
      .offset("wiggle")
      .values(function(d) { return d.values; })
      .x(function(d) { return d.date; })
      .y(function(d) { return d.value_1992; })

  var nest = d3v3.nest()
      .key(function(d) { return d.key; });

  var area = d3v3.svg.area()
      .interpolate("basis")
      .y(function(d) { return y(d.date); })
      .x0(function(d) { return x(d.y0); })
      .x1(function(d) { return x(d.y0 + (d.y)); });

  var area_zero = d3v3.svg.area()
      .interpolate("basis")
      .y(function(d) { return y(d.date); })
      .x0(function(d) { return x(d.y0); })
      .x1(function(d) { return x(d.y0 + (d.y)); });

  var tooltip = d3v3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


 //////////// *** DATA INTEGRATION *** ////////////

  d3v3.csv("/river_flow_data_nine.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.date = format.parse(d.date);
      d.value_1991 = +d.value_1991;
      d.value_1992 = +d.value_1992;
    });

    var layers = stack(nest.entries(data));

    console.log(layers)

    m.domain(data.map(function(d) { return d.name; }));
    y.domain(d3v3.extent(data, function(d) { return d.date; }));
    x.domain([0, d3v3.max(data, function(d) { return d.y0 + d.y; })]);

    svg.append("g")
      .attr("class", "x axis")
      .call(yAxis);

    // Area Chart Layers //
    svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); })
      .style("opacity", 0.7)

      .on("mouseover", function(d, i) {
        svg.selectAll(".layer")
        .style("cursor", "pointer")
          tooltip.html("<b>"+d.key+"</b>" + "<br/>")
          .style("opacity", 1)
          .style("left", (d3v3.event.pageX) + "px")
          .style("top", (d3v3.event.pageY-28) + "px");
      })

      .on("click", function(d, i) {
        var layers_two = stack_two(nest.entries(data));
        svg.selectAll(".layer")
        .transition()
        .duration(2000)
        .attr("d", function(d) { return area(d.values); })
      });



  });
});
