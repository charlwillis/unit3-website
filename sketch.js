let sceneState = 0;      // 0 = day, 1 = sunset, 2 = night
let radius = 60;         // Sun/moon radius
let isHovered = false;

let sunAngle = 4;        // Controls the sun's position (in radians)
let sunSpeed = 0.001;    // Speed of the sun/moon movement

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
}

function draw() {
  drawSky();
  drawCity();

  // Update sun angle
  sunAngle += sunSpeed;
  if (sunAngle > TWO_PI) {
    sunAngle = 0; // reset after full rotation
  }

  // Get sun/moon position on an arc
let sunX = map(sunAngle, 0, TWO_PI, 0, width); // moves left to right
let sunY = height / 8; // fixed y-position near the top

  // Hover detection (circle hit test)
  let d = dist(mouseX, mouseY, sunX, sunY);
  if (d < radius) {
    if (!isHovered) {
      sceneState = (sceneState + 1) % 3; // Cycle scenes
    }
    isHovered = true;
  } else {
    isHovered = false;
  }

  drawSunOrMoon(sunX, sunY);
}

// Sky color based on scene
function drawSky() {
  if (sceneState === 0) {
    background(82, 225, 247); // Day
  } else if (sceneState === 1) {
    background(255, 153, 204); // Sunset
  } else {
    background(15, 15, 50); // Night
  }
}

// Draw sun or moon at position
function drawSunOrMoon(sx, sy) {
  noStroke();
  if (sceneState === 0) {
    fill(247, 231, 82); // Yellow sun
  } else if (sceneState === 1) {
    fill(255, 100, 0); // Sunset orange
  } else {
    fill(198, 201, 204);         // Moon
  }

  ellipse(sx, sy, radius * 2, radius * 2);
}

// Draw basic city silhouette
function drawCity() {
  noStroke();
  let buildingColor;

  if (sceneState === 0) {
    buildingColor = [70, 72, 74]; // Day
  } else if (sceneState === 1) {
    buildingColor = [80, 40, 80]; // Sunset
  } else {
    buildingColor = [20, 20, 20]; // Night
  }

  fill(buildingColor);

  // Freeze building layout by using noise for consistency
  for (let i = 0; i < width; i += 60) {
    let h = noise(i * 0.01) * height * 0.5 + height * 0.3;
    rect(i, height - h, 60, h);
  }
}

// Responsive design
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}