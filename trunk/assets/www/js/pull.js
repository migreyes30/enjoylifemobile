var listSelector = "#publicationList .ui-listview",
		lastTimestamp = 0,
		myScroll,
		pullDownEl, pullDownOffset;
		
$(document).bind('pageinit', function(){
	
	$.mobile.loading( 'show', {
		text: "Cargando publicaciones...",
		textVisible: true,
		theme: 'a',
		textonly: true,
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

function replyUser(username){
	     $.mobile.changePage("registro.html", { data: { "usuario" : username  } });
}

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
		url: IPSERVIDOR + '/enjoylifewebservices/messages/getMessages.php?token=aa1c694bf88ef3a00ad53eb030fd528b&username=jgordon',
		dataType:"jsonp",
		success: function(d, status) {
			$('#publicationList').html("");
			if(d.response.length>0){
				$.each(d.response, function(i,item){ 
					
					newHtml+="<li style='background: url(stylesheets/images/greenbg.png) repeat-y #FFFFFF;' >";
					
					newHtml+="<h3>"+item.username+"</h3>";
					newHtml+="<p class='fechaDerecha'>"+item.date+"</p>";
					newHtml+="<p class='textoPublicacion'>"+item.message+" <a href='registro.html?username="+item.username+"' rel='external'> <img id='botonResponder' src='../img/icons/reply.png' style='float:right;width:35px;height:30px;'/> </a> </p>";
					newHtml+="</li>";
					lastTimestamp=item['_id']['$id'];	
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

