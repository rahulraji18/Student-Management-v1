const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createHttpError = require('http-error')
const alert = require('alert')
let obj
// const alertss = require('node-popup/dist/cjs.js');
module.exports =({
    
    regiser : async (req,res) => {
        try {
            
            const {email,password,} = req.body
            const exist = await User.findOne({email : email})
            let obj={register:1}
            console.log(obj.register)
            if(exist){ res.render('register',{msg: obj})}
            // alert('user already exist')
            // const pwd = hashedPassword(password)
            else{const newUser = new User({
                
                email : email,
                password : password,
                
            })
            newUser.save()
            res.render('login',{msg: obj}) }
        } catch (error) {
            console.log(error)
        }      
    },
    login: async(req,res)=> {
        try {
            const {email, pwd} = req.body
            const user  = await User.findOne({email: email})  
            let obj={login:3}
            if(!user) res.render('login',{msg: obj})
            const isMatch =await bcrypt.compare(req.body.password, user.password)
            console.log(isMatch)
            if(isMatch === false)   res.render('login',{msg: obj})
            else{
                const {password, ...others} = user._doc
                const accessToken = jwt.sign({
                     id: user._id,
                     isAdmin : user.isAdmin,
                 },process.env.TOKEN_SECRET, {expiresIn : "1h"})
                res.redirect('/dashboard')  
            } 
        
        } catch (error) {
            
           console.log(error)
        }
    }
})