$(document).bind('pageinit', function(){

	var myScroll;
	var pullDownEl;
	var pullDownOffset;
	
	$.mobile.loading( 'show', {
		text: "Cargando publicaciones...",
		textVisible: true,
		theme: 'a',
		textonly: false,
		html: ''
	});

	$("#wrapper").css("margin-top", "0px").show();

		if(myScroll){
			myScroll.destroy();
			myScroll=null;
		}


		loaded();
		
		gotPullDownData();	
	
});

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		hideScrollbar : false,
		hScroll : false,
		momentum : true,
		bounce : true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Arrastra para actualizar';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Suelta para actualizar';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Arrastra para actualizar';
				this.minScrollY = -pullDownOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Cargando...';				
				onPullDown();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}
function onPullDown () { 
	setTimeout(function fakeRetrieveDataTimeout() {
      gotPullDownData();
      }, 
      1500); 
} 
function gotPullDownData() {
	var newHtml="";
	
	$.ajax({
		url: IPSERVIDOR + '/enjoylifewebservices/messages/getMessagesSent.php?token=aa1c694bf88ef3a00ad53eb030fd528b&username=jegordon',
		dataType:"jsonp",
        beforeSend: function() {
            // This callback function will trigger before data is sent
			$.mobile.loading( 'show', {
				text: "Cargando publicaciones...",
				textVisible: true,
				theme: 'a',
				textonly: false,
				html: ''
			});
        },			
		success: function(d, status) {
			$('#publicationList').html("");
			if(d.response.length>0){
				$.each(d.response, function(i,item){ 
					
					newHtml+="<li style='background: url(stylesheets/images/greenbg.png) repeat-y #FFFFFF;' >";
					
					newHtml+="<h3>"+item.username+"</h3>";
					newHtml+="<p class='fechaDerecha'>"+item.date+"</p>";
					newHtml+="<p class='textoPublicacion'>"+item.message+"</p>";
					newHtml+="</li>";
				});
			}
			else{
				newHtml+="<li style='border-top:1px solid #FFFFFF; text-align:center !important;'><p><span class='no-more-publications'>No hay m&aacute;s publicaciones</span></p></li>";
			}
		},
		error: function(){
			newHtml="";
			alert("There was an error loading the feed");
		},
		complete: function(){
			$('#publicationList').append(newHtml);
			$.mobile.loading('hide');
			myScroll.refresh(); // Refresh the iscrollview
		}
	});    
}

