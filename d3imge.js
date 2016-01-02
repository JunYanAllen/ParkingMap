$(function () {
        var data = [
          { x: 1, w: Math.floor(Math.random() * 200), y: '汽車' },
          { x: 2, w: Math.floor(Math.random() * 200), y: '摩托車' },
          { x: 3, w: Math.floor(Math.random() * 200), y: '大貨車' },
          { x: 4, w: Math.floor(Math.random() * 200), y: '小客車' },
          { x: 5, w: Math.floor(Math.random() * 200), y: '計程車' },
        ];
          var newNumber = [0, 0, 0, 0, 0];
          var s = d3.selectAll('#imge')
                  .append('svg')
                  .attr({
                      'width': 500,
                      'height': 200
                  });
          var name = s.append('g')
                        .attr({
                            'id': 'name'
                        });

          s.selectAll('rect')
             .data(data)
             .enter()
             .append('rect')
             .attr({
                 'fill': '#09c',
                 'width': 0,
                 'height': 30,
                 'x': 60,
                 'y': function (d) {
                     return (d.x - 1) * 35+30;
                 }
             })
             .transition()
               .duration(1000)
               .attr({
                   'width': function (d) {
                       return d.w;
                   }
               });

          s.selectAll('text')
             .data(data)
             .enter()
             .append('text')
             .text(function (d) {
                 return d.w;
             })
             .attr({
                 'fill': 'white',
                 'x': 63,
                 'y': function (d) {
                     return d.x * 35 +18;
                 }
             })
             .transition()
             .duration(1000)
             .attr({
                 'x': function (d) {
                     return d.w + 63;
                 }
             })
             .tween('number', function (d) {
                 var i = d3.interpolateRound(0, d.w);
                 return function (t) {
                     this.textContent = i(t);
                 }
             });

           name.selectAll('text')
             .data(data)
             .enter()
             .append('text')
             .text(function (d) {
                 return d.y;
             })
             .attr({
                 'fill': 'white',
                 'x': 0,
                 'y': function (d) {
                     return (d.x - 1) * 35 + 50;
                 }
             });
});