$(function(){
	$.get('/config/theme', function(data){
		$('head').append("<link rel='stylesheet' type='text/css' href='/static/themes/" + data + "/style.css'>");
		$.getScript("/static/themes/" + data + "/script.js");
		$(".header").load("/static/themes/" + data + "/header.html");
		$(".footer").load("/static/themes/" + data + "/footer.html");
	});
});