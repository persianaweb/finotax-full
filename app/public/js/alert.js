document.querySelectorAll(".block").forEach(function(block) {
    block.addEventListener("click", function() {
        let alert = document.getElementById("alert");
        if (alert) {
            alert.classList.toggle("show");
        }
    });
});


document.querySelector(".close").addEventListener("click", function() {
    let alert = document.getElementById("alert");
    if (alert) {
        alert.classList.toggle("show");
    }
});