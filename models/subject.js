
const mongoose = require('mongoose')
const subjectSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true,
        // unique: true,
    },
    subject: {
        type: String, 
        required: true,
    },

},
{timestamps : true})


const Subject = mongoose.model('subject', subjectSchema)
module.exports = Subject