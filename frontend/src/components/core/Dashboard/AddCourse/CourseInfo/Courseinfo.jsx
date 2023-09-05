import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import UploadImage from "./UploadImage";
import CreateTags from "./Createtags";
import RequirementField from "./RequiementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
const CourseInformationFprm = () => {
    const dispatch = useDispatch();
    const{course,editcourse} = useSelector(state => state.course);
    const {register,handleSubmit,
        setValue,getValues,
        formState:{errors}} = useForm();
    const {token} = useSelector(state => state.auth);
    const [loading,setLoading] = useState(false);
    const [courseCategories,setCourseCategories] = useState([]);
    useEffect(()=>{
        // const getCourseCategories = async () => {
        //     setLoading(true);
        //     const categories = await fetchcoursecategories();
        //     if(categories){
        //         setCourseCategories(categories);
        //     }
        //     setLoading(false);
        // }
        // if(editcourse){
        //     setValue("courseTitle",course.title);
        //     setValue("courseDescription",course.description);
        //     setValue("coursePrice",course.price);
        //     setValue("courseTags",course.tags);
        //     setValue("courseCategory",course.category);
        //     setValue("courseImage",course.thumbnail);
        //     setValue("courseBenefits",course.whatYouWillLearn);
        //     setValue("courseRequirements",course.instructions);;
        // }
        // getCourseCategories();
        // eslint-disable-next-line
    },[])
    const isFormUpdated = ()=>{
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName){
            return true;
        }
        else if(currentValues.courseDescription !== course.courseDescription){
            return true;
        }
        else if(currentValues.coursePrice !== course.coursePrice){
            return true;
        }
        else if(currentValues.courseCategory._id !== course.courseCategory._id){
            return true;
        }
        else if(currentValues.courseTags !== course.courseTags){
            return true;

        }
        else if(currentValues.courseImage !== course.courseImage){
            return true;
        }
        else if(currentValues.courseBenefits !== course.whatYouWillLearn){
            return true;
        }
        else if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
            return true;
        }
        else{
        return false;
    }
    }
    const onSubmit = async(data) => {
        console.log(data);
        if(editcourse){
            if(isFormUpdated){
                    const currentValues = getValues();
                    const formdata = new FormData();
                    formdata.append("courseId",course._id);
                    if(currentValues.courseTitle !== course.courseName){
                        formdata.append("courseName",data.courseTitle);
                    }
                    if(currentValues.courseDescription !== course.courseDescription){
                        formdata.append("courseDescription",data.courseDescription);
                    }
                    if(currentValues.coursePrice !== course.coursePrice){
                        formdata.append("coursePrice",data.coursePrice);
                    }
                    if(currentValues.courseCategory._id !== course.Category._id){
                        formdata.append("courseCategory",data.courseCategory._id);
                    }
                    if(currentValues.courseTags !== course.courseTags){
                        formdata.append("courseTags",data.courseTags);
                    }
                    if(currentValues.courseImage !== course.courseImage){
                        formdata.append("courseImage",data.courseImage);
                    }
                    if(currentValues.courseBenefits !== course.whatYouWillLearn){
                        formdata.append("whatYouWillLearn",data.courseBenefits);
                    }
                    if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                        formdata.append("instructions",JSON.stringify((data.courseRequirements)));
                    } 
                    console.log(formdata);
                    // setLoading(true);
                    // const updatedCourse = await updateCourse(formdata,token);
                    // setLoading(false);
                    // if(updatedCourse){
                    //     dispatch(setCourse(updatedCourse));
                    //     dispatch(setStep(2));
                    // }

        }
        else{
            toast.error("No Changes made");
        }
        return;

        
    }
     const formdata = new FormData();
        formdata.append("courseName",data.courseTitle);
        formdata.append("courseDescription",data.courseDescription);
        formdata.append("coursePrice",data.coursePrice);
        formdata.append("courseCategory",data.courseCategory);
        formdata.append("courseTags",data.courseTags);
        formdata.append("courseImage",data.courseImage);
        formdata.append("whatYouWillLearn",data.courseBenefits);
        formdata.append("instructions",JSON.stringify((data.courseRequirements)));
        formdata.append("status",COURSE_STATUS.DRAFT);
        console.log(formdata);
        // setLoading(true);
        // const createdCourse = await createCourse(formdata,token);
        // setLoading(false);
        // if(createdCourse){
        //                 dispatch(setCourse(createdCourse));
        //                 dispatch(setStep(2));
        //             }
}
    return ( 
    <div>
        <form onSubmit={handleSubmit(()=>onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-6">
            <div>
                <label htmlFor="courseTitle" className=" w-full text-sm font-medium text-richblack-25">
                Course Title<sup className="text-yellow-5">*</sup>
                </label>
                <input type="text" name="courseTitle" id="courseTitle"
                 placeholder="Course Title"
                 className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 text-richblack-50"
                    {...register("courseTitle",{required:true})}/>
                    
                    {
                        errors.courseTitle && <p className="text-yellow-25">Course Title is required</p>
                    }
                
            </div>
            <div>
                <label htmlFor="courseDescription" className=" w-full text-sm font-medium text-richblack-25">
                Course Description<sup className="text-yellow-5">*</sup>
                </label>
                <textarea type="text" name="courseDescription" id="courseDescription"
                    placeholder="Course Description"    
                    className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 h-28 text-richblack-50"
                    {...register("courseDescription",{required:true})}/>
                    {
                        errors.courseDescription && <p className="text-yellow-25">Course Description is required</p>
                    }
            </div>
            <div className="relative ">
                <label htmlFor="coursePrice" className=" w-full text-sm font-medium text-richblack-25">
                Course Price<sup className="text-yellow-5">*</sup>
                </label>
                
                <input type="number" name="coursePrice" id="coursePrice"
                    placeholder="Course Price"
                    className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 text-richblack-50"
                    {...register
                        ("coursePrice",{
                        required:true,
                        valueAsNumber:true,
                        })}
                />

                <HiOutlineCurrencyRupee className="text-yellow-5 absolute top-9"/>
                    {
                        errors.coursePrice && <p className="text-yellow-25">Course Price is required</p>
                    }
            </div>
            <div>
                <label htmlFor="courseCategory" className=" w-full text-sm font-medium text-richblack-25">
                Course Category<sup className="text-yellow-5">*</sup>
                </label>
                <select type="text" name="courseCategory" id="courseCategory"
                    className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 text-richblack-50" 
                    placeholder="Course Category"
                    defaultValue="" {...register("courseCategory",
                    // {required:true}
                    )}>
                   
                    <option value="" disabled>Select Category</option>
                    <option value="Web Development">Web Development</option>    
                    {!loading && courseCategories.map((item,index) => 
                    {
                        return(
                            <option key={index} value={item?._id}>{item?.name}</option>
                        )
                    }
                    )}
                    
                </select>
                {
                        errors.courseCategory && <p className="text-yellow-25">Course Category is required</p>
                }
            </div>
            <CreateTags
             label="Tags"
             name="courseTags"
             placeholder="Enter tags and press enter"
             register={register}
             errors={errors}
             setValue={setValue}
             getValue={getValues}/>
             <UploadImage
            name="courseImage"
             placeholder="Enter Image"
             register={register}
             errors={errors}
             setValue={setValue}
             />
            <div>
                <label htmlFor="courseBenefits" className=" w-full text-sm font-medium text-richblack-25">
                Course Benefits <sup className="text-yellow-5">*</sup>
                </label>
                <textarea type="text" name="courseBenefits" id="courseBenefits"
                    placeholder="What you will learn"
                    className="w-full rounded-md border-richblack-700 bg-richblack-700 p-2 h-28 text-richblack-50"
                    {...register("courseBenefits",{required:true})}/>
                    {
                        errors.courseBenefits && <p className="text-yellow-25">What you will learn is required</p>
                    }
            </div>
            <RequirementField
            name="courseRequirements"
            label="Prerequisites for this course"
            register= {register}
            errors={errors}
            setValue={setValue}
            getValue={getValues}
            />
            {
                editcourse &&
                <button
                // onClick={()=>dispatch(setStep(2))}
                >
                    Continue without saving</button>
            }
            <button type="submit" className="text-center px-5 py-1 text-[16px] rounded-md font-bold
                bg-yellow-50 text-black ">{!editcourse?"Next": "Save Changes"}</button>


            </form>

    </div> );
}
 
export default CourseInformationFprm;