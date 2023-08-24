const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadFileToCloudinary} = require("../utils/FileUploader");
require("dotenv").config();
//createCourse
exports.createCourse = async(req,res)=>{
    try{
        //fetch all data
        const {courseName,courseDescription,whatYouWillLearn,price,Category} =req.body;
        let {status}=req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        //validation
        if(!courseName || !courseDescription || !thumbnail  || !whatYouWillLearn || !price || !Category){
            return res.status(401).json({
                success:false,
                message:"All fields are requierd",
            })
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById({userId},
            {
            accountType:"Instructor",
            });
        if(!instructorDetails){
                return res.status(404).json({
                    success:false,
                    message:"Instructor not found"
                })
        }
        //Category validation
        const CategoryDetails = await Category.findById({Category});
        if(!CategoryDetails){
                return res.status(404).json({
                    success:false,
                    message:"Category not found"
                })
        }
        //Upload Image to Cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME);
        //create an entry for new course
        const newCourse  = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            Category:CategoryDetails._id,
            status:status,
            thumbnail:thumbnailImage.secure_url,

        })
        //instructor courselist update
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },{new:true}
        )
        //Category courselist update
        await Category.findByIdAndUpdate({
            _id:CategoryDetails._id,
        },{
        $push:{
                courses:newCourse._id,
        }
        },{new:true},
        );
        return res.status(200).json({
            success:true,
            message:"course created succesfully",
            data:newCourse,
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"failed to create neew course",
            error:error.message,
        })
    }
}

//getallCourses
exports.getAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find({},{
            courseName:true,
            courseDescription:true,
            thumbnail:true,
            price:true,
            instructor:true,
            ratingReviews:true,
            studentEnrolled:true,
        }).populate("instructor").exec();
        
        return res.status(200).json({
            success:true,
            message:"All Course data fetched",
            data:allCourses,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            messaage:"Cannot Fetch Course Data",
            error:error.message,
        })
    }
}
//getcoursedetails
exports.getcoursedetails = async(req,res)=>{
    try{
    const {courseId} = req.body;
    if(!courseId){
        return res.status(404).json({
            success:false,
            message:"Course ID not form",
        })
    }
    const getcoursedetails = await Course.findById(courseId)
    .populate({
        path:"instructor",
        populate:{
            path:"additionalDetails"
        }
    })
    .populate("Category")
    .populate({
        path:"courseContent",
        populate:{
            path:"Section",
            populate:{
                path:"subSection"
            }
        }
    }).exec();
    	if (getcoursedetails.ratingReviews && getcoursedetails.ratingReviews.length > 0) {
						// Populate 'ratingAndreviews' only if it's not empty
						await getcoursedetails.populate("ratingReviews").execPopulate();
					}
    if(!getcoursedetails){
        return res.status(400).json({
            success:false,
            message:`Could not find course with - ${courseId}`,
        })
    }
    return res.status(200).json({
        success:true,
        message:"Course data fetched successfully",
        data:getcoursedetails,
    })
}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"internal server error,could ot get coursedetails",
        error:error.message,
    })

}
}