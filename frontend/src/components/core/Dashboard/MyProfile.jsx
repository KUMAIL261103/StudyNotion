import { useSelector } from "react-redux";
// import Iconbutton from "../../common/Iconbutton";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const {user} = useSelector((state)=>state.profile);
    
    return ( 
    <div className="bg-richblack-800   gap-4 flex justify-center flex-col w-full items-center" >
        <h1 className=" text-white text-4xl">My Profile</h1>
        <div className="flex flex-row bg-richblack-600 rounded-md py-7 mb-10 justify-around items-center w-10/12 mx-auto">
            <div className="flex flex-row gap-x-10 text-white justify-center items-center">
                <img src={`${user?.image}`} alt="profile_img" className="aspect-square w-[78px] rounded-full object-cover"/>
                <div className="flex flex-col justify-center text-lg text-center">
                    <p>{user?.firstName + "  " + user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            
           <Link to={"/dashboard/settings"} >
            <button className={`text-center px-5 py-1 text-[18px] rounded-md font-bold
            bg-yellow-50 text-black 
             hover:scale-95 transition-all duration-200`}>Edit</button>
           </Link>
        </div>


        <div className="flex flex-col text-white bg-richblack-600 rounded-md py-7 mb-10  justify-center items-around  w-10/12 mx-auto">
            <div className="flex flex-row justify-around w-full items-center gap-2  ">
            <h2 className="text-xl ">About</h2>
            
            <Link to={"/dashboard/settings"} >
            <button className={`text-center px-5 py-1 text-[18px] rounded-md font-bold
            bg-yellow-50 text-black 
            hover:scale-95 transition-all duration-200`}>Edit</button>
           </Link>
            </div>
            {user?.additionalDetails?.about?(<p className=" w-9/12 mx-auto text-lg text-richblack-50">{user?.additionalDetails?.about}</p>):(<p className="w-10/12 mx-auto text-lg text-richblack-50">Write Something about yourself</p>)}
            
            
        </div>
         <div className="flex flex-col text-white bg-richblack-600 rounded-md py-7 mb-10 gap-4  justify-center items-around  w-10/12 mx-auto">
            <div className="flex flex-row justify-around w-full items-center gap-2  ">
            <h2 className="text-xl ">Personal Details</h2>
            
            <Link to={"/dashboard/settings"} >
            <button className={`text-center px-5 py-1 text-[18px] rounded-md font-bold
            bg-yellow-50 text-black 
            hover:scale-95 transition-all duration-200`}>Edit</button>
           </Link>
            </div>
           <div className="flex flex-row justify-around">
            <div className="flex flex-col items-center">
                <p className="text-richblack-50">First Name:</p>
                <p>{user?.firstName}</p>

            </div>
            <div className="flex flex-col items-center">
                 <p className="text-richblack-50">Last Name:</p>
                <p>{user?.lastName}</p>

            </div>
           </div>
           <div className="flex flex-row justify-around">
            <div className="flex flex-col items-center ">
                <p className="text-richblack-50">Email:</p>
                <p>{user?.email}</p>

            </div>
            <div className="flex flex-col items-center">
                 <p className="text-richblack-50">Gender:</p>
                {user?.additionalDetails.gender?(<p>{user?.additionalDetails.gender}</p>):(<p>-</p>)}

            </div>

           </div>
           <div className="flex flex-row justify-around">
            <div className="flex flex-col items-center">
                 <p className="text-richblack-50">DateOfBirth:</p>
                {user?.additionalDetails.dateOfBirth?(<p>{user?.additionalDetails.dateOfBirth}</p>):(<p>-</p>)}

            </div>
            <div className="flex flex-col items-center ">
                <p className="text-richblack-50">PhoneNumber:</p>
                {user?.additionalDetails?.contactNumber?(<p>{user?.additionalDetails?.contactNumber}</p>):(<p>-</p>)}

            </div>

           </div>
         </div>


        


    </div> 
    );
}
 
export default MyProfile;