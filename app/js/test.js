

$(document).ready(function(){

	function SingularJS(init){
	for(var param in init) this[param] = init[param]; //инициализация объекта
		var self = this;
	this.empty = [];
	this.i= undefined;
	this.elem = undefined;
	if(typeof this.createDom != "function"){
		SingularJS.prototype.createDom = function(){
			$(this.selector).append(
				'<div class="test  page_test clearfix">'+
				'<div class="test__stub">'+ this.start+ 
				'</div><div class="test__popJS">'+
				'<div class="test__pop center">'+ this.content+
				'</div></div><div class="test__stub">'+this.end+'</div></div>');
		};

		SingularJS.prototype.getRandomInt = function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		SingularJS.prototype.next = function(self){
			var i = self.i;
			if(self.empty.length < self.strings.length){
				var $center = $(self.selector).find(".center");
				if($center.length){
					$center.animate({opacity: "0", transform: 'translateY(50px)'}, 200, 
						function(){
							$center.remove(); 
							animate_top(self);
						});
				}
				i = self.getRandomInt(0, self.strings.length-1);
				while(self.empty.indexOf(i)!== -1){
					i = self.getRandomInt(0, self.strings.length-1);
				}
				elem = '<div class="test__pop top">' + self.strings[i] + '</div>';

				if(self.empty.indexOf(i) === -1){
					self.empty.push(i);
				} else {
				}
			}
		};
	}

	this.createDom();
	$(this.control).click(function(){
		SingularJS.prototype.next(self);
	});

	function animate_top(self){
		$el = $(self.selector).find(".test__popJS").append(elem).find(".top");
		$el.animate({opacity: "1", transform: 'translateY(0px)'}, 500, function(){
			$el.addClass("center").removeClass("top");
			 self.temp = $el;
		});
		
		
	}
}

var MMM = new SingularJS({
	strings : ["123", "true", "\"\"", "\"word\"", "\"string\"", "\"false\"", "false", "\" \"", "null", "0", "1","undefined"],
	selector : ".trueFalse_JS",
	control : ".trueFalse_but_JS",
	start : "if(",
	content : "5",
	end : ")",

});

var JJJ = new SingularJS({
	strings : ["data", "koridor", "mandarina", "collaider"],
	selector : ".dataType_JS",
	control : ".dataType_but_JS",
	start : "while(",
	content : "mail",
	end : "){...}",
}); 


var ZZZ = new SingularJS({
	strings : ["a", "b", "c", "d", "e", "f", "g", "h", "m", "n", "k","l"],
	selector : ".anotherTest_JS",
	control : ".anotherTest_but_JS",
	start : "while(",
	content : "X",
	end : ")",
}); 

});  