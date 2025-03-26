const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const moduleSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String, default: '' },
    editor1: { type: String, required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },

}, {
    timestamps: true,
    toJSON: { virtuals: true }
})


moduleSchema.plugin(mongoosePaginate);

moduleSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'article'
})


moduleSchema.methods.path = function () {
    return `/modules/${this.slug}`;
}

moduleSchema.methods.inc = async function (field, num = 1) {
    this[field] += num;
    await this.save()
}

module.exports = mongoose.model('moduleSchema', moduleSchema);