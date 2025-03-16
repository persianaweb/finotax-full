
var addButton = document.querySelector('.plus');
addButton.addEventListener('click', function () {
    var fieldContainer = document.querySelector('.frm');
    var clonedField = fieldContainer.cloneNode(true);

    fieldContainer.parentNode.insertBefore(clonedField, fieldContainer.nextSibling);

    // اجرای پلاگین Chosen بر روی المان select در المان‌های کپی شده
    var clonedSelect = clonedField.querySelector('select');
    if (clonedSelect) {
        chosenSelect(clonedSelect);
    }
    // افزودن ویژگی readonly به تمام input های کپی شده
    var clonedInputs = clonedField.querySelectorAll('input');
    clonedInputs.forEach(function (input) {
        input.setAttribute('readonly', 'readonly');
    });
    // گرفتن تمام اینپوت‌های اصلی
    var originalInputs = fieldContainer.querySelectorAll('input');
    // پاک کردن مقادیر اینپوت‌های اصلی
    originalInputs.forEach(function (input) {
        input.value = '';
    });
    // ایجاد دکمه حذف و اتصال رویداد کلیک به آن
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'text-white', 'delete', 'mt-3');
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    clonedField.appendChild(deleteButton);
    deleteButton.addEventListener('click', function () {
        clonedField.remove();
    });
});

// تابع کمکی برای اجرای پلاگین Chosen بر روی یک المان select
function chosenSelect(selectElement) {
    if (typeof Chosen !== 'undefined') {
        new Chosen(selectElement);
    }
}

// اجرای پلاگین Chosen بر روی المان select اصلی
chosenSelect(document.querySelector('.form-control-chosen'));

