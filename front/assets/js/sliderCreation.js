function createSliderHTML() {
    const scaleDiv = document.createElement('div');
    scaleDiv.className = 'scale';

    const sliderAxisDiv = document.createElement('div');
    sliderAxisDiv.className = 'slider_axis';

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    p2.id = 'axeY_min';
    p2.textContent = 'test';
    const p3 = document.createElement('p');

    const p4 = document.createElement('p');
    p4.id = 'axeX_min';
    p4.textContent = 'test';
    const sliderContainerDiv = document.createElement('div');
    sliderContainerDiv.id = 'sliderContainer';
    const p5 = document.createElement('p');
    p5.id = 'axeX_max';
    p5.textContent = 'test';

    const p6 = document.createElement('p');
    const p7 = document.createElement('p');
    p7.id = 'axeY_max';
    p7.textContent = 'test';
    const p8 = document.createElement('p');

    sliderAxisDiv.append(p1, p2, p3, p4, sliderContainerDiv, p5, p6, p7, p8);

    const form = document.createElement('form');

    const inputValueX = document.createElement('input');
    inputValueX.type = 'hidden';
    inputValueX.id = 'valueX';
    inputValueX.value = '0';

    const inputAxeX = document.createElement('input');
    inputAxeX.type = 'hidden';
    inputAxeX.id = 'axeX';
    inputAxeX.value = 'none';

    const inputValueY = document.createElement('input');
    inputValueY.type = 'hidden';
    inputValueY.id = 'valueY';
    inputValueY.value = '0';

    const inputAxeY = document.createElement('input');
    inputAxeY.type = 'hidden';
    inputAxeY.id = 'axeY';
    inputAxeY.value = 'none';

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Next';
    submitButton.id = 'submitForm';

    const stepCounter = document.createElement('span');
    stepCounter.id = 'stepCounter';
    stepCounter.textContent = `Step: 1/`+concepts.length;

    form.append(inputValueX, inputAxeX, inputValueY, inputAxeY, submitButton, stepCounter);

    scaleDiv.append(sliderAxisDiv, form);

    document.body.appendChild(scaleDiv);
}

createSliderHTML();