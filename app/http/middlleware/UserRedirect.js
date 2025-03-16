const User = require('app/models/users');

class userRedirect  {
    async handle(req, res, next) {
        const user = await User.findById(req.session.userId);
        if (user) {
            next();
        } else {
            req.session.mobile = true;
            req.session.rCode = false;
            return res.redirect('/')
        }
    }
}
module.exports = new userRedirect();