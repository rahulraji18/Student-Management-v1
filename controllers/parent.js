// const Student = require('../models/student')
const Parent = require('../models/parent')


module.exports = {
    page: async(req,res) => {
        res.render('parent')
    },
    add : async (req,res,next) => {
        try { 
            console.log(req.body.name)
            const {name, address,sid,phone,email} = req.body
            const data = new Parent({ 
              name:name,
              address:address,
              sid:sid,
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