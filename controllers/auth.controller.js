const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createHttpError = require('http-error')
let obj
// const alertss = require('node-popup/dist/cjs.js');
module.exports =({
    
    regiser : async (req,res,next) => {
        try {
            
            const {email,password,} = req.body
            const exist = await User.findOne({email : email})
            if(exist){ res.render('register',{status: false})}
            else{const newUser = new User({
                
                email : email,
                password : password,
                
            })
            newUser.save()
            res.render('login', {status: true}) }
        } catch (error) {
           next(error)  
    }
},
})