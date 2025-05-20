const Article = require('app/models/articles');
const Category = require('app/models/categoryArticle');
const Question = require('app/models/Question');
const singleQuestion = require('app/models/singleModulesQuestions');
const moduleSchema = require('app/models/module');
const Scores = require('app/models/QuizResultForModules');
const ScoresCource = require('app/models/QuizResult');
const VideoForCategory = require('app/models/videoForCategory');
const VideoCource = require('app/models/video');
const VideoModule = require('app/models/videoForModules');
const Keyword = require('app/models/keywords');
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
            if (!acc1Category) {
                return res.render('acc1', { articles: [] });
            }
            const articles = await Article.find({ categories: acc1Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();

            const videos = await VideoForCategory.find({ articleId: acc1Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
             if (!acc1Category) {
                return res.render('acc1', {videos:[], articles: [] });
            }
            // return res.json(videos)ک

            res.render('acc1', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async acc2(req, res) {
        try {
            const acc2Category = await Category.findOne({ slug: 'آموزش-سطح-متوسط-حسابداری' }).exec();
            if (!acc2Category) {
                return res.render('acc2', { articles: [] });
            }
            const articles = await Article.find({ categories: acc2Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();
            const videos = await VideoForCategory.find({ articleId: acc2Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
            res.render('acc2', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async acc3(req, res) {
        try {
            const acc3Category = await Category.findOne({ slug: 'آموزش-سطح-پیشرفته-حسابداری' }).exec();
            if (!acc3Category) {
                return res.render('acc3', { articles: [] });
            }
            const articles = await Article.find({ categories: acc3Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();
            const videos = await VideoForCategory.find({ articleId: acc3Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
            res.render('acc3', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async tax1(req, res) {
        try {
            const tax1Category = await Category.findOne({ slug: 'آموزش-مقدماتی-مالیاتی' }).exec();
            if (!tax1Category) {
                return res.render('tax1', { articles: [] });
            }
            const articles = await Article.find({ categories: tax1Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();
            const videos = await VideoForCategory.find({ articleId: tax1Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
            res.render('tax1', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async tax2(req, res) {
        try {
            const tax2Category = await Category.findOne({ slug: 'آموزش-سطح-متوسط-مالیاتی' }).exec();
            if (!tax2Category) {
                return res.render('tax2', { articles: [] });
            }
            const articles = await Article.find({ categories: tax2Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();
            const videos = await VideoForCategory.find({ articleId: tax2Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
            res.render('tax2', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async tax3(req, res) {
        try {
            const tax3Category = await Category.findOne({ slug: 'آموزش-سطح-پیشرفته-مالیاتی' }).exec();
            if (!tax3Category) {
                return res.render('tax3', { articles: [] });
            }
            const articles = await Article.find({ categories: tax3Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();
            const videos = await VideoForCategory.find({ articleId: tax3Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
            res.render('tax3', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async fin1(req, res) {
        try {
            const fin1Category = await Category.findOne({ slug: 'آموزش-مقدماتی-مالی' }).exec();
            if (!fin1Category) {
                return res.render('fin1', { articles: [] });
            }
            const articles = await Article.find({ categories: fin1Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();
            const videos = await VideoForCategory.find({ articleId: fin1Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
            res.render('fin1', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async fin2(req, res) {
        try {
            const fin2Category = await Category.findOne({ slug: 'آموزش-سطح-متوسط-مالیاتی' }).exec();
            if (!fin2Category) {
                return res.render('fin2', { articles: [] });
            }
            const articles = await Article.find({ categories: fin2Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();
            const videos = await VideoForCategory.find({ articleId: fin2Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
            res.render('fin2', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async fin3(req, res) {
        try {
            const fin3Category = await Category.findOne({ slug: 'آموزش-سطح-پیشرفته-مالیاتی' }).exec();
            if (!fin3Category) {
                return res.render('fin3', { articles: [] });
            }
            const articles = await Article.find({ categories: fin3Category._id }).sort({ createdAt: -1 }).populate([{ path: 'categories', select: 'name' }]).exec();
            const scores = await ScoresCource.find({ user: req.session.userId }).exec();
            const videos = await VideoForCategory.find({ articleId: acc1Category._id }).exec();
            articles.sort((a, b) => a.createdAt - b.createdAt);
            res.render('fin3', { articles, scores, videos });
        } catch (error) {
            console.log(error);
        }

    }

    async website(req, res) {
        try {
            res.render('website/index');
        } catch (error) {
            console.log(error);
        }

    }

    async service(req, res) {
        try {
            res.render('website/services');
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

            // دریافت ماژول‌های مرتبط با مقاله
            const modules = await moduleSchema.find({ blogId: article._id }).exec();
            const questions = await Question.find({ blogId: article._id }).exec();
            const videos = await VideoCource.find({ articleId: article._id }).exec();
            const scores = await Scores.find({ user: req.session.userId }).exec();

            // فرمت تاریخ
            let date = moment(article.createdAt).format('jD - jMMMM - jYYYY ');
            let time = moment(article.createdAt).format('HH:mm');
            const title = article.slug;
            modules.sort((a, b) => a.createdAt - b.createdAt);

            // ارسال اطلاعات به صفحه جدید برای نمایش ماژول‌ها
            res.render('articleModules', { article, modules, date, time, videos, title, questions, scores });
        } catch (error) {
            console.log(error);
            res.status(500).send('خطای سرور');
        }
    }

    async modulePage(req, res) {
        try {
            const module = await moduleSchema.findOne({ slug: req.params.slug }).populate([
                {
                    path: 'user',
                    select: ['name', 'image']
                },
                {
                    path: 'blogId',
                    select: ['title', 'slug']
                }
            ]).exec();

            if (!module) {
                return res.status(404).send('ماژول موردنظر یافت نشد.');
            }

            // افزایش تعداد بازدید
            module.viewCount = module.viewCount + 1;
            await module.save();

            // دریافت سوالات و ویدیوهای مرتبط با ماژول
            const questions = await singleQuestion.find({ blogId: module._id }).exec();
            const videos = await VideoModule.find({ articleId: module._id }).exec();

            // فرمت تاریخ
            let date = moment(module.createdAt).format('jD - jMMMM - jYYYY ');
            let time = moment(module.createdAt).format('HH:mm');
            const title = module.title;
            // return res.json(videos); 

            // ارسال اطلاعات به صفحه نمایش ماژول
            res.render('singleArticle', { article: module, videos, questions, date, time, title });
        } catch (error) {
            console.log(error);
            res.status(500).send('خطای سرور');
        }
    }


}

module.exports = new homeController();