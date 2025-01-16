const axes = {
    x: {
        name: "Naturel",
        range: ["naturelle", "artificielle"],
        description: "Classe la couleur selon qu'elle évoque la nature ou un aspect artificiel."
    },
    y: {
        name: "Émotion",
        range: ["mélancolique", "joyeuse"],
        description: "Classe la couleur selon l'émotion qu'elle évoque, de mélancolique à joyeuse."
    }
};
// Write axes titles
document.getElementById("axeX_min").innerHTML = axes.y.range[0];
document.getElementById("axeX_max").innerHTML = axes.y.range[1];
document.getElementById("axeY_min").innerHTML = axes.x.range[0];
document.getElementById("axeY_max").innerHTML = axes.x.range[1];

let sliderSketch = (s) => {
    let range = 10;
    let sliderWidth = 400;
    let sliderHeight = 400;
    let xScale, yScale;
    let valueX = 0, valueY = 0;
    let dragging = false;
    let handleRadius = 20;

    s.setup = () => {
        s.createCanvas(sliderWidth, sliderHeight);

        xScale = (val) => s.map(val, -range, range, 0, sliderWidth);
        yScale = (val) => s.map(val, -range, range, 0, sliderHeight);
        valueX = 0;
        valueY = 0;
        s.strokeWeight(2);
        s.stroke(255, 250, 250);
    };

    s.draw = () => {
        s.fill(17, 17, 17, 100);
        s.rect(0, 0, sliderWidth, sliderHeight);

        s.line(sliderWidth / 2, 0, sliderWidth / 2, sliderHeight); // Axe Y
        s.line(0, sliderHeight / 2, sliderWidth, sliderHeight / 2); // Axe X
        s.fill(17, 17, 17, 100);

        // Draw handle
        let handleX = xScale(valueX);
        let handleY = yScale(valueY);
        s.fill(100, 150, 255);
        s.ellipse(handleX, handleY, handleRadius * 2);
    };

    // Mouse events
    s.mousePressed = () => {
        let handleX = xScale(valueX);
        let handleY = yScale(valueY);
        if (s.dist(s.mouseX, s.mouseY, handleX, handleY) < handleRadius) {
            dragging = true;
        }
    };
    s.mouseDragged = () => {
        if (dragging) {
            let clampedX = s.constrain(s.mouseX, 0, sliderWidth);
            let clampedY = s.constrain(s.mouseY, 0, sliderHeight);
            valueX = Math.round(s.map(clampedX, 0, sliderWidth, -range, range));
            valueY = Math.round(s.map(clampedY, 0, sliderHeight, -range, range));
            updateValuesInDOM(valueX, -valueY);
        }
    };
    s.mouseReleased = () => {
        dragging = false;
    };

    function updateValuesInDOM(x, y) {
        document.getElementById("valueX").value = x;
        document.getElementById("valueY").value = y;

        if (x < 0) {
            document.getElementById("axeX").value = axes.y.range[0];
        } else {
            document.getElementById("axeX").value = axes.y.range[1];
        }

        if (y < 0) {
            document.getElementById("axeY").value = axes.x.range[1];
        } else {
            document.getElementById("axeY").value = axes.x.range[0];
        }
    }
};

new p5(sliderSketch, "sliderContainer");