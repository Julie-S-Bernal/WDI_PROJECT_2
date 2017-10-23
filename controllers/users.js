const User = require('../models/user');

function editRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/edit', { user }));
}

module.exports = {
  edit: editRoute
};
