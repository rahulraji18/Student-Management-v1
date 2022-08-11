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
require('./config/passport')(passport);

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended : false}))

//engine setup
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

//partials
const partialsPath = path.join(__dirname,'views/partials/')
hbs.registerPartials(partialsPath)

//Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Router
app.use('/auth', require('./router/auth'))
app.use('/student',require('./router/student'))
app.use((req,res,next) => {
  res.render('404')
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})