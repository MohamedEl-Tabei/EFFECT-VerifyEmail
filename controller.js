const model = require("./model");
const nodemailer = require("nodemailer");
const sendEmail = async (req, res) => {
  try {
    let code = `E-${Math.random().toString().slice(-7, -1)}`;
    let message = await model.findOne({ email: req.body.email });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      host: "my.smtp.host",
      port: 465,
      secure: true, // use TLS

      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Verify Code",
      text: code,
      html: ` 
            <div style="text-align:-webkit-center;color:#adb5bd;">
              <div style="border:10px solid #2dbab3 ;border-bottom:none;border-right:none; width:max-content;padding:3px;border-radius:50rem">
                <div style="border:10px solid #d4a465 ;border-top:none;border-left:none; width:max-content;padding:15px;border-radius:50rem">
                 <h1 style="font-weight:800"> ${code}</h1>
                </div>
              </div>
            </div>
          `,
    });
    if (message) {
      let newCode = await model.preUpdateOne(code);
      await message.updateOne({ content: newCode });
    } else {
      message = new model({ email: req.body.email, content: code });
      await message.save();
    }
    await res.header({"X-vtoken":message.generateToken()})
    await res.status(200).json("Email has been sent");
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const verifyCode=async (req,res)=>{
  try {
    let token=req.headers["x-vtoken"]
    let _id= model.verifyToken(token)
    let message=await model.findById(_id)
    let verify=await message.compareCode(req.body.code)
    res.status(200).json(verify)
  } catch (error) {
    res.status(400).json(error.message);
  }

}
module.exports = { sendEmail,verifyCode };
