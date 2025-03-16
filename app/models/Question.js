const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const questionSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true }, 
  questionText: { type: String, required: true }, 
  options: [{ type: String, required: true }], 
  optionsText: [{ type: String, required: true }], 
  correctAnswer: { type: Number, required: true } 
});

questionSchema.plugin(mongoosePaginate);

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
