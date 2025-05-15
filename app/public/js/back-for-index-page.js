document.getElementById("down").addEventListener("click", function() {
    let footer = document.querySelector("footer");
    if (footer) {
        footer.classList.remove("open-footer");
        footer.classList.add("close-footer"); 
    }
});

document.getElementById("down2").addEventListener("click", function() {
    let footer = document.querySelector("footer");
    if (footer) {
        footer.classList.remove("open-footer");
        footer.classList.add("close-footer"); 
    }
});

document.getElementById("down3").addEventListener("click", function() {
    let footer = document.querySelector("footer");
    if (footer) {
        footer.classList.remove("open-footer");
        footer.classList.add("close-footer"); 
    }
});


// document.getElementById("back").addEventListener("click", function (event) {
//     event.preventDefault(); 
//     window.history.back();
// });

document.getElementById("back").addEventListener("click", function (event) {
    event.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
    window.history.back(); // بازگشت به صفحه قبل

    // پس از 500 میلی‌ثانیه (نیم‌ثانیه) صفحه را ریفرش کن
    setTimeout(function () {
        window.location.reload();
    }, 500);
});


//
