const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const videoSchema = new mongoose.Schema({
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoPath: { type: String, required: true }, // مسیر ذخیره ویدیو
    uploadedAt: { type: Date, default: Date.now }
});

videoSchema.plugin(mongoosePaginate);

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
