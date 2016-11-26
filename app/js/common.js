$(document).ready(function(){
	var svgPos = updateSvgPosition("#container");
		//вспомогательная функция которая получает текущую позицию холста
		function updateSvgPosition(container) {
			var svgOffs = $( container ).offset();
			return {
			left : svgOffs.left - $( container ).scrollLeft(),    // позиция X холста SVG 
			top :  svgOffs.top  -  $( container ).scrollTop()};   // позиция Y холста SVG 
		}
		//вспомогательная функция которая получает текущие координаты мыши внутри холста
		function mouseXY(svgLeft , svgTop, e) {
			return {
			x : getPosition(e).x-svgLeft,     // координата мыши X внутри SVG
			y : getPosition(e).y-svgTop};     // координата мыши Y внутри SVG
		}

	// функция возвращает объект переданного массива, на который наведена мышь
	function overObject(mouseX, mouseY, array) {
		var find = false;
		var box;
		if(array.length){
			for(var i=0; i < array.length; i++){
				box = array[i];
				if(box.X1 <= mouseX && mouseX <= box.X2 && box.Y1 <= mouseY && mouseY <= box.Y2){
					find = true; 
					break;
				}
			}
		}
		return find ? box : null;
	}

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
		objectBox = [];
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
		var fillCol = "#FF8E1D";
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
		var fillCol = "#F73DC9";
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
	// $("#addLine").click(function() {
	// 	var fillCol = "#963";
	// 	var x = Number(document.getElementById("rectX").value);
	// 	var y = Number(document.getElementById("rectY").value);
	// 	var w = Number(document.getElementById("rectW").value);
	// 	var h = Number(document.getElementById("rectH").value);
	// 	var rect = SVG.rectangle( x, y, w, h, fillCol);
	// 	objectBox.push({ obj: rect,
	// 		name: "rect",
	// 		fill: fillCol,
	// 		id: rect.id,
	// 		X1: x,
	// 		Y1: y,
	// 		X2: (x+w), 
	// 		Y2: (y+h)});
	// 	canvas.appendChild(rect);
	// });
	var SVG = {
		xmlns : 'http://www.w3.org/2000/svg',
		canvas : function( width, height, containerId ){
			var container = document.getElementById( containerId );
			var canvas = document.createElementNS(SVG.xmlns, 'svg');
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			canvas.setAttribute("version", "1.1");
			canvas.setAttribute("baseProfile", "full");
			canvas.setAttribute("id", "mainCanvas");
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
	var mouse = mouseXY(svgPos.left, svgPos.top, e);
	if( curr !== null ){ curr.obj.setAttribute("stroke", "none"); }
	var obj = overObject(mouse.x, mouse.y, objectBox);
	console.log(obj);
	if(obj){
		mousedown = true;
		

		curr = obj;
		curr.nowX  = mouse.x - curr.X1;
		curr.nowY  = mouse.y - curr.Y1;
		curr.obj.setAttribute("stroke", "red");
	}
});

var events;


$("#container").mouseup(function(e){
	if(mousedown){
		mousedown = false;
	}
});

$("#container").mousemove(function(e) {
	var mouse = mouseXY(svgPos.left, svgPos.top, e);
	var obj = overObject(mouse.x, mouse.y, objectBox);
	if(obj){
		console.log(obj);
	}
	if(mousedown){
		var w = curr.X2-curr.X1;
		var h = curr.Y2-curr.Y1;
		if(curr.name === "circle"){
			curr.obj.setAttribute("cx", mouse.x+curr.r-curr.nowX);
			curr.obj.setAttribute("cy", mouse.y+curr.r-curr.nowY);
			curr.X1 = mouse.x-curr.nowX;
			curr.X2 = curr.X1+w;
			curr.Y1 = mouse.y-curr.nowY;
			curr.Y2 = curr.Y1+h;
		} else if(curr.name === "rect"){
			curr.obj.setAttribute("x",mouse.x-curr.nowX);
			curr.obj.setAttribute("y",mouse.y-curr.nowY);
			curr.X1 = mouse.x-curr.nowX;
			curr.X2 = curr.X1+w;
			curr.Y1 = mouse.y-curr.nowY;
			curr.Y2 = curr.Y1+h;
		}
	}
});

$("#move").click(function() {
	var moveX = Number(document.getElementById("moveX").value);
	var moveY = Number(document.getElementById("moveY").value);
	$("#"+curr.id).velocity({x:moveX,y:moveY});
	var w = curr.X2-curr.X1;
	var h = curr.Y2-curr.Y1;
	curr.X1 = moveX;
	curr.X2 = curr.X1+w;
	curr.Y1 = moveY;
	curr.Y2 = curr.Y1+h;
});

$("#container").mouseover(function(e) {
	// var mouse  = mouseXY(svgPos.left, svgPos.top, e);
	// var obj = overObject(mouse.x, mouse.y, e);
	// if(obj){
	// 	console.log("object");
	// }
});
});
