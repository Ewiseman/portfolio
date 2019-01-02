$(document).ready(function() {

  var loadVisualization = $("#radial-area-test").length > 0;
  if (!loadVisualization) {
    return;
  }

  var formatDate = d3.time.format("%b"),
      formatDay = function(d) { return formatDate(new Date(2007, d, 0)); };

  var width = $("#radial-area-test").width()-10,
      height = $("#radial-area-test").width()*.7,
      outerRadius = height / 2 - 10,
      innerRadius = $("#radial-area-test").width()*.20;

  var angle = d3.time.scale()
      .range([0, 2 * Math.PI]);

  var radius = d3.scale.linear()
      .range([innerRadius, outerRadius]);

  var z = d3.scale.ordinal()
      .range(["#8FBC8F"]);

  var zLine = d3.scale.ordinal()
      .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);

  var stack = d3.layout.stack()
      .offset("zero")
      .values(function(d) { return d.values; })
      .x(function(d) { return d.date; })
      .y(function(d) { return d.value; });

  var nest = d3.nest()
      .key(function(d) { return d.key; });

  var line = d3.svg.line.radial()
      .interpolate("cardinal-closed")
      .angle(function(d) { return angle(d.date); })
      .radius(function(d) { return radius(d.y0 + d.y); });

  var area = d3.svg.area.radial()
      .interpolate("cardinal-closed")
      .angle(function(d) { return angle(d.date); })
      .innerRadius(function(d) { return radius(d.y0); })
      .outerRadius(function(d) { return radius(d.y0 + d.y); });

  var area_two = d3.svg.area.radial()
      .interpolate("cardinal-closed")
      .angle(function(d) { return angle(d.date); })
      .innerRadius(innerRadius)
      .outerRadius(function(d) { return radius(d.y); });

  var svg = d3.select("#radial-area-test").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.csv("/scrum_maps.csv", type, function(error, data) {
    if (error) throw error;

    var layers = stack(nest.entries(data));

    // Extend the domain slightly to match the range of [0, 2π].
    angle.domain([0, d3.max(data, function(d) { return d.date; })]);
    radius.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

    svg.selectAll(".layer")
        .data(layers)
      .enter().append("path")
        .attr("class", "layer")
        .attr("d", function(d) { return area(d.values); })
        .style("fill", function(d, i) { return z(i); })
          .style("opacity", 0.5)
        .style("stroke", "#8FBC8F")
        .attr("stroke-opacity", 0.5)


    svg.selectAll(".layer-two")
        .data(layers)
      .enter().append("path")
        .attr("class", "layer-two")
        .attr("d", function(d) { return area_two(d.values); })
        .style("stroke", function(d, i) { return zLine(i); })
        .style("stroke-width", 2)
        .style("fill", 'none')
        .style("opacity", 1)


    svg.selectAll(".axis")
        .data(d3.range(angle.domain()[1]))
      .enter().append("g")
        .attr("class", "axis")
        .attr("transform", function(d) { return "rotate(" + angle(d) * 180 / Math.PI + ")"; })
      .call(d3.svg.axis()
        .scale(radius.copy().range([-innerRadius, -outerRadius]))
        .orient("left"))
      .append("text")
        .attr("y", -innerRadius + 6)
        .attr("dy", ".71em")
        .attr("text-anchor", "middle")
        .text(function(d) { return formatDay(d); });
  });

  function type(d) {
    d.date = +d.date;
    d.value = +d.value;
    return d;
  }
});
