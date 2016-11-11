var lineCount = ($(".code__defer").height()-60)/17;
for(var i=1; i<lineCount; i++){
	$(".numeric").append("<p class='numeric__item'>"+ i +"</p>");
}
