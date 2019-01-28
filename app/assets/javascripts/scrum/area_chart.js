$(document).ready(function() {

  var loadVisualization = $("#scrum-area").length > 0;
  if (!loadVisualization) {
    return;
  }

  var margin = {top: 20, right: 60, bottom: 30, left: 20},
      width = $("#scrum-area").width(),
      height = ($("#scrum-area").width()*.30);

  // var svg = d3.select('#scrum-area').append('svg')
  //     .attr('width', width + margin.left + margin.right)
  //     .attr('height', height + margin.top + margin.bottom)
  //     .append('g')
  //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var svg = d3.select("#scrum-area")
      .append("svg")
      .attr("style", "padding-bottom: " + Math.ceil(height * 10 / width) + "%")

      .attr("viewBox", "-20 -20 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
      .append("g")

  var parseDate = d3.timeParse('%Y');

  var formatSi = d3.format(".3s");

  var formatNumber = d3.format(".1f"),
      formatBillion = function(x) { return formatNumber(x / 1e9); };

  var x = d3.scaleTime()
      .range([0, width]);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var color = d3.scaleOrdinal()
      .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);

  var xAxis = d3.axisBottom()
      .scale(x);

  var yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat(formatBillion);

  var area = d3.area()
      .x(function(d) { return x(d.data.date); })
      .y0(function(d) { return y(d[0]); })
      .y1(function(d) { return y(d[1]); })
      .curve(d3.curveBasis);

  var stack = d3.stack()



  d3.csv("/gdp/data.csv").then(function(data) {

    var keys = data.columns.filter(function(key) { return key !== 'date'; })

    data.forEach(function(d) {
      d.date = parseDate(d.date);
    });

    var maxDateVal = d3.max(data, function(d){
      var vals = d3.keys(d).map(function(key){ return key !== 'date' ? d[key] : 0 });
      return d3.sum(vals);
    });

    // Set domains for axes
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, maxDateVal])

    layers = stack.keys(keys);

    layers.order(d3.stackOrderNone);
    layers.offset(d3.stackOffsetNone);

    console.log(stack(data));

    var layer = svg.selectAll('.layer')
        .data(stack(data))
        .enter().append('g')

    layer.append('path')
        .attr('class', 'area')
        .attr('d', area)
        .style("fill", function(d, i) { return color(i); })
        .attr('fill-opacity', 0.5);

    layer.append('text')
        .datum(function(d) { return d; })
        .attr('transform', function(d, i) { return 'translate(' + x(data[13].date) + ',' + y(d[13][1]) + ')'; })
        .attr('x', -6)
        .attr('dy', '.35em')
        .style("text-anchor", "start")
        .text(function(d) { return d.key; })
        .attr('fill-opacity', 1);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    svg.append ("text")
      .attr("x", 0-margin.left)
      .text("Billions of liters")


  });

});
