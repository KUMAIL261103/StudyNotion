import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseBuilderform from "./CourseBuilderform/coursebuilder";
import CourseInformationForm from "./CourseInfo/Courseinfo";
import PublishCourse from "./PublishCourse/PublishCourse";
const RenderSteps = () => {
    const {step}  = useSelector(state => state.course)
    const steps = [
        {id:1,title:"Course Information"},
        {id:2,title:"Course Builder"},
        {id:3,title:"Publish Course"}
    ]
    return (  
    <>
        <div className="relative mb-2 flex w-full justify-center">
            {
                steps.map((item,index) => {
                    return(
                        <>
                        <div 
                             className="flex flex-col items-center "
                             key={item.id} >
                            <div className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                            step === item.id? "border-yellow-50 bg-yellow-900 text-yellow-50": "border-richblack-700 bg-richblack-800 text-richblack-300"
                            } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}>
                                {step>item.id?(<FaCheck className="font-bold text-richblack-900"/>   ):(item.id)}
                            </div>
                        </div>
                        {item.id !== steps.length && (
                            <>
                                <div
                                className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                                step > item.id  ? "border-yellow-50" : "border-richblack-500"
                                } `}
                                ></div>
                            </>
                        )}
                        </>
                    )
                } )
            }



        </div>
        <div className="relative mb-16 flex w-full select-none justify-between">
            {steps.map((item) => {
                return(
                    <>
                    <div className="flex min-w-[130px] flex-col items-center gap-y-2"
                        key={item.id}>
                        <p  className={`text-base font-semibold ${
                            step >= item.id ? "text-white" : "text-richblack-500"
                            }`}>{item.title}</p>
                    </div>
                    </>
                )
            })}
        </div>
        {step===1 &&<CourseInformationForm/>}
        {step===2 &&<CourseBuilderform/>}
        {step===3 &&<PublishCourse/>} 
    </> );
}
 
export default RenderSteps;