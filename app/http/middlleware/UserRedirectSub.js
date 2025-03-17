const User = require('app/models/users');

class UserRedirectSub  {
    async handle(req, res, next) {
        const user = await User.findById(req.session.userId);
        if (user) {
            next();
        } else {
            // console.log(user)
            res.redirect('/auth');
        }
    }
}
module.exports = new UserRedirectSub();