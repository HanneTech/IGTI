window.addEventListener('load', start);

function start() {
  var valueRed = document.querySelector('#R');
  var valueGreen = document.querySelector('#G');
  var valueBlue = document.querySelector('#B');

  valueRed.addEventListener('input', handleInputRangeChange);
  valueGreen.addEventListener('input', handleInputRangeChange);
  valueBlue.addEventListener('input', handleInputRangeChange);
}

function RGBtoHexa(c) {
  let colorInt = parseInt(c).toString(16);
  let hex = colorInt.length == 1 ? '0' + colorInt : colorInt;
  return hex;
}

function RGBtoCMYK(R, G, B) {
  if (R == 0 && G == 0 && B == 0) {
    return [0, 0, 0, 1];
  } else {
    let calcR = 1 - R / 255;
    let calcG = 1 - G / 255;
    let calcB = 1 - B / 255;

    let K = Math.min(calcR, Math.min(calcG, calcB));
    let C = (calcR - K) / (1 - K);
    let M = (calcG - K) / (1 - K);
    let Y = (calcB - K) / (1 - K);

    var resultC = Math.round(C * 100);
    var resultM = Math.round(M * 100);
    var resultY = Math.round(Y * 100);
    var resultK = Math.round(K * 100);

    return resultC + ',' + resultM + ',' + resultY + ',' + resultK;
  }
}

function handleInputRangeChange(event) {
  var currentValue = event.target.value;
  var id = event.target.id;
  document.getElementById('value' + id).value = currentValue;
  let red = document.getElementById('valueR').value;
  let green = document.getElementById('valueG').value;
  let blue = document.getElementById('valueB').value;
  let black = 1;
  let color = 'RGB(' + red + ',' + green + ',' + blue + ')';
  document.getElementById('box-color').style.backgroundColor = color;
  document.getElementById('vRGB').value = color;
  document.getElementById('vHEXA').value =
    'HEXA: #' + RGBtoHexa(red) + RGBtoHexa(green) + RGBtoHexa(blue);
  document.getElementById('vCMYK').value =
    'CMYK: ' + RGBtoCMYK(red, green, blue);
}
