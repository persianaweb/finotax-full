

setTimeout(function () {
    let element = document.getElementById("main-container");
    if (element) {
        element.classList.add("flex-column");
    }
}, 3000);

// document.getElementById("acc").addEventListener("click", function() {
//     let footer = document.querySelector("footer");
//     if (footer) {
//         footer.classList.add("open-footer");
//     }
// });

document.getElementById("acc").addEventListener("click", function () {
    togglePages('accPage', 'financePage', 'taxPage');
});

document.getElementById("finance").addEventListener("click", function () {
    togglePages('financePage', 'accPage', 'taxPage');
});

document.getElementById("tax").addEventListener("click", function () {
    togglePages('taxPage', 'accPage', 'financePage');
});

function togglePages(activePageId, page1Id, page2Id) {
    let footer = document.querySelector("footer");
    let activePage = document.getElementById(activePageId);
    let page1 = document.getElementById(page1Id);
    let page2 = document.getElementById(page2Id);

    if (footer) {
        footer.classList.remove("close-footer");
        footer.classList.add("open-footer");

        // اضافه کردن کلاس blockPage به دو صفحه دیگر (اگر ندارند)
        if (!page1.classList.contains("blockPage")) {
            page1.classList.add("blockPage");
        }
        if (!page2.classList.contains("blockPage")) {
            page2.classList.add("blockPage");
        }

        // تغییر وضعیت کلاس blockPage برای صفحه فعال
        activePage.classList.toggle("blockPage");
    }
}