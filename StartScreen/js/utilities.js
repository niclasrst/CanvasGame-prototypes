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

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

function resolveCollision(particle1, particle2) {
  const xVelocityDiff = particle1.velocity.x - particle2.velocity.x;
  const yVelocityDiff = particle1.velocity.y - particle2.velocity.y;

  const xDistance = particle2.x - particle1.x;
  const yDistance = particle2.y - particle1.y;

  if (xVelocityDiff * xDistance + yVelocityDiff * yDistance >= 0) {
    const angle = -Math.atan2(particle2.y - particle1.y, particle2.x - particle1.x);

    const m1 = particle1.mass;
    const m2 = particle2.mass;

    // velocity before equation
    const u1 = rotate(particle1.velocity, angle);
    const u2 = rotate(particle2.velocity, angle);

    // velocity after first collision equation
    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    // final velocity after rotating back
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    particle1.velocity.x = vFinal1.x;
    particle1.velocity.y = vFinal1.y;

    particle2.velocity.x = vFinal2.x;
    particle2.velocity.y = vFinal2.y;
  }
}
