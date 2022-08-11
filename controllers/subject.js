const Student = require('../models/student.model')
const Subject = require('../models/subject')
const ITEMS_PER_PAGE = 10;
module.exports = {
    add : async (req,res,next) => {
        try { 
            const {id, subject} = req.body
            const data = new Subject({ 
                id : id,    
              subject : subject,
            })
            const save = await data.save()
            res.redirect('/dashboard') 
          } catch (error) {    
            console.log(error)
          }
        },
    search: async(req,res,next) => {
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
    
      // Student.find({})
      // .countDocuments()
      // .then(count => {
      //   totalItems = count;
      //   return Student.find()
      //     .sort(sortBy)
      //     .skip((page - 1) * ITEMS_PER_PAGE)
      //     .limit(ITEMS_PER_PAGE);
      // })
      // .then(students => {
      //   res.render('details', {
      //     data: students,
      //     currentPage: page,
      //     hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      //     hasPreviousPage:page > 1,
      //     nextPage: page + 1,
      //     previousPage: page - 1,
      //     lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      //     demolim:page<( Math.ceil(totalItems / ITEMS_PER_PAGE)),
      //     ord: req.params.order ? 'asc' : 'desc'
      //   });
      // })

      const val = req.body.search
            Student.find({})
      .countDocuments()
      .then(count => {
        totalItems = count;
     return  Student.find(
        {
            name:{"$regex": val,$options:"i"} 
        }
      )
      .sort(sortBy)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
            })
      .then(data => {
      res.render('details',{
        data: data,
        currentPage: page,
        // hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        // hasPreviousPage:page > 1,
        // nextPage: page + 1,
        // previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        // demolim:page<( Math.ceil(totalItems / ITEMS_PER_PAGE)),
        // ord: req.params.order ? 'asc' : 'desc',
        // fl: true
      })
    })  
  },
}