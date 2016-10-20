$(document).ready(function(){
	var i = 0;
	$('button').click(function(){
		
		// $(".if .words").fadeOut(100); 
		$('.words').remove();

		$(".if").append("<p class='words' style='transform: translateY(60px)'> "+ (i++) +" </p>");
		$(".words").css("transform", "translateY(0px)");
		// $(".if .words").fadeIn(1000); 


	});

});