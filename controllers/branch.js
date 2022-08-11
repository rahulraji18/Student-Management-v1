const Branch = require('../models/branch')

module.exports =({

    add : async (req,res,next) => {
        try { 
            const newBranch = new Branch({     
              branch : req.body.branch,
            })
            const saveBranch = await newBranch.save()
            res.redirect('/dashboard') 
          } catch (error) {    
            console.log(error)
          }
        },

})