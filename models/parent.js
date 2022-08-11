
const mongoose = require('mongoose')
const parentSchema = new mongoose.Schema({
    name: {
        type: String, 
    },
    address: {
        type: String, 
    },
    sid: { 
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
    },


},
{timestamps : true})


const Parent = mongoose.model('parent', parentSchema)
module.exports = Parent