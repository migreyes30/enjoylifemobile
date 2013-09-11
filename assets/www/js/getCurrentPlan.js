$(document).bind('pageinit', function(){

    $('#botonInicioPlan').click(function(){
        setStartPlan();
    });

    cargarPlanActual();

});

function cargarPlanActual(){

	var userSession = localStorage.getItem('userDB');

	$.ajax({
		url: IPSERVIDOR +'/enjoylifewebservices/plans/getCurrentPlan.php?token=' + TOKEN_ID + '&usuario=' +userSession,
		dataType:"jsonp",
        beforeSend: function() {
            // This callback function will trigger before data is sent
            $.mobile.loading( "show", {
                text: "Cargando plan actual",
                textVisible: true,
                theme: $.mobile.loader.prototype.options.theme,
                textonly: false,
                html: ""
            });
        },			
		success: function(data, status) {
			var newHtml="";
			$.each(data.response, function(i,item){ 
				newHtml = item;
			});
			if(newHtml == 'noPlan'){
				$('#botonIniciaPlan').css('visibility','visible');
			}else{
				$('#planActualDesc').append(newHtml);
				$('#botonIniciaPlan').css('visibility','hidden');
			}
			
		},
		error: function(){
			alert("Error de conexión con el servidor, prueba más tarde");
		},
		complete: function(){
			$.mobile.loading('hide');
		}		
	});

}

function setStartPlan(){
	$.ajax({
		url: IPSERVIDOR +'/enjoylifewebservices/plans/startPlanProgram.php?token=' + TOKEN_ID + '&usuario=' +USUARIO,
		dataType:"jsonp",
        beforeSend: function() {
            // This callback function will trigger before data is sent
            $.mobile.loading( "show", {
                text: "Iniciando programa",
                textVisible: true,
                theme: $.mobile.loader.prototype.options.theme,
                textonly: false,
                html: ""
            });
        },			
		success: function(data, status) {
		navigator.notification.alert(
		    'Acabas de empezar con el programa Enjoy Health!',  // message
		    alertDismissed,         // callback
		    'Inicio Plan',            // title
		    'Done'                  // buttonName
		);			
			cargarPlanActual();
			
		},
		error: function(){
			alert("Error de conexión con el servidor, prueba más tarde");
		},
		complete: function(){
			$.mobile.loading('hide');
		}		
	});	
}

function alertDismissed() {
    // do something
}