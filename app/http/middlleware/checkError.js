const middleware = require('app/http/middlleware/middleware');
const configs =require('./../../../configs/index');
class checkError extends middleware {

    async get404(req, res, next) {
        try {
            this.error('چنین صفحه ای وجود ندارد', 404)
        } catch (err) {
            next(err)
        } 
    }

    async handle(err, req, res, next) {
        const statusCode = err.status || 500;
        const message = err.message || '';
        const stack = err.stack || '';


        // console.log(err.status);
        const title = `${statusCode}`;
        let mobile = req.session.mobile || false;
        let rCode = req.session.rCode || false;
        req.session.mobile = false;
        req.session.rCode = false;

        if (configs.debug) return res.render('error/stack', { statusCode, message, stack, title,mobile,rCode, massages: req.flash('errors') });
        return res.render(`error/${statusCode}`, { message, title,mobile,rCode, massages: req.flash('errors') });
    }
}

module.exports = new checkError();