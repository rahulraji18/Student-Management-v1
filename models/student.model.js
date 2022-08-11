
const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
  
    name: {
        type: String, 
        
    },
    address: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    branch: {
        type: String,
    },
    dob: {
        type: String
    },
    Image:{
        type : String,
      },
},
{timestamps : true})


const Student = mongoose.model('student', studentSchema)
module.exports = Student
studentSchema.pre('save', function(next) { 
    this.modifiedPaths()

})