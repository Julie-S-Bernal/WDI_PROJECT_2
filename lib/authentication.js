const User = require('../models/user');

function authentication(req, res, next) {
  if (!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .exec()
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in');
          res.redirect('/login');
        });
      }

      req.session.userId = user._id;
      req.user = user;
      res.locals.user = user;
      res.locals.isAuthenticated = true;

      next();
    });
}

module.exports = authentication;
