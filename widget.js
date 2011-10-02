// Justin.TV Info Widget
// Copyright (c) 2011 Joseph Huckaby
// Released under the MIT License
// http://www.opensource.org/licenses/mit-license.php

(function jtv_widget() {
	var channel_id = '';
	var refresh_time = 61;
	var div = null;
	
	var wrap_sty = 'padding:5px; border:1px solid #bbb; background: #eee; background: -webkit-gradient( linear, left bottom, left top, color-stop(0, #ddd), color-stop(1, #efefef) ); background: -moz-linear-gradient( center bottom, #ddd 0%, #efefef 100% );';
	var label_sty = 'font-family:Helvetica,Arial; font-size:14px; font-weight:bold; color:#666; text-shadow: #fff 0px 1px 0px;';
	var data_sty = 'font-family:Helvetica,Arial; font-size:24px; color:#666; text-shadow: #fff 0px 1px 0px;';
	
	var el = function el(id) { return document.getElementById(id); };
	var load_script = function load_script(url) {
		var scr = document.createElement('SCRIPT');
		scr.type = 'text/javascript';
		scr.src = url;
		document.getElementsByTagName('HEAD')[0].appendChild(scr);
	};
	var commify = function commify(number) {
		if (!number) number = 0;
		number = '' + number;
		if (number.length > 3) {
			var mod = number.length % 3;
			var output = (mod > 0 ? (number.substring(0,mod)) : '');
			for (i=0 ; i < Math.floor(number.length / 3); i++) {
				if ((mod == 0) && (i == 0))
					output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
				else
					output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
			}
			return (output);
		}
		else return number;
	};
	
	var jtvw_response = window.jtvw_response = function jtvw_response(data) {
		var html = '';
		if (data.Code) {
			html += '<center><font size="+3" color="red" style="line-height:30px;"><b>ERROR: '+data.Description+'</b></font></center>';
			div.style.display = 'block';
		}
		else {
			// data.num_followers
			// data.video_bitrate
			// data.channel.status
			// data.channel_view_count
			// data.stream_count
			var sty_reset = 'border:0; margin:0; padding:0; background:transparent;';
			html += '<div style="'+wrap_sty+'"><center><table width="95%" style="'+sty_reset+'"><tr style="'+sty_reset+'">';
				html += '<td width="33%" align="left" style="'+sty_reset+' text-align:left;">';
					html += '<div style="'+label_sty+'">Live Viewers:</div>';
					html += '<div style="'+data_sty+'">' + commify(data.stream_count) + '</div>';
				html += '</td>';
				html += '<td width="34%" align="center" style="'+sty_reset+' text-align:center;">';
					html += '<div style="'+label_sty+'">Followers:</div>';
					html += '<div style="'+data_sty+'">' + commify(data.num_followers) + '</div>';
				html += '</td>';
				html += '<td width="33%" align="right" style="'+sty_reset+' text-align:right;">';
					html += '<div style="'+label_sty+'">Total Views:</div>';
					html += '<div style="'+data_sty+'">' + commify(data.channel_view_count) + '</div>';
				html += '</td>';
			html += '</tr></table></center></div>';
			
			// only show widget if stream is live
			div.style.display = data.channel_view_count ? 'block' : 'none';
		}
		div.innerHTML = html;
		
		setTimeout( window.jtvw_refresh, refresh_time * 1000 );
	};
	var refresh = window.jtvw_refresh = function refresh() {
		var url = jtv_widget_data_url + '?channel='+channel_id+'&format=js&callback=jtvw_response&random=' + Math.random();
		load_script(url);
	};
	var init = function init() {
		if (!div) return alert("JTVWidget: DOM Element Not Found: jtv_widget");
		channel_id = div.getAttribute('channel') || alert("JTVWidget: DOM Element is missing 'channel' attribute.");
		if (!window.jtv_widget_data_url) return alert("window.jtv_widget_data_url was not found.");
		
		// auto size widget
		if (!div.getAttribute('style')) {
			var jtv_flash = el('jtv_flash');
			if (!jtv_flash) jtv_flash = el('live_embed_player_flash');
			if (jtv_flash) div.style.width = '' + jtv_flash.offsetWidth + 'px';
		}
		
		refresh();
	};
	
	// locate our element and go
	div = el('jtv_widget');
	if (div) init();
	else setTimeout( function() {
		div = el('jtv_widget');
		init();
	}, 1 );
})();
