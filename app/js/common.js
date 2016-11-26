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
		function mouseXY(e) {
			return {
			x : getPosition(e).x-svgPos.left,     // координата мыши X внутри SVG
			y : getPosition(e).y-svgPos.top};     // координата мыши Y внутри SVG
		}
		//вспомогательная функция ищет центр объекта
		function center(o) {
			return o ? {
				x : o.X1 + (o.X2 - o.X1)/2,
				y : o.Y1 + (o.Y2 - o.Y1)/2} : null ;
			}
	// функция возвращает объект переданного массива, на который наведена мышь
	function overObject(e, array) {
		var mouse = mouseXY(e);
		var find = false;
		var box;
		if(array.length){
			for(var i=0; i < array.length; i++){
				box = array[i];
				if(box.X1 <= mouse.x && mouse.x <= box.X2 && box.Y1 <= mouse.y && mouse.y <= box.Y2){
					find = true; 
					break;
				}
			}
		}
		return find ? box : null;
	}
	function createCircle(x, y, rad, fillCol, nameC) {

		var circle = SVG.circle( x, y, rad, fillCol);
		objectBox.push({ obj: circle,
			control: [],
			name: nameC,
			fill: fillCol,
			r:  rad,
			id: circle.id, 
			X1: (x-rad),
			Y1: (y-rad),
			X2: (x+rad), 
			Y2: (y+rad) });
		canvas.appendChild(circle);
		return objectBox[objectBox.length - 1];
	}
	function createRect( x, y, w, h, fillCol) {
		var rect = SVG.rectangle( x, y, w, h, fillCol);
		objectBox.push({ obj: rect,
			name: "rect",
			control: [],
			fill: fillCol,
			id: rect.id,
			X1: x,
			Y1: y,
			X2: (x+w), 
			Y2: (y+h)});
		canvas.appendChild(rect);
		return objectBox[objectBox.length - 1];
	}
	function createLine(x1, y1, x2, y2, fillCol) {
		var line = SVG.line( x1, y1, x2, y2, fillCol);
		objectBox.push({ 
			obj: line,
			name: "line",
			fill: fillCol,
			id: line.id,
			X1: x1,
			Y1: y1,
			X2: x2, 
			Y2: y2});
		canvas.appendChild(line);
		return objectBox[objectBox.length - 1];
	}
	var canvas;
	var canvasW;
	var canvasH;
	var gStep;
	var gridBox = [];
	var objectBox = [];
	var objectControls = []; 
	var elNumber = 0;

	function createCanvas() {
		canvasW = Number($(".svg__width").val());
		canvasH = Number($(".svg__height").val());
		canvas  = SVG.canvas( canvasW , canvasH , 'container' );
		$("#container").height(canvasH); 
	}
	$("#addSvg").click(function() {
		createCanvas();
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
		createCircle(x, y, rad, fillCol, "circle");
	});

	$("#addRect").click(function() {
		var fillCol = "#1B191B";
		var x = Number(document.getElementById("rectX").value);
		var y = Number(document.getElementById("rectY").value);
		var w = Number(document.getElementById("rectW").value);
		var h = Number(document.getElementById("rectH").value);
		createRect( x, y, w, h, fillCol);
	});
	
	$("#addLine").click(function() {
		// var fillCol = "#963";
		// var x = Number(document.getElementById("rectX").value);
		// var y = Number(document.getElementById("rectY").value);
		// var w = Number(document.getElementById("rectW").value);
		// var h = Number(document.getElementById("rectH").value);
		
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
			canvas.setAttribute("id", "mainCanvas");
			container.appendChild( canvas );    
			return canvas;
		},
		line : function (x1, y1, x2, y2, color, w) {
			var l = document.createElementNS(SVG.xmlns, 'line');
			l.setAttribute('x1', x1);
			l.setAttribute('y1', y1);
			l.setAttribute('x2', x2);
			l.setAttribute('y2', y2);
			l.setAttribute('stroke', color);
			l.setAttribute('stroke-width', w);
			l.setAttribute('id', "line" + elNumber);
			elNumber++;
			return l;
		},
		circle : function (x, y, r, fill){
			var c = document.createElementNS(SVG.xmlns, 'circle');
			c.setAttribute('cx', x);
			c.setAttribute('cy', y);
			c.setAttribute('r', r);
			c.setAttribute('fill',fill);
			c.setAttribute('id', "circle" + elNumber);
			elNumber++;
			return c;
		},
		rectangle : function (x, y, w, h, fill) {
			var r = document.createElementNS(SVG.xmlns, 'rect');
			r.setAttribute('x', x);
			r.setAttribute('y', y);
			r.setAttribute('width', w);
			r.setAttribute('height', h);
			r.setAttribute('fill',fill);
			r.setAttribute('id', "rect" + elNumber);
			elNumber++;
			return r;
		}
	}; //SVG end object


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

