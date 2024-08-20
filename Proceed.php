<?php
    include_once('connect.php');
    session_start();
    date_default_timezone_set("Africa/Johannesburg");
    $resp = array();
    
    $country = $_SESSION['country'];
    
    $language = $_POST['language'];
    $food = $_POST['food'];
    $clothes = $_POST['clothes'];
    $address = $_SERVER['REMOTE_ADDR'];
    
    $str = "INSERT INTO worlddata (country, language, food, clothes, address) VALUES ('$country', '$language', '$food', '$clothes', '$address')";    
    $query = pg_query($conn, $str);
    
    if($query){
        $resp['success'] = true;
        $resp['msg'] = "Data successfully uploaded.";          
    }
    else {
        $resp['success'] = false;           
        $resp['msg'] = "Oops! Something happened and data was not loaded.";
    }
    
    pg_close($conn);
    header('Content-type: application/json');
    echo json_encode($resp);
?>

