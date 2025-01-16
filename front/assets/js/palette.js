let palette = [];
let baseColor = colors[Math.floor(Math.random() * colors.length)].hsl;

let paletteSketch = (s) => {
    let size = 600;
    const paletteCount = 4;

    s.setup = () => {
        s.colorMode(s.HSL);
        s.createCanvas(size, size);
        s.noLoop();
    };

    s.draw = () => {
        s.background(220);
        generateNewPalette();
    };

    function generatePalette(baseColor, count) {
        let palette = [];
        for (let i = 0; i < count; i++) {
            let h = s.hue(baseColor) + s.random(-30, 30);
            let sat = s.saturation(baseColor) + s.random(-20, 20);
            let light = s.lightness(baseColor) + s.random(-10, 10);
            palette.push(s.color(h, sat, light));
        }
        palette.sort((a, b) => s.lightness(a) - s.lightness(b));
        return palette;
    }

    function generatePaletteFromColorSet(count) {
        let p5BaseColor = s.color(baseColor.h, baseColor.s, baseColor.l);
        return generatePalette(p5BaseColor, count);
    }

    window.generateNewPalette = function() {
        baseColor = colors[Math.floor(Math.random() * colors.length)].hsl;
        palette = generatePaletteFromColorSet(paletteCount);
        let stripeWidth = s.width / palette.length;

        for (let i = 0; i < palette.length; i++) {
            s.fill(palette[i]);
            s.rect(i * stripeWidth, 0, stripeWidth, s.height);
        }
    };
};

new p5(paletteSketch, "paletteContainer");