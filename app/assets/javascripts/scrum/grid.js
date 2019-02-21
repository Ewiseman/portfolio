$(document).ready(function() {

  var loadVisualization = $("#grid").length > 0;
  if (!loadVisualization) {
    return;
  }

  //////////// *** VARIABLES *** ////////////

  var format = d3v3.time.format("%Y-%m-%d");

  var margin = {top: -10, right: 100, bottom: 50, left: -1000},
      width = $("#grid").width() - margin.left - margin.right,
      height = 2000 - margin.top - margin.bottom;

  var yAxisMargin = height - margin.bottom

  var svg = d3.select("#grid").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom )
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var colorScale = d3v3.scale.category20c ();
  var angleScale = d3v3.scale.linear();

  var stateColor = "key";


 //////////// *** DATA INTEGRATION *** ////////////

  d3v3.csv("/scrum_reports.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.date = format.parse(d.date);
      d.value = +d.value;
    });

    var centerPadding = outerWidth / 6

    var y = d3v3.scale.ordinal().rangeRoundBands([0, 0], .7  );

    var sortFunction = function(a, b) { return d3v3.descending(b.date, a.date); };
    data.sort(sortFunction).map(function(d) { return d.date; });

    colorScale.domain(data.map(function (d){ return d[stateColor]; }));

    // svg.selectAll(".bar")
    //   .data(data)
    //   .enter().append("rect")
    //   .attr("class", "bar")
    //   .attr("x", function(d,i) { return i*2})
    //   .attr("height", function(d){ return d.value })
    //   .attr("y",  0)
    //   .attr("width", function(d){ return d.value/75 })
    //   .attr("fill", function (d){ return colorScale(d[stateColor]); })

      svg.selectAll(".line")
        .data(data)
        .enter().append("line")
        .attr("x1", function(d,i) { return i*15})
        .attr("y1", 0)
        .attr("x2", function(d,i) { return (i*15)+d.value})
        .attr("y2", function(d){ return d.value })
        .attr("stroke-width",function(d){ return d.value/20 })
        .attr("stroke", "steelblue")
        .attr("stroke-opacity", .5);

      svg.selectAll(".line")
        .data(data)
        .enter().append("line")
        .attr("x1", function(d,i) { return i*15})
        .attr("y1", 0)
        .attr("x2", function(d,i) { return (i*15)-d.value})
        .attr("y2", function(d){ return d.value})
        .attr("stroke-width",function(d){ return d.value/20 })
        .attr("stroke", "#f55")
        .attr("stroke-opacity", .5);




  });
});
