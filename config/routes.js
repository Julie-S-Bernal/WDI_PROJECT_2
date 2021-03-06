const router = require('express').Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const teasController = require('../controllers/teas');
const usersController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');


router.get('/', (req, res) => res.render('homepage'));

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/teas')
  .get(teasController.index)
  .post(secureRoute, teasController.create);

router.route('/teas/new')
  .get(secureRoute, teasController.new);

router.route('/teas/:id')
  .get(teasController.show)
  .put(secureRoute, teasController.update)
  .delete(secureRoute, teasController.delete);

router.route('/teas/:id/edit')
  .get(secureRoute, teasController.edit);


// authentification not workin stuff
router.route('/users/:id/edit')
  .get(usersController.edit);

router.route('users/:id')
  .put(usersController.update);


router.route('/teas/:id/comments')
  .post(secureRoute, teasController.createComment);

router.route('/teas/:id/comments/:commentId')
  .delete(secureRoute, teasController.deleteComment);



router.get('/favicon.ico', function(req, res) {
  res.status(204);
});

router.all('*', (req, res) => res.notFound());

module.exports = router;
