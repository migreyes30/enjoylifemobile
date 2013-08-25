$(document).ready(function(){
      var arreglosPeso = [];
      $.ajax({
        url: IPSERVIDOR + '/enjoylifewebservices/history/getWeightTrend.php?token=aa1c694bf88ef3a00ad53eb030fd528b&callback=a&usuario='+USUARIO,
        dataType:"jsonp",
        success: function(data, status) {

          $.each(data.response, function(i,item){ 
            var arregloPeso = [];

            arregloPeso.push(item['fecha']);
            arregloPeso.push(item['peso']);
            
            arreglosPeso.push(arregloPeso);
          });
        },
        error: function(){
          alert("There was an error loading the feed");
        },
        complete: function(){

          //PIE
          var plot2 = $.jqplot ('chart2', [arreglosPeso], {
              // Give the plot a title.
              title: 'Tendencia de peso',
              // You can specify options for all axes on the plot at once with
              // the axesDefaults object.  Here, we're using a canvas renderer
              // to draw the axis label which allows rotated text.

              // An axes object holds options for all axes.
              // Allowable axes are xaxis, x2axis, yaxis, y2axis, y3axis, ...
              // Up to 9 y axes are supported.
              axes: {
                // options for each axis are specified in seperate option objects.
                xaxis:{
                  renderer:$.jqplot.DateAxisRenderer
                },
                yaxis: {
                  label: "Peso"
                }
              }
            });

          $.mobile.loading('hide');
        }
      });

});