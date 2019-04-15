$(document).ready(function() {

  var loadVisualization = $("#test_chord").length > 0;
  if (!loadVisualization) {
    return;
  }

   // d3.csv('/ski_resorts/test_chord.csv', function(error, data) {
  d3.csv('/ski_resorts/test_chord-2.csv').then(function(data) {

        var mpr = chordMpr(data);
        mpr
            .addValuesToMap('root')
            .addValuesToMap('node')
            .setFilter(function(row, a, b) {
                return (row.root === a.name && row.node === b.name)
            })
            .setAccessor(function(recs, a, b) {
              console.log(recs)
                if (!recs[0]) return 0;
                return +recs[0].count;
            });
        drawChords(mpr.getMatrix(), mpr.getMap());




    function drawChords(matrix, mmap) {
      var colorScale = d3v3.scale.ordinal()
          .range(["#8FBC8F", "#ff8c00", "#98abc5", "#7b6888", "#CD5C5C", "#87e5da", "#c7f2e3", "#f7aa00", "#db2d43"]);


      colorScale.domain(data.map(function (d){ return d.count; }));


        var w = 980,
            h = 800,
            r1 = h / 2,
            r0 = r1 - 110;

        var chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending);

        var arc = d3.arc()
            .innerRadius(r0)
            .outerRadius(r0 + 20);

        var ribbon = d3.ribbon()
            .radius(r0);

        var svg = d3.select("#test_chord").append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("id", "circle")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
            .datum(chord(matrix));

        svg.append("circle")
            .attr("r", r0 + 20);

        var mapReader = chordRdr(matrix, mmap);


        var g = svg.selectAll("g.group")
            .data(function(chords) {
                return chords.groups;
            })
            .enter().append("svg:g")
            .attr("class", "group")

        g.append("svg:path")
            .style("stroke", "grey")
            .attr("fill", function (d){ return colorScale(d.count); })
            .attr("d", arc);

        g.append("svg:text")
            .each(function(d) {
                d.angle = (d.startAngle + d.endAngle) / 2;
            })
            .attr("dy", ".35em")
            .style("font-family", "helvetica, arial, sans-serif")
            .style("font-size", "9px")
            .attr("text-anchor", function(d) {
                return d.angle > Math.PI ? "end" : null;
            })
            .attr("transform", function(d) {
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                    "translate(" + (r0 + 26) + ")" +
                    (d.angle > Math.PI ? "rotate(180)" : "");
            })
            .text(function(d) {
                return mapReader(d).gname;
            });

        var colors = d3.scaleOrdinal(d3.schemeCategory20c);

        var chordPaths = svg.selectAll("path.chord")
            .data(function(chords) {
                return chords;
            })
            .enter().append("svg:path")
            .attr("class", "chord")
            .style("stroke", "grey")
            .attr("fill", function (d){ return colorScale(d.count); })
            .attr("d", ribbon.radius(r0))

    }
        });

    });
