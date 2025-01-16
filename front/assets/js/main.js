document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= 4; i++) {
        let smb = document.getElementById(`submitForm_slider${i}`);
        if (smb) {
            smb.addEventListener("click", function(event) {
                event.preventDefault();
                let valueX = document.getElementById(`valueX_slider${i}`);
                let valueY = document.getElementById(`valueY_slider${i}`);
                let axeX = document.getElementById(`axeX_slider${i}`);
                let axeY = document.getElementById(`axeY_slider${i}`);
                let results = localStorage.getItem("results") ? JSON.parse(localStorage.getItem("results")) : [];

                if ((valueX.value === 0 && valueY.value === 0) || (axeX.value === "none" || axeY.value === "none")) {
                    alert("Please select a position first");
                    return;
                }
                let result = {
                    x: {
                        value: Math.abs(valueX.value),
                        axe: axeX.value
                    },
                    y: {
                        value: Math.abs(valueY.value),
                        axe: axeY.value
                    }
                };
                let formattedPalette = formatPalette(palette);
                let finalResult = {
                    palette: formattedPalette,
                    base_color: baseColor,
                    results: result,
                };
                results.push(finalResult);
                console.log(results);
                localStorage.setItem("results", JSON.stringify(results));
                window.generateNewPalette();
            });
        } else {
            console.error(`Element with ID 'submitForm_slider${i}' not found.`);
        }
    }

    function exportDataJson() {
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
        header += "Base Color(h),Base Color(s),Base Color(l),X Axis,Y Axis\n";
        csvContent += header;

        results.forEach(result => {
            let paletteStr = result.palette.map(color => `${color.h},${color.s},${color.l}`).join(",");
            let baseColorStr = `${result.base_color.h},${result.base_color.s},${result.base_color.l}`;
            let xAxisStr = `${result.results.x.axe} : ${result.results.x.value}`;
            let yAxisStr = `${result.results.y.axe} : ${result.results.y.value}`;

            let row = [
                paletteStr,
                baseColorStr,
                xAxisStr,
                yAxisStr
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
});