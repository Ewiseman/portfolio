$(document).ready(function() {

  var loadVisualization = $("#radial-column").length > 0;
  if (!loadVisualization) {
    return;
  }

  var centerRadial = $("#radial-column");

  var outerWidth = centerRadial.width();
  var outerHeight = centerRadial.width();
  var margin = { left: 0, top: 88, right: 0, bottom: 88 };

  var stateColor = "key";

  var innerWidth  = outerWidth  - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top  - margin.bottom;

  var svg = d3v3.select("#radial-column").append("svg")
    .attr("width",  outerWidth)
    .attr("height", outerHeight)
    .append("g")
    .attr("transform", "translate(" + innerWidth / 2 + "," + innerHeight / 2 + ")");

  var colorScale = d3v3.scale.category20c ();
  var angleScale = d3v3.scale.linear();

  var tooltip = d3v3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  //View by index

  d3v3.csv("/scrum_maps.csv", function(error, data) {

    data.forEach(function(d) {
      d.health = +d.health;
      return d;
    });

    var centerPadding = outerWidth / 6

    var y = d3v3.scale.ordinal().rangeRoundBands([0, 0], .7  );

    var sortFunction = function(a, b) { return d3v3.descending(b.date, a.date); };
    data.sort(sortFunction).map(function(d) { return d.date; });

    colorScale.domain(data.map(function (d){ return d[stateColor]; }));

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", function(d){ return d.value; })
      .attr("y", centerPadding)
      .attr("width", 2)
      .attr("fill", function (d){ return colorScale(d[stateColor]); })
      .attr("transform", function(d,i) { return "rotate(" + ((i)-225) + ")"; })

  svg.selectAll(".text")
      .data(data)
      .enter().append("text")
      .attr("class", "radial-center")
      .attr("x", centerPadding-2)
      .attr("y", 0)
      .style("opacity", 0.4)
      .style("text-anchor", function(d,i) { return i+1 ? "end" : null; })
      .attr("transform", function(d,i) { return "rotate(" + (((i*2.28)-135)) + ")"; })
      .text(function(d){
           return (d.date).substring(0, d.date.length);
      });
   });
});
