$(document).ready(function(){

	$("#submit").click(function() {

		//Validitor function for Form
		$(this).validateForm();
		//Apply the rules to field once is submitted
		if ($("#LoginFormData").valid()) {
	
			// Send data to server through ajax call
			$(this).submitLoginForm();

		}

	});


	//Validitor function for Form
	jQuery.fn.submitLoginForm = function() {

		var frm = $("#LoginFormData");
		$("#userMsg").html("");

        // action is functionality we want to call and outputJSON is our data
        $.ajax({

        		url: IPSERVIDOR + SERVICES+'/clients/clientLogin.php',
          		data: 
	          		{
	          		token:$('#token').val(),
	          		usuario:$('#usuario').val(),
	          		password:$('#password').val(),
	          		},
          		dataType: "json", 
            	type: 'post',                   
            	async: true,
            	beforeSend: function() {
                	// This callback function will trigger before data is sent
	                    $.mobile.loading( "show", {
	                        text: "Iniciando con Usuario " + $("#usuario").val(),
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

		            	if(result.logged){

		            		//$.mobile.loadPage('planActual.html')
		            		//$.mobile.changePage('#planActual')
		            		window.location.href=planActual.html";	

		            	}else{

		            		$(this).wrongInfo(result.message);
		            	}
            		},
            	error: function (request,error) {
		                // This callback function will trigger on unsuccessful action
						console.log(error);
		                alert('Un Error en la conexión ocurrio, Intente de nuevo!!');
            		}
        });  
	}

	jQuery.fn.wrongInfo = function(message) {

		$("#usuario").html("");
		$("#password").html("");
		
		$("#userMsg").html(message);

	}
	//Validitor function for Form
	jQuery.fn.validateForm = function() {
	    
		//Validotor Rules for Registration Form
		$("#LoginFormData").validate({
	      	rules: {
	        	usuario: {
	            	required: true
	           	},
	           	password: {
	            	required: true
	           	}
	        },
	        //Validotor Messages for Registration Form
	        messages: {
	            usuario: {
	            	required : "Campo requerido"
	            },
	           	password: {
	            	required : "Campo requerido"
	           	}
	        }
     	});
	};
        
});

