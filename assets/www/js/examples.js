$(document).bind('pageinit', function(){
  var datos = [];
  $.ajax({
    url: IPSERVIDOR +'/enjoylifewebservices/specialists/getSpecialists.php?token=aa1c694bf88ef3a00ad53eb030fd528b',
    dataType:"jsonp",
    success: function(data, status) {
      datos = data.response;

    $('textarea.mention').mentionsInput({
      onDataRequest:function (mode, query, callback) {

        datos = _.filter(datos, function(item) { return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 });

        callback.call(this, datos);
      }
    });


    },
    error: function(){
      alert("There was an error loading the feed");
    }
  });


});
