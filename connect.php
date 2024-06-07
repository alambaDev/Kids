<?php
    //Add this line -- setsebool -P httpd_can_network_connect 1
    $conn = pg_connect("host=localhost port=5432 dbname=datastore user=alamba password=lamba") or header("Location: Connection.php");
    
?>

