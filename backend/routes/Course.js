const express = require("express");
const router = express.Router();
const {auth,isAdmin,isInstructor,isStudent} = require("../middlewares/auth");
//course controllers
const {
    getcoursedetails,
    getAllCourses,
    createCourse

}= require("../controllers/Course");

//category controllers
const {
    createCategory,
    getAllCategorys,
    getcategorydetails,
} = require("../controllers/Category");

//section controllers

const {
    deleteSection,
    updateSection,
    createSection,
}= require("../controllers/Section");

//subsection controllers
const {
    createSubSection,
    updateSubSection,
    deleteSubsection,
}= require("../controllers/SubSection");


//rating review controllers
const {
    getAvgRating,
    createRatingReview,
    getallRatingReview

}=require("../controllers/RatingAndReview");

//ratingreviews routes
router.post("/createRating", auth, isStudent, createRatingReview)
router.get("/getAverageRating", getAvgRating)
router.get("/getReviews", getallRatingReview);

//subsection routes

router.post("/createSubSection",auth,isInstructor,createSubSection);
router.put("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubsection)
//section routes

router.get("/deleteSection",auth,isInstructor,deleteSection);
router.put("/updateSection",auth,isInstructor,updateSection);
router.post("/createSection",auth,isInstructor,createSection);

//category routes

router.get("/getAllCategories",getAllCategorys);
router.get("/getcategorydetails",getcategorydetails);
router.post("/createCategory",auth,isAdmin,createCategory);

//course routes
router.get("/getCourseDetails",getcoursedetails);
router.get("/getAllCourses",getAllCourses);
router.post("/createCourse",auth,isInstructor,createCourse);
module.exports = router;