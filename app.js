const express = require('express')
const app = express()
require('dotenv').config()
require('./helpers/init_mongoose')
const morgan = require('morgan')
const path=require('path')
const hbs=require('hbs')
const bodyParser = require('body-parser')
const multer = require('multer')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');
// Passport Config
require('./config/passport')(passport);
// const urlencodedParser=bodyParser.urlencoded({extended:false})
// const cookieParser = require('cookie-parser')
// const createHttpError = require('http-error')

const authController = require('./controllers/auth.controller')
const userController = require('./controllers/user.controller')
const branchController = require('./controllers/branch')
const subjectController = require('./controllers/subject')
const teacherController = require('./controllers/teacher')
const parentController = require('./controllers/parent')
const {ensureAuthenticated, forwardAuthenticated} = require('./config/auth')

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended : false}))

//engine setup
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')
//Partials
const partialsPath = path.join(__dirname,'views/partials/')
hbs.registerPartials(partialsPath)

//file upload
const Storage = multer.diskStorage({
                destination : (req,file,cb) => {
                    cb(null, './public/images/')
                },
                filename : (req,file,cb) => {
                    console.log(file)
                    cb(null,Date.now()+path.extname(file.originalname ))

                }
                })
                const upload = multer({storage : Storage}).single('Testimage')
//Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Connect flash
app.use(flash())

//Global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('flash_msg')
    res.locals.error_msg = req.flash('error_msg')
    // res.locals.error = req.flash('error')
    next()
})
//Routes
// app.use('/',require('./router/index'))
// app.use('/users', require('./router/users'))
app.get('/',(req,res)=> {
  res.render('homepage')
})
app.get('/login',async (req,res,next) => {
    res.render('login')
   })
app.get('/reg', async (req,res) => {
    res.render('register')
})
app.post('/register',authController.regiser)
// app.post('/login',authController.login)
app.get('/dashboard',ensureAuthenticated,userController.getStudent )
// app.post('/dashboard',ensureAuthenticated,userController.getStudent )
app.get('/newStudent', ensureAuthenticated,userController.reg )
app.post('/newstud',ensureAuthenticated,upload, userController.regStudent)
app.get('/update/:id', ensureAuthenticated,userController.update)
app.post('/updated/:id',ensureAuthenticated,userController.updated)
app.get('/delete/:id', ensureAuthenticated,userController.delete)
app.get('/view/:id',ensureAuthenticated, userController.view)
app.get('/dashboard/:id',ensureAuthenticated,(req,res)=>{})
app.get('/branch',ensureAuthenticated, (req,res) => {
  res.render('branch')
})
app.post('/branch', ensureAuthenticated,branchController.add)
app.get('/subject',(req,res) => {
  res.render('subject')
})
app.post('/subject', subjectController.add)
app.get('/teacher', teacherController.page)
app.post('/teacher', teacherController.add)
app.get('/parent', parentController.page)
app.post('/parent', parentController.add)
app.post('/search',subjectController.search)
// app.get('/search/:id',ensureAuthenticated,(req,res)=>{})
// Login
app.post('/login',(req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
    })(req, res, next);
  });
  
  // Logout
  app.get('/logout',ensureAuthenticated,async(req, res,next) => {
    // req.logout()
    req.session.destroy(function (err) {
    res.redirect('/login')
    })
  });
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})