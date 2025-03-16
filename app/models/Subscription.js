const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true }, // نام اشتراک (مثلاً ۳ ماهه، ۶ ماهه، ۱۲ ماهه)
    duration: { type: Number, required: true }, // مدت‌زمان به ماه
    price: { type: Number, required: true } // قیمت اشتراک
});
subscriptionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Subscription', subscriptionSchema);
