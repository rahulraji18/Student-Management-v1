const Student = require("../models/student.model")
var mongoose = require('mongoose');
const {mailer}  = require("../helpers/init_nodemailer");
const Branch = require("../models/branch");

const ITEMS_PER_PAGE = 5;

module.exports =({
  getStudent: async(req,res)=> {
    let page = +req.query.page

    let sort = req.query.sort || "name"
    req.query.sort ? (sort ==req.query.sort.split(",")) : (sort = [sort])
    let sortBy = {}
    let order = req.query.order || "asc" 
    let search = req.query.search
    let gen = req.query.gen || "All"
    if(sort[1]){
      sortBy[sort[0]] = sort[1]
    }else{
      sortBy[sort[0]] = order
    }

    if (!page) page = 1
    let totalItems;
  
    Student.find({})
      .countDocuments()
      .then(count => {
        totalItems = count;
        return Student.find()
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
      .catch(err => {
console.log(err)
      });
  
    },
    reg: async (req,res) => {
      const branch = await Branch.find()
        res.render('newstudent',{branch : branch})
    },
    regStudent : async (req,res) => {
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
            // console.log(newUser)
            try {
                const saveUser = await newUser.save()
                let msg = 'Your are successfully registered'
                const mailers = mailer(email,msg)
                res.redirect('/student/dashboard')
            } catch (error) {
                console.log(error)
            }      
            
          } catch (error) {
            
            console.log(error)
          }
        },
        update: async (req,res) => {
          try {
            const data = await Student.find({_id: req.params.id})
            
            if(!data){
              res.render('details')
            }
            const branch = await Branch.find()
            // console.log(data)
            res.render('update',{data:data[0], branch: branch})
            
          } catch (error) {
            console.log(error)
          }
        },
        updated : async (req,res) => {
          try {

            // let id = mongoose.Types.ObjectId(req.params.id)
            // let newvalues = { $set: {name:req.body.name, address:req.body.address, email:req.body.email, phone:req.body.phone, dob:req.body.dob, } };
            const old = await Student.findOne({_id: req.params.id})
            // console.log(req)
            const data = await Student.findByIdAndUpdate(req.params.id, {
              $set : req.body
            },{new : true})

                //  const dem1 = data._doc
                //  const old11 = old._doc
                 var {updatedAt,createdAt,...dem} = data._doc
                 var {updatedAt,createdAt,...old1} = old._doc

                 const difference = (old1, dem) => {
                  let keyFound = false;
                  Object.keys(old1).forEach(key => {
                     if(old1[key] !== dem[key]){
                        return keyFound = key
                     }
                  });
                  return keyFound || -1;
               };
               console.log(difference(old1, dem));
               var field =difference(old1, dem)
               let msg = `Your ${field} successfully updated`
               const mailers = mailer(data.email,msg)
               data.save()
              res.redirect('/student/dashboard')
           
            if(!data){
              res.render('details')
            }
            
          } catch (error) {
            console.log(error);
          }
        },
        delete: async (req,res) => {
          try {
            const user = await Student.findByIdAndDelete(req.params.id)
            if(!user){
              throw createHttpError.NotFound('No user found')
            }
            console.log(user.email)
            let msg = 'Your account successfully deleted'
            const mailers = mailer(user.email,msg)   
            res.redirect('/student/dashboard')
            
          } catch (error) {
            console.log(error)
          }
        },
        view: async (req,res) => {
          try {
            const data = await Student.find({_id: req.params.id})
            
            if(!data){
              res.render('details')
              
            }
            let email = data[0].email
            let msg = 'Successfully view your details'

            const mailers = mailer(email,msg)            
            res.render('view',{data:data[0]})
            
          } catch (error) {
            console.log(error)
          }
          
        },
        index:  (req, res, next) => {
        },
})