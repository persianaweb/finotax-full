const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')
const CategoryArticle = mongoose.Schema({
    name : { type : String , required : true},
    slug : { type : String, required : true},
    // slug: { type: String, default: '' },
    parent : { type : Schema.Types.ObjectId, ref : 'CategoryArticle'}
    
} , {
    timestamps : true,
    toJSON : { virtuals : true}
})


CategoryArticle.plugin(mongoosePaginate);

// CategoryArticle.virtual('categories', {
//     ref : 'CategoryArticle',
//     localField : '_id',
//     foreignField : 'parent'
// })
// CategoryArticle.virtual('childs', {
//     ref : 'CategoryArticle',
//     localField : '_id',
//     foreignField : 'parent'
// })


module.exports = mongoose.model('CategoryArticle' , CategoryArticle);