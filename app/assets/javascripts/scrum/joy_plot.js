$(document).ready(function() {

  ///////////////////////////////////////////////////////////////
  //////////////////      Variables     /////////////////////////
  ///////////////////////////////////////////////////////////////

  var loadVisualization = $("#my_dataviz").length > 0;
    if (!loadVisualization) {
    return;
  }

  var margin = {top: 20, right: 30, bottom: 130, left: 300},
      width = $("#my_dataviz").width(),
      height = ($("#my_dataviz").width()*.40);

  var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("style", "padding-bottom: " + Math.ceil(height * 20 / width) + "%")
      .attr("viewBox", "-200 -130 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
      .append("g")

  var color = d3.scaleOrdinal()
      .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);
  // Percent two area charts can overlap
  var overlap = 0.7;

  var parseTime = d3.timeParse("%Y-%m-%d");

  var x = d3.scaleTime().range([0, width])
  var y = d3.scaleLinear()
  var activity = d3.scaleBand().range([0, height])

  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(activity);

  var tooltip = d3v3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  var area_base = d3.area()
  .x(function(d) { return x(d.date); })
  .y1(function(d) { return y(function(d) { return d.value; }(d)); } - function(d) { return y(function(d) { return d.value; }(d)); })

  var area = d3.area()
      .x(function(d) { return x(d.date); })
      .y1(function(d) { return y(function(d) { return d.value; }(d)); })
      // .curve(d3.curveMonotoneX);

  var line = area.lineY1();

  ///////////////////////////////////////////////////////////////
  //////////////////        Data        /////////////////////////
  ///////////////////////////////////////////////////////////////

  d3.csv("/scrum_reports.csv").then(function(data) {

    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.value = +d.value;
    });

    var nest = d3.nest()
        .key(function(d) { return d.key; })
        .entries(data);


    ///////////////////////////////////////////////////////////////
    //////////////////       Domains      /////////////////////////
    ///////////////////////////////////////////////////////////////
    x.domain(d3.extent(data, function(d) { return d.date; }));
    activity.domain(nest.map(function(d) { return d.key; }));

    var areaChartHeight = (1 + overlap) * (height / activity.domain().length);
    y.domain(d3.extent(data, function(d) { return d.value; }))
        .range([areaChartHeight, 0]);

    ///////////////////////////////////////////////////////////////
    /////////////////////      Axis       /////////////////////////
    ///////////////////////////////////////////////////////////////

    svg.append('g').attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g').attr('class', 'axis axis--activity')
        .attr('transform', 'translate(0,' + 10 + ')')
        .call(yAxis);

    ///////////////////////////////////////////////////////////////
    ///////////////////// Color Gradient  /////////////////////////
    ///////////////////////////////////////////////////////////////
    svg.append("linearGradient")
        .attr("id", "area-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", 0).attr("y2", y(300))
        .selectAll("stop")
        .data([
          {offset: "0%", color: "#fff"},
          {offset: "14%", color: "#6dd5ed"},
          {offset: "100%", color: "#2193b0"}
        ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    ///////////////////////////////////////////////////////////////
    /////////////////////   Area Charts   /////////////////////////
    ///////////////////////////////////////////////////////////////
    area.y0(y(0));
    var gActivity = svg.append('g').attr('class', 'activities')
        .selectAll('.activity').data(nest)
        .enter().append('g')
        .attr('class', function(d) { return 'activity activity--' + d.key; })
        .attr('transform', function(d,i) {
            var ty = function(d) { return activity(function(d) { return d.key }(d)) }(d) - activity.bandwidth() + 5;
            // var tx = i *50
            return 'translate(0,' + ty + ')';
        });

    gActivity.append('path')
        .attr('class', 'joy-area')
        .datum(function(d) { return d.values; })
        .attr('d', area)

    gActivity.append('path')
        .attr('class', 'line')
        .datum(function(d) { return d.values; })
        .attr('d', line);

    ///////////////////////////////////////////////////////////////
    /////////////////////   Annotations   /////////////////////////
    ///////////////////////////////////////////////////////////////

    //Add annotations
    var annotations = [{
         type: d3.annotationCalloutCircle,
         note: {
           title: "Launched Startup",
           wrap: 190
         },
         //settings for the subject, in this case the circle radius
         subject: {
           radius: 8
         },
         data: { x: "2018-11-1", y: -135},
         dy: -($("#my_dataviz").width()*.14),
         dx: 0
       },
       {
       type: d3.annotationCalloutCircle,
          note: {
            title: "1st Place Startup Comp.",
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: 8
          },
          data: { x: "2018-1-1", y: -355},
          dy: -5,
          dx: -1
        },
        {
        type: d3.annotationCalloutCircle,
           note: {
             title: "Costa Rica",
             wrap: 190
           },
           //settings for the subject, in this case the circle radius
           subject: {
             radius: 8
           },
           data: { x: "2018-3-1", y: 75},
           dy: -135,
           dx: -1
         },
         {
         type: d3.annotationCalloutCircle,
            note: {
              title: "Hawaii",
              wrap: 190
            },
            //settings for the subject, in this case the circle radius
            subject: {
              radius: 8
            },
            data: { x: "2017-3-1", y: 75},
            dy: -135,
            dx: -1
          },
          {
          type: d3.annotationCalloutCircle,
             note: {
               title: "Hawaii",
               wrap: 190
             },
             //settings for the subject, in this case the circle radius
             subject: {
               radius: 8
             },
             data: { x: "2016-3-1", y: 75},
             dy: -135,
             dx: -1
           },
           {
           type: d3.annotationCalloutCircle,
              note: {
                title: "Ski Mexico",
                wrap: 190
              },
              //settings for the subject, in this case the circle radius
              subject: {
                radius: 8
              },
              data: { x: "2017-11-1", y: 110},
              dy: -125,
              dx: -1
            },
            {
            type: d3.annotationCalloutCircle,
               note: {
                 title: "Intermittent Fasting, Juicing, Meditating",
                 wrap: 190
               },
               //settings for the subject, in this case the circle radius
               subject: {
                 radius: 8
               },
               data: { x: "2018-10-1", y: 670},
               dy: -5,
               dx: -1
             },
             {
             type: d3.annotationCalloutCircle,
                note: {
                  title: "Learning React",
                  wrap: 190
                },
                //settings for the subject, in this case the circle radius
                subject: {
                  radius: 8
                },
                data: { x: "2018-12-1", y: -1700},
                dy: -50,
                dx: -1
              }



      ].map(function(d){ d.color = "#E8336D"; return d})

      var makeAnnotations = d3.annotation()
        // .type(type)
        //Gives you access to any data objects in the annotations array
        .accessors({
          x: function(d){ return x(new Date(d.x))},
          y: function(d){ return y(d.y) }
        })
        .annotations(annotations)
        .textWrap(30)

        svg.append("g")
          .attr("class", "annotation-group")
          .call(makeAnnotations)
          .style("opacity", 0)

        svg.selectAll(".annotation-group")
          .transition()
          .duration(3500)
          .style("opacity", 1)





    });




});
