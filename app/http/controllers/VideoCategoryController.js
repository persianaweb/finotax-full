const { validationResult } = require('express-validator');
const Articles = require('app/models/articles');
const Modules = require('app/models/module');
const Category = require('app/models/categoryArticle');
const User = require('app/models/users');
const Video = require('app/models/videoForCategory');
const autoBind = require('auto-bind');
const fs = require('fs');
const path = require('path');

class videoModulesController {

    constructor() {
        autoBind(this);
    }


    async createVideo(req, res) {
        try {
            const title = 'upload video';
            const category = await Category.find({});
            const videos = await Video.find();
            // return res.json(category);
            res.render('admin/videosCategory/create', { title, category, videos, massages: req.flash('errors') });
        } catch (error) {
            console.log(error) 
        }
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, '-');
    }
    getDirImage(dir) {
        return dir.substring(10)
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

module.exports = new videoModulesController();