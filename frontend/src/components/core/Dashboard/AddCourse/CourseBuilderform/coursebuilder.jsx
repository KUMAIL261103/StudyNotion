import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NestedView from "./NestedView";
import { useDispatch } from "react-redux";
import { setStep ,setEditCourse, setCourse} from "../../../../../slices/courseSlice";
import {BsArrowRightCircleFill} from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/course";
const CourseBuilderform = () => {
    const {token} = useSelector(state => state.auth);   
    const dispatch = useDispatch();
    const {course} = useSelector(state => state.course);
    const [loading,setLoading] = useState(false);
    const {register,handleSubmit,formState:{errors},setValue} = useForm()
    const [editSectionName,setEditSectionName] = useState(null);  
    useEffect(()=>{
        console.log("updated->",course);
    },[course])  
    const goback = () => {
        // window.history.back();
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
    }
    const gotoNext = () => {
        if(course?.courseContent?.length===0){
            toast.error("Please add atleast one section")
            return;
        }
        if(course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please add atleast one lecture in each section");
            return;
        }
            dispatch(setStep(3));
        }
        
    
    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName","");
    }
    const submithandler = async(data) => {
        setLoading(true);
        let result;
        if(editSectionName){
            result = await updateSection(
                {
                    newSectionName:data.sectionName,
                    sectionID:editSectionName,
                    courseId:course._id,
                },
                token
            )
        }else{
            // console.log(course);
            result = await createSection(
                {
                    SectionName :data.sectionName,
                    courseID:course._id,
                },token
            )
        }
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","");
        }
        setLoading(false);
}
const handleChangeEditSectionName = (sectionId,sectionName) => {
    if(editSectionName===sectionId){
        cancelEdit();
        return;
    }
    setEditSectionName(sectionId);
    //const section = course.courseContent.find((item)=>item._id===sectionId);
    setValue("sectionName",sectionName);
}
     return ( 
    <div className="text-white">
       <p>Course Builder</p>
       <form onSubmit={handleSubmit(submithandler)}>
            <div>
                <label htmlFor="sectionName">Section Name <sup>*</sup></label>
                <input id="sectionName" type="text" 
                placeholder="Add a section name"
                className="w-full rounded-md border-richblack-700 
                bg-richblack-700 p-2 text-richblack-50"
                {...register("sectionName",
                {required:true})}/>
                {errors.sectionName && <p className="text-yellow-25">Section Name is required</p>}
            </div>
            <div className="flex gap-x-3">
                <button type="submit" className="flex flex-row border-yellow-50 text-yellow-50">
                    {editSectionName ? "Edit Section Name" : "Create Section"}
                    <AiOutlinePlusCircle />
                </button>
                {editSectionName && <button onClick={cancelEdit} type="button" className="text-richblack-300 underline text-sm">Cancel Edit</button>}
            </div>
       </form>
       {course?.courseContent?.length>0?
       (<NestedView
       handleChangeEditSectionName={handleChangeEditSectionName} />):<div></div> }
       <div>
        <button onClick={goback} className="rounded-md cursor-pointer flex items-center text-richblack-25 bg-richblack-500">
            Back
        </button>
        <button onClick={gotoNext} className="rounded-md cursor-pointer flex items-center text-black bg-yellow-50">
            Next
            <BsArrowRightCircleFill/>
        </button>
       </div>

       </div>
       );
}
 
export default CourseBuilderform;