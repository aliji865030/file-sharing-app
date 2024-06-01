const express=require("express")
const mongoose=require("mongoose")

const fileRoutes=require("./routes/file")

const app=express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/filesharingapp")
.then(()=>console.log("db connect success"))
.catch((error)=>console.log("ERROR ACCOUR to connect db",error))

app.use(fileRoutes)

app.listen(8080,()=>console.log("app is up and runing on port number 8080"))