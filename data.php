<?php

// Justin.TV Info Widget
// Copyright (c) 2011 Joseph Huckaby
// Released under the MIT License
// http://www.opensource.org/licenses/mit-license.php

$channel_id = $_GET['channel'];

$cache_dir = 'cache';
$cache_ttl = 60;

$cache_file = $cache_dir . '/cache-' . $channel_id . '.txt';
if (file_exists($cache_file)) {
	$mod = filemtime($cache_file);
	if (time() - $mod < $cache_ttl) {
		// cache is fresh, return immediately
		send_response(json_decode(file_get_contents($cache_file), true));
	}
}

// refresh cache
$data = json_decode( file_get_contents('http://api.justin.tv/api/stream/list.json?channel='.$channel_id), true );

if (isset($data[0])) $data = $data[0];
if (isset($data['stream'])) $data = $data['stream'];

if (!is_array($data)) $data = array(
	'video_bitrate' => 0,
	'channel' => array( 'status' => '' ),
	'channel_view_count' => 0,
	'stream_count' => 0
);

// counting followers is tricky (thanks JTV)
$num_followers = 0;

$fcache_file = $cache_dir . '/followers-' . $channel_id . '.txt';
$used_fcache = false;
if (file_exists($fcache_file)) {
	$mod = filemtime($fcache_file);
	if (time() - $mod < 300) {
		$num_followers = trim( file_get_contents($fcache_file) );
		$used_fcache = true;
	}
}
if (!$used_fcache) {
	$raw = file_get_contents( 'http://www.justin.tv/' . $channel_id );
	if (preg_match('/\<strong\s+id\=\"channel_fans_count\"\>([\d\,]+)/', $raw, $matches)) {
		// <strong id="channel_fans_count">16,583
		$num_followers = intval( preg_replace('/\D+/', '', $matches[1]) );
	}
	else if (preg_match('/followers_count\D+([\d\,]+)/', $raw, $matches)) {
		// <span class='stat' id='followers_count'>8,080</span>
		$num_followers = intval( preg_replace('/\D+/', '', $matches[1]) );
	}
	
	file_put_contents( $fcache_file, $num_followers );
}
$data['num_followers'] = $num_followers;

// save data to cache for subsequent requests
$result = @file_put_contents( $cache_file, json_encode($data) );
if (!$result) send_response(array( 'Code' => 1, 'Description' => 'Failed to save cache file to server.  Check permissions of cache dir?' ));

// send data to client
send_response($data);

exit();

function send_response($data) {
	// js response
	header('Content-Type: text/javascript');
	print $_GET['callback'] . '(' . json_encode($data) . ');';
	exit();
}

?>
