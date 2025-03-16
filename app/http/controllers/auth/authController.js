const autoBind = require('auto-bind');
const fs = require('fs');
const axios = require('axios');
const { validationResult } = require('express-validator');

// models 
const User = require('app/models/users');

class loginController {

    constructor() {
        autoBind(this);
    }

    async index(req, res, next) {
        let mobile = req.session.mobile || false;
        let rCode = req.session.rCode || false;
        req.session.mobile = false;
        req.session.rCode = false;
        const title = "صفحه ورود | ثبت نام";
        res.render('auth/index', { mobile, rCode, massages: req.flash('errors') });
    }

    async processRegisteration(req, res, next) {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array();
            const massages = [];
            errors.forEach(err => massages.push(err.msg));
            req.flash('errors', massages);
            req.session.mobile = true;
            return res.redirect('/auth');
        } else {
            const { mobileNumber } = req.body
            const user = await User.findOne({ mobileNumber: mobileNumber });
            if (user) {
                let randomeCode = user.random;
                //send SMS
                const smsApiUrl = 'http://ippanel.com/api/select';
                const smsApiData = {
                    op: 'pattern',
                    user: '9190043755',
                    pass: 'Ali26121371',
                    fromNum: '3000505',
                    toNum: req.body.mobileNumber,
                    patternCode: '7v3i1mlcqg84t2v',
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
                req.session.mobile = false;
                req.session.rCode = true;
                return res.redirect('/auth');
            } else {
                this.sendSMS(req)

                req.session.rCode = true;
                return res.redirect('/auth');
            }

        }

    }

    async loginVerify(req, res) {
        const { Vcode } = req.body
        const user = await User.findOne({ random: Vcode })
        if (user) {
            req.session.userId = user._id;
        } else {
            console.log('Code not Defind')
            req.flash('errors', 'کد وارد شده صحیح نمی باشد دوباره سعی کنید');
            req.session.rCode = false;
            req.session.mobile = true;
            // return res.json(user)
            return res.redirect('/auth')
        }
        if (user.admin) {
            req.session.mobile = true;
            req.session.rCode = false;
            // return res.json(user)
            return res.redirect('/admin');
        }
        req.session.mobile = true;
        req.session.rCode = false;
        // return res.json(user)
        return res.redirect('/');
    }

    async logOut(req, res) {
        let users = await User.findById(req.session.userId);
        if (users) {
            req.session.userId = null;
            return res.redirect('/auth')
        } else {
            console.log('Logout not work')
        }
    }

    async sendSMS(req, res) {
        //RandomCode
        const min = 1000;
        const max = 9999;
        let randomeCode = Math.floor(Math.random() * (max - min + 1)) + min;
        //User Save
        let { name } = req.body
        const addUser = await new User({
            mobileNumber: req.body.mobileNumber,
            random: randomeCode, name
        })
        addUser.save();
        //send SMS
        const smsApiUrl = 'http://ippanel.com/api/select';
        const smsApiData = {
            op: 'pattern',
            user: '9190043755',
            pass: 'Ali26121371',
            fromNum: '3000505',
            toNum: req.body.mobileNumber,
            patternCode: '7v3i1mlcqg84t2v',
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
    }
}

module.exports = new loginController();