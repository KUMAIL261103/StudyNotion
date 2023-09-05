import RenderSteps from "./RenderSteps";
const AddCourse = () => {
    return ( 
        <>
        <div className="text-richblack-5">
            <div>
                <h1>Add Course</h1>
                <div>
                    <RenderSteps/>
                </div>
            </div>
            <div>
                <p>Code Upload Tips</p>
                <ul>
                    <li>
                        Set the Course Price option or make it free
                    </li>
                    <li>
                        Standard size of course thumbnail is 1024x576
                    </li>
                    <li>
                        Video section controls the course overview video
                    </li>
                    <li>
                        Set the Course Price option or make it free
                    </li>
                    <li>
                        Standard size of course thumbnail is 1024x576
                    </li>
                    <li>
                        Video section controls the course overview video
                    </li>
                </ul>
            </div>
        </div>

        </> );
}
 
export default AddCourse;