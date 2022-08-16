
const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
  
    name: {
        type: String, 
        // required: true
        
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    Image:{
        type : String,
        required: true
      },
},
{timestamps : true})


const Student = mongoose.model('student', studentSchema)
module.exports = Student
studentSchema.pre('save', function(next) { 
    this.modifiedPaths()

})