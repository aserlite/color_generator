let smb = document.getElementById("submitForm");
let valueX = document.getElementById("valueX");
let valueY = document.getElementById("valueY");
let axeX = document.getElementById("axeX");
let axeY = document.getElementById("axeY");
let results = localStorage.getItem("results") ? JSON.parse(localStorage.getItem("results")) : [];

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
    console.log(palette);
    console.log(result);
    let finalResult = {
        palette: palette,
        base_color: baseColor,
        results: result,
    };
    results.push(finalResult);
    localStorage.setItem("results", JSON.stringify(results));
    window.generateNewPalette();
});

function exportData(){
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
    csvContent += "Palette,Base Color,X Axis,Y Axis\n";

    results.forEach(result => {
        let row = [
            result.palette,
            result.base_color,
            `${result.results.x.axe} : ${result.results.x.value}`,
            `${result.results.y.axe} : ${result.results.y.value}`
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