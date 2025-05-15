const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const videoCategory = new mongoose.Schema({
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryArticle', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoPath: { type: String, required: true }, // مسیر ذخیره ویدیو
    uploadedAt: { type: Date, default: Date.now }
});

videoCategory.plugin(mongoosePaginate);

const VideoCategorys = mongoose.model('videoCategory', videoCategory);
module.exports = VideoCategorys; 
