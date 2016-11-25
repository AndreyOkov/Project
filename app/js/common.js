$(document).ready(function(){
	// $("#circle").velocity({cx:200, cy:300})
	// .velocity("reverse");
	
	var widthSvg,  
	heightSvg, 
	paper;
	var gridArr = [];
	var paperStartX = 20;
	var paperStartY = 100;
	$(".addSVG").click(function() {
		widthSvg  = Number($(".svg__width").val());
		heightSvg = Number($(".svg__height").val());
		paper = Raphael(paperStartX,paperStartY,widthSvg,heightSvg);
		paper.rect(0,0,widthSvg,heightSvg);
	});
	


	$(".addGrid").click(function() {
		var gridStep = Number($("#gridStep").val());
	var step = gridStep;
		for(var i = 0; i < 300; i++){
			paper.path("M"+step+" 0.5L"+step+" "+(heightSvg-1.5)).attr({stroke: "#ccc", "stroke-width" : "1"}).translate(0.5, 0.5);
			paper.path("M0.5 "+step+"L"+(widthSvg-1.5)+" "+step).attr({stroke: "#ccc", "stroke-width" : "1"}).translate(0.5, 0.5);
			step+=gridStep;
		}
	});
	$("#svgRemove").click(function() {
		paper.remove();
	});
	$("#addCircle").click(function() {
		var rad = Number($("#circleRad").val());
		var x = Number($("#circleX").val()) ;
		var y = Number($("#circleY").val()) ;
		paper.circle( x, y, rad ).attr({fill:"red", stroke : "none"});
	});

	$(document).click(function(e) {
		var x = getPosition(e).x- paperStartX;
		var y = getPosition(e).y- paperStartY;
		console.log(x+"   " + y);
	});




	function getPosition(e) {
  var posx = 0;
  var posy = 0;

  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  }
}
});
