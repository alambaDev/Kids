<html lang="en">
<?php
	include_once('connect.php');
	session_start();
?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
    <title> Mapping Kids </title>

	<link rel="shortcut icon" href="./images/SANSA_log.png" type="image/png">

	<link href="./bootstrap-5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  	<script src="./bootstrap-5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  	
  	<link href="./v6.14.1/css/ol.css" rel="stylesheet">
    <script src="./v6.14.1/build/ol.js"></script>
    
    <link href="./dist/css/Styles.css" rel="stylesheet">
    
    <link href="./dist/fontawesome/css/all.css" rel="stylesheet">
    
    <link href="./dist/fontawesome/css/all.css" rel="stylesheet">
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
   	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script> 
   	
   	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
   	
</head>
<body>
	<div id = "basePanel" class = "card">
		<div class="d-flex">
		  	<div class="flex-fill">
		  		<img src="https://eos.com/wp-content/uploads/2021/11/South-Africa.jpg" class="image" id = "sat" alt="Satellite Image">
				<div class="text">Satellite</div>
		  	</div>
		  	<div class="flex-fill">
		  		<img src="https://media.istockphoto.com/id/1066713660/photo/residential-development-aerial.jpg?s=612x612&w=0&k=20&c=6eVSlFPzBTn7Uc7Z1aRQPOLbUbg6IoPHaa8iofIaLfA=" id="nei">
				<div class="text">Neighbourhood</div>
		  	</div>
		  	<div class="flex-fill">
		  		<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBceXzqjC2lbSdt_5NjGC5qperZXGYdShsAs77qpLpoqGzx8s6oPDkAljp7ZoV7W6z-U&usqp=CAU" id = "pioneer" alt="Pioneer Image">
				<div class="text"> Pioneer </div>
		  	</div>
		</div>
	</div>
	
	<div id = "searchid" class="input-group">
		<i class="fas fa-search"></i>	
		<input id="location" type="text" class="form-control" placeholder="Find your location" style="font-style: italic;">
		<span data-bs-toggle="tooltip" title="Search" id = "search" class="input-group-text">Search</span>
  	</div>
  	
  	<div id = "toolbar" class="btn-group-vertical">	  	
	  	<button data-bs-toggle="tooltip" title="Zoom in" id = "zoomin" type="button" class="btn">
	  		<i class="fa-solid fa-plus"></i>
	  	</button>
	  	<button data-bs-toggle="tooltip" title="Zoom out" id = "zoomout" type="button" class="btn">
	  		<i class="fa-solid fa-minus"></i>
	  	</button>
	  	
	  	<button id = "extent" data-bs-toggle="tooltip" title="Show World Map" type="button" class="btn">
	  		<i class="fa-solid fa-earth-africa"></i>
	  	</button>
	  	
	  	<button id = "show-sidebar" data-bs-toggle="tooltip" title="Show Sidebar" type="button" class="btn">
	  		<i class="bi bi-x-diamond-fill"></i>	
	  	</button>
	</div>
	
	<div id="sidebar" class="sidebar">
        <div class = "mb-4 mt-2 arear">
        	<span id = "area">  Sidebar </span> | <span id = "country">  Sidebar </span>
        	<i id = "close-sidebar" data-bs-toggle="tooltip" title="Close Sidebar" class="bi bi-x-diamond-fill"></i>
    	</div>
        <div class="accordion" id="accordionExample">
        
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#Guess-Continent" aria-expanded="true" aria-controls="Guess-Continent">
                        Guess Continent
                    </button>
                </h2>
                <div id="Guess-Continent" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="form-check">
					  		<input type="radio" class="form-check-input" id="asia" name="continents" value="Asia">
						  	<label class="form-check-label" for="asia"> Asia </label>
						</div>
						<div class="form-check">
						  	<input type="radio" class="form-check-input" id="europe" name="continents" value="Europe">
						  	<label class="form-check-label" for="europe"> Europe </label>
						</div>
						<div class="form-check">
						  	<input type="radio" class="form-check-input" id="africa" name="continents" value="Africa">
						  	<label class="form-check-label" for="africa"> Africa </label>
						</div>
						<div class="form-check">
						  	<input type="radio" class="form-check-input" id="north" name="continents" value="North America">
						  	<label class="form-check-label" for="north"> North America </label>
						</div>
					  	<div class="form-check">
					  		<input type="radio" class="form-check-input" id="oceania" name="continents" value="Oceania">
						  	<label class="form-check-label" for="oceania"> Oceania </label>
						</div>
						<div class="form-check">
						  	<input type="radio" class="form-check-input" id="south" name="continents" value="South America">
						  	<label class="form-check-label" for="south"> South America </label>
						</div>
                    	<span id = "response"></span>
                    	<span id = "continent"></span>
                    </div>                  
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Results" aria-expanded="false" aria-controls="Results">
                        <span id = "counts"> Results </span>	
                    </button>
                </h2>
                <div id="Results" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">	
				  		<span id = "resultList"></span>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Countries" aria-expanded="false" aria-controls="Countries">
                        <span class = "text-white" id = "zoom-country"></span>
                    </button>
                </h2>
                <div id="Countries" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div id = "cardview" class="card-body">
							
							<div class="mb-0 mt-0">
						  		<label for="language"> Language:</label>
							  	<input type="text" class="form-control" id="language" placeholder="What language is most spoken" name="language">
							</div>
							<div class="mb-3">
							  	<label for="food"> Food:</label>
							  	<input type="text" class="form-control" id="food" placeholder="What types food do they eat" name="food">
							</div>
							<div class="mb-3">
							  	<label for="clothes"> Clothes:</label>
							  	<input type="text" class="form-control" id="clothes" placeholder="What types of clothes do they wear?" name="clothes">
							</div>
							<span id = "errormsg"></span>
							<div class="d-grid">
						  		<button id = "submit" type="button" class="btn btn-block"> Submit </button>
							</div>
						</div>
                    </div>
                </div>
            </div>
                                    
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Navigate" aria-expanded="false" aria-controls="Navigate">
                        Navigate Satellite	
                    </button>
                </h2>
                <div id="Navigate" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body p-0">							
				  		<div class="input-group mb-2 games">
							<input id = "gamespeed" type="text" class="form-control" style = "color: #000;" placeholder="Game speed - default speed is 5">
							<span id = "startgame" onclick="startGame()" class="input-group-text"> Start </span>
							<span id = "pausegame" onclick="pauseGame()" class="input-group-text"> Pause </span>
							<span id = "resumegame" onclick="resumeGame()" class="input-group-text"> Resume </span>
							<span id = "stopgame" onclick="stopGame()" class="input-group-text"> Stop </span>
				  		</div>
				  		
                    	<div class="btn-group groups">
					  		<button type="button" class="btn"> Low Earth Orbit </button>
						  	<button type="button" class="btn geo"> Geo-Stationary Orbit </button>
						  	<button type="button" class="btn"> Medium Earth Orbit </button>
						</div>
				  		<div id="gameContainer" class = "p-3">
							<div id="satellite"></div>
						</div>

						<script src="./dist/js/Script.js"></script>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    
    <div id = "zooms" class="card zooms">
	  	<div class="card-body">
	  		<h6 class="card-title fw-bold mb-4"> <span id = "countryid"></span> 
	  			<i id = "close-zooms" data-bs-toggle="tooltip" title="Close Sidebar" class="bi bi-x-diamond-fill"></i>
	  		</h6>
	  		<div class = "row">
	  			<div class = "col-md-4">
	  				<img src="https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.jpg" class="rounded" alt="Country-Flag">	
	  			</div>
	  			<div class = "col-md">
	  				<p class = "mb-2 mt-2 fw-bold"> Capital City: <span id = "capital"></span></p>
	  				<p class = "mb-2 mt-2 fw-bold"> Continent: <span id = "continentid"></span></p>
	  				<p class = "mb-2 mt-2 fw-bold"> Populaton: <span id = "populatonid"></span></p>
	  				<p class = "mb-2 mt-2 fw-bold"> Size: <span id = "sizeid"></span></p>
	  			</div>
	  		</div>	  	
	  	</div>
	</div> 
    
    <div class = "distance" id = "distance"> Distance </div>
    
    <div class = "text-center" id="loadingMessage"> 
    	<p class = "text-center"> Please wait while data loading...</p> 
    	<div class="spinner-border"></div>
    </div>
    
  	<div class = "score" id = "score"> Score: 0 </div>
  	
  	<div id = "groups" class="btn-group">
	  	<button id="drawPoint" data-bs-toggle="tooltip" title="Draw Point" type="button" class="btn">
	  		<i class="bi bi-cursor-fill"></i>
  		</button>
	  	<button id="drawLineString" data-bs-toggle="tooltip" title="Draw Line" type="button" class="btn">
	  		<i class="fa fa-pencil" aria-hidden="true"></i>
	  	</button>
	  	<button id="drawPolygon" data-bs-toggle="tooltip" title="Draw Polygon" type="button" class="btn">
	  		<i class="bi bi-octagon"></i>
	  	</button>
	  	<button id="clearPolygon" data-bs-toggle="tooltip" title="Remove All" type="button" class="btn">
	  		<i class="bi bi-trash"></i>
	  	</button>
	</div>
  	
	<div class = "map" id = "map"></div>	
	
	<script src = "./dist/js/main.js"></script>
	<script src = "./dist/js/index.js"></script>
	
</body>
</html>
