const authController = require('../controllers/auth')
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
require('../config/passport')(passport);

const router = require('express').Router()


// login
router.get('/login',async (req,res,next) => {
    res.render('login')
})
//register
router.get('/reg', async (req,res) => {
    res.render('register')
})
//save register
router.post('/register',authController.regiser)
//login verification
router.post('/login',(req, res, next) => {
    
    passport.authenticate('local', {
      successRedirect: '/student/dashboard',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next);
})

//logout
router.get('/logout',ensureAuthenticated,async(req, res,next) => {
    // req.logout()
    req.session.destroy(function (err) {
     res.redirect('/auth/login')
    })
  });
router.get('/forgot',authController.forgot)
router.post('/forgot',authController.forgotten)
module.exports = router