const mongoose=require("mongoose")

const fileSchema=new mongoose.Schema( {
    originalname: {
        type:String
    },
    newFilename: {
        type:String
    },
    path: {
        type:String
    },
    size: {
        type:Number
    }
  })

  const fileModel=mongoose.model("files",fileSchema)

  module.exports=fileModel