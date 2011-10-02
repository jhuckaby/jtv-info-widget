<?php
	// Justin.TV Info Widget
	// Copyright (c) 2011 Joseph Huckaby
	// Released under the MIT License
	// http://www.opensource.org/licenses/mit-license.php
	
	header('Content-Type: text/javascript');
	
	$data_url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . '/data.php';
	print 'var jtv_widget_data_url = "'.$data_url.'";' . "\n";
	print file_get_contents( 'widget.js' );
?>
