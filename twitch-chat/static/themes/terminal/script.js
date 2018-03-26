//change settings in config. please

$.getJSON('/static/themes/terminal/config.json', function(data){
	if (data.hacker_mode){
		$('head').append("<link rel='stylesheet' type='text/css' href='/static/themes/terminal/hacker.css'>");
		window.prefix = "# ";
	}else{
		window.prefix = data.prefix + " ";
	}
	window.seperator = " ";
});