const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const User = mongoose.Schema({
    admin: { type: Boolean, default: false },
    mobileNumber: { type: String, require: true },
    random: { type: String, require: true },
    image: { type: String, default:'' },
    name: { type: String, default:'' },
    email: { type: String, default:'' },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],

    // اضافه کردن اشتراک
    subscription: { type: Schema.Types.ObjectId, ref: 'Subscription', default: null }, // اشتراک خریداری‌شده
    subscriptionEndDate: { type: Date, default: null }, // تاریخ پایان اشتراک
    isActive: { type: Boolean, default: false }, // وضعیت فعال بودن اشتراک

}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model('User', User);
