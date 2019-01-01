// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(Math.abs(x1 -  x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
}
