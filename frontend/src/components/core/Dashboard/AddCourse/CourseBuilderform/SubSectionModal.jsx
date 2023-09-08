import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseSlice";
import {  useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { createSubSection,updateSubSection } from "../../../../../services/operations/course";
import { RxCross1 } from "react-icons/rx";
import Upload from "./Upload";
const SubSectionModal = ({modalData,setmodalData,add=false,view=false,edit=false}) => {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    //const {course} = useSelector(state => state.course)
    const  {register,setValue,getValues, handleSubmit, formState: { errors }} = useForm();
    useEffect(() => {
        if(view || edit){
            setValue("LectureTitle",modalData.title);
            setValue("LectureDesc",modalData.description);
            setValue("LectureVideo",modalData.videoUrl);
        }
        // eslint-disable-next-line
    }, []);
    const isformupdated = () => {
        const {LectureTitle,LectureDesc,LectureVideo} = getValues();
        if(LectureTitle !== modalData.title || LectureDesc !== modalData.description || LectureVideo !== modalData.videoUrl){
            return true;
        }else{
            return false;

        }
    }
    const handleEditSubSection = async(data) => {
        const currentvalues = getValues();
        const formData = new FormData();
        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);
        if(currentvalues.LectureTitle !== modalData.title){
            formData.append("title",currentvalues.LectureTitle);
        }
        if(currentvalues.LectureDesc !== modalData.description){
            formData.append("description",currentvalues.LectureDesc);
        }
        if(currentvalues.LectureVideo !== modalData.videoUrl){
            formData.append("video",currentvalues.LectureVideo);
        }
        setLoading(true);
        const result = await updateSubSection(formData,token);
        if(result.success){
            dispatch(setCourse(result));
        }
        setLoading(false);
        setmodalData(null);

    }
    const onSubmit = async(data) => {
        if(view){
            return;
        }
        if(edit){
            if(!isformupdated){
                toast.error("No changes made to the form");
            }
            else{
                handleEditSubSection(data);
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.LectureTitle);
        formData.append("description",data.LectureDesc);
        formData.append("video",data.LectureVideo);
        setLoading(true);
        const result = await createSubSection(formData,token);
        if(result.success){
            dispatch(setCourse(result));
        }
        setLoading(false);
        setmodalData(null);
    }

    return ( 
    <div>
        <div>
            <div>
                <p>{view && "Viewing"}{add && "Adding"}{edit && "Editing"} Lecture</p>
                <button onClick={()=>(!loading ?setmodalData(null):null)}><RxCross1/></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Upload 
                     name="LectureVideo"
                     label="Upload Video"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        video={true}
                        viewData = {view && modalData.videoUrl}
                        editData = {edit && modalData.videoUrl}
                    />
                    </div>
                    <div>
                        <label htmlFor="LectureTitle">Lecture Title</label>
                        <input id="LectureTitle" className="w-full" type="text" {...register("LectureTitle",{required:true})}/>
                        {errors.LectureTitle && <p>LectureTitle field is required</p>}
                    </div>
                    <div>
                        <label htmlFor="LectureDesc">Lecture Description</label>
                        <textarea id="LectureDesc" className="w-full min-h-[130px]" type="text" {...register("LectureDesc",{required:true})}/>
                        {errors.LectureDesc && <p>LectureDescription field is required</p>}
                    </div>
                    {
                        !view && (
                            <div>
                                <button className="" type="submit">{loading ? "Loading...": edit?"Save Changes":"Add"}</button>
                            </div>
                        )
                    }



                </form>
        </div>
    </div> );
}
 
export default SubSectionModal;