function previewImage(event) {
    var imageInput = event.target;
    var imagePreview = document.getElementById('imagePreview');

    var reader = new FileReader();
    reader.onload = function () {
        imagePreview.src = reader.result;
    };

    reader.readAsDataURL(imageInput.files[0]);
}