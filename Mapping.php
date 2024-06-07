<?php
	include_once('connect.php');
	session_start();
    date_default_timezone_set("Africa/Johannesburg");
	$resp = array();
	
	$coordinate = $_POST['coord']; 
	
	$coordinate = substr($coordinate, 0, -1);
    $coordinate = substr($coordinate, 1);
    
	$str = "SELECT name, geom, continent, ST_Area(ST_Transform(geom, 3410)) / 1000000000000 AS areas FROM world WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326)) ORDER BY ST_Distance(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326)) LIMIT 1";	
	$query = pg_query($conn, $str) or die ("Data loading failed: ".pg_last_error());
	
	if(pg_num_rows($query) > 0){
		$fetch = pg_fetch_assoc($query);
		$country = $fetch['name'];
		$continent = $fetch['continent'];
		$geom = $fetch['geom'];
		$areas = $fetch['areas'];
		
		$resp['country'] = $country;
		$resp['continent'] = $continent;
		$resp['areas'] = $areas;			
	}
	else {		
		$resp['success'] = false;			
		$resp['msg'] = "The coordinates are outside borders of any country";
	}
	
	pg_close($conn);
	header('Content-type: application/json',true);
	print json_encode($resp);
	//$str = "SELECT name, continent, ST_Area(geom) areas FROM world WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326)) ORDER BY ST_Distance(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326)) LIMIT 1";

//SELECT name, continent, ST_Area(ST_Transform(geom, 3857)) / 1000000 AS area_km2 FROM world WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint($coordinate), 4326))
?>



