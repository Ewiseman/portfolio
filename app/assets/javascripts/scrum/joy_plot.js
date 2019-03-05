$(document).ready(function() {

  var loadVisualization = $("#my_dataviz").length > 0;
  if (!loadVisualization) {
    return;
  }

  var margin = {top: 20, right: 60, bottom: 90, left: 20},
      width = $("#my_dataviz").width(),
      height = ($("#my_dataviz").width()*.50);

  var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("style", "padding-bottom: " + Math.ceil(height * 10 / width) + "%")
      .attr("viewBox", "-50 -90 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
      .append("g")
  // Percent two area charts can overlap
  var overlap = 0.7;

  var parseTime = d3.timeParse("%Y-%m-%d");

  var parseDate = d3.timeParse('%Y');

  var x = function(d) { return d.date; },
      xScale = d3.scaleTime().range([0, width]),
      xValue = function(d) { return xScale(x(d)); },
      xAxis = d3.axisBottom(xScale);

  var y = function(d) { return d.value; },
      yScale = d3.scaleLinear(),
      yValue = function(d) { return yScale(y(d)); };

  var activity = function(d) { return d.key; },
      activityScale = d3.scaleBand().range([0, height]),
      activityValue = function(d) { return activityScale(activity(d)); },
      activityAxis = d3.axisLeft(activityScale);

      console.log(activityScale)

  var area = d3.area()
      .x(xValue)
      .y1(yValue)
      // .curve(d3.curveBasis);

  var line = area.lineY1();

  d3.csv("/scrum_reports.csv").then(function(data) {

    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.value = +d.value;
    });

      // Sort by time
      data.sort(function(a, b) { return a.date - b.date; });

      var nest = d3.nest()
          .key(function(d) { return d.key; })
          .entries(data);

      xScale.domain(d3.extent(data, x));

      activityScale.domain(nest.map(function(d) { return d.key; }));

      var areaChartHeight = (1 + overlap) * (height / activityScale.domain().length);

      yScale
          .domain(d3.extent(data, y))
          .range([areaChartHeight, 0]);

      area.y0(yScale(0));

      svg.append('g').attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

      svg.append('g').attr('class', 'axis axis--activity')
          .call(activityAxis);

      var gActivity = svg.append('g').attr('class', 'activities')
              .selectAll('.activity').data(nest)
              .enter().append('g')
              .attr('class', function(d) { return 'activity activity--' + d.key; })
              .attr('transform', function(d) {
                  var ty = activityValue(d) - activityScale.bandwidth() + 5;
                  return 'translate(0,' + ty + ')';
              });

      gActivity.append('path').attr('class', 'area')
          .datum(function(d) { return d.values; })
          .attr('d', area);

      gActivity.append('path').attr('class', 'line')
          .datum(function(d) { return d.values; })
          .attr('d', line);
  });




});
