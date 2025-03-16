const cron = require('node-cron');
const User = require('app/models/users');

async function checkSubscriptions() {
    const now = new Date();

    const result = await User.updateMany(
        { subscriptionEndDate: { $lt: now }, isActive: true }, 
        { isActive: false }
    );

    console.log(`کران جاب اجرا شد. ${result.modifiedCount} کاربر غیرفعال شد.`);
}

// اجرای کران جاب **هر روز ساعت ۰۰:۰۰ (نیمه‌شب)**
cron.schedule('0 0 * * *', () => {
    console.log('اجرای بررسی وضعیت اشتراک کاربران...');
    checkSubscriptions();
});

// اجرای بررسی هنگام استارت سرور
checkSubscriptions();
