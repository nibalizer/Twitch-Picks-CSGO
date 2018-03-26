$(function(){
	$.getJSON('/config.json', function(data){
		$('head').append("<link rel='stylesheet' type='text/css' href='/static/themes/" + data.html_theme + "/style.css'>");
		$.getScript("/static/themes/" + data.html_theme + "/script.js");
		$(".header").load("/static/themes/" + data.html_theme + "/header.html");
		$(".footer").load("/static/themes/" + data.html_theme + "/footer.html");
	});
});