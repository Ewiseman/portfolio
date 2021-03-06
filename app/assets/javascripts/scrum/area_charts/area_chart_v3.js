$(document).ready(function() {

  var loadVisualization = $("#scrum-area-v3").length > 0;
  if (!loadVisualization) {
    return;
  }

  //////////// *** VARIABLES *** ////////////

  var format = d3v3.time.format("%Y-%m-%d");

  var width = $("#scrum-area-v3").width()-10,
      height = ($("#scrum-area-v3").width()*.30 +90);

  var svg = d3v3.select("#scrum-area-v3")
      .append("svg")
      .attr("style", "padding-bottom: " + Math.ceil(height * 10 / width) + "%")
      .attr("viewBox", "-20 20 " + width + " " + (height))
      .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3v3.time.scale()
      .range([0, width]);

  var y = d3v3.scale.linear()
      .range([height, 0]);

  var z = d3v3.scale.ordinal()
      .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);

  var xAxis = d3v3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(d3v3.time.years)
      .tickSize(0)
      .tickFormat(d3v3.time.format("%Y"));

  var yAxis = d3v3.svg.axis()
      .scale(y)
      .tickSize(0)
      .ticks(5)
      .orient("left");

  var stack = d3v3.layout.stack()
      .offset("wiggle")
      .values(function(d) { return d.values; })
      .x(function(d) { return d.date; })
      .y(function(d) { return d.value + 10; });

  var nest = d3v3.nest()
      .key(function(d) { return d.key; });

  var area = d3v3.svg.area()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y0 + (d.y - 10)); })

  var area_two = d3v3.svg.area()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y1(function(d, i) { return y(d.y); })
      .y0(function(d) {
          if (d.value < 100) {return y(d.y) }
          else  { return y(d.y) + d.value/15 }
      ;});

  var area_zero = d3v3.svg.area()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y0(height/2)
      .y1(height/2)

  var tooltip = d3v3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


 //////////// *** DATA INTEGRATION *** ////////////

  d3v3.csv("/scrum_reports.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.date = format.parse(d.date);
      d.value = +d.value;
    });

    var layers = stack(nest.entries(data));



    x.domain(d3v3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3v3.max(data, function(d) { return d.y0 + d.y + 4; })]);


    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    // Area Chart Layers //
    svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area_zero(d.values); })
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", "#2B2D42")
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
        svg.selectAll(".layer")
        .transition()
        .duration(4000)
        .attr("d", function(d) { return area_two(d.values); })
      });

      svg.selectAll(".layer")
        .transition()
        .duration(1500)
        .attr("d", function(d) { return area(d.values); })


    //////////// *** LEGEND *** ////////////

    // z.domain(layers.slice(1));
    // // Legend Positioning //
    // var legendRectSize = 18;
    // var legendSpacing = 4;
    // var legend = svg.selectAll(".legend")
    //   .data(layers.slice(-2).reverse())
    //   .enter().append("g")
    //   .attr('class', 'legend')
    //   .attr('transform', function(d, i) {
    //     var height = legendRectSize + legendSpacing;
    //     var width = legendRectSize + legendSpacing;
    //     var widths = $("#area").width()-150;
    //     var offset = layers.length / 2;
    //     var horz = 2 * legendRectSize;
    //     var vert = (i * height)+2 ;
    //     var lat = i * width ;
    //     return 'translate(' + widths + ',' + vert + ')';
    //   });
    //
    // // Legend Rectangles //
    // legend.append('rect')
    //   .attr('width', legendRectSize)
    //   .attr('height', legendRectSize)
    //   .style('fill', function(d, i) { return z(i); })
    //   .style('stroke', "#2B2D42")
    //   .style('stroke-width', .5);
    //
    // // Legend Text //
    // legend.append('text')
    //   .attr('x', legendRectSize + legendSpacing)
    //   .attr('y', legendRectSize - legendSpacing)
    //   .text(function(d) { return d.key.toLowerCase().replace(/\b[a-z]/g, function(letter) { return letter.toUpperCase(); });
    //   });

  });
});
