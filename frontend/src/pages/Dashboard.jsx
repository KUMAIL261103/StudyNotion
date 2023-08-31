import { useSelector } from "react-redux";
import {Outlet} from "react-router-dom"
import Spinner from "../components/common/Spinner";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
    const {loading:authloading} = useSelector((state)=>state.auth);
    const{loading:profileloading} = useSelector((state)=>state.profile)
    
    if(authloading || profileloading){
        return (
            <div className="mt-10">
            <Spinner/>
            </div>)
    }else{

        return ( 
            <div className="relative flex gap-x-10 min-h-[calc(100vh-3.5rem)] w-full">
                <Sidebar/>
                <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
                    <div className="mx-auto w-full  bg-richblack-800 min-w-[1000px] max-w-full rounded-md py-10">
                    <Outlet/>
                    </div>
                </div>
                   

            </div>
           
         );
    }
}
 
export default Dashboard;