//////////////////////////////////////////////////////////////

// function bound(obj) {
// 	var halfW = (obj.X2-obj.X1)/2;
// 	var halfH = (obj.Y2-obj.Y1)/2;
// 	var line = SVG.line(obj.X1 +halfW, obj.Y1+halfH, obj.X2+10, obj.Y1+halfH, "#222", 1);
// 	canvas.appendChild(line);
// 	var circle = SVG.circle(obj.X2 + 10, obj.Y1+ halfH, 3, "#444");
// 	canvas.appendChild(circle);
// 	obj.control.push({X1: obj.X1 + halfW - 1, Y1: obj.Y1 + halfH - 1, X2: obj.X1 + halfW + 1, Y2: obj.Y1+ halfH+1});

// 	var circle = SVG.circle(obj.X1 + halfW, obj.Y1+ halfH, 3, "#444");
// 	canvas.appendChild(circle);

// }
function showControls(obj) {
	// $("#" + curr.id).remove();
	

}

var curr=null;
var mousedown = false;
var control = true;
var buildPath = true;
var currCtrl = null;
var buildLast = null;

$("#container").dblclick(function(e) {
	if( curr && buildPath ){
		if(buildLast === null ){
			buildLast = curr;
		}
		var mouse = mouseXY(e);
		var ob = createCircle(mouse.x, mouse.y, 3, "#99ED9D", "ctrl");
		curr.control.push(ob);
		var ln = createLine(center(buildLast).x, center(buildLast).y, mouse.x, mouse.y, "#000");
		curr.control.push(ln);
		if( buildLast ){
			buildLast.next = ln;
		}
		buildLast = ob;
		ob.prev = ln;
	}
});

$("#container").mousedown(function(e) {// ****   MOUSE DOWN   *******//
		mousedown = true;				 // ставим флаг нажатия левой кнопки мыши для других обработчиков
		var mouse = mouseXY(e);
	var obj = overObject(e, objectBox);  // ищем объект под курсором
	if( obj ){							 // если нашли 
		curr = obj;						 // назначаем текущим объектом найденный
		curr.nowX  = mouse.x - curr.X1;  // получаем координаты внутри по отношению
		curr.nowY  = mouse.y - curr.Y1;	 // к сторонам объекта
		curr.obj.setAttribute("stroke", "red"); // выдиляем рамкой
		if( control ){
			showControls(curr);
		}
	}
});

var events;


$("#container").mouseup(function(e){
	if(mousedown){
		mousedown = false;
		if( curr ){
		curr.obj.setAttribute("stroke", "none"); // отпустили мышь - сбрасываем выделение рамкой
	}
}

	//console.log("centerX: " + center(curr).x + "   centerY: "+ center(curr).y);
});

$("#container").mousemove(function(e) {
	var mouse = mouseXY(e);

	if( mousedown ){
		var w = curr.X2-curr.X1;
		var h = curr.Y2-curr.Y1;
		if(curr.name === "circle" || curr.name === "ctrl"){
			curr.obj.setAttribute("cx", mouse.x + curr.r - curr.nowX);
			curr.obj.setAttribute("cy", mouse.y + curr.r - curr.nowY);
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
		if( curr.prev ){
			console.log(curr.prev);
			curr.prev.obj.setAttribute("x2", center(curr).x);
			curr.prev.obj.setAttribute("y2", center(curr).y);
		}
		if( curr.next ){
			console.log(curr.next);
			curr.next.obj.setAttribute("x1", center(curr).x);
			curr.next.obj.setAttribute("y1", center(curr).y);
		}
	}
});

$("#move").click(function() {
	// var moveX = Number(document.getElementById("moveX").value);
	// var moveY = Number(document.getElementById("moveY").value);
	// $(curr.id).velocity({x:moveX,y:moveY});
	// var w = curr.X2-curr.X1;
	// var h = curr.Y2-curr.Y1;
	// curr.X1 = moveX;
	// curr.X2 = curr.X1+w;
	// curr.Y1 = moveY;
	// curr.Y2 = curr.Y1+h;
});

$("#container").mouseover(function(e) {
	// var mouse  = mouseXY(e);
	// var obj = overObject(mouse.x, mouse.y, e);
	// if(obj){
	// 	console.log("object");
	// }
});

if(!document.getElementById("mainCanvas")){
	
}

createCanvas();
});
