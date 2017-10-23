const Tea = require('../models/tea');

function indexRoute(req, res, next) {
  Tea
    .find()
    .populate('createdBy')
    .exec()
    .then((teas) => res.render('teas/index', { teas }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('teas/new');
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  Tea
    .create(req.body)
    .then(() => res.redirect('/teas'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/teas/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Tea
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((tea) => {
      if(!tea) return res.notFound();
      return res.render('teas/show', { tea });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Tea
    .findById(req.params.id)
    .exec()
    .then((tea) => {
      if(!tea) return res.redirect();
      if(!tea.belongsTo(req.user)) return res.unauthorized(`/teas/${tea.id}`, 'You do not have permission to edit that resource');
      return res.render('teas/edit', { tea });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Tea
    .findById(req.params.id)
    .exec()
    .then((tea) => {
      if(!tea) return res.notFound();
      if(!tea.belongsTo(req.user)) return res.unauthorized(`/teas/${tea.id}`, 'You do not have permission to edit that resource');
      for(const field in req.body) {
        tea[field] = req.body[field];
      }

      return tea.save();
    })
    .then(() => res.redirect(`/teas/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/teas/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Tea
    .findById(req.params.id)
    .exec()
    .then((tea) => {
      if(!tea) return res.notFound();
      if(!tea.belongsTo(req.user)) return res.unauthorized(`/teas/${tea.id}`, 'You do not have permission to edit that resource');
      return tea.remove();
    })
    .then(() => res.redirect('/teas'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Tea
    .findById(req.params.id)
    .exec()
    .then((tea) => {
      console.log(tea);
      if(!tea) return res.notFound();
      req.body.createdBy = req.user;
      tea.comments.push(req.body); // create an embedded record
      return tea.save();
    })
    .then((tea) => res.redirect(`/teas/${tea.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Tea
    .findById(req.params.id)
    .exec()
    .then((tea) => {
      if(!tea) return res.notFound();
      // get the embedded record by it's id
      const comment = tea.comments.id(req.params.commentId);
      if(!comment.belongsTo(req.user)) return res.unauthorized(`/teas/${tea.id}`, 'You do not have permission to edit that resource');
      comment.remove();
      return tea.save();
    })
    .then((tea) => res.redirect(`/teas/${tea.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
