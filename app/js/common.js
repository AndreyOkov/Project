$(document).ready(function(){
	var el1 = document.querySelector('.blue');
	var el2 = document.querySelector('.green');
	var el3 = document.querySelector('.yellow');
	var el4 = document.querySelector('.magenta');
	var el5 = document.querySelector('.black');
	var arrs = [el1, el2, el3,el4,el5];

	init(arrs);

var dd = 0;
	$("button").click(function() {
		changeZ(arrs);
		var el = document.querySelector('#circle');
		var si = setInterval(function() {
			
			dd++;
			el.r.baseVal.value=dd;
		}, 20);
	});

		$("#circle").velocity({cx:200, cy:300})
		.velocity("reverse");



	function init(arr) {
		var angle = 2*Math.PI/arr.length;
		var t = 0;
		var trform = 0;
		var base = {x:500, y:300};

		for(var i=0; i< arr.length; i++){
			arr[i].style.zIndex = arr.length-i;
			arr[i].style.top = Math.sin(t)*100+base.y+"px";
			arr[i].style.left = Math.cos(t)*100+base.x+"px";
			$(arr[i]).css('transform', "scale("+ (1.4 - trform) +")");
			console.log(arr[i].style.transform);
			t+=angle;
			trform+=0.1;
		}
	}// init()

	function getCss(elem, style) {
		return window.getComputedStyle(elem)[style];
	}// getCss()

	function changeZ(arr){

		for(var k = 0; k<arr.length-1; k++){
			arr[k].style.zIndex = getCss(arr[k+1], "zIndex");
			arr[k].style.transform = getCss(arr[k+1], "transform");
			arr[k].style.top = getCss(arr[k+1], "top" );
			arr[k].style.left = getCss(arr[k+1],"left");
		}
		arr[arr.length-1].style.transform = getCss(arr[0], "transform");
		arr[arr.length-1].style.top = getCss(arr[0], "top");
		arr[arr.length-1].style.left = getCss(arr[0], "left");

		}// changeZ()




	});
