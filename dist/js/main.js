var satellites = new ol.layer.Tile({
	visible : false,
	preload: Infinity,
	source: new ol.source.XYZ({
    	url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  	})
});

var neighbourhood = new ol.layer.Tile({
    name: '<b>Satellite</b>',  
    visible : false,
    source: new ol.source.XYZ({
        url: 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=85b21f0f345b40c880729c091a6acb6c',
        attributions: '© ' + new Date().getFullYear() + ' Microsoft, © ' + new Date().getFullYear() + ' DigitalGlobe',
        tileSize: 256
    })
});

var osm = new ol.layer.Tile({
	source: new ol.source.OSM()
});

var world = new ol.layer.Tile({  
    visible : true,
    source: new ol.source.TileWMS({
        url: 'http://10.150.16.179:8080/geoserver/Datacube-OWS/wms',
        params: {
            'LAYERS': 'Datacube-OWS:World', 
            'TRANSPARENT': true
        },
        crossOrigin: 'anonymous'
    })
});

/*********************************************************************************/
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
	source: source,
	style: new ol.style.Style({
  		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.2)',
	  	}),
	  	stroke: new ol.style.Stroke({
			color: '#ffcc33',
			width: 2,
	  	}),
	  	image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
		  		color: '#ffcc33',
			}),
	  	}),
	}),
});

/*********************************************************************************/

const point = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            scale: 0.05,
            src: 'https://www.pngall.com/wp-content/uploads/4/Red-Pin-PNG-Pic.png'
        })
    })
});

/*********************************************************************************/
var drawing = false;
//const restrictedExtent = [-180, -80, 180, 80];
const restrictedExtent = [-Infinity, -80, Infinity, 80];

const view = new ol.View({
    projection: 'EPSG:4326',
    center: [7.9883, 19.7963],
    zoom: 3,
    maxZoom: 17,
    minZoom: 3,
    extent: restrictedExtent
});

const map = new ol.Map({
    view: view,
    interactions: ol.interaction.defaults({
        doubleClickZoom: false // Disable double click zoom
    }),
    layers: [
        osm, neighbourhood, satellites, world, vector
    ],
    target: 'map'
});


/*view.on('pointerdrag', function(event) {
    const newCenter = view.getCenter();
    if (!ol.extent.containsCoordinate(restrictedExtent, newCenter)) {
        // If the new center is outside the restricted extent, prevent default
        event.preventDefault();
    }
});*/

/*********************************************************************************

var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

/*********************************************************************************/

map.on('click', function(e){
	var coords = map.getCoordinateFromPixel(e.pixel);
	
	var coordinates = JSON.stringify(coords);
	
	var poly = document.getElementById('drawPolygon');
    var line = document.getElementById('drawLineString');

    if (poly.classList.contains('active') || line.classList.contains('active')) {
        document.getElementById("zooms").style.display = "none";
    } else {
    	onWorld(coordinates);       
    }
});

map.once('postrender', () => {
   
});

function onWorld(coord){
	alert(coord);
	jQuery.ajax({
		type: "POST",
		url: 'Mapping.php',
		dataType: 'json',
		data: {
		    coord: coord
		},
		success: function (response, msg){		
			var string = '<div class="card-body">';		    
		    if(response.success == false){
		    	setTimeout(function() {
			  		document.getElementById("loadingMessage").style.display = "none";
				}, 2000);
		    	document.getElementById('loadingMessage').style.display = 'block';
				document.getElementById('loadingMessage').innerHTML = response.msg;
            }
            else {
            	document.getElementById("zooms").style.display = "block"; 
            	document.getElementById('countryid').innerHTML = response.country;
            	document.getElementById('capital').innerHTML = "";
            	document.getElementById('populatonid').innerHTML = "";
            	document.getElementById('continentid').innerHTML = response.continent;	
            	let areas = response.areas;
            	document.getElementById('sizeid').innerHTML = Number(areas).toFixed(2);
            }  
		},
        error: function(xhr, status, error){
        	setTimeout(function() {
				cancel();
			}, 2500);
			document.getElementById('loadingMessage').style.display = 'block';
			document.getElementById('loadingMessage').innerHTML = "Error Message: " + xhr.status + " " + xhr.statusText;
        }            
	});
}

function onZooms(lon, lat){
	jQuery.ajax({
		type: "POST",
		url: 'Zoom.php',
		dataType: 'json',
		data: {
		    lon: lon,
		    lat: lat
		},
		success: function (response, msg){		
			var string = '<div class="card-body">';		    
		    if(response.success == false){
		    	setTimeout(function() {
			  		document.getElementById("zooms").style.display = "none";
				}, 2000);
		    	document.getElementById("nodataview").style.display = "block";
                document.getElementById("cardview").style.display = "none";
                
                document.getElementById("nodataview").innerHTML = response.msg;
            }
            else {
            	document.getElementById("zoom-country").innerHTML = 'Fact Finding About ' + response.country;	
            }  
		},
        error: function(xhr, status, error){
        	alert("Error Message: " + xhr.status + " " + xhr.statusText); 
        }            
	});
}

map.addLayer(point);
map.render();





