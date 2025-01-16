const colors = [
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

const concepts = [
    {
        name: "Naturel",
        range: ["artificielle","naturelle"],
        description: "Classe la couleur selon qu'elle évoque la nature ou un aspect artificiel."
    },
    {
        name: "Émotion",
        range: ["mélancolique", "joyeuse"],
        description: "Classe la couleur selon l'émotion qu'elle évoque, de mélancolique à joyeuse."
    },
];