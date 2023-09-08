const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        
    },
    courseDescription:{
        type:String,
        
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        
    },
    language:{
        type:String,
        trim:true,
        
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }],
    ratingReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingReview"
    }],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    instructions:[{
        type:[String],
    }],
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    tags:{
        type:[String],
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"User",
    }],
    status:{
        type:String,
        enum:["Draft","Published"],
    }
});
module.exports = mongoose.model("Course",CourseSchema);