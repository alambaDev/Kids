$('document').ready(function(){	
	
	var resp = document.getElementById("response");
    document.getElementById('search').addEventListener('click', function() {
    	const search = document.getElementById('location').value;
    	
    	reset();
    	resp.innerHTML = '';
    	
        if (search) {
        	showLoadingMessage();
            findLocation(search);
        } else {
            alert('Please enter your location');
        }
    });

    const radioButtons = document.querySelectorAll('input[name="continents"]');

	radioButtons.forEach(button => {
		button.addEventListener('click', function() {
		    if(this.value == document.getElementById("continent").innerHTML){
		    	setTimeout(function() {
			  		resp.innerHTML = '';
				}, 5000);	
		    	resp.innerHTML = '<img class = \"response\" src=\"https://i.gifer.com/origin/f0/f0f60dad139864d5209732cc7c9d7dda_w200.gif\">' +
		    	'<div class = "mb-3 mt-3 text-success fw-bold text-center"> Congratulation </div>';		    	 
		    }
		    else {
		    	setTimeout(function() {
			  		resp.innerHTML = '';
				}, 2000);
		    	resp.innerHTML = '<img class = \"response\" src=\"https://media.baamboozle.com/uploads/images/180339/1648581204_128563_gif-url.gif\">' +
		    	'<div class = "mb-3 mt-3 text-danger fw-bold text-center"> Wrong Answer, try again </div>';	
		    }
		});	
	});

    $('#extent').click(function(){
		view.animate({
		  	projection: 'EPSG:4326',
    		center: [7.9883, 19.7963],
    		zoom: 3,
    		easing: ol.easing.easeOut
		});	
	});

	$('#zoomin').click(function() {
        map.getView().setZoom(map.getView().getZoom()+1);      
    });
    
    $('#zoomout').click(function() {
        map.getView().setZoom(map.getView().getZoom()-1);      
    });
        
    $('#sat').click(function(){
		osm.setVisible(false);	
		neighbourhood.setVisible(false);	
		satellites.setVisible(true);	
	});	
	
	$('#pioneer').click(function(){
		osm.setVisible(true);	
		neighbourhood.setVisible(false);	
		satellites.setVisible(false);	
	}); 	
	
	$('#nei').click(function(){
		osm.setVisible(false);	
		neighbourhood.setVisible(true);	
		satellites.setVisible(false);	
	});		
	
	/**************************************************************************************/
	
	document.getElementById('drawPoint').addEventListener('click', function () {
        handleButtonClick('Point');
  	});
  	
  	document.getElementById('drawLineString').addEventListener('click', function () {
        handleButtonClick('LineString');
  	});
  	
  	document.getElementById('drawPolygon').addEventListener('click', function () {
        handleButtonClick('Polygon');
  	});
	
	document.getElementById('clearPolygon').addEventListener('click', function () {
    	source.clear();
        removeInteractions();  
        
    	activeType = null; 
    	
        document.getElementById("distance").style.display = "none";
        document.getElementById("clearPolygon").style.display = "none";
        
        document.getElementById('drawPoint').classList.remove('active');
        document.getElementById('drawPolygon').classList.remove('active');
        document.getElementById('drawLineString').classList.remove('active');
  	});
	/**************************************************************************************/	
 	
 	$('#show-sidebar').click(function(){
 		openSide();	
 	});
 	
 	$('#close-sidebar').click(function(){	
 		closeSide();
 	});
 	
 	$('#close-zooms').click(function(){	
 		document.getElementById("zooms").style.display = "none";
 	});
 	
	/**************************************************************************************/

	$('#submit').click(function() {
        var language = $('#language').val();
        var food = $('#food').val();   
        var clothes = $('#clothes').val();  
        
        if(language == "" || language == null){
        	setTimeout(function() {
				document.getElementById("errormsg").innerHTML = '';
			}, 20000);
        
        	document.getElementById("errormsg").innerHTML = '<div class = "mb-2 mt-2 text-danger text-center"> Enter the language.. </div>';
        }
        else if(food == "" || food == null){
        	setTimeout(function() {
				document.getElementById("errormsg").innerHTML = '';
			}, 20000);
			
        	document.getElementById("errormsg").innerHTML = '<div class = "mb-2 mt-2 text-danger text-center"> Enter the food.. </div>';
        }
        else if(clothes == "" || clothes == null){
        	setTimeout(function() {
				document.getElementById("errormsg").innerHTML = '';
			}, 20000);
			
        	document.getElementById("errormsg").innerHTML = '<div class = "mb-2 mt-2 text-danger text-center"> Enter the clothes.. </div>';
        }
        else {
        	document.getElementById("errormsg").innerHTML = '';
        	proceed(language, food, clothes);
        }
    });
});	

