
const mongoose = require('mongoose')
const teacherSchema = new mongoose.Schema({
    name: {
        type: String, 
    },
    address: {
        type: String, 
    },
    branch: { 
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
    },
    dob: {
        type: String,
    }

},
{timestamps : true})


const Teacher = mongoose.model('teacher', teacherSchema)
module.exports = Teacher