const mongoose =require('mongoose')

mongoose.connect('mongodb+srv://mubeen:mubeen@cluster0.mxl9hzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/mern').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})  