/********************************************************************************************/
var draw;  // global so we can remove it later
var activeType = null;
let sketch;

function formatLength(line) {
    const length = ol.sphere.getLength(line, { projection: 'EPSG:4326' });
    return (length / 1000).toFixed(2) + ' km';
}
	
function addInteraction(type) {
	document.getElementById("distance").style.display = "none";
	
	if (type === 'LineString') {
        draw = new ol.interaction.Draw({
            source: source,
            type: type
        });
        map.addInteraction(draw);

		draw.on('drawstart', function(event) {
            sketch = event.feature;
			document.getElementById("distance").style.display = "block";
            sketch.getGeometry().on('change', function(evt) {
                const geom = evt.target;
                const output = 'Distance: ' + formatLength(geom);
                document.getElementById('distance').innerHTML = output;
            });
            drawing = true;
        });

        draw.on('drawend', function(event) {
            sketch = null;
            drawing = false;
        });
        
        draw.on('change:active', function() {
        if (!draw.getActive()) {
            drawing = false;
        }
    });
    }
	else {
		draw = new ol.interaction.Draw({
		  	source: source,
		  	type: type,
		});
		map.addInteraction(draw);
	}
}

function removeInteractions() {	
	if (draw) {
  		map.removeInteraction(draw);
  		draw = null;
	}
}

function handleButtonClick(type) {
	if($('#clearPolygon').css('display') == 'none'){
		document.getElementById("clearPolygon").style.display = "block";
    }

	if (activeType === type) {
      	removeInteractions();
      	activeType = null;
      	document.getElementById('draw' + type).classList.remove('active');
    } else {
      	removeInteractions();
      	addInteraction(type);
      	activeType = type;
      	document.querySelectorAll('#groups .btn').forEach(function (btn) {
        	btn.classList.remove('active');
      	});
      	document.getElementById('draw' + type).classList.add('active');
    }
}

/********************************************************************************************/

function resetFields() {
    document.getElementById("language").value = "";
    document.getElementById("food").value = "";
    document.getElementById("clothes").value = "";
    
    document.getElementById("errormsg").innerHTML = '';
}

function openSide(){
	var sidebar = document.getElementById("sidebar");
    var map = document.getElementById("map");
    var toolbar = document.getElementById("toolbar");
    var s = document.getElementById("score").innerHTML;
    
    if(s == "Score: 0" || s == " Score: 0 "){
		document.getElementById("score").style.display = "none";
	}
	else {
		document.getElementById("score").style.display = "block";	
	}

	document.getElementById("show-sidebar").style.display = "none";

    sidebar.style.display = 'block';
    setTimeout(function() {
    	map.style.marginLeft = "400px";
    	map.style.width = "calc(100vw - 400px)"; 
    }, 10);
    
    sidebar.classList.add("open");
    toolbar.style.left = "410px";
}

function closeSide(){
	var sidebar = document.getElementById("sidebar");
    var map = document.getElementById("map");
    var toolbar = document.getElementById("toolbar");
    document.getElementById("score").style.display = "none";
    
    document.getElementById("show-sidebar").style.display = "block";

    sidebar.classList.remove("open");
    setTimeout(function() {
    	toolbar.style.left = "10px";
    	sidebar.style.display = 'none';
    }, 500);
    map.style.marginLeft = "0";
    map.style.width = "100vw";	
}

function findLocation(location) {
    const url = 'https://nominatim.openstreetmap.org/search?q=' + location + '&format=json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
      	hideLoadingMessage();
        if (data.length > 0) {
          	
            openSide();        	
          	
          	document.getElementById("counts").innerHTML = data.length + " result/s found";
          	const resultList = document.getElementById("resultList");

          	resultList.innerHTML = '';
			

          	data.forEach((result, index) => {
            	const lon = parseFloat(result.lon);
            	const lat = parseFloat(result.lat);

            	const al = document.createElement("div");
            	al.classList.add("alert");
            	al.setAttribute("role", "alert");

            	if (index === 0) {
              		al.classList.add("alert-first");
            		
            		infortmation(lon, lat);
            		interest(location);
            		plot(lon, lat);
            		onZooms(lon, lat);
            	} else {
              		al.classList.add("alert-sansa");
            	}

            	al.innerHTML = result.display_name;
            
            	al.addEventListener('click', () => {
            		const alerts = document.querySelectorAll('.alert');
            	
		      		infortmation(lon, lat);
		        	interest(location);
            		plot(lon, lat);
            		onZooms(lon, lat);
            	
		      		alerts.forEach(alert => {
		            	alert.classList.remove("alert-first");
		            	alert.classList.add("alert-sansa");
		          	});
		          	
		          	al.classList.remove("alert-sansa");
		        	al.classList.add("alert-first");
            	});

    			resultList.appendChild(al);
			});
        } else {
        	setTimeout(function() {
				cancel();
			}, 3000);
			document.getElementById('loadingMessage').style.display = 'block';
			document.getElementById('loadingMessage').innerHTML = 'No results found for your location: ' + location
        
          	//alert('No results found for your location: ' + location);
		}
	})
	.catch(error => {
		hideLoadingMessage();
    	console.error('Error fetching search results:', error);
	});
}

