$(document).ready(function() {

  var loadVisualization = $("#gdp-radial-bubble-updated").length > 0;
  if (!loadVisualization) {
    return;
  }

  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////// Setup Canvas Dimensions ///////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  var centerRadial = $("#gdp-radial-bubble-updated");
  var outerWidth = centerRadial.width();
  var outerHeight = centerRadial.width() * .70;
  var margin = { left: 0, top: 0, right: 0, bottom: 0 };
  var innerWidth  = outerWidth  + margin.left + margin.right;
  var innerHeight = outerHeight - margin.top  - margin.bottom;

  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////// Setup SVG /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  var svg = d3v3.select("#gdp-radial-bubble-updated").append("svg")
    .attr("width",  outerWidth)
    .attr("height", outerHeight)
    .append("g")
    .attr("transform", "translate(" + innerWidth / 2 + "," + innerHeight / 2 + ")");

  d3v3.csv("/gdp/gdp_radial.csv", function(error, data) {
    var headerNames = d3v3.keys(data[0]);

    var tooltip = d3v3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Define Variables //////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    var rgbOne = +$("#color-slider-one").val();
    var rgbTwo = +$("#color-slider-two").val();
    var rgbThree = +$("#color-slider-three").val();
    var spacerValue = +$("#spacer-value").val();
    var centerPadding = outerWidth / +$("#center-slider").val();
    var radiusMultiplier = 2
    var positivePercentageColor = d3v3.rgb(rgbOne, rgbTwo, rgbThree);
    var negativePercentageColor = "red"
    var cirlceOpacity = .8
    var radialMap = 360/(d3v3.selectAll(data).size())
    var radialPlacement = function(d, i) { return "rotate(" + (i * radialMap - 180) + ")"; }
    var radialText = function(d,i) { return "rotate(" +  (i * radialMap - 90) + ")"; }


    //WITH AXIS LAYOUT
    // var radialMap = 360/(d3v3.selectAll(data).size()+5)
    // var radialPlacement = function(d, i) { return "rotate(" + (i * radialMap - 174) + ")"; }
    // var radialText = function(d,i) { return "rotate(" +  (i * radialMap - 84) + ")"; }



    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Circles ///////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    var numColors = 10;
		var colorScale = d3v3.scale.linear()
		   .domain([0,(numColors-1)/2,numColors-1])
		   .range(["#2c7bb6", "#ffff8c", "#d7191c"])
		   .interpolate(d3.interpolateHcl);

		svg.append("defs").append("radialGradient")
			.attr("id", "gradientRainbow")
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("cx", "10%")
			.attr("cy", "0%")
			.attr("r", "45%")
			.selectAll("stop")
			.data(d3v3.range(numColors))
			.enter().append("stop")
			.attr("offset", function(d,i) { return (i/(numColors-1)*50 + 40) + "%"; })
			.attr("stop-color", function(d) { return colorScale(d); });

function remove(array, element) {
  return array.filter(function(e) { return e.includes(element); });
    }

    var changeHeaderNames = remove(headerNames, "change");
    changeHeaderNames.forEach(function(changeHeaderName, index) {
      svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", function(d) {
          var x = +(d[changeHeaderName]);
          if (x < 0) {return "data-node negative" }
          else  { return "data-node positive" }
        ;})
        .style("r", function(d) {
          var x = +(d[changeHeaderName]);
          if (x < 0) { return Math.sqrt(x * -1) * radiusMultiplier }
          else  { return Math.sqrt(x) * radiusMultiplier }
        ;})
        .attr("data-change-value", function(d) {
          var x = +(d[changeHeaderName]);
            return x
        ;})

        .attr("data-change-index", index)
        .attr("cy", function(d) {
          if(d3v3.select("#radialPlot").property("checked")){
            var value = +this.getAttribute('data-change-value');
            return (value * +$("#spacer-value").val()) + (outerWidth / +$("#center-slider").val());
          } else {
            var index = +this.getAttribute('data-change-index');
            var newCy = (index * +$("#spacer-value").val()) + (outerWidth / +$("#center-slider").val())
            return newCy;
          }
        })
          .style("fill", "url(#gradientRainbow)")


        // .style("fill", "red")

        // .style("fill", function(d) {
        //   var x = +(d[changeHeaderName]);
        //   if (x < 0) {return negativePercentageColor }
        //   else  { return positivePercentageColor }
        // ;})
        .attr("opacity", 0.8)
        .style("stroke-opacity", .3)
        .attr("transform", radialPlacement)

        /// MOUSE OVER EVENT ///
        .on("mouseover", function(d) {
          circle = d3v3.select(this)
          tooltip.transition()
            .duration(20)
            .style("opacity", 1)
          circle.transition()
            .duration(100)
            .style("opacity", 1)
            .style("stroke-opacity", 1)
          // tooltip.html(d.countryname, +(d[changeHeaderName]))
            tooltip.html("<b>"+d.countryname+"</b>" + "<br/>" + changeHeaderName.replace(/\D/g,'') + "<br/>"  + parseInt(d[changeHeaderName]) + "% Change" )
            .style("left", (d3v3.event.pageX) + "px")
            .style("top", (d3v3.event.pageY-28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0)
          circle.transition()
            .duration(200)
            .style("opacity", .6)
            .style("stroke-opacity", .3)
        });
  });

  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////// Country Labels ////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

    svg.selectAll(".text")
      .data(data)
      .enter().append("text")
      .attr("class", "radial-text")
      .attr("x", centerPadding + 1)
      .attr("y", 0)
      .style("opacity", 0.5)
      .style("text-anchor", function(d,i) { return i ? "end" : null; })
      .attr("transform", radialText)
      .text(function(d) { return (d.countryname);
      });

    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Slider Updates ////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    // Space between nodes slider //
    $("#spacer-value").on("change", function(){
      d3v3.selectAll(".data-node")
        .transition()
        .duration(1000)
        .attr("cy", function(d) {
          if(d3v3.select("#radialPlot").property("checked")){
            var value = +this.getAttribute('data-change-value');
            return (value * +$("#spacer-value").val()) + (outerWidth / +$("#center-slider").val());
          } else {
            var index = +this.getAttribute('data-change-index');
            var newCy = (index * +$("#spacer-value").val()) + (outerWidth / +$("#center-slider").val())
            return newCy;
          }
        })
    });

    //Bubble Radius //
    $("#bubble-radius").on("change", function(){
    d3v3.selectAll(".data-node")
        .transition()
        .duration(1000)
        .style("r",  function(d) {
          var value = +this.getAttribute('data-change-value');
          if (value < 0) { return Math.sqrt(value * -1) * +$("#bubble-radius").val() }
          else  { return Math.sqrt(value) * +$("#bubble-radius").val() }
        })
    });

    // Center Padding //
    $("#center-slider").on("change", function(){
      d3v3.selectAll(".data-node")
        .transition()
        .duration(1000)
        .attr("cy", function(d) {
          if(d3v3.select("#radialPlot").property("checked")){
            var value = +this.getAttribute('data-change-value');
            return (value * +$("#spacer-value").val()) + (outerWidth / +$("#center-slider").val());
          } else {
            var index = +this.getAttribute('data-change-index');
            var newCy = (index * +$("#spacer-value").val()) + (outerWidth / +$("#center-slider").val())
            return newCy;
          }
        })

      d3v3.selectAll(".radial-text")
        .transition()
        .duration(1000)
        .attr("x", (outerWidth / +$("#center-slider").val()) +1)
    });

    // RGB Color One Slider //
    $("#color-slider-one").on("change", function(){
      d3v3.selectAll(".positive")
        .transition()
        .style("fill", d3v3.rgb(+$("#color-slider-one").val(), +$("#color-slider-two").val(),+$("#color-slider-three").val()));
    });

    // RGB Color Two Slider //
    $("#color-slider-two").on("change", function(){
      d3v3.selectAll(".positive")
        .transition()
        .style("fill", d3v3.rgb(+$("#color-slider-one").val(), +$("#color-slider-two").val(),+$("#color-slider-three").val()));
    });

    //RGB Color Two Slider//
    $("#color-slider-three").on("change", function(){
      d3v3.selectAll(".positive")
        .transition()
        .style("fill", d3v3.rgb(+$("#color-slider-one").val(), +$("#color-slider-two").val(),+$("#color-slider-three").val()));
    });

    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Checkbox Updates //////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    // Toggle Radial Text //
    d3v3.select("#radialText").on("change",updateText);
      function updateText(){
  			if(d3v3.select("#radialText").property("checked")){
          d3v3.selectAll(".radial-text")
            .style("opacity", .5)
  			} else {
          d3v3.selectAll(".radial-text")
            .style("opacity", 0)
  			}
      }

    // Toggle Negative Circles //
    d3v3.select("#negativeValues").on("change",updateNegatives);
      function updateNegatives(){
        if(d3v3.select("#negativeValues").property("checked")){
          d3v3.selectAll(".negative")
            .style("opacity", .8)
        } else {
          d3v3.selectAll(".negative")
            .style("opacity", 0)
        }
      }

    // Toggle Positive Circles //
    d3v3.select("#positiveValues").on("change",updatePositives);
      function updatePositives(){
        if(d3v3.select("#positiveValues").property("checked")){
          d3v3.selectAll(".positive")
            .style("opacity", .8)
        } else {
          d3v3.selectAll(".positive")
            .style("opacity", 0)
        }
      }

    // Toggle Plot //
    d3v3.select("#radialPlot").on("change",updatePlot)
      function updatePlot(){
        if(d3v3.select("#radialPlot").property("checked")){
          d3v3.selectAll(".data-node")
          .transition()
          .duration(1000)
          .attr("cy",  function(d) {
            var value = +this.getAttribute('data-change-value');
            return (value * +$("#spacer-value").val()) + (outerWidth / +$("#center-slider").val());
          })
        } else {
          d3v3.selectAll(".data-node")
          .transition()
          .duration(1000)
          .attr("cy", function() {
            var index = +this.getAttribute('data-change-index');
            var newCy = (index * +$("#spacer-value").val()) + (outerWidth / +$("#center-slider").val())
            return newCy;
          });
        }
      }

    // Toggle Background //
    d3v3.select("#darkBackground").on("change",updateBackground);
      function updateBackground() {
        if(d3v3.select("#darkBackground").property("checked")){
          document.body.style.background = "black";
          d3v3.selectAll(".radial-text")
            .style("fill", "white")
          d3v3.selectAll(".basic-line-title")
            .style("color","white")
        } else {
          document.body.style.background = "#fff";
          d3v3.selectAll(".radial-text")
            .style("fill", "black")
          d3v3.selectAll(".basic-line-title")
            .style("color","black")
        }
      }


  });
});
