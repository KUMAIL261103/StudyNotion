const {instance}= require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const {paymentSuccessEmail }= require("../mails/paymentSuccessEmail");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mails/courseEnrollmentEmail");
require("dotenv").config();
exports.sendPaymentSuccessEmail = async(req,res)=>{
     const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo 
        const enrolledStudent = await User.findById(userId);
        const body = paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId, paymentId);
        const emailres = await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             body
        )
        console.log("-------------->");
        console.log("Email send---->", emailres);
        if(emailres){
            return res.status(200).json({success:true, message:"Email send successfully for payment success"});
        }
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}
//capture the payment and initiate the Razorpay order
exports.capturePayment  = async(req,res)=>{
    const {courses} = req.body;
    const userId = req.user.id || req.user._id;
    if(courses.length==0){
        return res.status(404).json("Course id is missing ");
    }
    let totalAmount =0;
    for( const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Course not found",
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled",
                })
            }
            totalAmount += course.price;
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Internal Server error, try again",
                error:error.message,
            })
        }
    }
    const options  = {
        amount: totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
        // notes:{
        //     userId:userId,
        //     courseId:courses,
        // }
    }
    try{
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success:true,
            paymentInformation:paymentResponse,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error Could not initiate order, try again",
            error:error.message,
        })
    }
}
exports.verifyPayment = async(req,res)=>{
    console.log(req.body);
    const razorpay_orderid = req.body.razorpay_order_id;
    const razorpay_paymentid = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const courses = req.body.courses;
    const userid = req.user?.id || req.user?._id;
    if(!razorpay_orderid || !razorpay_paymentid || !razorpay_signature || !courses || !userid){
        return res.status(400).json({
            success:false,
            message:"Payment details are missing",
        })
    }
    let body = razorpay_orderid + "|" + razorpay_paymentid;
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET ).update(body.toString()).digest("hex");
    if(expectedSignature === razorpay_signature){


        //Main Action
        await enrolStudentInCourse(courses,userid,res);

        return res.status(200).json({success:true,message:"Payment verified"});
        
    }else{
        return res.status(400).json({
            success:false,
            message:"Payment verification failed",
        })
    }

}
const enrolStudentInCourse = async(courses,userid,res)=>{
    if(courses.length==0){
        return res.status(404).json("Course id is missing ");
    }
    if(!userid){
        return res.status(404).json("User id is missing ");
    }
    for (const course of courses){
        try{
        const enrolledcourse = await Course.findOneAndUpdate(
            {_id:course},
            {$push:{studentEnrolled:userid}},
            {new:true},
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
            {_id:userid},
            {$push:{courses:course}},
            {new:true},
        );
        if(!enrolledStudent){
            return res.status(500).json({
                success:false,
                message:"Student not found",
            })
        }
        console.log(enrolledStudent);
        //confirmation mail send
      const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledcourse.courseName}`,
            courseEnrollmentEmail(enrolledcourse.courseName, `${enrolledStudent.firstName}`)
        ) 
        console.log("Email send", emailResponse);
         }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message,
            })
        }
    }
} 
// exports.capturePayment = async(req,res)=>{
//     //get courseId and UserId
//     const courseId = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseId
//     if(!courseId){
//         res.json({
//             success:false,
//             message:"Please provide valid course Id",
//         })
//     }let course;
//     try{
//         course = await Course.fin dById(courseId);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"Course is not found"
//             })
//         }
//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student is already enrolled",
//             })
//         }

//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Internal Server error, try again",
//             error:error.message,
//         })

//     }
//     const amount = course.price;
//     const currency = "INR";
//     const options = {
//         amount:amount*100,
//         currency:currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:courseId,
//             userId:userId,
//         }
//     }
   
//     //orDer create
//     try{
//         //initiate payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             coursedesc:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })
//     }catch(error){
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         })


//     }
// }
// //verify SiGnature of  Razorpay and server
// exports.verifySignature = async(req,res)=>{
//     const webhookSecret = process.env.webhookSecret;
//     const signature = req.headers["x-razorpay-signature"];
//     const shasum =crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     if(digest === signature){
//         console.log("Payment is Authorised");
//         const {courseId,userId} = req.body.payload.payment.entity.notes;
    
//     try{
//         //Main Action
//         //find the course and enrol student in it
//         const enrolledcourse = await Course.findOneAndUpdate(
//             {_id:courseId},
//             {$push:{studentEnrolled:userId}},
//             {new: true},
//         );
//         if(!enrolledcourse){
//             return res.status(500).json({
//                 success:false,
//                 message:"Course not found",
//             })
//         }
//         console.log(enrolledcourse);
//         //find the student and add the course to their list of course
//         const enrolledStudent = await User.findOneAndUpdate(
//             {_id:userId},
//             {$push:{courses:courseId}},
//             {new:true},
//         );
//         console.log(enrolledStudent);
//         //confirmation mail send
//          await sendPaymentSuccessEmail(enrolledStudent.email,
//                                     "Congratulation start Your Learing Journey with StudyNotion"
//                                     ,courseEnrollmentEmail(enrolledcourse.courseName,enrolledStudent.firstName));
//         return res.status(200).json({
//             success:true,
//             message:"Signature verified and course added to respective student",
//         })
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Internal Server Error",
//             error:error.message,
//         })

//     }
//     }else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request",
            
//         })

//     }
// }


