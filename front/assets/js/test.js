let diameter = 150;
let ySpeed = 10;
let gravityAcceleration = 0.2;
let width = window.innerWidth - 4;
let height = window.innerHeight - 4;
let dragging = false;
let offsetX, offsetY;
let lastMouseX, lastMouseY;
let velocityX = 0;
let velocityY = 0;
let xPosition = width / 2;
let yPosition = 0;
let bounceReduction = 0.8;
let concept =concepts[Math.floor(Math.random() * concepts.length)];
function setup() {
    createCanvas(width, height);
}

function draw() {
    fill(0);
    rect(0, 0, width / 2, height);

    fill(255);
    rect(width / 2, 0, width / 2, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(70);
    textStyle(BOLD);
    text(concept.range[0].toUpperCase(), width / 4, height / 8);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(70);
    textStyle(BOLD);
    text(concept.range[1].toUpperCase(), 3 * width / 4, height / 8);

    if (!dragging) {
        ySpeed = ySpeed + gravityAcceleration;
        yPosition = yPosition + ySpeed;

        if (yPosition + diameter / 2 > height) {
            ySpeed = -ySpeed * bounceReduction;
            yPosition = height - diameter / 2;
        } else if (yPosition - diameter / 2 < 0) {
            ySpeed = -ySpeed * bounceReduction;
            yPosition = diameter / 2;
        }

        xPosition += velocityX;
        yPosition += velocityY;

        if (xPosition + diameter / 2 > width) {
            xPosition = width - diameter / 2;
            velocityX = -velocityX * bounceReduction;
        } else if (xPosition - diameter / 2 < 0) {
            xPosition = diameter / 2;
            velocityX = -velocityX * bounceReduction;
        }

        velocityX *= 0.9;
        velocityY *= 0.9;
    }

    fill(200, 0, 0);
    ellipse(xPosition, yPosition, diameter, diameter);
}

function mousePressed() {
    let d = dist(mouseX, mouseY, xPosition, yPosition);
    if (d < diameter / 2) {
        dragging = true;
        offsetX = xPosition - mouseX;
        offsetY = yPosition - mouseY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
}

function mouseDragged() {
    if (dragging) {
        let newMouseX = mouseX;
        let newMouseY = mouseY;

        velocityX = (newMouseX - lastMouseX) * 2.5;
        velocityY = (newMouseY - lastMouseY) * 0.5;

        xPosition = newMouseX + offsetX;
        yPosition = newMouseY + offsetY;

        lastMouseX = newMouseX;
        lastMouseY = newMouseY;
    }
}

function mouseReleased() {
    dragging = false;
}