import { useEffect } from "react";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import  {getenrolledcourses}  from "../../../services/operations/profileAPI";
import Spinner from "../../common/Spinner";

const EnrolledCourses = () => {
    const {token} = useSelector((state)=>state.auth);

    const [enrolledcourses,setEnrolledCourses] = useState(null);
    const getenrolledCourses = async()=>{
        try{
          //console.log("First");
            const response = await getenrolledcourses(token);
            //console.log("second");
            console.log(response);
            setEnrolledCourses(response.data);

        }catch(error){
            console.log(error);
            console.log("unavailable to fetch enrolled courses");
            
        }
    }
    useEffect(()=>{
        getenrolledCourses();
        // eslint-disable-next-line
    },[])
    return ( 
    <div >
        <div>Enrolled Courses</div>
        {
            !enrolledcourses?(<div className="flex justify-center items-center w-full h-full"><Spinner/></div>):
            !enrolledcourses.length?(<p>You have not enrolled in any course yet.</p>):

            (<div>
                <div>
                    <p>Course Name</p>
                    <p>Durations</p>
                    <p>Progress</p>
                </div>
                <div>
                    {enrolledcourses.map((course,index)=>
                    {return(
                    <div key={index}>
                        <div>
                            <img src={course.thumbnail} alt="thumbnail"/>
                            <div>
                                <p>{course.courseName}</p>
                                <p>{course.courseDescription}</p>
                            </div>
                        </div>
                        <div>{course?.totalDuration}</div>
                        <div>
                            <p>Progress:{course.progressPercentage || 0}%</p>
                            <ProgressBar
                            completed={course.progressPercentage || 0}
                            height="8px"
                            isLabelVisible={false}/>
                        </div>
                    </div>)})}
                </div>
            </div>)
        }
    </div> );
    }
 
export default EnrolledCourses;