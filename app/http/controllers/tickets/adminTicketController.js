const autoBind = require('auto-bind');
const axios = require('axios');
const Tickets = require('app/models/tickets');
const User = require('app/models/users');

class adminTicketController {
    constructor() {
        autoBind(this);
    }
    async index(req, res) {
        const title = 'tickets';
        // const tickets = await Tickets.paginate({}, {
        //     limit: 100000, sort: { createAt: -1 }, populate: [{
        //         path: 'user', 
        //         select: 'mobileNumber'
        //     }]
        // })
        const tickets = await Tickets.find({}).populate('user');
        tickets.forEach(ticket => {
            if (!ticket.user) {
                ticket.user = { mobileNumber: "نامشخص" };
            }
        });

        // return res.json(tickets);
        res.render('admin/tickets/index', { title, tickets });
    }

    async replay(req, res) {
        const title = 'Reply';
        const ticket = await Tickets.findById(req.params.id).populate('user').exec();
        const ticketCode = ticket.code;
        const parent = await Tickets.find({ parent: ticketCode });
        // return res.json(parent);
        res.render('admin/tickets/replay', { title, ticket, parent });
    }

    async sendTicket(req, res) {
        let randomeCode = '0';
        const admin = 'Admin';

        const addTicket = new Tickets({
            user: req.session.userId,
            code: randomeCode,
            title: admin,
            text: req.body.text,
            check: req.body.check,
            parent: req.body.parent
        });

        await addTicket.save();
        this.sendSMS(req);
        return res.redirect(req.header('Referer') || '/');
    }

    async sendSMS(req, res) {
        let mobile = req.body.mobileNumber;
        let message = req.body.codeNumber;
        //send SMS
        const smsApiUrl = 'http://ippanel.com/api/select';
        const smsApiData = {
            op: 'pattern',
            user: '9190043755',
            pass: 'Ali26121371',
            fromNum: '3000505',
            toNum: mobile,
            patternCode: 'u6yntrbjxeg546v',
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

    async update(req, res, next) {
        try {
            const ticket = await Tickets.findById(req.params.id);
            ticket.check = false;
            await ticket.save();

            return res.redirect(req.header('Referer') || '/');
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new adminTicketController();