$(document).ready(function() {

  var loadVisualization = $("#gdp-area-tool").length > 0;
  if (!loadVisualization) {
    return;
  }

  //////////// *** VARIABLES *** ////////////
  var format = d3.time.format("%m/%d/%y");

  var areaElement = $("#gdp-area-tool");

  var line_width = 2

  var margin = {top: 10, right: 40, bottom: 30, left: 80},
      screen_width = $("#gdp-area-tool").width()-60,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, screen_width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var z = d3.scale.ordinal()
      .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C"]);

  var commasFormatter = d3.format(",.0f")

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(height)
      .tickSize(.3)
      .tickFormat(function(d) { return (d); })

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(.3)
      .tickFormat(function(d) { return "%" + commasFormatter(d); })
      .orient("left");

  var stack = d3.layout.stack()
      .offset("zero")
      .values(function(d) { return d.values; })
      .x(function(d) { return d.date; })
      .y(function(d) { return d.value; });

  var nest = d3.nest()
      .key(function(d) { return d.country; });

  var line_equation =
      function(d) {
        if(d3.select("#line_area").property("checked")){
          if (d.value == 0) { return y(d.y) }
          else { return y(d.y) + line_width }
        } else if(d3.select("#dynamic_area").property("checked")){
          return y(d.y / 1.2)
        } else {
          return y(d.y / height)
        }
      };

  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////// Define Area Types ///////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  var valueAreaCardinal = d3.svg.area()
      .interpolate("cardinal")
      .x(function(d) { return x(d.date); })
      .y0(function(d, i) { return y(d.y); })
      .y1(line_equation);

  var valueAreaBasis = d3.svg.area()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y0(function(d, i) { return y(d.y); })
      .y1(line_equation);

  var valueAreaMonotone = d3.svg.area()
      .interpolate("monotone")
      .x(function(d) { return x(d.date); })
      .y0(function(d, i) { return y(d.y); })
      .y1(line_equation);

  var valueAreaLinear = d3.svg.area()
      .interpolate("linear")
      .x(function(d) { return x(d.date); })
      .y0(function(d, i) { return y(d.y); })
      .y1(line_equation);

  var valueAreaStep = d3.svg.area()
      .interpolate("step")
      .x(function(d) { return x(d.date); })
      .y0(function(d, i) { return y(d.y); })
      .y1(line_equation);

  var valueOffset = d3.svg.area()
      .interpolate("cardinal")
      .x(function(d) {
          if (d.country == "China") {return x(d.date)+10 }
          else  { return x(d.date) }
        })
      .y0(function(d) {
          if (d.country == "China") {return y(d.y)+200 }
          else  { return y(d.y) }
        })
      .y1(function(d) {
          if (d.country == "China") {return y(d.y / height)+200 }
          else  { return y(d.y /height) }
        })


  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////// Draw Initial Chart ///////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

 var svg = d3.select("#gdp-area-tool").append("svg")
      .attr("width", screen_width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var areaSlider = +$("#rank-filter-area").val();

 //////////// *** DATA INTEGRATION *** ////////////
  d3.csv("/gdp/gdp_nested_data.csv", function(error, data) {
   data = jQuery.grep(data, function(d, index) {
     var is_viewable = (d.rank <= areaSlider);
     return is_viewable;
   });
     data.forEach(function(d) {
     d.date = d.date;
     d.value = +d.value;
     d.size = +d.size;
     d.rank = +d.rank;
   });

  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var layers = stack(nest.entries(data));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([-24, 24]);

  // x-axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", screen_width/2)
    .attr("y", 30)
    .style("text-anchor", "middle")
    .text("Year");

  // y-axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label-y-axis-bitches")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", "-4em")
    .style("text-anchor", "end")
    .text("Annual Change");

  svg.selectAll(".tick")
    .each(function (d) {
      if ( d === 0 ) {
        d3.select(this)
        .style("stroke-width", "2px")
      } else {
        d3.select(this)
       .style("stroke-dasharray", "4,4")
      }
    });

  // Area Chart Layers //
  svg.selectAll(".layer")
    .data(layers)
    .enter().append("path")
    .attr("class", "layer")
    .attr("d", function(d) {
      if(d3.select("#area_Cardinal").property("checked")){
         return valueAreaCardinal(d.values)
      } else if (d3.select("#area_Basis").property("checked")){
         return valueAreaBasis(d.values)
      } else if(d3.select("#area_Monotone").property("checked")){
         return valueAreaMonotone(d.values)
      } else if(d3.select("#area_Linear").property("checked")){
         return valueAreaLinear(d.values)
      } else if (d3.select("#area_Step").property("checked")){
         return valueAreaStep(d.values)
      }
    })
    .style("fill", function(d, i) { return z(i); })
    .style("opacity", 1)
    .on("mouseover", function(d) {
      line = d3.select(this)
      tooltip.transition()
        .duration(20)
        .style("opacity", 1)
      line.transition()
        .duration(100)
        .style("opacity", 1)
        .style("stroke-width", 2)
        tooltip.html("<b>"+d.key+"</b>" + "<br/>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY-28) + "px");
    })
    .on("mouseout", function(d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0)
      line.transition()
        .duration(200)
        .style("opacity", 1)
        .style("stroke-width", 1)
    });

    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Toggle Line Interpolatation ///////////////////////
    ////////////////////////////////////////////////////////////////////////////

    // Cardinal //
    d3.select("#area_Cardinal").on("change", updateAreaCardinal);
    function updateAreaCardinal() {
      if(d3.select("#area_Cardinal").property("checked")){
        d3.selectAll(".layer")
        .attr("d", function(d) { return valueAreaCardinal(d.values); })
      }
    }

      // Basis //
    d3.select("#area_Basis").on("change", updateAreaBasis);
    function updateAreaBasis() {
      if(d3.select("#area_Basis").property("checked")){
        d3.selectAll(".layer")
        .attr("d", function(d) { return valueAreaBasis(d.values); })
      }
    }

    // Monotone //
    d3.select("#area_Monotone").on("change", updateAreaMonotone);
    function updateAreaMonotone() {
      if(d3.select("#area_Monotone").property("checked")){
        d3.selectAll(".layer")
        .attr("d", function(d) { return valueAreaMonotone(d.values); })
      }
    }

    // Linear //
    d3.select("#area_Linear").on("change", updateAreaLinear);
    function updateAreaLinear() {
      if(d3.select("#area_Linear").property("checked")){
        d3.selectAll(".layer")
        .attr("d", function(d) { return valueAreaLinear(d.values); })
      }
    }

    // Step //
    d3.select("#area_Step").on("change", updateAreaStep);
    function updateAreaStep() {
      if(d3.select("#area_Step").property("checked")){
        d3.selectAll(".layer")
        .attr("d", function(d) { return valueAreaStep(d.values); })
      }
    }

    // Change to Regular Area //
    d3.select("#traditional_area").on("change", updateTraditionalArea);
    function updateTraditionalArea() {
      if(d3.select("#traditional_area").property("checked")){
        d3.selectAll(".layer")
        .transition()
        .duration(800)
        .attr("d", function(d) {
          if(d3.select("#area_Cardinal").property("checked")){
             return valueAreaCardinal(d.values)
          } else if (d3.select("#area_Basis").property("checked")){
             return valueAreaBasis(d.values)
          } else if(d3.select("#area_Monotone").property("checked")){
             return valueAreaMonotone(d.values)
          } else if(d3.select("#area_Linear").property("checked")){
             return valueAreaLinear(d.values)
          } else if (d3.select("#area_Step").property("checked")){
             return valueAreaStep(d.values)
          }
        })
      }
    }

    // Change to Line //
    d3.select("#line_area").on("change", updateCreateLine);
    function updateCreateLine() {
      if(d3.select("#line_area").property("checked")){
        d3.selectAll(".layer")
        .transition()
        .duration(800)
        .attr("d", function(d) {
          if(d3.select("#area_Cardinal").property("checked")){
             return valueAreaCardinal(d.values)
          } else if (d3.select("#area_Basis").property("checked")){
             return valueAreaBasis(d.values)
          } else if(d3.select("#area_Monotone").property("checked")){
             return valueAreaMonotone(d.values)
          } else if(d3.select("#area_Linear").property("checked")){
             return valueAreaLinear(d.values)
          } else if (d3.select("#area_Step").property("checked")){
             return valueAreaStep(d.values)
          }
        })
      }
    }

    // Change to Dynamic Area //
    d3.select("#dynamic_area").on("change", updateDynamicArea);
    function updateDynamicArea() {
      if(d3.select("#dynamic_area").property("checked")){
        d3.selectAll(".layer")
        .transition()
        .duration(800)
        .attr("d", function(d) {
          if(d3.select("#area_Cardinal").property("checked")){
             return valueAreaCardinal(d.values)
          } else if (d3.select("#area_Basis").property("checked")){
             return valueAreaBasis(d.values)
          } else if(d3.select("#area_Monotone").property("checked")){
             return valueAreaMonotone(d.values)
          } else if(d3.select("#area_Linear").property("checked")){
             return valueAreaLinear(d.values)
          } else if (d3.select("#area_Step").property("checked")){
             return valueAreaStep(d.values)
          }
        })
      }
    }

    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Toggle Background Color ///////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    d3.select("#darkBackgroundArea").on("change",updateBackground);
      function updateBackground() {
        if(d3.select("#darkBackgroundArea").property("checked")){
          document.body.style.background = "black";
          d3.selectAll("g.tick text")
            .style("fill","white")
            .style("opacity", .7);
          d3.selectAll("g.tick line")
            .style("stroke","white")
            .style("opacity", .1);
          d3.selectAll("#area-label-id")
            .style("color","white")
          d3.selectAll("#area-hambuger")
            .style("color","white")
          d3.selectAll(".layer")
            .style("opacity", .7);
        } else {
          document.body.style.background = "#faf5f0";
          d3.selectAll("g.tick text")
            .style("fill","black")
          d3.selectAll("g.tick line")
            .style("stroke","black")
          d3.selectAll("#area-label-id")
            .style("color","black")
          d3.selectAll("#area-hambuger")
            .style("color","black")
          d3.selectAll(".layer")
            .style("opacity", .8);
        }
      };
  });

  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////// Redraw on Slider Change ///////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  $("#rank-filter-area").on("change", function(){
    window.buildAreaTool = function() {

      areaElement.empty();

      var svg = d3.select("#gdp-area-tool").append("svg")
          .attr("width", screen_width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var areaSlider = +$("#rank-filter-area").val();

      d3.csv("/gdp/gdp_nested_data.csv", function(error, data) {
        data = jQuery.grep(data, function(d, index) {
          var is_viewable = (d.rank <= areaSlider);
          return is_viewable;
        });
          data.forEach(function(d) {
          d.date = d.date;
          d.value = +d.value;
          d.size = +d.size;
          d.rank = +d.rank;
        });

       var tooltip = d3.select("body").append("div")
         .attr("class", "tooltip")
         .style("opacity", 0);


       var layers = stack(nest.entries(data));

       x.domain(d3.extent(data, function(d) { return d.date; }));
       // y.domain(d3.extent(data, function(d) { return d.value; }));
       y.domain([-60, 60]);

       // x-axis
       svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis)
         .append("text")
         .attr("class", "label")
         .attr("x", screen_width/2)
         .attr("y", 30)
         .style("text-anchor", "middle")
         .text("Year")
         if(d3.select("#darkBackgroundArea").property("checked")){
           d3.selectAll("g.tick text")
             .style("fill","white")
             .style("opacity", .7);
           d3.selectAll("g.tick line")
             .style("stroke","white")
             .style("opacity", .1);
         };

       // y-axis
       svg.append("g")
         .attr("class", "y axis")
         .call(yAxis)
         .append("text")
         .attr("class", "label")
         .attr("transform", "rotate(-90)")
         .attr("y", 0)
         .attr("dy", "-4em")
         .style("text-anchor", "end")
         .text("Annual Change")
         if(d3.select("#darkBackgroundArea").property("checked")){
           d3.selectAll("g.tick text")
             .style("fill","white")
             .style("opacity", .7);
           d3.selectAll("g.tick line")
             .style("stroke","white")
             .style("opacity", .1);
         };


       svg.selectAll(".tick")
         .each(function (d) {
           if ( d === 0 ) {
             d3.select(this)
             .style("stroke-width", "2px")
           } else {
             d3.select(this)
            .style("stroke-dasharray", "4,4")
           }
         });

       // Area Chart Layers //
       svg.selectAll(".layer")
         .data(layers)
         .enter().append("path")
         .attr("class", "layer")
         .attr("d", function(d) {
           if(d3.select("#area_Cardinal").property("checked")){
              return valueAreaCardinal(d.values)
           } else if (d3.select("#area_Basis").property("checked")){
              return valueAreaBasis(d.values)
           } else if(d3.select("#area_Monotone").property("checked")){
              return valueAreaMonotone(d.values)
           } else if(d3.select("#area_Linear").property("checked")){
              return valueAreaLinear(d.values)
           } else if (d3.select("#area_Step").property("checked")){
              return valueAreaStep(d.values)
           }
         })
         .style("fill", function(d, i) { return z(i); })
         .style("opacity", .8)
         /// MOUSE OVER EVENT ///
         .on("mouseover", function(d) {
           area = d3.select(this)
           tooltip.transition()
             .duration(20)
             .style("opacity", 1)
           area.transition()
             .duration(100)
             .style("opacity", 1)
             .style("stroke-width", 2)
           // tooltip.html(d.countryname, +(d[changeHeaderName]))
             tooltip.html("<b>"+d.key+"</b>" + "<br/>")
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY-28) + "px");
         })
         .on("mouseout", function(d) {
           tooltip.transition()
             .duration(500)
             .style("opacity", 0)
           area.transition()
             .duration(200)
             .style("opacity", .8)
             .style("stroke-width", 1)
         });
        });

      };
     window.buildAreaTool();
   });
 });
