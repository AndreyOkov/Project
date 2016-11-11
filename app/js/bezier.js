// function arrows(id1,id2){

// 	this.parent = $(id1);

// 	var ofs1 = this.parent.offset(),
// 	ofs2 = $(id2).offset();

// 	this.xL = ofs2.left - ofs1.left;
// 	this.yL = ofs2.top  - ofs1.top;

// 	if(this.yL<this.xL){
// 		this.step = 0.03;
// 	}	else {
// 		this.step = 0.005;
// 	}
// 	this.dx  = 1/this.step;
// 	this.arrayP = null;
// 	this.lastX = null;
// 	this.lastY = 0;
// 	var self = this;    
// }

// arrows.prototype.createPath = function(){

// 	var getRandomInt = function (min, max) {
// 		return Math.floor(Math.random() * (max - min + 1)) + min;
// 	};
// 	var r1 = this.xL*getRandomInt(0, 10)/100,
// 	r2 = getRandomInt(20,(this.yL*3)),
// 	r3 = this.xL*getRandomInt(80,90)/100,
// 	r4 = getRandomInt(20,this.yL*5);

// 	this.arrayP =[[0,0],[r1, r2],[r3, -r4],[this.xL, this.yL]] ;


// 	var bezier = arrows.prototype.getBezierCurve(this.arrayP,this.step);
// 	arrows.prototype.drawLines(bezier, this.parent);

// };

// arrows.prototype.delPath = function(){

// };

// arrows.prototype.drawLines = function (arr, $parent) {
// 	var n = 1;
// 	console.log();
// 	for(var i = 1; i<arr.length-1; i++){
// 		var elem ='<div class="dot" style = "left: ' + arr[i][0]+'px; top: ' + arr[i][1]+'px"> </div>'; 
// 		$parent.append(elem);

// 	}

// };
// /*=======================  ПОСТРОЕНИЕ БЕЗЬЕ =====================*/
// arrows.prototype.getBezierCurve = function (arr, step) {
	
// 	var res = [];

// 	for (var t = 0; t < 1 + step; t += step) {
// 		if (t > 1) {
// 			t = 1;
// 		}

// 		var ind = res.length;
// 		var k = 0;
// 		res[ind] = new Array(0, 0);
// 		var stepInc = 0.001;
// 		var z = 0;
// 		addPoint(t);


// 	}
// 	return res;
// 	/*===================== ADD POINT =======================*/
// 	function addPoint(t){
// 		var temp = t;
// 		var pxSize = 3; 
// 		var gepot;
// 		do{
// 			for (var i = 0; i < arr.length; i++) { 
// 				var b = getBezierBasis(i, arr.length - 1, temp);

// 				res[ind][0] += arr[i][0] * b;
// 				res[ind][1] += arr[i][1] * b; 
// 			}
// 			 if(ind!==0){
// 				var dx = Math.abs(res[ind][0]-res[ind-1][0]);
// 				var dy = Math.abs(res[ind][1]-res[ind-1][1]);
// 				gepot = Math.sqrt(Math.pow(Math.abs(dy),2) + Math.pow(Math.abs(dx),2));
// 				console.log("гепотинуза: " +gepot);
// 				console.log("ind: " + ind);

// 				console.log("DX: "+ Math.abs(dx));
// 				console.log("DY: "+ Math.abs(dy));	
// 				console.log("res_ind_0: "+res[ind][0]+ "\n" +"res_ind_1: "+res[ind][1]);
// 				console.log("res_ind-1_0: "+res[ind-1][0]+ "\n" +"res_ind-1_1: "+res[ind-1][1]);
// 				console.log("-----------------------");
// 				res[ind][1] =stepInc;
// 				res[ind][0] =stepInc;
// 				temp-=stepInc;
// 				z++;

// 			 }
// 		}while(gepot > pxSize+1 && z<5);
// 	}



// 	function getBezierBasis(i, n, t) {
// 	// Факториал
// 	function f(n) {
// 		return (n <= 1) ? 1 : n * f(n - 1);
// 	}
// 	// считаем i-й элемент полинома Берштейна
// 	return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
// }
// };
// // arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1])
// // step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
// $(document).ready(function(){
	

	
// 	var bez = new arrows("#node1","#node2");
// 	bez.createPath();
// });



$(document).ready(function(){
	function arrows(id1,id2,space){
		if(!space){ this.space = 10; } else { this.space = space; }
		this.parent = $(id1);
		this.child =  $(id2);
		var self = this;
		var arr = this.creaeteArray(self);
		this.drawLines(arr, self);
		$(window).resize(function(){
			arrows.prototype.deleteDots(self);
			var arr  = arrows.prototype.creaeteArray(self);
			console.log(arr);
			arrows.prototype.drawLines(arr, self);
		});
		
	}
	arrows.prototype.creaeteArray = function(self){
		
		var ofs1 = self.parent.offset(),
		ofs2 = self.child.offset();
		self.xL = ofs2.left - ofs1.left;
		self.yL = ofs2.top  - ofs1.top; 
		self.tang = self.yL/self.xL;
		self.lengthC = Math.sqrt(Math.pow(self.xL,2) + Math.pow(self.yL,2));
		var numSpace = self.lengthC/self.space;
		var stepX = Math.abs(self.xL/numSpace);
		var arr = [];
		var ind;
		var edge = Math.abs(self.xL);
		var signX = Math.sign(self.xL);
		for(var i = 0; i < edge; i+=stepX){

			ind = arr.length;
			arr[ind] = new Array(i * signX, i * self.tang * signX);
		}
		return arr;
	};
	arrows.prototype.drawLines = function (arr, self) {
		var x = self.xL;
		var y = self.yL;
		var c = self.lengthC;
		var quad13 = Math.asin(y/c)*180/Math.PI;
		var quad24 = Math.acos(x/c)*180/Math.PI;
		var angle = x>y ? (x>0 ? quad13 : quad13 * -1) : (y>0 ? quad24 : quad24 * -1);// радианы
		for(var i = 0; i<arr.length-1; i++){
			var elem ='<div class="dot" style = "transform: rotate(' + (i !== arr.length-2 ? angle : angle + 90) +'deg); left: ' + arr[i][0]+'px; top: ' + arr[i][1]+'px"> </div>'; 
			self.parent.append(elem); 
		}
	};

	arrows.prototype.deleteDots = function(self) {
	
		var els = self.parent.find(".dot").each(function(){
			this.remove();
		});
		
	};

	var arw = new arrows("#node2","#node1",20);
	
	


});