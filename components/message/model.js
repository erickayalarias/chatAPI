const mongoose = require("mongoose")

const Schema = mongoose.Schema

const mySchema = new Schema({
    chat:{
        type:Schema.Types.ObjectId,
        ref:"chat"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    message:{
        type:String,
        required:true
    },
    date:Date
})

const model = mongoose.model("mensaje",mySchema)
module.exports= model;