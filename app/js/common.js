$(document).ready(function(){
	// $("#circle").velocity({cx:200, cy:300})
	// .velocity("reverse");
	
/*	var widthSvg,  
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
	});*/
	var canvas;
	var canvasW;
	var canvasH;
	var gStep;
	var gridBox = [];

	$("#addSvg").click(function() {
		canvasW = Number($(".svg__width").val());
		canvasH = Number($(".svg__height").val());
		canvas  = SVG.canvas( canvasW , canvasH , 'container' );
		$("#container").height(canvasH);
	});

	$("#addGrid").click(function() {
		gStep = Number(document.getElementById("gridStep").value);
		for(var iStep = gStep; iStep < canvasW; iStep+=gStep){
			var line = SVG.line( iStep, 0, iStep , canvasH, "#ddd", 1 );
			line.style.shapeRendering = "crispEdges";
			gridBox.push(line);
			canvas.appendChild(line);
			
		}
		for(var iStep = gStep; iStep < canvasH; iStep+=gStep){
			var line = SVG.line( 0, iStep, canvasW, iStep, "#ddd", 1 );
			line.style.shapeRendering = "crispEdges";
			gridBox.push(line);
			canvas.appendChild(line);
		}
	});

	$("#remSvg").click(function() {
		canvas.parentNode.removeChild(canvas);
		gridBox = [];
	});
	$("#remGrid").click(function() {
		if(gridBox.length){
			for( var i=0; i<gridBox.length; i++){
				gridBox[i].parentNode.removeChild(gridBox[i]);
			}
			gridBox = [];
		}
	});
	$("#addCircle").click(function() {
		var x = Number(document.getElementById("circleX").value);
		var y = Number(document.getElementById("circleY").value);
		var rad = Number(document.getElementById("circleRad").value);
		var circle = SVG.circle( x, y, rad, "#369");
		canvas.appendChild(circle);
	});
	$("#addRect").click(function() {
		var x = Number(document.getElementById("rectX").value);
		var y = Number(document.getElementById("rectY").value);
		var w = Number(document.getElementById("rectW").value);
		var h = Number(document.getElementById("rectH").value);
		var rect = SVG.rectangle( x, y, w, h, "#369");
		canvas.appendChild(rect);
	});

	var SVG = {
		xmlns : 'http://www.w3.org/2000/svg',
		canvas : function( width, height, containerId ){
			var container = document.getElementById( containerId );
			var canvas = document.createElementNS(SVG.xmlns, 'svg');
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			canvas.setAttribute("version", "1.1");
			canvas.setAttribute("baseProfile", "full");
			container.appendChild( canvas );    
			return canvas;
		},
		line : function (x1, y1, x2, y2, color, w) {
			var aLine = document.createElementNS(SVG.xmlns, 'line');
			aLine.setAttribute('x1', x1);
			aLine.setAttribute('y1', y1);
			aLine.setAttribute('x2', x2);
			aLine.setAttribute('y2', y2);
			aLine.setAttribute('stroke', color);
			aLine.setAttribute('stroke-width', w);
			return aLine;
		},
		circle : function (x, y, r, fill){
			var aCircle = document.createElementNS(SVG.xmlns, 'circle');
			aCircle.setAttribute('cx', x);
			aCircle.setAttribute('cy', y);
			aCircle.setAttribute('r', r);
			aCircle.setAttribute('fill',fill);
			return aCircle;
		},
		rectangle : function (x, y, w, h, fill) {
			var aRect = document.createElementNS(SVG.xmlns, 'rect');
			aRect.setAttribute('x', x);
			aRect.setAttribute('y', y);
			aRect.setAttribute('width', w);
			aRect.setAttribute('height', h);
			aRect.setAttribute('fill',fill);
			return aRect;
		}
	}; //SVG end object

	var lines = [];
	lines.addLine = function( line ){
		this.push( line );
		return line;
	};

	function start() {
		var canvas = SVG.canvas( 1000 , 400 , 'container' ),
		lineElement, i, x1;

		for (i = 1; i < 11; i += 1) {
			x1 = Math.floor(Math.random() * 500 / 2),
			lineElement = lines.addLine( SVG.line(x1, 0, 200, 300, 'rgb(0,0,' + x1 + ')', i));
			canvas.appendChild( lineElement );
		}
	}




	function getPosition(e) {
		var posx = 0;
		var posy = 0;

		if (!e) var e = window.event;

		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) {
			posx = e.clientX + document.body.scrollLeft + 
			document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + 
			document.documentElement.scrollTop;
		}

		return {
			x: posx,
			y: posy
		};
	}
});
