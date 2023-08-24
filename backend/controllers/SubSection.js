const { updateMany } = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadFileToCloudinary } = require("../utils/FileUploader");
require("dotenv").config();
//create subsection
exports.createSubSection = async(req,res)=>{
    try{
    //get all data
     const {title,timeDuration,description,sectionID}=req.body;
     const {video}=req.files.videoFile;
    //validate data 
    if(!title || !timeDuration || sectionID || !description || !video){
         return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
    }
    //upload on cloudinary
    const uploadDetails = await uploadFileToCloudinary(video,process.env.FOLDER_NAME);
    // create subsection
    const newSubsection = await SubSection.create(
        {
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl: uploadDetails.secure_url,

        }
    )
    //update section
    const updateSection = await Section.findByIdAndUpdate({_id:sectionID},
        {
            $push :{
                subSection:newSubsection._id,
            },
           
        },
            {new:true},
        ).populate("subSection");;
        //TODO: console.log updates section here,after adding populate query
    //return res
    return res.status(200).json({
        success:true,
        message:"Subsection created",
        updateSection
    })

    }catch(error){
         console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,SubSection did'nt create,try again",
            error:error.message,
        })

    }
}
//update subsection
exports.updateSubSection = async(req,res)=>{
    try{
    const {title,timeDuration,description,videoUrl,subsectionID}=req.body;
     if( !subsectionID){
            return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
        }
    const updatesubsection = await SubSection.findByIdAndUpdate(subsectionID,
        {
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl: videoUrl,
        },
        {new:true});
         return res.status(200).json({
            success:true,
            message:"SubSection is updated",
            updatesubsection,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,SubSection did'nt update,try again",
            error:error.message,
        })
    }


}
exports.deleteSubsection = async(req,res)=>{
     try{
        const {subsectionID} =req.params;
        if(!subsectionID){
            return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
        }
        await SubSection.findByIdAndDelete(subsectionID);
         return res.status(200).json({
            success:true,
            message:"SubSection is deleted",
           
        })

    }catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Internal Error,SubSection did'nt delete,try again",
            error:error.message,
        })

    }
}
