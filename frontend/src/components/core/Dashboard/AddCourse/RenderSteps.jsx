import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationFprm from "./CourseInfo/Courseinfo";
const RenderSteps = () => {
    const {step}  = useSelector(state => state.course)
    const steps = [
        {id:1,title:"Course Information"},
        {id:2,title:"Course Builder"},
        {id:3,title:"Publish Course"}
    ]
    return (  
    <>
        <div>
            {
                steps.map((item,index) => {
                    return(
                        <>
                        <div >
                            <div className={`${step ===item.id  ?
                            "bg-yellow-900 border-yellow-50 text-yellow-50":
                            "border-richblack-700 bg-richblack-800 text-richblack-300" }`}>
                                {step>item.id?(<FaCheck/>):(item.id)}
                            </div>
                        </div>
                        {
                            item.id !==steps.length
                            //add dashes between steps
            
                        }
                        </>
                    )
                } )
            }



        </div>
        <div>
            {steps.map((item,index) => {
                return(
                    <>
                    <div>
                        <p>{item.title}</p>
                    </div>
                    </>
                )
            })}
        </div>
        {step===1 &&<CourseInformationFprm/>}
        {/* {step===2 &&<CourseBuilderform/>}
        {step===3 &&<PublishCourseform/>} */}
    </> );
}
 
export default RenderSteps;