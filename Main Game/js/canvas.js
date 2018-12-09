// file:///Users/niclasrist/Documents/GitHub/CanvasGame-prototypes/Main%20Game/index.html
// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
const colors = ['#ff5e57', '#3c40c6', '#485460', '#ffa801'];

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
let asteroids;

var speed;

function init() {
  document.body.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  bg = new Background(0, 0, canvas.width, canvas.height, '#F5F5F5', 2);

  asteroids = [];

  for (let i = 0; i < 12; i++) {
    var radius = randomIntFromRange(5, 20);

    if (radius < 10) { speed = 2 + (Math.random() * 2); }
    else if (radius >= 10 && radius < 15) { speed = 4 + (Math.random() * 2); }
    else if (radius >= 15 && radius < 20) { speed = 6 + (Math.random() * 2); }

    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = randomColor(colors);

    if (i !== 0) {
      for (let j = 0; j < asteroids.length; j++) {
        if (distance(x, y, asteroids[j].x, asteroids[j].y) - radius * 2 < 0) {
          x = canvas.width;//randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          j = -1;
        }
      }
    }
    asteroids.push(new Asteroid(canvas.width, y, radius, color, speed))
  }

  spaceship = new Spaceship((canvas.width - 50) / 2, (canvas.height - 50) / 2, 'Sprites/Spaceship1.png', 5);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  bg.update();

  asteroids.forEach(asteroid => {
    asteroid.update();
  });

  spaceship.update();

  // --- Collision ---
  asteroids.forEach(asteroid => {
    if (distance(spaceship.x + spaceship.width, spaceship.y + spaceship.width, asteroid.x, asteroid.y) < asteroid.radius + spaceship.width) {
      console.log('[*] Collision!');
      asteroid.color = '#000';
    }
  });
}

// Start game on button click
function StartGame() {
  return init(), animate(), document.querySelector('canvas').style.display = 'block', document.querySelector('div').style.display = 'none';
}
