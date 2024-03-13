require("dotenv").config()
const app=require("./app")
const mongoose=require("mongoose")




app.listen(process.env.PORT||5000,()=>console.log("run"))
mongoose.connect(process.env.MONGODBURI).then(console.log("database connected"))