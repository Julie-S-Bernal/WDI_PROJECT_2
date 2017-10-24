const User = require('../models/user');

function editRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/edit', { user }));
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {

      if(!user) return res.notFound();
      if(!user.belongsTo(req.user)) return res.unauthorized(`/users/${user.id}`, 'You do not have permission to edit that resource');
      for(const field in req.body) {
        user[field] = req.body[field];
        console.log(`${user}++++++++++++ is the new user info +++++++++++`);
      }

      return user.save();

    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

module.exports = {
  edit: editRoute,
  update: updateRoute
};
