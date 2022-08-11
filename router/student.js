const userController = require('../controllers/user')
const branchController = require('../controllers/branch')
const subjectController = require('../controllers/subject')
const teacherController = require('../controllers/teacher')
const parentController = require('../controllers/parent')
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
router.post('/updated/:id',ensureAuthenticated,userController.updated)
//Delete student
router.get('/delete/:id', ensureAuthenticated,userController.delete)
//View student
router.get('/view/:id',ensureAuthenticated, userController.view)
router.get('/dashboard/:id',ensureAuthenticated,(req,res)=>{})
//Branch
router.get('/branch',ensureAuthenticated, (req,res) => {
  res.render('branch')
})
router.post('/branch', ensureAuthenticated,branchController.add)
//Subject
router.get('/subject',(req,res) => {
  res.render('subject')
})
router.post('/subject', subjectController.add)
//Teacher
router.get('/teacher', teacherController.page)
router.post('/teacher', teacherController.add)
//Parent
router.get('/parent', parentController.page)
router.post('/parent', parentController.add)
router.post('/search',subjectController.search)

module.exports = router