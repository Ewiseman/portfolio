$(document).ready(function() {
//////////// *** VARIABLES *** ////////////

var format = d3.time.format("%Y-%m-%d");

var width = $("#stick-notes").width()-10,
    height = ($("#stick-notes").width()*.30 +90);

var svg = d3.select("#stick-notes")
    .attr("style", "padding-bottom: " + Math.ceil(height * 10 / width) + "%")
    .append("svg")
    .attr("viewBox", "-20 20 " + width + " " + (height))
    .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set up grid spacing
      spacing = 40;
      rows = 10 ;
      column = 10;
      randnum = (min,max) => Math.round( Math.random() * (max-min) + min );

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var z = d3.scale.ordinal()
    .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.years)
    .tickSize(0)
    .tickFormat(d3.time.format("%Y"));

var yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(0)
    .ticks(5)
    .orient("left");

var stack = d3.layout.stack()
    .offset("silhoutette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); })

var lineArea = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(function(d, i) { return y(d.y); })
    .y1(function(d, i) { return y(d.y)+2; });

var dynamicArea = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(function(d, i) { return y(d.y); })
    .y1(function(d) {
        if (d.value < 100) {return y(d.y) }
        else  { return y(d.y) + d.value/15 }
    ;});

var area_zero = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(height)

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var colorScale = d3.scale.ordinal()
    .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);


//////////// *** DATA INTEGRATION *** ////////////

d3.csv("/scrum_reports.csv", function(error, data) {
  if (error) throw error;
  // data = jQuery.grep(data, function(d, index) {
  //       var is_viewable = (d.key == "health");
  //       return is_viewable;
  //     });

  data.forEach(function(d) {
    d.date = format.parse(d.date);
    d.value = +d.value;
  });

  var layers = stack(nest.entries(data));
  console.log(layers)

colorScale.domain(data.map(function (d){ return d.key; }));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y + 4; })]);


  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  //create group and join our data to that group
  group_layers = svg.selectAll('.layers')
    .data(layers)
    .enter()

  //create rectangles
  path_layers = group_layers.append("path")

  group = svg.selectAll('g')
      .data(data)
      .enter()
      .append("g")

  //create rectangles
  rects = group.append("rect")
    .attr("fill", "white")
    .attr("x", function(d, i) { return Math.random() * i  })
    .attr("y", function(d, i) { return Math.random() * i  })
    .attr("opacity", "0")

  // Area Chart Layers //
  grid = function() {
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y + 4; })]);


    path_layers
      .attr("class", "layer")
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", "#2B2D42")
      .style("opacity", 0.7)
      .attr("d", function(d) { return lineArea(d.values); })
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", "#2B2D42")
      .style("opacity", 0.7)

    path_layers
      .transition()
      .duration(1000)
      .attr("d", function(d) { return area(d.values); })

    rects
      .transition()
      .delay(function(){return 500 * i} )
      .duration(6000)
      .ease("elastic")
      .attr("width", 20)
      .attr("height", 20)
      .attr("rx",3)
      .attr("ry", 3)
      .attr("fill", function (d){ return colorScale(d.key); })
      .attr("opacity", "1")
    }

  grid2 = function() {
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y + 4; })]);

    rects
      .transition()
      .delay(function(){return 500 * i} )
      .duration(2000)
      .attr("opacity", "1")
      .attr("width", 20)
      .attr("height", 20)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("x", function(d, i) { return Math.random() * i  })
      .attr("y", function(d, i) { return Math.random() * i  })
      .attr("fill", function (d){ return colorScale(d.key); })



    path_layers
      .attr("class", "layer")
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", "#2B2D42")
      .style("opacity", 0.7)
      .transition()
      .duration(1500)
      .attr("d", function(d) { return lineArea(d.values); })
    }

  grid3 = function() {

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.y + 4; })]);

    path_layers
      .attr("class", "layer")
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", "#2B2D42")
      .style("opacity", 0.7)
      .transition()
      .duration(1500)
      .attr("d", function(d) { return dynamicArea(d.values); })
    }




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




  //waypoints scroll constructor
  function scroll(n, offset, func1, func2){
    return new Waypoint({
      element: document.getElementById(n),
      handler: function(direction) {
         direction == 'down' ? func1() : func2();
      },
      //start 75% from the top of the div
      offset: offset
    });
  };



  //triger these functions on page scroll
  new scroll('div2', '75%', grid2, grid);
  new scroll('div4', '75%', grid3, grid2);
  // new scroll('div6', '75%', barChart, divide);



  //start grid on page load
  grid();
  });

});
