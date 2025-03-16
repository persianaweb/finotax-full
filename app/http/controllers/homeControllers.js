const Article = require('app/models/articles');
const Category = require('app/models/categoryArticle');
const Question = require('app/models/Question');
const Video = require('app/models/video');
const autoBind = require('auto-bind');
const moment = require('moment-jalaali'); 
moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });


class homeController {
    constructor() {
        autoBind(this);
    }

    async index(req, res) {
        try {
            res.render('index');
        } catch (error) {
            console.log(error);
        }

    }

    async learnPage(req, res) {
        try {
            res.render('learn');
        } catch (error) {
            console.log(error);
        }

    }


    async acc1(req, res) {
        try {
            const acc1Category = await Category.findOne({ slug: 'آموزش-مقدماتی-حسابداری' }).exec();
            const articles = await Article.find({ categories: acc1Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('acc1', { articles });
        } catch (error) {
            console.log(error);
        }

    }

    async acc2(req, res) {
        try {
            const acc2Category = await Category.findOne({ slug: 'آموزش-سطح-متوسط-حسابداری' }).exec();
            const articles = await Article.find({ categories: acc2Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('acc2', { articles });
        } catch (error) {
            console.log(error); 
        }

    }

    async acc3(req, res) {
        try {
            const acc3Category = await Category.findOne({ slug: 'آموزش-سطح-پیشرفته-حسابداری' }).exec();
            const articles = await Article.find({ categories: acc3Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('acc3', { articles });
        } catch (error) {
            console.log(error);
        }

    }

    async tax1(req, res) {
        try {
            const tax1Category = await Category.findOne({ slug: 'آموزش-مقدماتی-مالیاتی' }).exec();
            const articles = await Article.find({ categories: tax1Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('tax1', { articles });
        } catch (error) {
            console.log(error);
        }

    }

    async tax2(req, res) {
        try {
            const tax2Category = await Category.findOne({ slug: 'آموزش-سطح-متوسط-مالیاتی' }).exec();
            const articles = await Article.find({ categories: tax2Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('tax2', { articles });
        } catch (error) {
            console.log(error);
        }

    }

    async tax3(req, res) {
        try {
            const tax3Category = await Category.findOne({ slug: 'آموزش-سطح-پیشرفته-مالیاتی' }).exec();
            const articles = await Article.find({ categories: tax3Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('tax3', { articles });
        } catch (error) {
            console.log(error);
        }

    }

    async fin1(req, res) {
        try {
            const fin1Category = await Category.findOne({ slug: 'آموزش-مقدماتی-مالی' }).exec();
            const articles = await Article.find({ categories: fin1Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('fin1', { articles });
        } catch (error) {
            console.log(error);
        }

    }

    async fin2(req, res) {
        try {
            const fin2Category = await Category.findOne({ slug: 'آموزش-سطح-متوسط-مالیاتی' }).exec();
            const articles = await Article.find({ categories: fin2Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('fin2', { articles });
        } catch (error) {
            console.log(error);
        }

    }

    async fin3(req, res) {
        try {
            const fin3Category = await Category.findOne({ slug: 'آموزش-سطح-پیشرفته-مالیاتی' }).exec();
            const articles = await Article.find({ categories: fin3Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            res.render('fin3', { articles });
        } catch (error) {
            console.log(error);
        }

    }

    async acctest1(req, res) {
        try {
            res.render('acc1test');
        } catch (error) {
            console.log(error);
        }

    }

    async articlePage(req, res) {
        try {
            const article = await Article.findOne({ slug: req.params.slug }).populate([
                {
                    path: 'user',
                    select: ['name', 'image']
                }
            ]).exec();

            if (!article) {
                return res.status(404).send('مقاله موردنظر یافت نشد.');
            }

            // افزایش تعداد بازدید
            article.viewCount = article.viewCount + 1;
            await article.save();

            // دریافت سوالات مرتبط با مقاله
            const questions = await Question.find({ blogId: article._id }).exec();
            const videos = await Video.find({ articleId: article._id }).exec();

            // فرمت تاریخ
            let date = moment(article.createdAt).format('jD - jMMMM - jYYYY ');
            let time = moment(article.createdAt).format('HH:mm');
            const title = article.slug;

            // ارسال اطلاعات به صفحه
            res.render('singleArticle', { article, videos, questions, date, time, title });
        } catch (error) {
            console.log(error);
            res.status(500).send('خطای سرور');
        }
    }
 

}

module.exports = new homeController();