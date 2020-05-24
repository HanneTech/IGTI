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

function handleInputRangeChange(event) {
  var currentValue = event.target.value;
  var id = event.target.id;
  document.getElementById('value' + id).value = currentValue;
  let red = document.getElementById('valueR').value;
  let green = document.getElementById('valueG').value;
  let blue = document.getElementById('valueB').value;
  let color = 'RGB(' + red + ',' + green + ',' + blue + ')';
  document.getElementById('box-color').style.backgroundColor = color;
  document.getElementById('vRGB').value = color;
  document.getElementById('vHexa').value =
    'HEXA: #' + RGBtoHexa(red) + RGBtoHexa(green) + RGBtoHexa(blue);
}
