
function previewImageGallery(event) {
    var imageInput = event.target;
    var imagePreview = document.getElementById('imagePreview2');
    imagePreview.innerHTML = '';

    var maxImages = 6; // تعداد حداکثر تصاویر قابل انتخاب

    var files = imageInput.files;
    if (files.length > maxImages) {
      alert("تعداد تصاویر انتخاب شده بیشتر از حد مجاز است.");
      imageInput.value = ''; // پاک کردن انتخاب تصاویر
      return;
    }

    for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var image = document.createElement('img');
        image.src = e.target.result;
        imagePreview.appendChild(image);
      };
      reader.readAsDataURL(files[i]);
    }
  }