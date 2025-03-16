
CKEDITOR.replace('editor1', {
  filebrowserUploadUrl: '/admin/upload-image',
  contentsLangDirection: 'rtl',
  contentsCss: '/admin/fonts/font.css'
});
CKEDITOR.on('instanceReady', function (evt) {
  evt.editor.resize('100%', '700px');
});