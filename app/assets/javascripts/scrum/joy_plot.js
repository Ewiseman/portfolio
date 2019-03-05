$(document).ready(function() {

  var loadVisualization = $("#my_dataviz").length > 0;
  if (!loadVisualization) {
    return;
  }

  // set the dimensions and margins of the graph
  var margin = {top: 200, right: 60, bottom: 30, left: 20},
      width = $("#my_dataviz").width(),
      height = ($("#my_dataviz").width()*.50);

  var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("style", "padding-bottom: " + Math.ceil(height * 0 / width) + "%")
      .attr("viewBox", "-90 -200 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
      .append("g")

  //read data
  d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv").then(function(data) {

    // Get the different categories and count them
    var categories = data.columns
    var n = categories.length

    // Add X axis
    var x = d3.scaleLinear()
      .domain([-10, 140])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Create a Y scale for densities
    var y = d3.scaleLinear()
      .domain([0, 0.4])
      .range([ height, 0]);

    // Create the Y axis for names
    var yName = d3.scaleBand()
      .domain(categories)
      .range([0, height])
      .paddingInner(1)
    svg.append("g")
      .call(d3.axisLeft(yName));

    // Compute kernel density estimation for each column:
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
    var allDensity = []
    for (i = 0; i < n; i++) {
        key = categories[i]
        density = kde( data.map(function(d){  return d[key]; }) )
        allDensity.push({key: key, density: density})
    }

    // Add areas
    svg.selectAll("areas")
      .data(allDensity)
      .enter()
      .append("path")
        .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
        .datum(function(d){return(d.density)})
        .attr("fill", "#69b3a2")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
        )

  })

  // This is what I need to compute kernel density estimation
  function kernelDensityEstimator(kernel, X) {
    return function(V) {
      return X.map(function(x) {
        return [x, d3.mean(V, function(v) { return kernel(x - v); })];
      });
    };
  }
  function kernelEpanechnikov(k) {
    return function(v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }
});