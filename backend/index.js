const express = require("express")
const cors = require("cors")
//install nodemailer
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")


const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://arjundikshitha:arju123@cluster0.t27x2rq.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function () {
    console.log("Connected to DB")
}).catch(function (err) {
    console.log("Failed to Connect",err.message)
})

const credential = mongoose.model("credential", {}, "bulkmai")

app.post("/sendemail", function (req, res) {

    var msg = req.body.msg
    var emailList = req.body.emailList

    credential.find().then(function (data) {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: data[0].toJSON().user,
            pass: data[0].toJSON().pass,
        },
    });
    
    new Promise(async function (resolve, reject) {
        try {
            for (let i = 0; i < emailList.length; i++) {
                await transporter.sendMail(
                    {
                        from: "dikshitha2298@gmail.com",
                        to: emailList[i],
                        subject: "A message from bulk mail app",
                        text: msg
                    }
                )
                console.log("email sent to:" + emailList[i])
            }
            resolve("Sucess")

        } catch (error) {
            reject("Failed")
        }


    }).then(function () {
        res.send(true)
    }).catch(function () {
        res.send(false)
    })
}).catch(function (error) {
    console.log(error)
})






})

app.listen(5000, function () {
    console.log("server started....")
})