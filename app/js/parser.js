$(document).ready(function(){

	$(".parser__go").click(function(){
		var txt = $(".parser").val();
		
		txt = txt.replace(/(.)? (.)?/g, "$1$2");
		

		$(".parser").val(txt);
		$(".temp_code").html(txt);
		
	});

	$(".parser__clean").click(function(){
		var kkk = $(".parser").val();
		kkk = kkk.replace(/  +|\t/g, "&emsp;&emsp;");
		kkk = kkk.replace(/(<)/g, "&lt;");
		kkk = kkk.replace(/(>)/g, "&gt;");
		kkk = kkk.replace(/\n/g, "</br>");
	
		kkk = kkk.replace(/(async|defer|type|class|src)/g," <span class='gr'>$1</span>");
		kkk = kkk.replace(/(".+?")/g, "<span class='yel'>$1</span>");
		kkk = kkk.replace(/(&lt;\/?)(html|script|body|title|head|textarea|button|noscript|p)/g, "$1<span class='mg'>$2</span>");
		kkk = kkk.replace(/DOCTYPE/g, "<span class='mg'>DOCTYPE </span>");
		kkk = kkk.replace(/(&lt;!--(.)+--&gt;)/g, "<span class='gr_col'>$1</span>");
		kkk = kkk.replace(/=( *)?(\d+);/g, "= <span class='col_func'>$2</span>;");
		kkk = kkk.replace(/(var) /g, "<span class='col_func'>$1 </span>");
		console.log(kkk);

		$(".parser").val(kkk);
		$(".temp_code").html(kkk);

	});
	$(".parser-wrap").click(function(){
		$(".inner-parse").toggle(1000);
	});
	$(".inner-parse").click(function(e){
		e.stopPropagation();
	});
	// var mmm = "1Я многострочный текст \n"+
	// 				"2 im too string \n"+
	// 				"3.main";
	// 	mmm = mmm.match(/\n/g);
	// 	console.log(mmm);
});