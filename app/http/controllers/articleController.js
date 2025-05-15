const { validationResult } = require('express-validator');
const Articles = require('app/models/articles');
const Modules = require('app/models/module');
const Category = require('app/models/categoryArticle');
const User = require('app/models/users');
const Video = require('app/models/video');
const VideoForModules = require('app/models/videoForModules');
const VideoForCategory = require('app/models/videoForCategory');
const autoBind = require('auto-bind');
const fs = require('fs');
const path = require('path');

class articleController {

    constructor() {
        autoBind(this);
    }

    async index(req, res) {
        try {
            const title = 'Articles';
            let page = req.query.page || 1;
            const aticles = await Articles.paginate({}, { page, limit: 5, sort: { createdAt: -1 } });
            const modules = await Modules.paginate({}, { page, limit: 5, sort: { createdAt: -1 } });
            res.render('admin/articles/index', { title, aticles, modules, massages: req.flash('errors') });
        } catch (error) {
            console.log(error)
        }

    }

    async videos(req, res) {
        try {
            const title = 'videos'; 
            let page = req.query.page || 1;
            const videos = await Video.paginate({}, {
                page,
                limit: 5,
                sort: { createdAt: -1 },
                populate: 'articleId'
            });
            const videoForModules = await VideoForModules.paginate({}, {
                page,
                limit: 5,
                sort: { createdAt: -1 },
                populate: 'articleId'
            });
             const videoForCategorys = await VideoForCategory.paginate({}, {
                page,
                limit: 5,
                sort: { createdAt: -1 },
                populate: { path: 'articleId', select: 'name' }
            });
            // return res.json(videoForCategorys);
            res.render('admin/videos/index', { title, videos, videoForModules,videoForCategorys, massages: req.flash('errors') });
        } catch (error) {
            console.log(error)
        }

    }

    async create(req, res) {
        try {
            const title = 'Create Article';
            const categories = await Category.find({});
            res.render('admin/articles/create', { categories, title, massages: req.flash('errors') });
        } catch (error) {
            console.log(error)
        }

    }

    async edit(req, res) {
        try {
            const title = 'Edit Articles';
            const categories = await Category.find({});
            const articles = await Articles.findById(req.params.id);
            res.render('admin/articles/edit', { title, articles, categories, massages: req.flash('errors') });
        } catch (error) {
            console.log(error)
        }
    }

    async createVideo(req, res) {
        try {
            const title = 'upload video';
            const articles = await Articles.find();
            const videos = await Video.find();
            res.render('admin/videos/create', { title, articles, videos, massages: req.flash('errors') });
        } catch (error) {
            console.log(error)
        }
    }

    store(req, res, next) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array();
            const massages = [];
            errors.forEach(err => massages.push(err.msg));
            req.flash('errors', massages);
            return res.redirect(req.header('Referer') || '/');
        } else {
            this.storeProccess(req, res, next);
        }
    }

    async storeProccess(req, res, next) {
        let image = this.getDirImage(`${req.file.destination}/${req.file.originalname}`);
        let userId = req.session.userId;
        let { title, editor1, categories } = req.body;
        const addArticles = await new Articles({
            user: userId,
            title, editor1, categories,
            slug: this.slug(title),
            image
        })
        addArticles.save();
        return res.redirect('/admin/articles');
    }

    async update(req, res, next) {
        const article = await Articles.findById(req.params.id);

        try {
            let updateFields = { ...req.body };
            if (req.file) {
                const mainImagePath = `app/public${article.image}`;
                const existsSync = fs.existsSync(mainImagePath);
                // چک کردن وجود تصویر در دایرکتوری
                if (existsSync) {
                    // اگر تصویر وجود داشته باشد، حذف کنید
                    fs.unlinkSync(mainImagePath);
                }
                updateFields.image = this.getDirImage(`${req.file.destination}/${req.file.originalname}`);
            }

            await Articles.findByIdAndUpdate(req.params.id, { $set: updateFields });
            req.flash('massages', 'ویرایش مطلب انجام شد');
            return res.redirect('/admin/articles');
        } catch (err) {
            return next(err);
        }
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, '-');
    }
    getDirImage(dir) {
        return dir.substring(10)
    }

    async destroy(req, res) {
        try {
            let article = await Articles.findById(req.params.id);

            if (!article) {
                console.log('مطلبی با این شناسه یافت نشد');
                return res.redirect('/admin/articles');
            }


            const mainImagePath = `app/public${article.image}`;
            const existsSync = fs.existsSync(mainImagePath);
            // چک کردن وجود تصویر در دایرکتوری
            if (existsSync) {
                // اگر تصویر وجود داشته باشد، حذف کنید
                fs.unlinkSync(mainImagePath);
            }

            await article.deleteOne({ _id: article._id });

            return res.redirect('/admin/articles');
        } catch (error) {
            req.flash('errors', 'این محصول قابل حذف نیست : مشکل در نام تصاویر');
            return res.redirect('/admin/articles');

        }

    }

    async uploadVideo(req, res) {
        try {
            if (!req.file) {
                return res.status(400).send("لطفا یک ویدیو انتخاب کنید.");
            }

            const { articleId } = req.body;
            const videoPath = `/uploads/videos/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/${req.file.filename}`;

            // ذخیره اطلاعات ویدیو در دیتابیس
            const newVideo = new Video({
                articleId,
                userId: req.session.userId,
                videoPath
            });

            await newVideo.save();
            res.redirect('/admin/videos');
        } catch (error) {
            console.log("User Object:", req.session.userId);
            console.log("Article ID:", req.body.articleId);

            console.error("خطا در آپلود ویدیو:", error);
            res.status(500).send("خطایی رخ داده است.");
        }
    }

    async deleteVideo(req, res) {
        try {
            console.log('شناسه‌ی دریافتی:', req.params.id);  // بررسی شناسه دریافتی

            // پیدا کردن ویدیو در دیتابیس
            let video = await Video.findById(req.params.id);
            if (!video) {
                console.log('❌ ویدیو در دیتابیس پیدا نشد.');
                req.flash('errors', 'ویدیو پیدا نشد.');
                return res.redirect('/admin/videos');
            }

            console.log('✅ ویدیو پیدا شد:', video);

            // مسیر فایل ویدیو را تعیین می‌کنیم
            const videoPath = path.join(__dirname, '..', 'public', decodeURIComponent(video.videoPath));
            console.log('📂 مسیر فایل:', videoPath);

            // بررسی وجود فایل
            if (fs.existsSync(videoPath)) {
                console.log('✅ فایل ویدیو پیدا شد، حذف در حال انجام...');
                fs.unlinkSync(videoPath);
                console.log('✅ فایل ویدیو با موفقیت حذف شد.');
            } else {
                console.log('⚠ فایل فیزیکی پیدا نشد.');
            }

            // حذف از دیتابیس
            await Video.deleteOne({ _id: video._id });
            console.log('✅ ویدیو از دیتابیس حذف شد.');

            req.flash('success', 'ویدیو با موفقیت حذف شد.');
            return res.redirect('/admin/videos');
        } catch (error) {
            console.log('❌ خطا در حذف ویدیو:', error);
            req.flash('errors', 'مشکلی در حذف ویدیو به وجود آمده است.');
            return res.redirect('/admin/videos');
        }
    }
}

module.exports = new articleController();