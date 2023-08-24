const {instance}= require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mails/courseEnrollmentEmail");
require("dotenv").config();
//capture the payment and initiate the Razorpay order
exports.capturePayment = async(req,res)=>{
    //get courseId and UserId
    const courseId = req.body;
    const userId = req.user.id;
    //validation
    //valid courseId
    if(!courseId){
        res.json({
            success:false,
            message:"Please provide valid course Id",
        })
    }let course;
    try{
        course = await Course.findById(courseId);
        if(!course){
            return res.json({
                success:false,
                message:"Course is not found"
            })
        }
        //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled",
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error, try again",
            error:error.message,
        })

    }
    const amount = course.price;
    const currency = "INR";
    const options = {
        amount:amount*100,
        currency:currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:courseId,
            userId:userId,
        }
    }
   
    //orDer create
    try{
        //initiate payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            coursedesc:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        })


    }
}
//verify SiGnature of  Razorpay and server
exports.verifySignature = async(req,res)=>{
    const webhookSecret = process.env.webhookSecret;
    const signature = req.headers["x-razorpay-signature"];
    const shasum =crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if(digest === signature){
        console.log("Payment is Authorised");
        const {courseId,userId} = req.body.payload.payment.entity.notes;
    
    try{
        //Main Action
        //find the course and enrol student in it
        const enrolledcourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentEnrolled:userId}},
            {new: true},
        );
        if(!enrolledcourse){
            return res.status(500).json({
                success:false,
                message:"Course not found",
            })
        }
        console.log(enrolledcourse);
        //find the student and add the course to their list of course
        const enrolledStudent = await User.findOneAndUpdate(
            {_id:userId},
            {$push:{courses:courseId}},
            {new:true},
        );
        console.log(enrolledStudent);
        //confirmation mail send
         await sendPaymentSuccessEmail(enrolledStudent.email,
                                    "Congratulation start Your Learing Journey with StudyNotion"
                                    ,courseEnrollmentEmail(enrolledcourse.courseName,enrolledStudent.firstName));
        return res.status(200).json({
            success:true,
            message:"Signature verified and course added to respective student",
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })

    }
    }else{
        return res.status(400).json({
            success:false,
            message:"Invalid request",
            
        })

    }
}
exports.sendPaymentSuccessEmail = async(email,text,body)=>{
    try{

        const emailResponse = await mailSender(
            email,
            text,
            body
        )
        console.log(emailResponse);
    }catch(error){
        console.log(error);
        console.log(`email not send ,error occured -${error}`);
    }
}

