const Branch = require('../models/branch')
const Teacher = require('../models/teacher')

module.exports = {
    page: async(req,res) => {
        const branch = await Branch.find()
        res.render('teacher',{branch: branch})
    },
    add : async (req,res,next) => {
        try { 
            console.log(req.body)
            const {name, address,dob,branch,phone,email} = req.body
            const data = new Teacher({ 
              name:name,
              address:address,
              dob:dob,
              branch:branch,
              phone: phone,
              email:email
            })
            const save = await data.save()
            res.redirect('/dashboard') 
          } catch (error) {    
            console.log(error)
          }
        },
}