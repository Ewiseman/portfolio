$(document).ready(function() {

  var loadVisualization = $("#scrum-area").length > 0;
  if (!loadVisualization) {
    return;
  }

  //////////// *** VARIABLES *** ////////////

  var format = d3.timeParse("%Y-%m-%d");

  var width = $("#scrum-area").width()-10,
      height = ($("#scrum-area").width()*.30 +90);

  var svg = d3.select("#scrum-area")
      .attr("style", "padding-bottom: " + Math.ceil(height * 10 / width) + "%")
      .append("svg")
      .attr("viewBox", "-20 20 " + width + " " + (height))
      .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
      .range([0, width]);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var z = d3.scaleOrdinal()
      .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);

  var stack = d3.stack()

  var nest = d3.nest()
      .key(function(d) { return d.key; });

  var area = d3.area()
      .curve(d3.curveStep)
      .x(function(d) { return x(d.date); })
      .y0(function(d) { return y(d[0]); })
      .y1(function(d) { return y(d[0] + d[1]); })

  var area_two = d3.area()
      .curve(d3.curveStep)
      .x(function(d) { return x(d.date); })
      .y0(function(d, i) { return y(d.y); })
      .y1(function(d) {
          if (d.value < 100) {return y(d.y) }
          else  { return y(d.y) + d.value/15 }
      ;});

  var area_zero = d3.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(height);

  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


 //////////// *** DATA INTEGRATION *** ////////////


  d3.csv("/scrum_reports.csv").then(function(data) {
    var keys = data.columns.filter(function(key) { return key !== 'key'; })
    console.log(data);

    data.forEach(function(d) {
      d.date = format(d.date);
      d.value = +d.value;

    });

    var layers = stack(data);

    stack.offset(d3.stackOffsetNone);

    stack.keys(keys);

  stack.order(d3.stackOrderNone);
  stack.offset(d3.stackOffsetNone);


    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y + 4; })]);

    svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(10, "%Y"));

    svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    // Area Chart Layers //
    svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", "#2B2D42")
      .style("opacity", 0.7);

  });
});
