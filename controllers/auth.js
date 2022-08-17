const User = require('../models/admin')
// const createHttpError = require('http-error')
// var generator = require('generate-password');
const bcrypt = require('bcrypt')
const {mailer} = require('../helpers/init_nodemailer')
module.exports =({
    
    regiser : async (req,res,next) => {
        try {
            
            const {email,password,} = req.body
            const exist = await User.findOne({email : email})
            if(exist){ 
                req.flash('error_msg','Already Registered ')
                res.redirect('/auth/reg')
              
            }
            else{const newUser = new User({
                
                email : email,
                password : password,
                
            })
            newUser.save()
            req.flash('success_msg','Registration Successful ')
            res.redirect('/auth/login')
            
        }
        } catch (error) {
           next(error)  
    }
   
},
forgot: async(req,res,next) => {
    res.render('forgot')
},
forgotten: async(req,res,next) => {
    try {
        const exist = await User.findOne({email : req.body.forgot_mail})
        console.log(exist)
        const pass= exist.email.slice(0,6)+'@R22'
        // const newPassword = generator.generate({
        //     length: 10,
        //     numbers: true,
        //     symbols: true

        // });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);

        const Admin = await User.findOneAndUpdate({ email: req.body.forgot_mail }, {
            password: hashedPassword
        })
        if (!Admin) {
            req.flash('error_msg','Email is not registered')
            res.redirect('/auth/forgot')
        } else {

            let msg = "Your New Passord : " + pass
            mailer(req.body.forgot_mail, msg)
           req.flash('success_msg','New password  send to your email')
            res.redirect('/auth/login')
        }
    }

    catch (error) {
         next(error)
    }
}
})