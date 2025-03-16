var colorBoxes = document.getElementsByClassName("color-box");

for (var i = 0; i < colorBoxes.length; i++) {
    var colorBox = colorBoxes[i];
    var colorCode = colorBox.innerHTML;
    colorBox.style.backgroundColor = colorCode;
}