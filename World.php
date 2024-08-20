<?php
	include_once('connect.php');
	session_start();
    date_default_timezone_set("Africa/Johannesburg");
	$resp = array();
	
	$lon = $_POST['lon']; 
	$lat = $_POST['lat']; 
	
	$coordinate = $lon . "," . $lat;
	$str = "SELECT name, continent FROM world WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326)) ORDER BY ST_Distance(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326)) LIMIT 1";	
	$query = pg_query($conn, $str) or die ("Data loading failed: ".pg_last_error());
	
	if(pg_num_rows($query) > 0){
		$fetch = pg_fetch_assoc($query);
		$country = $fetch['name'];
		$continent = $fetch['continent'];
		
		$resp['country'] = $country;
		$resp['continent'] = $continent;
			
	}
	else {
		$q = "SELECT name, continent FROM world ORDER BY geom <-> ST_SetSRID(ST_MakePoint($coordinate), 4326) LIMIT 1;";
		$query = pg_query($conn, $q) or die ("Data loading failed: ".pg_last_error());
		
		if(pg_num_rows($query) > 0){
			$fetch = pg_fetch_assoc($query);
			$country = $fetch['name'];
			$continent = $fetch['continent'];
			
			$resp['country'] = $country;
			$resp['continent'] = $continent;
				
		}
		else {
			$resp['success'] = false;			
    		$resp['msg'] = "Location unknown " . $coordinate;
		}
	}
	
	pg_close($conn);
	header('Content-type: application/json',true);
	print json_encode($resp);
	
?>





