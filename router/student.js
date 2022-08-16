const userController = require('../controllers/user')
const branchController = require('../controllers/branch')
const {ensureAuthenticated} = require('../config/auth')
const upload = require('../helpers/upload')

const router = require('express').Router()

//Dashboard
router.get('/dashboard',ensureAuthenticated,userController.getStudent )
//Add student
router.get('/addstudent', ensureAuthenticated,userController.reg )
router.post('/addstudent',ensureAuthenticated,upload,userController.regStudent)
//Edit student
router.get('/update/:id', ensureAuthenticated,userController.update)
router.post('/updated/:id',ensureAuthenticated,upload,userController.updated)
//Delete student
router.get('/deletes/:id', ensureAuthenticated,userController.delete)
//View student
router.get('/view/:id',ensureAuthenticated, userController.view)
router.get('/dashboard/:id',ensureAuthenticated,(req,res)=>{})
//Branch
router.get('/branch',ensureAuthenticated, (req,res) => {
  res.render('branch')
})
router.post('/branch', ensureAuthenticated,branchController.add)

module.exports = router