// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = Math.abs(x1 - x2);
  const yDist = Math.abs(y1 - y2);

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
