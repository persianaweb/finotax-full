function toggleMenu2(event, menuBox) {
    var menuBoxes = document.querySelectorAll('.menu-box');
    for (var i = 0; i < menuBoxes.length; i++) {
            menuBoxes[i].classList.remove('active');
    }

    var targetMenuBox = document.querySelector('.' + menuBox);
    targetMenuBox.classList.add('active');
}