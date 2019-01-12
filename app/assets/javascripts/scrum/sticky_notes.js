$(document).ready(function() {
  //////////// *** VARIABLES *** ////////////

  var format = d3.time.format("%Y-%m-%d");

  var year2016 = new Date('01/01/2017')
  var year2017 = new Date('01/01/2018')
  var year2018 = new Date('01/01/2019')

  var width = $("#sticky-notes").width()-10,
      height = ($("#sticky-notes").width()*.30 +90);

  var svgHello = d3.select("#sticky-notes")
      .attr("style", "padding-bottom: " + Math.ceil(height * 10 / width) + "%")
      .append("svg")
      .attr("viewBox", "-20 20 " + width + " " + (height))
      .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var colorScale = d3.scale.ordinal()
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

  var spacing = 6.2,
      rows = 300,
      column = 95,
      randnum = Math.random();

  var xScale = d3.scale.linear()
      .domain([0, width])
      .range([spacing, width - spacing]);

  var yScale = d3.scale.linear()
      .domain([0, width])
      .range([spacing, width - spacing]);


  //////////// *** DATA INTEGRATION *** ////////////

  d3.csv("/task_reports.csv", function(error, data) {
    if (error) throw error;
    // data = jQuery.grep(data, function(d, index) {
    //       var is_viewable = (d.key == "hea");
    //       return is_viewable;
    //     });

    data.forEach(function(d) {
      d.date = format.parse(d.date);
      d.value = +d.value;
    });

    // var dateSort = function(a, b) { return d3.descending(b.date, a.date) && d3.descending(b.key, a.key);; };
    // var keySort = function(a, b) { return d3.descending(a.key, b.key); };
    colorScale.domain(data.map(function (d){ return d.key; }));

    // data.sort(dateSort).map(function(d) { return d.date; });

    group = svgHello.selectAll('g')
        .data(data)
        .enter()
        .append("g");


    //create rectangles
    rects = group.append("rect")
      .attr("fill", "#FFFF88")
      .style("stroke", "#2B2D42")
      .style("stroke-width", .5);

    grid = () =>{
        rects
          .transition()
          .delay((d, i) => .5 * i)
          .attr("fill", "#FFFF88")
          .duration(600)
          .attr("width", 5)
          .attr("height", 5)
          .attr("rx", 0)
          .attr("ry", 0)
          .style("stroke-width", .5)
          .attr("x", function(d, i) { x_coord = Math.random() * width;
            return xScale(x_coord); })
          .attr("y", function(d, i) { y_coord = Math.random() * height*1.5;
            return yScale(y_coord); })
          .attr("opacity", "1")
      }

      //circle grid
      grid2 = () =>{
        rects
          .transition()
          .delay((d, i) => .4 * i)
          .duration(600)
          .attr("width", 5)
          .attr("height", 5)
          .style("stroke-width", .5)
          .attr("x", function(d, i) { return i % column * spacing })
          .attr("y", function(d, i) { return Math.floor(i / column) % rows * spacing })
          .attr("fill", function (d){ return colorScale(d.key); })
          .attr("opacity", 1)
          .attr("fill", "#FFFF88")
      }

      grid3 = () =>{
        rects
          .transition()
          .duration(2000)
          .delay((d, i) => .2 * i)
          .attr("width", 5)
          .attr("height", 5)
          .style("stroke-width", .1)
          .attr("x", function(d, i) { return i % column * spacing })
          .attr("y", function(d, i) { return Math.floor(i / column) % rows * spacing })
          .attr("fill", function (d){ return colorScale(d.key); })
          // .attr("fill", "#FFFF88")
          // .attr("opacity", function(d) {
          //   if (d.date < year2016) { return 1 }
          //   else  { return 0 }   ;});
      }

      grid4 = () =>{
        rects
          .transition()
          .duration(600)
          .delay((d, i) => .2 * i)
          .attr("width", 5)
          .attr("height", 5)
          .style("stroke-width", 0)
          .attr("x", function(d, i) { return i % column * spacing })
          .attr("y", function(d, i) { return Math.floor(i / column) % rows * spacing })
          .attr("fill", function (d){ return colorScale(d.key); })
          .attr("opacity", function(d) {
            if (d.key == "health") { return 1 }
            else  { return 0 }   ;});
      }

      grid5 = () =>{
        rects
          .transition()
          .duration(600)
          .delay((d, i) => .2 * i)
          .attr("width", 5)
          .attr("height", 5)
          .style("stroke-width", 0)
          .attr("x", function(d, i) { return i % column * spacing })
          .attr("y", function(d, i) { return Math.floor(i / column) % rows * spacing })
          .attr("fill", function (d){ return colorScale(d.key); })
          .attr("opacity", function(d) {
            if (d.key == "vacation") { return 1 }
            else  { return 0 }   ;});
      }

      grid6 = () =>{
        rects
          .transition()
          .duration(600)
          .delay((d, i) => .2 * i)
          .attr("width", 5)
          .attr("height", 5)
          .style("stroke-width", 0)
          .attr("x", function(d, i) { return i % column * spacing })
          .attr("y", function(d, i) { return Math.floor(i / column) % rows * spacing })
          .attr("fill", function (d){ return colorScale(d.key); })
          .attr("opacity", function(d) {
            if (d.key == "fcfs") { return 1 }
            else  { return 0 }   ;});
      }


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
    new scroll('all-organized', '75%', grid2, grid);
    new scroll('color-coded', '75%', grid3, grid2);
    new scroll('health', '75%', grid4, grid3);
    new scroll('vacation', '75%', grid5, grid4);
    new scroll('work', '75%', grid6, grid5);



    //start grid on page load
    grid();
  });
});
