// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const colors = ['#ff5e57', '#3c40c6', '#485460', '#ffa801'];

var started = false;
var pause = false;
var end = false;

var collisionOccured = false;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener('keydown', (e) => {
  if (e.keyCode === 27) { togglePause(); }
  if (e.keyCode === 39) { rightPressed = true; }
  if (e.keyCode === 37) { leftPressed = true; }
  if (e.keyCode === 40) { upPressed = true; }
  if (e.keyCode === 38) { downPressed = true; }
});

addEventListener('keyup', (e) => {
  if (e.keyCode === 39) { rightPressed = false; }
  if (e.keyCode === 37) { leftPressed = false; }
  if (e.keyCode === 40) { upPressed = false; }
  if (e.keyCode === 38) { downPressed = false; }
});

// Implementation
let bg;
let spaceship;
let shipWidth = shipHeight = 50;
let asteroids;

let score;
let deaths;

var speed;

function init() {
  bg = new Background(0, 0, canvas.width, canvas.height, '#F5F5F5', 2);
  score = new ScoreManager();
  deaths = new DeathManager();
  score.resetScore();
  deaths.resetDeaths();

  asteroids = [];
  for (let i = 0; i < 12; i++) {
    var radius = randomIntFromRange(5, 20);

    if (radius < 10) { speed = 2 + (Math.random() * 2); }
    else if (radius >= 10 && radius < 15) { speed = 4 + (Math.random() * 2); }
    else if (radius >= 15) { speed = 6 + (Math.random() * 2); }

    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = randomColor(colors);

    if (i !== 0) {
      for (let j = 0; j < asteroids.length; j++) {
        if (distance(x, y, asteroids[j].x, asteroids[j].y) - radius * 2 < 0) {
          x = canvas.width;
          y = randomIntFromRange(radius, canvas.height - radius);

          j = -1;
        }
      }
    }
    asteroids.push(new Asteroid(canvas.width, y, radius, color, speed));
  }
  spaceship = new Spaceship(canvas.width / 2 - shipWidth / 2, canvas.height / 2 - shipHeight / 2, 'Sprites/Spaceship1.png', shipWidth, shipHeight, 5);

  return animate();
}

// Animation Loop
function animate() {
  frameID = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if (pause) {
    bg.draw();
    asteroids.forEach(asteroid => { asteroid.draw(); });
    spaceship.draw();
    score.draw(30, 60);
    deaths.draw(canvas.width -  250, 60);

    c.fillStyle = 'rgba(52, 73, 94, 0.5)';
    c.font = '150px Verdana';
    c.fillText('Pause', canvas.width / 2 - c.measureText('Pause').width / 2, canvas.height / 2);
  }

  if (!pause) {
    bg.update();
    asteroids.forEach(asteroid => { asteroid.update(); });
    spaceship.update();
    score.draw(30, 60);
    deaths.draw(160, 60);

    // --- Collision ---
    asteroids.forEach(asteroid => {
      //if (collisionOccured) { return; } I thought might work...
      if (distance(spaceship.x + spaceship.width, spaceship.y + spaceship.width, asteroid.x, asteroid.y) < asteroid.radius + spaceship.width) {
        asteroid.color = '#000';
        console.log('Collision');
        collisionOccured = true;
      } else {
        asteroid.color = '#FF2200';
      }
    });
  }
}

// Start / Pause / End game
function StartGame() {
  started = true;
  return init(), document.querySelector('canvas').style.display = 'block', document.querySelector('div').style.display = 'none';
}

function togglePause() { if (started) { pause = !pause; }}

function stop() {
  end = true;
  return cancelAnimationFrame(frameID), c.clearRect(0, 0, canvas.width, canvas.height);
}

function collision() {}
