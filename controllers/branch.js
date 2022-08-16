const Branch = require('../models/branch')

module.exports =({

    add : async (req,res,next) => {
        try { 
            const newBranch = new Branch({     
              branch : req.body.branch,
            })
            const saveBranch = await newBranch.save()
            req.flash('success_msg','saved successfully ')
            res.redirect('/student/dashboard') 
          } catch (error) {    
            next(error)
          }
        },

})