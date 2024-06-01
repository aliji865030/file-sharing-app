

const mailServices=require("../services/mailService")




const fileModel=require("../models/file")
const fileUploadService=require("../services/uploadService")


const uploadFile= async (req,res)=>{

    const upload=fileUploadService.single("file")
    
    upload(req,res, async (error)=>{
        console.log(req.body);
       if(error){
        console.log("ERROR WHILE UPLOADING THE FILE",error)
        return
       }

       console.log("FILE UPLOADED SUCCESSFULLY");
    //    console.log(req.file);

    const newFile=new fileModel({
        originalname:req.file.originalname,
        newFilename:req.file.filename,
        path:req.file.path,
        size:req.file.size
    })

    const newFileData=await newFile.save()

       res.json({
        success:true,
        message:"file uploaded success",
        fileId:newFileData._id
       })
    })

    // res.json({
    //     success:true,
    //     message:"Dummy upload data"
    // })
}

const generateDynamicLink= async (req,res)=>{
   
     try {
        
         const fileId=req.params.uuid;
     
         const file= await fileModel.findById(fileId)
         if(!file){
             return res.status(404).json({
                 success:false,
                 message:"file not found "
             })
         }
         console.log(fileId);
         res.json({
             success:true,
             message:"Dummy generateDynamicLink data",
             result:"http://localhost:8080/files/download/"+fileId
         })

     } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong please try after some time"
        })
     }

}

const downloadFile= async (req,res)=>{
    try {
        
        const fileId=req.params.uuid;
    
        const file= await fileModel.findById(fileId)
        if(!file){
            return res.end("File with given ID is not found")
        }
       res.download(file.path,file.originalname)



    } catch (error) {
        res.end("something went wrong please try after some time")
    }

}

const sendFile= async (req,res)=>{
    const {fileId,shareTo}=req.body;

    const downloadbleLink="http://localhost:8080/files/download/"+fileId

    const info = await mailServices.sendMail({
        from: 'do-not-reply@kuchhbhi.com', // sender address
        to: shareTo, // list of receivers
        subject: "A file has been shared", // Subject line
        html: `
           <html>
           <head>
           </head>
           <body>
           <h1>Your friend has share a file click to download</h1>
           <br />
           <br />
           <a href="${downloadbleLink}">CLICK HERE</a>
           
           </body>
           </html>        
        `
      });

      console.log("Message sent: %s", info.messageId);


    res.json({
        success:true,
        message:"file shared on email success"
    })
}

const fileController={
    uploadFile,
    generateDynamicLink,
    downloadFile,
    sendFile
}

module.exports=fileController
