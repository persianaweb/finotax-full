function showColor() {
    var colorPicker = document.getElementById("colorPicker");
    var colorDisplay = document.getElementById("colorDisplay");

    var selectedColor = colorPicker.value;
    colorDisplay.style.backgroundColor = selectedColor;
    colorDisplay.textContent = selectedColor;
  }