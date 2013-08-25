$(document).on('pageinit', '#registro', function(){

      
                      
      $('#geolocalizacion').click(function(){
        geocoder = new google.maps.Geocoder();
        $.mobile.loading( "show", {
            text: "Obteniendo ubicación",
            textVisible: true,
            theme: $.mobile.loader.prototype.options.theme,
            textonly: false,
            html: ""
        });        
        navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
      });

    $(document).on('click', '#submit', function(){ // catch the form's submit event
    if($('#message').val().length > 0){
        // Send data to server through ajax call
        // action is functionality we want to call and outputJSON is our data
            $.ajax({url: IPSERVIDOR + '/enjoylifewebservices/messages/setMessage.php',
              data: {user: $('#user').val(), token: $('#token').val() ,mensaje : $('#message').val() }, // Convert a form to a JSON string representation
                    type: 'post',
                    dataType : 'json',                 
                    async: true,
                beforeSend: function() {
                    // This callback function will trigger before data is sent
                        $.mobile.loading( "show", {
                            text: "Enviando registro",
                            textVisible: true,
                            theme: $.mobile.loader.prototype.options.theme,
                            textonly: false,
                            html: ""
                        });
                },
                complete: function() {
                    // This callback function will trigger on data sent/received complete
                    $.mobile.loading( "hide" );
                },
                success: function (result) {
                    alert("Your message has been sent");
                    window.location.href="inbox.html";
                },
                error: function (request,error) {
                    // This callback function will trigger on unsuccessful action                
                    alert("Error de conexión con el servidor, prueba más tarde");
                }
            });  
    } else {
        alert('Please fill all nececery fields');
    }           
        return false; // cancel original event to prevent form submitting
    });    
});

    function onGetCurrentPositionSuccess(position) {        
      console.log("lat: " + position.coords.latitude);
      console.log("long: " + position.coords.longitude);
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
                        
      // paris, france - uncomment to test
      //var lat = parseFloat(48.850258);
      //var lng = parseFloat(2.351074);
                        
      // tiburon, california
      //var lat = parseFloat(37.872685);
      //var lng = parseFloat(-122.45224);
                        
      var latlng = new google.maps.LatLng(lat, lng);
      var ciudadEncontrada="";
                        
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            var arrAddress = results[0].address_components;
            // iterate through address_component array
            $.each(arrAddress, function (i, address_component) {
              if (address_component.types[0] == "locality") {
                console.log(address_component.long_name); // city
                $.mobile.loading( "hide" );
                $('#currentCityPosition').append("Ubicación : "+address_component.long_name);
                return false; // break
              }
            });
          } else {
            $.mobile.loading( "hide" );
            alert("No results found");

          }
        } else {
            $.mobile.loading( "hide" );
          alert("Geocoder failed due to: " + status);
        }
      });
    }

    function onGetCurrentPositionError(error) { 
      console.log("Couldn't get geo coords from device");
    }


$(document).ready(function(){

        var getusername = window.location.search;
        getusername = getusername.replace("?username=","");
        setTimeout(function() {
            if(getusername){
               $('#message').val("@"+getusername); 
            }
            
        }, 300);
        
});



