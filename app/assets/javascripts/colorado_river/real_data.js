$(document).ready(function() {

  var loadVisualization = $("#real-data").length > 0;
  if (!loadVisualization) {
    return;
  }

  //////////// *** VARIABLES *** ////////////

  var format = d3v3.time.format("%Y-%m-%d");

  var width = $("#real-data").width(),
      height =1100,
      padding = 100;

  var svg = d3v3.select("#real-data")
      .append("svg")
      .attr("viewBox", "-40 -50 " + (width) + " " + (height-padding))
      .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var y = d3v3.time.scale().range([0, width]);

  var m = d3v3.scale.ordinal().rangePoints([0, width]);

  var x = d3v3.scale.linear().range([height, 0]);

  var z = d3v3.scale.ordinal()
      .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);

  var formatNumber = d3.format(".1f");

  var yAxis = d3v3.svg.axis()
      .scale(m)
      .orient("left")
      // .ticks(d3v3.time.years)
      // .tickSize(0)
      // .tickFormat(d3v3.time.format("%Y"));



  var xAxis = d3v3.svg.axis()
      .scale(x)
      .orient("top")
      .ticks(10)
      .tickSize(height)
      .tickSize(2)
      .tickFormat(function(d) { return (d); })

  ///// Yearly Stack ////

  var stack = d3v3.layout.stack()
      .offset("wiggle")
      .values(function(d) { return d.values; })
      .x(function(d) { return d.date; })
      .y(function(d) { return d.value_1991; });

  var stack_1992 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_1992; })

  var stack_1993 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_1993; })

  var stack_1994 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_1994; })

  var stack_1995 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_1995; })

  var stack_1996 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_1996; })

  var stack_1997 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_1997; })

  var stack_1998 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_1998; })

  var stack_1999 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_1999; })

  var stack_2000 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2000; })

  var stack_2001 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return (d.value_2001); })

  var stack_2002 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2002; })

  var stack_2003 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2003; })

  var stack_2004 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2004; })

  var stack_2005 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2005; })

  var stack_2006 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2006; })

  var stack_2007 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2007; })

  var stack_2008 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2008; })

  var stack_2009 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2009; })

  var stack_2010 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2010; })

  var stack_2011 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2011; })

  var stack_2012 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2012; })

  var stack_2013 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2013; })

  var stack_2014 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2014; })

  var stack_2015 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2015; })

  var stack_2016 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2016; })

  var stack_2017 = d3v3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value_2017; })

  var nest = d3v3.nest()
      .key(function(d) { return d.key; });

  var area = d3v3.svg.area()
      .interpolate("cardinal")
      .y(function(d) { return y(d.date); })
      .x0(function(d) { return x(d.y0) ; })
      .x1(function(d) { return x(d.y0 + (d.y)); });

  var areaZero = d3v3.svg.area()
      .interpolate("cardinal")
      .y(function(d) { return y(d.date); })
      .x0(height/2 )
      .x1(height/2);


  var tooltip = d3v3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

 //////////// *** DATA INTEGRATION *** ////////////

  d3v3.csv("/river_flow_data_c.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.date = format.parse(d.date);
      d.value_1991 = +d.value_1991;
      d.value_1992 = +d.value_1992;
      d.value_1992 = +d.value_1992;
      d.value_1993 = +d.value_1993;
      d.value_1994 = +d.value_1994;
      d.value_1995 = +d.value_1995;
      d.value_1996 = +d.value_1996;
      d.value_1997 = +d.value_1997;
      d.value_1998 = +d.value_1998;
      d.value_1999 = +d.value_1999;
      d.value_2000 = +d.value_2000;
      d.value_2001 = +d.value_2001;
      d.value_2002 = +d.value_2002;
      d.value_2003 = +d.value_2003;
      d.value_2004 = +d.value_2004;
      d.value_2005 = +d.value_2005;
      d.value_2006 = +d.value_2006;
      d.value_2007 = +d.value_2007;
      d.value_2008 = +d.value_2008;
      d.value_2009 = +d.value_2009;
      d.value_2010 = +d.value_2010;
      d.value_2011 = +d.value_2011;
      d.value_2012 = +d.value_2012;
      d.value_2013 = +d.value_2013;
      d.value_2014 = +d.value_2014;
      d.value_2015 = +d.value_2015;
      d.value_2016 = +d.value_2016;
      d.value_2017 = +d.value_2017;
    });

    var layers = stack(nest.entries(data));


    console.log(layers)

    m.domain(data.map(function(d) { return d.name; }));
    y.domain(d3v3.extent(data, function(d) { return d.date; }));
    x.domain([0, d3v3.max(data, function(d) { return d.y0 + d.y; })]);

    // x.domain([0, 10000]);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

    // Area Chart Layers //
    svg.selectAll(".layer-river")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer-river")
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

      .transition()
      .duration(2000)
      .attr("d", function(d) { return area(d.values); })

      var running = false;
      var timer;

      $("button").on("click", function() {
        var duration = 1000,
          maxstep = 2017,
          minstep = 1991;
        if (running == true) {
          $("button").html("Play");
          running = false;
          clearInterval(timer);
        }

    else if (running == false) {
      $("button").html("Pause");
      sliderValue = $("#slider").val();
      timer = setInterval( function(){
          if (sliderValue < maxstep){
            sliderValue++;
            $("#slider").val(sliderValue);
            $('#range').html(sliderValue);
          }
          $("#slider").val(sliderValue);
          update();

      }, duration);
      running = true;
    }
  });

  $("#slider").on("change", function(){
    update();
    $("#range").html($("#slider").val());
    clearInterval(timer);
    $("button").html("Play");
  });

  update = function() {

    d3.selectAll(".layer-river")
      .transition()
      .duration(1000)
      .attr("d", function(d) {
        switch ($("#slider").val()) {
          case "1991":
          var layers = stack(nest.entries(data));
            return area(d.values);
            break;
          case "1992":
            var layers = stack_1992(nest.entries(data));
            return area(d.values);
            break;
          case "1993":
            var layers = stack_1993(nest.entries(data));
            return area(d.values);
            break;
          case "1994":
              var layers = stack_1994(nest.entries(data));
              return area(d.values);
            break;
          case "1995":
              var layers = stack_1995(nest.entries(data));
              return area(d.values);
            break;
          case "1996":
              var layers = stack_1996(nest.entries(data));
              return area(d.values);
            break;
          case "1997":
              var layers = stack_1997(nest.entries(data));
              return area(d.values);
            break;
          case "1998":
              var layers = stack_1998(nest.entries(data));
              return area(d.values);
            break;
          case "1999":
              var layers = stack_1999(nest.entries(data));
              return area(d.values);
            break;
          case "2000":
              var layers = stack_2000(nest.entries(data));
              return area(d.values);
            break;
          case "2001":
              var layers = stack_2001(nest.entries(data));
              return area(d.values);
            break;
          case "2002":
              var layers = stack_2002(nest.entries(data));
              return area(d.values);
            break;
          case "2003":
              var layers = stack_2003(nest.entries(data));
              return area(d.values);
            break;
          case "2004":
              var layers = stack_2004(nest.entries(data));
              return area(d.values);
            break;
          case "2005":
              var layers = stack_2005(nest.entries(data));
              return area(d.values);
            break;
          case "2006":
              var layers = stack_2006(nest.entries(data));
              return area(d.values);
            break;
          case "2007":
              var layers = stack_2007(nest.entries(data));
              return area(d.values);
            break;
          case "2008":
              var layers = stack_2008(nest.entries(data));
              return area(d.values);
            break;
          case "2009":
              var layers = stack_2009(nest.entries(data));
              return area(d.values);
            break;
          case "2010":
              var layers = stack_2010(nest.entries(data));
              return area(d.values);
            break;
          case "2011":
              var layers = stack_2011(nest.entries(data));
              return area(d.values);
            break;
          case "2012":
              var layers = stack_2012(nest.entries(data));
              return area(d.values);
            break;
          case "2013":
              var layers = stack_2013(nest.entries(data));
              return area(d.values);
            break;
          case "2014":
              var layers = stack_2014(nest.entries(data));
              return area(d.values);
            break;
          case "2015":
              var layers = stack_2015(nest.entries(data));
              return area(d.values);
            break;
          case "2016":
              var layers = stack_2016(nest.entries(data));
              return area(d.values);
            break;
          case "2017":
              var layers = stack_2017(nest.entries(data));
              return area(d.values);
            break;
          }
        })

      };

  });
});