function showLoadingMessage() {
    document.getElementById('loadingMessage').style.display = 'block';
}

function hideLoadingMessage() {
    document.getElementById('loadingMessage').style.display = 'none';
}

function plot(lon, lat){
	map.getView().setCenter([lon, lat]);
    map.getView().setZoom(14);

    const marker = new ol.Feature({
        geometry: new ol.geom.Point([lon, lat])
    });

	point.getSource().addFeature(marker);
	var location = ol.proj.fromLonLat([lon, lat], 'EPSG:4326', 'EPSG:4326');
	view.animate({
      	center: location,
      	zoom: 8,
      	easing: ol.easing.easeOut
    });
}

function infortmation(lon, lat){	
	jQuery.ajax({
		type: "POST",
		url: 'World.php',
		dataType: 'json',
		data: {
		    lon: lon,
		    lat: lat
		},
		success: function (response, msg){				    
		    if(response.success == false){
                alert(response.msg);
            }
            else {
            	document.getElementById("country").innerHTML = response.country;
            	document.getElementById("continent").innerHTML = response.continent;
            }  
		},
        error: function(xhr, status, error){
        	alert("Error Message: " + xhr.status + " " + xhr.statusText); 
        }            
	});
}

function interest(l){
	let result = capitalise(l);
	
	document.getElementById("area").innerHTML = result;
}

function capitalise(input) {
    let words = input.split(" ");
    
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    
    return words.join(" ");
}

function reset() {
    var radioButtons = document.querySelectorAll('input[name="continents"]');
    
    radioButtons.forEach(function(radioButton) {
        radioButton.checked = false;
    });
}

function redirect(){
	setTimeout(function() {
		cancel();
	}, 3000);
	document.getElementById('loadingMessage').style.display = 'block';
	document.getElementById('loadingMessage').innerHTML = 'Redirect to game / upgrade page...';

	//alert("Redirect to game / upgrade page...");
}

function proceed(l, f, c){
	jQuery.ajax({
		type: "POST",
		url: 'Proceed.php',
		dataType: 'json',
		data: {
		    language: l,
		    food: f,
		    clothes: c
		},
		success: function (response, msg){				    
		    if(response.success == false){
                document.getElementById("errormsg").innerHTML = '<div class = "mb-2 mt-2 text-danger text-center">' + response.msg + '</div>';
            }
            else {
            	resetFields();
            	setTimeout(function() {
            		setTimeout(function() {
            			document.getElementById("errormsg").innerHTML = '';	
            		}, 10000);
			  		document.getElementById("errormsg").innerHTML = '<div class = "mb-2 mt-2 text-success text-center">' + 
			  			'Wonderful, wanna play a game?<div class="container mb-4 mt-2">' +
							'<div class="row">' +
								'<div class="col text-start">' +
									'<button type = "button" class = "text-success fw-bold btn btn-sm" onclick="redirect()">Yes</button>' +
								'</div>' +
								'<div class="col text-end">' +
									'<button type = "button" class = "text-success btn fw-bold btn-sm" onclick="notYet()">Not Yet</button>' +
								'</div>' +
							'</div>' +
						'</div>' +
		  			'</div>';
				}, 2000);
            	
            	document.getElementById("errormsg").innerHTML = '<div class = "mb-2 mt-2 text-success text-center">' + response.msg + '</div>';
            }  
		},
        error: function(xhr, status, error){
        	alert("Error Message: " + xhr.status + " " + xhr.statusText); 
        }            
	});
}

function notYet(){	
	document.getElementById("errormsg").style.display = "none";
}

function drawLevel() {
    var view = map.getView();
    view.setZoom(3.5);
}











