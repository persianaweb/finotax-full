const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')
const Keywords = mongoose.Schema({
    name : { type : String , required : true},
    slug : { type : String, required : true},
    meaning : { type : String , required : true}
    
} , {
    timestamps : true,
    toJSON : { virtuals : true}
})


Keywords.plugin(mongoosePaginate);


module.exports = mongoose.model('Keywords' , Keywords);