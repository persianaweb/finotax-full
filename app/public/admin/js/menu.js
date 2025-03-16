const menu = document.getElementById('menu');
const menuButton = document.getElementById('menuButton');
const menuButton2 = document.getElementById('menuButton2');
const icon = document.getElementById('icon').classList
console.log(icon)
function toggleMenu() {
    menu.classList.toggle('active-menu');
    if (menu.classList.length === 2) {
        icon.remove("fa-caret-left");
        icon.add("fa-caret-right");
    } else if (menu.classList.length === 1) {
        icon.add("fa-caret-left");
        icon.remove("fa-caret-right");
    }
}

$("#menuButton2").click(function (e) {
    toggleMenu()

});
$("#menuButton").click(function (e) {
    toggleMenu()

});
function closeMenu(e) {
    if (!menu.contains(e.target) && !menuButton.contains(e.target) && !menuButton2.contains(e.target)) {
        menu.classList.remove('active-menu');
        icon.remove("fa-caret-right");
        icon.add("fa-caret-left");
    }
}

document.addEventListener('click', closeMenu);