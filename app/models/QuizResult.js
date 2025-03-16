const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // کاربر
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true }, // مقاله مربوط به آزمون
    score: { type: Number, required: true }, // نمره از 100
    correctAnswers: { type: Number, required: true }, // تعداد پاسخ‌های صحیح
    totalQuestions: { type: Number, required: true }, // تعداد کل سوالات
    createdAt: { type: Date, default: Date.now } // تاریخ ثبت آزمون
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
