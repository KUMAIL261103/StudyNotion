const Section = require("../models/Section");
const Course = require("../models/Course");
require("dotenv").config();
exports.createSection = async(req,res)=>{
    try{
        //get data
        const {SectionName,courseID}= req.body;
        //validate 
        if(!SectionName || !courseID){
            return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
        }
        //create section
        const section = await Section.create({SectionName});
        //update section into course
        const updatecourse = await Course.findByIdAndUpdate(
            courseID,
            {$push: {
                courseContent:section._id,
            }},
            {new:true},
        ).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			});
        // TODO :use populate to replace subsection/section both in updatecourse
        //return response
        return res.status(200).json({
            success:true,
            message:"Section is created",
            updatecourse,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,Section did'nt create,try again",
            error:error.message,
        })
    }
}
exports.updateSection = async(req,res)=>{
    try{
        //get data
        const {newSectionName,sectionID}=req.body;

        //data validate
        if(!newSectionName || !sectionID){
            return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
        }
        //update
        const updatesection = await Section.findByIdAndUpdate(sectionID,{newSectionName},{new:true});
         return res.status(200).json({
            success:true,
            message:"Section is updated",
            updatesection,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Error,Section did'nt update,try again",
            error:error.message,
        })
    }
}
exports.deleteSection = async(req,res)=>{
    try{
        const {sectionID} =req.params || req.body;
        if(!sectionID){
            return res.status(400).json({
                success:false,
                message:"Details are not sufficient",
            })
        }
        await Section.findByIdAndDelete(sectionID);
         return res.status(200).json({
            success:true,
            message:"Section is deleted",
           
        })

    }catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Internal Error,Section did'nt delete,try again",
            error:error.message,
        })

    }
}