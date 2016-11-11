$(document).ready(function(){
	var getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};


	

var XX, YY;

if(getRandomInt(1,3)%3 === 3){
	XX = 100;
	YY = 0;
} else {
	XX = 0;
	YY = 100;
}


$(window).resize(function(){

});


$('.rel').hover(function(){

		$(this).children(".abs").each(function(){

		var rotate = getRandomInt(1,20);
		var transl = getRandomInt(1,20)*10 ;
		var translY = -30;
		var opacity = getRandomInt(0,1)%2;
		if($(this).hasClass("layer-6")){ 
			rotate=getRandomInt(1,90);
			translY = 0;
			$(this).css("opacity", ""+getRandomInt(0,1)%2);
		}
		var scale = getRandomInt(5,13)/10 + 0.5;
		var minus = 1;
		if(rotate%2){
			minus = -1;
		}
		if($(this).hasClass("layer-7")){ 
			rotate= 0;
			transl = 0;
			scale = 1;
			minus = 1;
			$(this).css("borderRadius","10px");
		}

		if(!($(this).hasClass("layer-7"))){
			$(this).css("backgroundColor", "rgba("+getRandomInt(XX,255)+","+getRandomInt(YY+XX,255)+","+getRandomInt(YY,255)+",.7)");
		}
		$(this).animate( {transform: "scaleY("+scale+") translate("+ transl +"px,"+translY+"px)  rotate("+minus*rotate+"deg)"}, 300,
			function(){ $(document).trigger('resize');});
	});

 

}, function(){});
});
















