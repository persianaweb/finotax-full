const User = require('app/models/users');
const Tickets = require('app/models/tickets');
// const Comment = require('app/models/comment');
const autoBind = require('auto-bind');
const axios = require('axios');
const Subscription = require('app/models/Subscription');
const Answer = require('app/models/QuizResult');
const Article = require('app/models/articles')
const moment = require('moment-jalaali');
const fs = require('fs');

class profileController {
    constructor() {
        autoBind(this);
    }

    async index(req, res) {
        try {
            const user = await User.findById(req.session.userId).populate('subscription');

            if (!user || !user.subscription) {
                return res.render('profile/index', { user: null });
            }

            // دریافت پاسخ‌های کاربر
            const answers = await Answer.find({ user: user._id })
                .populate('article', 'title slug') // فقط عنوان مقاله را دریافت می‌کنیم
                .exec();

            // ساخت آرایه‌ای از اطلاعات مورد نیاز
            const userAnswers = answers.map(answer => ({ 
                articleTitle: answer.article.title,
                articleSlug: answer.article.slug,
                articleId: answer.article._id,
                score: answer.score,
                correctAnswers: answer.correctAnswers,
                totalQuestions: answer.totalQuestions,
                createdAt: answer.createdAt  
            }));

            const remainingDays = moment(user.subscriptionEndDate).diff(moment(), 'days');   

            // return res.json(userAnswers );

            res.render('profile/index', {
                user,userAnswers,
                subscription: user.subscription,
                remainingDays: remainingDays > 0 ? remainingDays : 0 
                  
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("خطایی رخ داده است."); 
        }
    }



    async tickets(req, res) {
        const title = 'webinja | تیکت های من';
        let mobile = req.session.mobile || false;
        let rCode = req.session.rCode || false;
        req.session.mobile = false;
        req.session.rCode = false;

        const user = await User.findById(req.session.userId);
        const tickets = await Tickets.find({ user });

        res.render('profile/tickets', { title, mobile, rCode, tickets });
    }
    sendForm(req, res) {
        const title = 'webinja | ارسال تیکت جدید';
        let mobile = req.session.mobile || false;
        let rCode = req.session.rCode || false;
        req.session.mobile = false;
        req.session.rCode = false;
        res.render('profile/sendTicket', { title, mobile, rCode });
    }
    async viewTickets(req, res) {
        const title = 'webinja | مشاهده تیکت من';
        let mobile = req.session.mobile || false;
        let rCode = req.session.rCode || false;
        req.session.mobile = false;
        req.session.rCode = false;

        const ticket = await Tickets.findById(req.params.id).populate('user').exec();
        const ticketCode = ticket.code;
        const parent = await Tickets.find({ parent: ticketCode });
        // return res.json(parent)
        res.render('profile/viewTickets', { title, mobile, rCode, ticket, parent });
    }
    async sendTicket(req, res) {
        const min = 10000;
        const max = 99999;
        let randomeCode = Math.floor(Math.random() * (max - min + 1)) + min;

        const addTicket = new Tickets({
            user: req.session.userId,
            code: randomeCode,
            title: req.body.title,
            text: req.body.text,
            check: req.body.check,
            parent: req.body.parent
        });

        await addTicket.save();
        //send SMS
        const smsApiUrl = 'http://ippanel.com/api/select';
        const smsApiData = {
            op: 'pattern',
            user: '9190043755',
            pass: 'Ali26121371',
            fromNum: '3000505',
            toNum: '09190043755',
            patternCode: 'i7cmkkz94b98qr8',
            inputData: [
                { "code": randomeCode },
                { "brand": "تیم طراحی سایت وبینجا" }
            ]
        };

        axios.post(smsApiUrl, smsApiData)
            .then(response => {
                console.log('SMS Sent', response.data);
            })
            .catch(error => {
                console.error('SMS Not Send', error);
            });
        return res.redirect('/mytickets');
    }
    async sendTicketAdmin(req, res) {

        const addTicket = new Tickets({
            user: req.session.userId,
            code: randomeCode,
            title: req.body.title,
            text: req.body.text,
            check: req.body.check,
            parent: req.body.parent
        });

        await addTicket.save();
        return res.redirect('/profile/mytickets');
    }
    async sendTicketReply(req, res) {
        let randomeCode = '1';
        const client = 'Client';

        const addTicket = new Tickets({
            user: req.session.userId,
            code: randomeCode,
            title: client,
            text: req.body.text,
            check: req.body.check,
            parent: req.body.parent
        });

        await addTicket.save();
        this.sendSMS(req);
        return res.redirect(req.header('Referer') || '/');
    }
    editProfile(req, res) {
        const title = 'پروفایل من';
        res.render('profile/editProfile', { title });
    }

    async updateProcess(req, res, next) {
        try {
            const user = await User.findById(req.session.userId);

            if (!user) {
                return res.status(404).send('کاربری یافت نشد');
            }
            const updateFields = { ...req.body };
            if (req.file) {
                if (user.image) {
                    const imagePath = `app/public/${user.image}`;
                    const existsSync = fs.existsSync(imagePath);
                    // چک کردن وجود تصویر در دایرکتوری
                    if (existsSync) {
                        // اگر تصویر وجود داشته باشد، حذف کنید
                        fs.unlinkSync(imagePath);
                    }
                }
                updateFields.image = this.getDirImage(`${req.file.destination}/${req.file.originalname}`);
            }
            await User.findByIdAndUpdate(req.session.userId, { $set: updateFields });
            return res.redirect(req.header('Referer') || '/');
        } catch (err) {
            return next(err);
        }
    }
    getDirImage(dir) {
        return dir.substring(10)
    }
    async sendSMS(req, res) {
        let message = req.body.codeNumber;
        //send SMS
        const smsApiUrl = 'http://ippanel.com/api/select';
        const smsApiData = {
            op: 'pattern',
            user: '9190043755',
            pass: 'Ali26121371',
            fromNum: '3000505',
            toNum: '09190043755',
            patternCode: 'i7cmkkz94b98qr8',
            inputData: [
                { "code": message },
                { "brand": "تیم طراحی سایت وبینجا" }
            ]
        };

        axios.post(smsApiUrl, smsApiData)
            .then(response => {
                console.log('SMS Sent', response.data);
            })
            .catch(error => {
                console.error('SMS Not Send', error);
            });
    }
}

module.exports = new profileController();