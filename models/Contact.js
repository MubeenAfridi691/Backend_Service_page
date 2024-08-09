const mongoose=require('mongoose')
const schema=mongoose.Schema

const contactschema=new schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true

    }})

    const contacts=mongoose.model('contact',contactschema)
    module.exports=contacts