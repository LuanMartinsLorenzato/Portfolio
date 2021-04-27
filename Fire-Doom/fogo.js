const firedPixel = [];
const fireW = 80;
const fireH = 70;
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];

function start() {
    strutureFire();
    createFireSource();
    renderFire();

    setInterval(calcFirePropagation, 1);
}

function strutureFire() {
    const numOfpixels = fireW * fireH;

    for(let i = 0; i < numOfpixels; i++){
        firedPixel[i] = 0;
    }
}

function calcFirePropagation()  {
    for(let col = 0; col < fireW; col++){
        for(let row = 0; row < fireH; row++){
            const pixelIndex = col + (fireW * row);
            updateFire(pixelIndex);
        }
    }
    renderFire();
}

function updateFire(currentPixelIn) {
    const belowPixelIn = currentPixelIn + fireW;
    if(belowPixelIn >= fireW * fireH){
        return;
    }
    const decay = Math.floor(Math.random() * 2);
    const belowPFI = firedPixel[belowPixelIn];
    const newFireInte = belowPFI - decay >= 0 ? belowPFI - decay : 0;

    firedPixel[currentPixelIn - decay] = newFireInte;
}

function renderFire()  {
    const debug = false;
    let html = '<table cellpadding=1 cellspacing=0 align = "Center">'

    for(let row = 0; row < fireH; row++){
        html += '<tr>';

        for(let col = 0; col < fireW; col++){

            const pixelIn = col + (fireW * row);
            const fireintense = firedPixel[pixelIn];

            if(debug === true)
            {
                html += '<td>';
                html += `<div class="pixel-index">${pixelIn}</div>`;
                html += fireintense;
                html += '</td>';
            }
            else
            {
                const color = fireColorsPalette[fireintense];
                const colorString =`${color.r},${color.g},${color.b}`;
                html += `<td class = "pixel" style="background-color: rgb(${colorString})">`;
                html += '</td>';
            }
        }

        html += '</tr>';
    }

    html += '</table>'
    document.querySelector('#firedCanvas').innerHTML = html;
}

function createFireSource(){
    for(let col = 0; col <= fireW; col++){
        const overFlowPixelIn = fireW * fireH;
        const pixelIn = (overFlowPixelIn - fireW) + col;

        firedPixel[pixelIn] = 36;
    } 
}

start();