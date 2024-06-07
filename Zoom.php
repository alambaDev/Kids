<?php
	include_once('connect.php');
	session_start();
    date_default_timezone_set("Africa/Johannesburg");
	$resp = array();
	
	$lat = $_POST['lat'];
	$lon = $_POST['lon'];
	
	$coordinate = $lon . "," . $lat;
    
	$str = "SELECT name FROM world WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326)) ORDER BY ST_Distance(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326)) LIMIT 1";	
	$query = pg_query($conn, $str) or die ("Data loading failed: ".pg_last_error());
	
	if(pg_num_rows($query) > 0){
		$fetch = pg_fetch_assoc($query);
		$country = $fetch['name'];
		
		$_SESSION['country'] = $country;
		$resp['country'] = $country;			
	}
	else {
		$resp['success'] = false;			
		$resp['msg'] = "Coordinates are in no man's land. Try again";
	}
	
	pg_close($conn);
	header('Content-type: application/json',true);
	print json_encode($resp);
	
?>





