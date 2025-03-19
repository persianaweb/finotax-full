const Subscription = require('app/models/Subscription');
const User = require('app/models/users');
const moment = require('moment-jalaali');

const autoBind = require('auto-bind');

class SubscriptionModule {
    constructor() {
        autoBind(this);
    }

    async subscribe(req, res) {
        try {
            const subscribes = await Subscription.find().exec();
            res.render('subscribe', { subscribes });
        } catch (error) {
            console.log(error);
        }

    }

    async subscriptionStatus(req, res) { 
        try {
            const user = await User.findById(req.session.userId).populate('subscription');

            if (!user || !user.subscription) {
                return res.render('subscription-status', { user: null });
            }

            const remainingDays = moment(user.subscriptionEndDate).diff(moment(), 'days');

            res.render('subscription-status', {
                user,
                subscription: user.subscription,
                remainingDays: remainingDays > 0 ? remainingDays : 0
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("خطایی رخ داده است.");
        }
    }

    async subscribeSale(req, res) {
        try {
            const { subscription } = req.body;
            const userId = req.session.userId; // آی‌دی کاربر لاگین‌شده

            const selectedSubscription = await Subscription.findById(subscription);
            if (!selectedSubscription) {
                return res.status(404).send("اشتراک مورد نظر یافت نشد.");
            }

            // محاسبه تاریخ پایان اشتراک
            const now = new Date();
            const endDate = new Date();
            endDate.setMonth(now.getMonth() + selectedSubscription.duration);

            // ذخیره اشتراک برای کاربر
            await User.findByIdAndUpdate(userId, {
                subscription: selectedSubscription._id,
                subscriptionEndDate: endDate,
                isActive: true
            });
            res.redirect('/learning');
            // res.send("اشتراک شما با موفقیت ثبت شد.");
        } catch (error) {
            console.error(error);
            res.status(500).send("مشکلی پیش آمده است.");
        }
    }

    async index(req, res) {
        try {
            const title = 'Subscription';
            let page = req.query.page || 1;
            const subscriptions = await Subscription.paginate({}, { page, limit: 5, sort: { createdAt: -1 } });
            res.render('admin/Subscription/index', { title, subscriptions, massages: req.flash('errors') });
        } catch (error) {
            console.log(error)
        }

    }

    async create(req, res) {
        try {
            const title = 'Create Subscription';
            res.render('admin/Subscription/create', { title, massages: req.flash('errors') });
        } catch (error) {
            console.log(error)
        }

    }

    async edit(req, res) {
        try {
            const title = 'Edit Subscription';
            const subscriptions = await Subscription.findById(req.params.id);
            res.render('admin/Subscription/edit', { title, subscriptions, massages: req.flash('errors') });
        } catch (error) {
            console.log(error)
        }
    }

    async store(req, res) {
        try {
            const { name, duration, price } = req.body;

            // بررسی صحت مقادیر ورودی
            if (!name || !duration || !price) {
                return res.status(400).send("همه فیلدها الزامی هستند.");
            }

            // ایجاد اشتراک جدید
            const newSubscription = new Subscription({
                name,
                duration,
                price
            });

            await newSubscription.save(); // ذخیره در دیتابیس
            res.redirect('/admin/subscription'); // هدایت به لیست اشتراک‌ها

        } catch (error) {
            console.error(error);
            res.status(500).send("مشکلی پیش آمده است.");
        }
    }

    async update(req, res, next) {

        try {
            let updateFields = { ...req.body };

            await Subscription.findByIdAndUpdate(req.params.id, { $set: updateFields });
            req.flash('massages', 'ویرایش انجام شد');
            return res.redirect('/admin/subscription');
        } catch (err) {
            return next(err);
        }
    }

    async destroy(req, res) {
        try {
            let subscription = await Subscription.findById(req.params.id);

            if (!subscription) {
                return res.redirect('/admin/subscription');
            }

            await subscription.deleteOne({ _id: subscription._id });

            return res.redirect('/admin/subscription');
        } catch (error) {
            return res.redirect('/admin/subscription');

        }

    }
}

module.exports = new SubscriptionModule();