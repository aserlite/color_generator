let palette = [];

const classificationCriteria = {
    climate: ["passive", "active", "dull", "bright"],
    temperature: ["cold", "warm", "wet", "dry"],
    aroma: ["sugary", "bitter", "mild", "acid"],
    sound: ["silent", "noisy", "harsh", "harmonious"],
    emotion: ["calm", "energetic", "melancholic", "joyful"]
};

const colorPalette = [
    {name: "Sunset Orange", hsl: {h: 15, s: 100, l: 55}},
    {name: "Deep Blue", hsl: {h: 240, s: 63, l: 47}},
    {name: "Lime Green", hsl: {h: 90, s: 75, l: 53}},
    {name: "Soft Pink", hsl: {h: 330, s: 100, l: 73}},
    {name: "Golden Yellow", hsl: {h: 45, s: 100, l: 70}},
    {name: "Lavender", hsl: {h: 270, s: 50, l: 65}},
    {name: "Crimson Red", hsl: {h: 0, s: 80, l: 50}},
    {name: "Teal", hsl: {h: 180, s: 40, l: 50}},
    {name: "Warm Beige", hsl: {h: 30, s: 33, l: 85}},
    {name: "Bright Cyan", hsl: {h: 190, s: 100, l: 50}},
    {name: "Forest Green", hsl: {h: 120, s: 35, l: 40}},
    {name: "Rich Purple", hsl: {h: 280, s: 43, l: 40}},
    {name: "Sky Blue", hsl: {h: 200, s: 70, l: 78}},
    {name: "Peach", hsl: {h: 20, s: 100, l: 70}},
    {name: "Charcoal Gray", hsl: {h: 0, s: 0, l: 16}},
    {name: "Mint Green", hsl: {h: 150, s: 33, l: 70}},
    {name: "Soft Violet", hsl: {h: 290, s: 25, l: 58}},
    {name: "Burnt Sienna", hsl: {h: 25, s: 50, l: 45}},
    {name: "Electric Purple", hsl: {h: 270, s: 100, l: 60}},
    {name: "Sunny Yellow", hsl: {h: 50, s: 100, l: 75}}
];

const baseColor = colorPalette[Math.floor(Math.random() * colorPalette.length)].hsl;
const palette_count = 5;
let sliders = [];

let paletteSketch = (s) => {
    let size = 600;
    const paletteCount = 5;

    s.setup = () => {
        s.colorMode(s.HSL);
        s.createCanvas(size, size);
        s.noLoop();
    };

    s.draw = () => {
        s.background(220);

        palette = generatePaletteFromColorSet(paletteCount);
        let stripeWidth = s.width / palette.length;

        for (let i = 0; i < palette.length; i++) {
            s.fill(palette[i]);
            s.rect(i * stripeWidth, 0, stripeWidth, s.height);
        }
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

};

new p5(paletteSketch, "paletteContainer");

