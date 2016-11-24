$(document).ready(function(){
	$("#circle").velocity({cx:200, cy:300})
	.velocity("reverse");
	
	var widthSvg,  
	heightSvg, 
	paper ;
	

	$(".addSVG").click(function() {
		widthSvg  = $(".svg__width").val();
		heightSvg = $(".svg__height").val();
		paper = Raphael(10,50,widthSvg,heightSvg);
		paper.rect(0,0,widthSvg,heightSvg);

	});
	$(".addGrid").click(function() {


		var step = 20;
		for(var i = 0; i < 300; i++){
			paper.path("M"+step+" 0.5L"+step+" "+(heightSvg-1.5)).attr({stroke: "#ccc", "stroke-width" : "1"}).translate(0.5, 0.5);
			paper.path("M0.5 "+step+"L"+(widthSvg-1.5)+" "+step).attr({stroke: "#ccc", "stroke-width" : "1"}).translate(0.5, 0.5);

			step+=20;
		}

	});

});
