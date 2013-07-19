$(document).bind('pageinit', function(){
	$.ajax({
		url: IPSERVIDOR +'/enjoylifewebservices/plans/getCurrentPlan.php?token=aa1c694bf88ef3a00ad53eb030fd528b',
		dataType:"jsonp",
        beforeSend: function() {
            // This callback function will trigger before data is sent
			$.mobile.loading( 'show', {
				text: "Cargando plan actual...",
				textVisible: true,
				theme: 'a',
				textonly: false,
				html: ''
			});
        },				
		success: function(data, status) {
			var newHtml="";
			$.each(data.response, function(i,item){ 
				newHtml = item;
			});
			$('#planActualDesc').append(newHtml);
		},
		error: function(){
			alert("There was an error loading the feed");
		},
		complete: function(){
			$.mobile.loading('hide');
		}		
	});
});