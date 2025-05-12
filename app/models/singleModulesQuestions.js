const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const ModulesQuestionSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'moduleSchema', required: true },  
  questionText: { type: String, required: true }, 
  options: [{ type: String, required: true }], 
  optionsText: [{ type: String, required: true }], 
  correctAnswer: { type: Number, required: true } 
});

ModulesQuestionSchema.plugin(mongoosePaginate);

const ModulesQuestion = mongoose.model('ModulesQuestionSchema', ModulesQuestionSchema);
module.exports = ModulesQuestion;
