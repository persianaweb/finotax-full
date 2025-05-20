const Articles = require('app/models/articles');
const Modules = require('app/models/module');
const QuizResult = require('app/models/QuizResult');
const autoBind = require('auto-bind');

class QuestionController {
    constructor() {
        autoBind(this);
    }

    async create(req, res) {
        try {
            const title = 'modules Create';
            const blogs = await Articles.find();
            res.render('admin/Modules/create', { title, blogs });
        } catch (error) {
            console.log(error);
        }

    }

    async edit(req, res) {
        try {
            const title = 'Edit modules';
            const blogs = await Articles.find();
            const modules = await Modules.findById(req.params.id); 
            // return console.log(modules.blogId);
            res.render('admin/modules/edit', { title , blogs , modules });
        } catch (error) {
            console.log(error)
        }
    }

    async store(req, res) {
        try { 
            let userId = req.session.userId;
            const { blogId, title, editor1 } = req.body;
            // return res.json(req.body)
            const addModules = await new Modules({
                user: userId,
                title,
                slug: this.slug(title),
                editor1,
                blogId
            })
            addModules.save();
            return res.redirect('/admin/articles');

        } catch (error) {
            res.status(500).json({ error: 'مشکلی در ذخیره ماژول پیش آمد' });
        }

    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, '-');
    }

    async update(req, res, next) {
        try {
            let updateFields = { ...req.body };

            await Modules.findByIdAndUpdate(req.params.id, { $set: updateFields });
            console.log('massages', 'ویرایش مطلب انجام شد');
            return res.redirect('/admin/articles');
        } catch (err) {
            return next(err);
        }
    }

    async destroy(req, res) {
        try {
            let modules = await Modules.findById(req.params.id);

            if (!modules) {
                console.log('سوالی با این شناسه یافت نشد');
                return res.redirect('/admin/articles');
            }

            await modules.deleteOne({ _id: modules._id });

            return res.redirect('/admin/articles');
        } catch (error) {
            // req.flash('errors', 'این محصول قابل حذف نیست : مشکل در نام تصاویر');
            return res.redirect('/admin/articles');

        }
    }


}

module.exports = new QuestionController();