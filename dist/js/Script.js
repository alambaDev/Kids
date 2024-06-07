let satellite;
let gameContainer;
let obstacles = [];
let obstacleIntervals = [];
let gameSpeed = 5;
let gameInterval;
let isPaused = false;
let score = 0;

function startGame() {
    satellite = document.getElementById('satellite');
    gameContainer = document.getElementById('gameContainer');
    document.addEventListener('keydown', moveSatellite);
    gameInterval = setInterval(createObstacle, 1000);
    
    document.getElementById("startgame").style.display = "none";
    document.getElementById("pausegame").style.display = "block";
    document.getElementById("stopgame").style.display = "block";
    document.getElementById("resumegame").style.display = "none";
    document.getElementById("score").style.display = "block";
    
    score = 0;
    updateScore();
}

function moveSatellite(event) {
    if (isPaused) return;

    const key = event.key;
    const satelliteRect = satellite.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();

    if (key === 'ArrowUp' && satelliteRect.top > gameRect.top) {
        satellite.style.top = satellite.offsetTop - 15 + 'px';
    }
    if (key === 'ArrowDown' && satelliteRect.bottom < gameRect.bottom) {
        satellite.style.top = satellite.offsetTop + 15 + 'px';
    }
    if (key === 'ArrowLeft' && satelliteRect.left > gameRect.left) {
        satellite.style.left = satellite.offsetLeft - 15 + 'px';
    }
    if (key === 'ArrowRight' && satelliteRect.right < gameRect.right) {
        satellite.style.left = satellite.offsetLeft + 15 + 'px';
    }
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');

    let position;
    if (Math.random() < 0.5) {
        position = Math.floor(Math.random() * 200); // More obstacles on the left (slowest)
    } else if (Math.random() < 0.75) {
        position = 200 + Math.floor(Math.random() * 200); // Fewer obstacles in the middle (slower)
    } else {
        position = 400 + Math.floor(Math.random() * 200); // Least obstacles on the right (slow)
    }

    obstacle.style.left = position + 'px';
    obstacle.style.top = '400px';
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    const obstacleLeft = obstacle.offsetLeft;
    const containerWidth = gameContainer.clientWidth;
    
    var value = document.getElementById("gamespeed").value;
    if(value == "" || value == null)
    	gameSpeed = gameSpeed;
	else 
		gameSpeed = value;	
    

    let speedMultiplier;
    if (obstacleLeft < containerWidth / 3) {
        speedMultiplier = 1;
    } else if (obstacleLeft < 2 * containerWidth / 3) {
        speedMultiplier = 0.5;
    } else {
        speedMultiplier = 0.25;
    }

    const move = setInterval(() => {
        if (isPaused) return;

        if (obstacle.offsetTop <= -50) {
            obstacle.remove();
            clearInterval(move);
            score++;
            updateScore();
        } else {
            obstacle.style.top = obstacle.offsetTop - gameSpeed * speedMultiplier + 'px';
        }

        // Check for collision
        if (checkCollision(satellite, obstacle)) {
            gameOver();
            clearInterval(move);
        }
    }, 20);

    obstacleIntervals.push(move);
}

function checkCollision(satellite, obstacle) {
    const satelliteRect = satellite.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        satelliteRect.top > obstacleRect.bottom ||
        satelliteRect.bottom < obstacleRect.top ||
        satelliteRect.right < obstacleRect.left ||
        satelliteRect.left > obstacleRect.right
    );
}

function gameOver() {
    clearInterval(gameInterval);
    obstacleIntervals.forEach(clearInterval);
    obstacleIntervals = [];
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];

	setTimeout(function() {
		cancel();
	}, 1000);
	document.getElementById('loadingMessage').style.display = 'block';
	document.getElementById('loadingMessage').innerHTML = 'Game Over! Your score: ' + score;
    
    document.getElementById("startgame").style.display = "block";
    document.getElementById("pausegame").style.display = "none";
    document.getElementById("resumegame").style.display = "none";

    satellite.style.top = '175px';
    satellite.style.left = '275px';

    startGame();
}

function pauseGame() {
    isPaused = true;
    
    document.getElementById("startgame").style.display = "none";
    document.getElementById("pausegame").style.display = "none";
    document.getElementById("resumegame").style.display = "block";
}

function resumeGame() {
    isPaused = false;
    
    document.getElementById("startgame").style.display = "none";
    document.getElementById("pausegame").style.display = "block";
    document.getElementById("resumegame").style.display = "none";
}

function stopGame() {
    clearInterval(gameInterval);
    obstacleIntervals.forEach(clearInterval);
    obstacleIntervals = [];
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];

    document.removeEventListener('keydown', moveSatellite);
    
    document.getElementById("startgame").style.display = "block";
    document.getElementById("pausegame").style.display = "none";
    document.getElementById("resumegame").style.display = "none";
    document.getElementById("score").style.display = "none";

    satellite.style.top = '175px';
    satellite.style.left = '275px';
    
    if(score > 0){
    	setTimeout(function() {
			cancel();
		}, 1000);
    	document.getElementById('loadingMessage').style.display = 'block';
    	document.getElementById('loadingMessage').innerHTML = 'Game Stopped! Your score: ' + score;
	}
}

function cancel() {
	document.getElementById("loadingMessage").style.display = "none";	
}

function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
   	
   	if(score == 400){
   		stopGame();
   		document.getElementById('loadingMessage').style.display = 'block';
   		document.getElementById('loadingMessage').innerHTML = 'Congratulations! Record broken ' +
   		'<p class = "text-center mt-3">' + 
   			'<button type="button" onclick="redirect()" class="btn btn-outline-secondary sr-2"> Upgrade </button>' + 
   			'<button type="button" onclick="cancel()" class="btn btn-outline-secondary"> Cancel </button>' + 
   		'</p>';
   	}
   	
   	else if (score >= 20 && score <= 405 && score % 20 === 0) {
        gameSpeed++;
        pauseGame(); 
        document.getElementById("gamespeed").value = gameSpeed;
        
        setTimeout(function() {
			cancel();
		}, 7000);
    	document.getElementById('loadingMessage').style.display = 'block';
    	document.getElementById('loadingMessage').innerHTML = 'Ask if user wants to upgrade | Game speed increased to ' + gameSpeed + 
    	' <button type="button" onclick="redirect()" class="btn btn-outline-secondary"> Upgrade </button>';
    }
}





