const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new', { page: 'register' });
}

function createRoute(req, res, next) {
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
