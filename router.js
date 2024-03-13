const express=require("express")
const router=express.Router()
const controller=require("./controller")

router.route("/sendemail").post(controller.sendEmail)
router.route("/verifycode").post(controller.verifyCode)




module.exports=router