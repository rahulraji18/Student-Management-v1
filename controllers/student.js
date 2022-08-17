const Student = require("../models/student")
var mongoose = require('mongoose');
const {mailer}  = require("../helpers/init_nodemailer");
const Branch = require("../models/branch");

const ITEMS_PER_PAGE = 5;

module.exports =({
  getStudent: async(req,res,next)=> {
    
    var query = {};

    if (req.query.searchtext) {
        // query['name'] = { $regex: req.query.searchtext, $options: 'i' }

        query = {
            $or: [
                { name: { $regex: req.query.searchtext, $options: 'i' } },
                { address: { $regex: req.query.searchtext, $options: 'i' } },
                { dob: { $regex: req.query.searchtext, $options: 'i' } },
                { phone: { $regex: req.query.searchtext, $options: 'i' } },
                { email: { $regex: req.query.searchtext, $options: 'i' } },

            ]
        }

    }

    let page = +req.query.page
    let sort = req.query.sort || "name"
    req.query.sort ? (sort ==req.query.sort.split(",")) : (sort = [sort])
    let sortBy = {}
    let order = req.query.order || "asc" 
    // let search = req.query.search
    let gen = req.query.gen || "All"
    if(sort[1]){
      sortBy[sort[0]] = sort[1]
    }else{
      sortBy[sort[0]] = order
    }
   
    if (!page) page = 1
    let totalItems;
    Student.find(query)
      .countDocuments()
      .then(count => {
        totalItems = count;
        return Student.find(query)
          .sort(sortBy)
          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE);
      })
      .then(students => {
        res.render('details', {
          data: students,
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPreviousPage:page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
          demolim:page<( Math.ceil(totalItems / ITEMS_PER_PAGE)),
          ord: req.params.order ? 'asc' : 'desc',
          fl: true
        });
      })
      .catch(error => {
        next(error)
      });
  
    },
    reg: async (req,res,next) => {
      try {
        const branch = await Branch.find()
          res.render('newstudent',{branch : branch})
        
      } catch (error) {
        next(error)
      }
    },
    regStudent : async (req,res,next) => {
        try { 
          console.log(req.file)
            const {name, address, email, phone, dob,branch} = req.body
            const exist = await Student.findOne({email : email})
            if(exist)  console.log('already')
            const newUser = new Student({
              
              name : name,
              address : address,
              email : email,
              phone : phone,
              branch: branch,
              dob : dob,
              Image: req.file.filename,
              
            })
                const saveUser = await newUser.save()
                let msg = 'Your are successfully registered'
                const mailers = mailer(email,msg)
                req.flash('success_msg','saved successfully ')
                res.redirect('/student/dashboard')   
            
          } catch (error) {
            
            next(error)
          }
        },
        update: async (req,res,next) => {
          try {
            const data = await Student.find({_id: req.params.id})
            
            if(!data){
              res.render('details')
            }
            const branch = await Branch.find()
            res.render('update',{data:data[0], branch: branch})
            
          } catch (error) {
           next(error)
          }
        },
        updated : async (req,res,next) => {
          try {
            let data
            if(req.file){
              data = await Student.findByIdAndUpdate(req.params.id, {
                $set : req.body,
                Image: req.file.filename
              },{new : true})
  
            }else{
              data = await Student.findByIdAndUpdate(req.params.id, {
                $set : req.body,
              },{new : true})
  
            }
 
               let msg = `Your successfully updated`
               const mailers = mailer(data.email,msg)
               data.save()
               req.flash('success_msg','Successfully Updated') 
              res.redirect('/student/dashboard')

            if(!data){
              res.render('details')
            }
            
          } catch (error) {
            next(error)
          }
        },
        delete: async (req,res,next) => {
          try {
            const id = req.params.id
            const user = await Student.findByIdAndDelete(id)
            console.log(user)
            let msg = 'Your account successfully deleted'
            const mailers = mailer(user.email,msg)  
            req.flash('success_msg','Successfully Deleted') 
            res.redirect('/student/dashboard')
            
          } catch (error) {
            next(error)
          }
        },
        view: async (req,res,next) => {
          try {
            const data = await Student.find({_id: req.params.id})
            
            if(!data){
              res.render('details')
              
            }
            let email = data[0].email         
            res.render('view',{data:data[0]})
            
          } catch (error) {
           next(error)
          }
          
        },
        index:  (req, res, next) => {
        },
})