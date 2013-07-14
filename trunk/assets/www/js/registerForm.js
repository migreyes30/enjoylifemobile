$(document).ready(function(){

	
	$("#submit").click(function() {

		//Validitor function for Form
		$(this).validateForm();
		//Apply the rules to field once is submitted
		if ($("#registerFormData").valid()) {
	
			// Send data to server through ajax call
			$(this).submitRegistrationForm();

		}

	});


	//Validitor function for Form
	jQuery.fn.submitRegistrationForm = function() {

		var frm = $("#registerFormData");
	
		/*
			{
          		token:$('#token').val(),
          		usuario:$('#usuario').val(),
          		nombre:$('#nombre').val(),
          		password:$('#password').val(),
          		email:$('#email').val(),
          		peso:$('#peso').val(),
          		talla:$('#talla').val()
          	}

		*/

        // action is functionality we want to call and outputJSON is our data
        $.ajax({url: IPSERVIDOR + SERVICES+'/clients/clientRegistration.php',
          	data: JSON.stringify(frm.serializeArray()), 
            type: 'post',                   
            async: true,
            beforeSend: function() {
                // This callback function will trigger before data is sent
                    $.mobile.loading( "show", {
                        text: "Registrando Usuario " + $("#usuario").val(),
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
                alert("Usuario Registrado");
                window.location.href="planActual.html";
            },
            error: function (request,error) {
                // This callback function will trigger on unsuccessful action                
                alert('Network error has occurred please try again!');
            }
        });  
	}

	//Validitor function for Form
	jQuery.fn.validateForm = function() {
	    
		//Validotor Rules for Registration Form
		$("#registerFormData").validate({
	      	rules: {
	        	usuario: {
	            	required: true
	           	},
	           	nombre: {
	            	required: true
	           	},
	           	password: {
	            	required: true,
	            	minlength: 8
	           	},
	           	email: {
	            	required: true,
	      			email: true
	           	},
	           	peso: {
	            	required: true,
	            	number: true
	           	},
	           	talla: {
	            	required: true,
	            	number: true
	           	}

	        },
	        //Validotor Messages for Registration Form
	        messages: {
	            usuario: {
	            	required : "Campo requerido"
	            },
	           	nombre: {
	            	required : "Campo requerido"
	           	},
	           	password: {
	            	required : "Campo requerido",
	            	minlength : "Al menos 8 catacteres"
	           	},
	           	email: {
	            	required : "Campo requerido",
	            	email : "Email no valido"
	            },
	           	peso: {
	            	number: "Peso invalido, solamente numeros",
	            	required : "Campo requerido"
	           	},
	           	talla: {
	            	required : "Campo requerido",
	            	number : "Talla invalido, solamente numeros"
	           	}
	        }
     	});
	};
        
});

