const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new', { page: 'login' });
}

function sessionsCreate(req, res, next ) {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        return res.render('sessions/new');
      }

      req.session.userId = user.id;

      req.flash('success', `Welcome back, ${user.username}!`);
      return res.redirect('/teas');
    })
    .catch(next);
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
