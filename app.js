const express=require("express")
const cors=require("cors")
const router = require("./router")
const app=express()

app.use(cors({exposedHeaders:"X-Vtoken"},))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/verify",router)




module.exports=app