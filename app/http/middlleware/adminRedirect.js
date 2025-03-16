const User = require('app/models/users');

class adminRedirect  {
    async handle(req, res, next) {
        const user = await User.findById(req.session.userId);
        if (user &&  user.admin) {
            next();
        } else {
            console.log(user)
            res.redirect('/auth');
        }
    }
}
module.exports = new adminRedirect();