// create a new express router
const express = require('express'),
  router = express.Router(),
  mainController = require('./controllers/main.controller'),
  authController = require('./controllers/auth.controller');

// export router
module.exports = router;

// define routes
router.get('/', mainController.showHome);
router.get('/about', mainController.showAbout);
router.get('/services', mainController.showServices);
router.get('/courses', mainController.showCourses);
router.get('/pricing', mainController.showPricing);
router.get('/contact', mainController.showContact);

router.get('/login', mainController.showLogin);
router.post('/do_login', authController.doLogin);
router.post('/do_signup', authController.doSignup);
router.post('/check_signup_duplicate', authController.checkSignupDuplicate);
router.get('/logout', authController.doLogout);



