const Articles = require('app/models/articles');
const Modules = require('./../../../models/module');
const QuizResult = require('app/models/QuizResult');
const autoBind = require('auto-bind');

class QuestionController {
    constructor() {
        autoBind(this);
    }
    async index(req, res) {
        try {
            const title = 'Question Page';
            let page = req.query.page || 1;
            const questions = await Question.paginate({}, {
                page,
                limit: 5,
                sort: { createdAt: -1 },
                populate: 'blogId'
            });
            // res.json(questions)
            res.render('admin/Questions/index', { title, questions });
        } catch (error) {
            console.log(error);
        }

    }

    async create(req, res) {
        try {
            const title = 'modules Create';
            const blogs = await Articles.find();
            res.render('admin/modules/create', { title, blogs });
        } catch (error) {
            console.log(error);
        }

    }

    async edit(req, res) {
        try {
            const title = 'Edit Question';
            const blogs = await Articles.find();
            const questions = await Question.findById(req.params.id).populate('blogId');
            res.render('admin/Questions/edit', { title, questions, blogs });
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
            return res.redirect('/admin/modules/create');

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

            await Question.findByIdAndUpdate(req.params.id, { $set: updateFields });
            console.log('massages', 'ویرایش مطلب انجام شد');
            return res.redirect('/admin/question');
        } catch (err) {
            return next(err);
        }
    }

    async destroy(req, res) {
        try {
            let question = await Question.findById(req.params.id);

            if (!question) {
                console.log('سوالی با این شناسه یافت نشد');
                return res.redirect('/admin/question');
            }

            await question.deleteOne({ _id: question._id });

            return res.redirect('/admin/question');
        } catch (error) {
            // req.flash('errors', 'این محصول قابل حذف نیست : مشکل در نام تصاویر');
            return res.redirect('/admin/question');

        }
    }
    async saveQuizResult(req, res) {
        try {
            const { userId, articleId, score, correctAnswers, totalQuestions } = req.body;

            if (!userId || !articleId) {
                return res.status(400).json({ message: "شناسه کاربر و مقاله الزامی است." });
            }

            // بررسی اینکه آیا قبلاً نتیجه‌ای برای این مقاله ثبت شده است
            const existingResult = await QuizResult.findOne({ user: userId, article: articleId });

            if (existingResult) {
                // اگر قبلاً نتیجه‌ای وجود داشته باشد، آن را آپدیت می‌کنیم
                existingResult.score = score;
                existingResult.correctAnswers = correctAnswers;
                existingResult.totalQuestions = totalQuestions;
                existingResult.createdAt = new Date(); // زمان ثبت جدید

                await existingResult.save();
                return res.status(200).json({ message: "نمره بروز شد!", quizResult: existingResult });
            } else {
                // اگر نتیجه‌ای وجود نداشته باشد، یک رکورد جدید ایجاد کن
                const newQuizResult = new QuizResult({
                    user: userId,
                    article: articleId,
                    score,
                    correctAnswers,
                    totalQuestions
                });

                await newQuizResult.save();
                return res.status(200).json({ message: "نمره ذخیره شد!", quizResult: newQuizResult });
            }

        } catch (error) {
            console.error("خطا در ذخیره نمره آزمون:", error);
            res.status(500).json({ message: "خطایی رخ داد." });
        }
    }


}

module.exports = new QuestionController();