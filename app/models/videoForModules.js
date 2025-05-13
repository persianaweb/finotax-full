const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const videoModulesSchema = new mongoose.Schema({
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'moduleSchema', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoPath: { type: String, required: true }, // مسیر ذخیره ویدیو
    uploadedAt: { type: Date, default: Date.now }
});

videoModulesSchema.plugin(mongoosePaginate);

const Videomodules = mongoose.model('videoModulesSchema', videoModulesSchema);
module.exports = Videomodules; 
