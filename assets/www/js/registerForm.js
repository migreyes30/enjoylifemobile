$(document).ready(function(){

	
	$("#submit").click(function() {

		//Validitor function for Form
		$(this).validateForm();
		//Apply the rules to field once is submitted
		if ($("#registerFormData").valid()) {
	
			// Send data to server through ajax call
			var frm = $("#registerFormData");
 			JSON.stringify(frm.serializeArray());//($("#registerFormData"))



		}

	});


	//Validitor function for Form
	jQuery.fn.submitregistrationForm = function() {
         // action is functionality we want to call and outputJSON is our data
        $.ajax({url: IPSERVIDOR + SERVICES+'/clients/clientRegistration.php',
          	data: {
          		// Convert a form to a JSON string representation
          		token: $('#token').val(),
          		usuario: $('#usuario').val(),
          		nombre: $('#nombre').val(),
          		password: $('#password').val(),
          		peso: $('#peso').val(),
          		talla: $('#talla').val()
          		}, 
            type: 'post',                   
            async: true,
            beforeSend: function() {
                // This callback function will trigger before data is sent
                    $.mobile.loading( "show", {
                        text: "Sending message",
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
	            	required: true,
	      			email: true
	           	},
	           	nombre: {
	            	required: true
	           	},
	           	password: {
	            	required: true,
	            	minlength: 8
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
	            	required : "Campo requerido",
	            	email : "Email no valido"
	            },
	           	nombre: {
	            	required : "Campo requerido"
	           	},
	           	password: {
	            	required : "Campo requerido",
	            	minlength : "Al menos 8 catacteres"
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

