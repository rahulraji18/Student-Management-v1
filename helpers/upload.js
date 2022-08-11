const multer = require('multer')
const path=require('path')

const Storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, './public/images/')
    },
    filename : (req,file,cb) => {
        console.log(file)
        cb(null,Date.now()+path.extname(file.originalname ))

    }
    })
    const upload = multer({storage : Storage}).single('Testimage')

module.exports = upload    