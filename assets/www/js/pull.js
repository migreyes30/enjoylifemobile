var listSelector = "#publicationList .ui-listview",
		lastItemSelector = listSelector + " > li:last-child",
		lastTimestamp = 0,
		keyword="",
		feeling="",
		wbIP="http://192.168.1.14",
		myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset;
		
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

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
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
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Arrastra para cargar m&aacute;s';
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
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Suelta para cargar m&aacute;s';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Arrastra para cargar m&aacute;s';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Cargando...';				
				onPullDown();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Cargando...';				
				onPullUp();	// Execute custom function (ajax call?)
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

function onPullUp () { 
    setTimeout(function fakeRetrieveDataTimeout() {
      gotPullUpData();
      }, 
      1500); 
}
function gotPullDownData() {
	var newHtml="";
	
	$.ajax({
		url: wbIP + '/enjoylifewebservices/messages/getMessages.php?token=aa1c694bf88ef3a00ad53eb030fd528b&username=jgordon',
		dataType:"jsonp",
		success: function(d, status) {
			$('#publicationList').html("");
			if(d.response.length>0){
				$.each(d.response, function(i,item){ 
					
					newHtml+="<li style='background: url(stylesheets/images/greenbg.png) repeat-y #FFFFFF;' >";
					
					newHtml+="<h3>"+item.username+"</h3>";
					newHtml+="<p class='fechaDerecha'>"+item.date+"</p>";
					newHtml+="<p class='textoPublicacion'>"+item.message+"</p>";
					
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
  
function gotPullUpData() {
	var newHtml="";
	
	$.ajax({
		url: wbIP + '/enjoylifewebservices/messages/getMessages.php?token=aa1c694bf88ef3a00ad53eb030fd528b&username=jgordon',
		dataType:"jsonp",
		success: function(d, status) {
			if(d.response.length>0){
				if($("#publicationList > li:last-child span.no-more-publications").length>0){
					$('#publicationList > li:last-child').remove();
				}
				$.each(d.response, function(i,item){ 
					
					newHtml+="<li style='background: url(stylesheets/images/greenbg.png) repeat-y #FFFFFF;' >";
					
					newHtml+="<h3>"+item.user+"</h3>";
					newHtml+="<p class='fechaDerecha'>"+item.date+"</p>";
					newHtml+="<p class='textoPublicacion'>"+item.message+"</p>";
					
					newHtml+="</li>";
					lastTimestamp=item['_id']['$id'];
										
				});	
				
			}
			else{
				if($("#publicationList > li:last-child span.no-more-publications").length==0){
					newHtml+="<li style='border-top:1px solid #FFFFFF; text-align:center !important;'><p><span class='no-more-publications'>No hay m&aacute;s publicaciones</span></p></li>";
				}
			}
		},
		error: function(){
			alert("There was an error loading the feed");
		},
		complete: function(){
			$('#publicationList').append(newHtml);
			$.mobile.loading('hide');
			
			myScroll.refresh(); 
		}
	});
}
  

