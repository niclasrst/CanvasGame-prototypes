// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const colors = ['#ff5e57', '#3c40c6', '#485460', '#ffa801'];
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };

var pause = false;

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

addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('keydown', (e) => {
  if (e.keyCode == 27) { togglePause(); }
  if (e.keyCode == 39) { rightPressed = true; }
  if (e.keyCode == 37) { leftPressed = true; }
  if (e.keyCode == 40) { upPressed = true; }
  if (e.keyCode == 38) { downPressed = true; }
});

addEventListener('keyup', (e) => {
  if (e.keyCode == 39) { rightPressed = false; }
  if (e.keyCode == 37) { leftPressed = false; }
  if (e.keyCode == 40) { upPressed = false; }
  if (e.keyCode == 38) { downPressed = false; }
});

// Implementation
let bg;
let spaceship;
let shipWidth = shipHeight = 50;
let asteroids;

var speed;

function init() {
  bg = new Background(0, 0, canvas.width, canvas.height, '#F5F5F5', 2);

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

  spaceship = new Spaceship((canvas.width - shipWidth) / 2, (canvas.height - shipHeight) / 2, 'Sprites/Spaceship1.png', shipWidth, shipHeight, 5);
}

var pause_screen = new Image();
pause_screen.src = 'Sprites/pause_screen.png';

pause_screen.onload = () => {
  console.log('[+] pause_screen loaded.');
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  if (pause) {
    c.clearRect(0, 0, canvas.width, canvas.height);

    bg.draw();
    spaceship.draw();
    asteroids.forEach(asteroid => { asteroid.draw(); });

    c.fillStyle = 'rgba(52, 73, 94, 0.5)';
    c.font = '150px Verdana';
    c.fillText('Pause', canvas.width / 2 - c.measureText('Pause').width / 2, canvas.height / 2);
  }

  if (!pause) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    // Background
    bg.update();

    asteroids.forEach(asteroid => {
      asteroid.update();
    });

    // Spaceship
    spaceship.update();

    // --- Collision ---
    asteroids.forEach(asteroid => {
      if (distance(spaceship.x + spaceship.width, spaceship.y + spaceship.width, asteroid.x, asteroid.y) < asteroid.radius + spaceship.width) {
        asteroid.color = '#000';
      } else {
        asteroid.color = '#FF2200';
      }
    });
  }
}

// Start / Pause game
function StartGame() {
  return init(), animate(), document.querySelector('canvas').style.display = 'block', document.querySelector('div').style.display = 'none';
}
function togglePause() { pause = !pause; }
