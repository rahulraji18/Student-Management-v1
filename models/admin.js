const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true

    },
},
{timestamps : true})

userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
      next()  
    } catch (error) {
        next(error)
    }
})
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
       
        
    } catch (error) {
        throw error
    }
}
const User = mongoose.model('user', userSchema)
module.exports = User