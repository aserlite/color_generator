function createSliderHTML(id, concept) {
    const scaleDiv = document.createElement('div');
    scaleDiv.className = 'scale';

    const sliderAxisDiv = document.createElement('div');
    sliderAxisDiv.className = 'slider_axis';

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    p2.id = `axeY_min_${id}`;
    p2.textContent = concept.ranges[1].range[0];
    const p3 = document.createElement('p');

    const p4 = document.createElement('p');
    p4.id = `axeX_min_${id}`;
    p4.textContent = concept.ranges[0].range[0];
    const sliderContainerDiv = document.createElement('div');
    sliderContainerDiv.id = `sliderContainer_${id}`;
    const p5 = document.createElement('p');
    p5.id = `axeX_max_${id}`;
    p5.textContent = concept.ranges[0].range[1];

    const p6 = document.createElement('p');
    const p7 = document.createElement('p');
    p7.id = `axeY_max_${id}`;
    p7.textContent = concept.ranges[1].range[1];
    const p8 = document.createElement('p');

    sliderAxisDiv.append(p1, p2, p3, p4, sliderContainerDiv, p5, p6, p7, p8);

    const form = document.createElement('form');

    const inputValueX = document.createElement('input');
    inputValueX.type = 'hidden';
    inputValueX.id = `valueX_${id}`;
    inputValueX.value = '0';

    const inputAxeX = document.createElement('input');
    inputAxeX.type = 'hidden';
    inputAxeX.id = `axeX_${id}`;
    inputAxeX.value = 'none';

    const inputValueY = document.createElement('input');
    inputValueY.type = 'hidden';
    inputValueY.id = `valueY_${id}`;
    inputValueY.value = '0';

    const inputAxeY = document.createElement('input');
    inputAxeY.type = 'hidden';
    inputAxeY.id = `axeY_${id}`;
    inputAxeY.value = 'none';

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Next';
    submitButton.id = `submitForm_${id}`;

    form.append(inputValueX, inputAxeX, inputValueY, inputAxeY, submitButton);

    scaleDiv.append(sliderAxisDiv, form);

    document.body.appendChild(scaleDiv);
}