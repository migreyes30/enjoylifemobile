$(document).on('pagebeforeshow', '#registro', function(){
        $(document).on('click', '#submit', function(){ // catch the form's submit event
        if($('#message').val().length > 0){
            // Send data to server through ajax call
            // action is functionality we want to call and outputJSON is our data
                $.ajax({url: IPSERVIDOR + '/enjoylifewebservices/messages/setMessage.php',
                  data: {user: $('#user').val(), token: $('#token').val() ,mensaje : $('#message').val()}, // Convert a form to a JSON string representation
                        type: 'post',                   
                        async: true,
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete
                        $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
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
        } else {
            alert('Please fill all nececery fields');
        }           
            return false; // cancel original event to prevent form submitting
        });    
});