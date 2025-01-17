let smb = document.getElementById("submitForm");
let valueX = document.getElementById("valueX");
let valueY = document.getElementById("valueY");
let axeX = document.getElementById("axeX");
let axeY = document.getElementById("axeY");
let conceptsResults = new Array();
let results = localStorage.getItem("results") ? JSON.parse(localStorage.getItem("results")) : [];
function resetAxes() {
    valueX.value = 0;
    valueY.value = 0;
    axeX.value = "none";
    axeY.value = "none";
    axes = getConcepts();
    window.resetSlider();
    document.getElementById("axeX_min").innerHTML = axes.x.range[0];
    document.getElementById("axeX_max").innerHTML = axes.x.range[1];
    document.getElementById("axeY_min").innerHTML = axes.y.range[1];
    document.getElementById("axeY_max").innerHTML = axes.y.range[0];
}

smb.addEventListener("click", function(event) {
    event.preventDefault();
    if((valueX.value === 0 && valueY.value === 0) || (axeX.value === "none" || axeY.value === "none")) {
        alert("Please select a position first");
        return;
    }
    let result = {
        x:{
            value: Math.abs(valueX.value),
            axe: axeX.value
        },
        y:{
            value: Math.abs(valueY.value),
            axe: axeY.value
        }
    };
    conceptsResults.push(result);
    if (conceptsCounter+1 <= concepts.length) {
        if(conceptsCounter+1 === concepts.length){
            smb.value = "Finish";
        }
        resetAxes();
        document.getElementById('stepCounter').textContent = `Step: ${conceptsCounter}/${concepts.length}`;
        return;
    }
    console.log(conceptsResults);
    conceptsCounter = 0;
    smb.value = "Next";
    resetAxes();


    let formattedPalette = formatPalette(palette);
    let finalResult = {
        palette: formattedPalette,
        base_color: baseColor,
        results: conceptsResults,
    };
    results.push(finalResult);
    console.log(results);
    localStorage.setItem("results", JSON.stringify(results));
    window.generateNewPalette();
    document.getElementById('stepCounter').textContent = `Step: ${conceptsCounter}/${concepts.length}`;
});

function exportDataJson(){
    const filename = 'data_colors_generator.json';
    const jsonStr = JSON.stringify(JsonExport);

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.getElementById("resetData").addEventListener("click", function() {
    if (confirm("Are you sure you want to reset the data?")) {
        localStorage.removeItem("results");
        location.reload();
    }
});

document.getElementById("exportCSV").addEventListener("click", function() {
    let results = localStorage.getItem("results") ? JSON.parse(localStorage.getItem("results")) : [];
    if (results.length === 0) {
        alert("No data to export");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    let header = "";
    if (results.length > 0 && results[0].palette.length > 0) {
        results[0].palette.forEach((_, index) => {
            header += `Color ${index + 1} (h),Color ${index + 1} (s),Color ${index + 1} (l),`;
        });
    }
    header += "Base Color(h),Base Color(s),Base Color(l),";
    for (let i = 0; i < concepts.length; i++) {
        header += `Step ${i + 1} Concept 1 Name,Step ${i + 1} Concept 1 Value,Step ${i + 1} Concept 2 Name,Step ${i + 1} Concept 2 Value,`;
    }
    csvContent += header.slice(0, -1) + "\n";

    results.forEach(result => {
        let paletteStr = result.palette.map(color => `${color.h},${color.s},${color.l}`).join(",");
        let baseColorStr = `${result.base_color.h},${result.base_color.s},${result.base_color.l}`;
        let conceptsStr = result.results.map(conceptResult => {
            return `${conceptResult.x.axe},${conceptResult.x.value},${conceptResult.y.axe},${conceptResult.y.value}`;
        }).join(",");

        let row = [
            paletteStr,
            baseColorStr,
            conceptsStr
        ].join(",");
        csvContent += row + "\n";
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_colors_generator.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

function formatPalette(palette) {
    return palette.map(color => {
        return {
            h: color.hsla[0].toFixed(2) * 360,
            s: (color.hsla[1] * 100).toFixed(2),
            l: (color.hsla[2] * 100).toFixed(2)
        };
    });
}