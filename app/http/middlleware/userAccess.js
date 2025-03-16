
const User = require('app/models/users');

module.exports = class AccessUserMiddleware {
  static async accessUser(req, res, next) {
    try {
      let access = false;
      let users = null;
      if (req.session.userId) {
        access = true;
        users = await User.findById(req.session.userId);
      }
      res.locals.access = access;
      res.locals.users = users;
      // console.log(user.name)
      next();
    } catch (error) {
      next(error);
    }
  }
}