let smb = document.getElementById("submitForm");
let valueX = document.getElementById("valueX");
let valueY = document.getElementById("valueY");
let axeX = document.getElementById("axeX");
let axeY = document.getElementById("axeY");
let results = []; // Change to an array

smb.addEventListener("click", function(event) {
    event.preventDefault();
    if(valueX.value === 0 && valueY.value === 0 ) {
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
    console.log(result.x.axe + " : " + result.x.value);
    console.log(result.y.axe + " : " + result.y.value);
    let finalResult = {
        palette: palette,
        base_color: baseColor,
        results: result,
    };
    results.push(finalResult);

    // Refresh the palette
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