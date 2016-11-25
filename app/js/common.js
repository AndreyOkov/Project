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
	var objectBox = [];
	var elNumber = 0;
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
		var fillCol = "#963";
		var x = Number(document.getElementById("circleX").value);
		var y = Number(document.getElementById("circleY").value);
		var rad = Number(document.getElementById("circleRad").value);
		var circle = SVG.circle( x, y, rad, fillCol);
		objectBox.push({ obj: circle,
			name: "circle",
			fill: fillCol,
			r:  rad,
			id: circle.id, 
			X1: (x-rad),
			Y1: (y-rad),
			X2: (x+rad), 
			Y2: (y+rad)});

		canvas.appendChild(circle);
	});
	$("#addRect").click(function() {
		var fillCol = "#963";
		var x = Number(document.getElementById("rectX").value);
		var y = Number(document.getElementById("rectY").value);
		var w = Number(document.getElementById("rectW").value);
		var h = Number(document.getElementById("rectH").value);
		var rect = SVG.rectangle( x, y, w, h, fillCol);
		objectBox.push({ obj: rect,
			name: "rect",
			fill: fillCol,
			id: rect.id,
			X1: x,
			Y1: y,
			X2: (x+w), 
			Y2: (y+h)});
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
			aCircle.setAttribute('id', "circle" + elNumber);
			elNumber++;
			return aCircle;
		},
		rectangle : function (x, y, w, h, fill) {
			var aRect = document.createElementNS(SVG.xmlns, 'rect');
			aRect.setAttribute('x', x);
			aRect.setAttribute('y', y);
			aRect.setAttribute('width', w);
			aRect.setAttribute('height', h);
			aRect.setAttribute('fill',fill);
			aRect.setAttribute('id', "rect" + elNumber);
			return aRect;
		}
	}; //SVG end object

	var xNow;
	var yNow;
/*$(document).mousemove(function(e){
	if($("svg").length){
	var svgOffs = $("#container").offset();
	var svgLeft = svgOffs.left - $("#container").scrollLeft(); // позиция X холста SVG 
	var svgTop  = svgOffs.top  - $("#container").scrollTop(); // позиция Y холста SVG 
    var xNow = getPosition(e).x-svgLeft; // координата X внутри SVG
    var yNow = getPosition(e).y-svgTop; // координата Y внутри SVG
    //console.log("X: " + X + " Y: " + Y + " svgTop: " + svgTop + " svgLeft: " + svgLeft); // вывод результата в консоль
}*/
//}); 
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



// Функция возвращает координаты мыши относительно окна браузера
// ( т.е. относительно области которая в данный момент видна пользователю)
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
var xNow;
var yNow;
	/*$(document).click(function(e) {
		if($("svg").length){
		var svgOffs = $("#container").offset();
		var svgLeft = svgOffs.left - $("#container").scrollLeft(); // позиция X холста SVG 
		var svgTop  = svgOffs.top  - $("#container").scrollTop(); // позиция Y холста SVG 
	    var xNow = getPosition(e).x-svgLeft; // координата X внутри SVG
	    var yNow = getPosition(e).y-svgTop; // координата Y внутри SVG
	    console.log("X: " + xNow + " Y: " + yNow + " svgTop: " + svgTop + " svgLeft: " + svgLeft); // вывод результата в консоль
	}
	console.log(objectBox);
});*/
var curr=null;
var mousedown = false;
$("#container").mousedown(function(e) {
	
	var svgOffs = $("#container").offset();
		var svgLeft = svgOffs.left - $("#container").scrollLeft(); // позиция X холста SVG 
		var svgTop  = svgOffs.top  - $("#container").scrollTop(); // позиция Y холста SVG 
	    var xNow = getPosition(e).x-svgLeft; // координата X внутри SVG
	    var yNow = getPosition(e).y-svgTop;  // координата Y внутри SVG
	    // console.log("X: " + xNow + " Y: " + yNow); // вывод результата в консоль
	    if(curr !== null){curr.obj.setAttribute("stroke", "none");}
	    if(objectBox.length){
	    	for(var i=0; i< objectBox.length; i++){
	    		var box = objectBox[i];
	    		if(box.X1 <= xNow && xNow <= box.X2 && box.Y1 <= yNow && yNow <= box.Y2){
	    			mousedown = true;
	    			curr = box;
	    			curr.nowX  = xNow - curr.X1;
					curr.nowY  = yNow - curr.Y1;
	    			curr.obj.setAttribute("stroke", "red");
	    			break;
	    		} 
	    			
	    	}
	    }
	
	});
$("#container").mouseup(function(e){
	if(mousedown){
		mousedown = false;
		curr.obj.setAttribute("fill",curr.oldFill);
	}
});

$("#container").mousemove(function(e) {

	if(mousedown){
		var svgOffs = $("#container").offset();
		var svgLeft = svgOffs.left - $("#container").scrollLeft(); // позиция X холста SVG 
		var svgTop  = svgOffs.top  - $("#container").scrollTop(); // позиция Y холста SVG 
	    var xNow = getPosition(e).x-svgLeft; // координата мыши X внутри SVG
	    var yNow = getPosition(e).y-svgTop;  // координата мыши Y внутри SVG


	    var w = curr.X2-curr.X1;
	    var h = curr.Y2-curr.Y1;

	    if(curr.name === "circle"){
	    	curr.obj.setAttribute("cx", xNow+curr.r-curr.nowX);
	    	curr.obj.setAttribute("cy", yNow+curr.r-curr.nowY);
	    	curr.X1 = xNow-curr.nowX;
	    	curr.X2 = curr.X1+w;
	    	curr.Y1 = yNow-curr.nowY;
	    	curr.Y2 = curr.Y1+h;
	    } else if(curr.name === "rect"){
	    	curr.obj.setAttribute("x",xNow-curr.nowX);
	    	curr.obj.setAttribute("y",yNow-curr.nowY);
	    	curr.X1 = xNow-curr.nowX;
	    	curr.X2 = curr.X1+w;
	    	curr.Y1 = yNow-curr.nowY;
	    	curr.Y2 = curr.Y1+h;
	    }
	}
});
});
