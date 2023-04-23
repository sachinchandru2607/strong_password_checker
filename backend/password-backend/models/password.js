const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    password : {
        type : String,
        required : "Password is required",
    },
    minsteps : {
        type : String,
        required : "Minimum steps is required"
    }
})

module.exports = mongoose.model("Password", passwordSchema)