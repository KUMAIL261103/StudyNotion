import Footer from "../components/common/Footer";
import CourseSlider from "../components/common/CourseSlider";
import {useParams }from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import {courseEndpoints ,categories} from "../services/apis";
import { getCategoryPageData } from "../services/operations/PageAndComponentData";
import { useEffect, useState } from "react";
const Categorypage = () => {
    const {catalogName }= useParams();
    const [catelogPageData,setCatelogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");
    //fetch all categories
    useEffect(() =>{
        const getCategoryDetails = async() => {
            try{
                // const result = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
                // const result = await apiConnector("GET", categories.CATEGORIES_API);
                // console.log("Printing category result:",result);
                // const category_id = result.data.data.filter((category) => category.name === catalogName)[0]._id;
                // console.log("Printing category id:",category_id);
                // setCategoryId(category_id);
                //get data from localstorage
                const sublinks = JSON.parse(localStorage.getItem("sublinks"));
                //console.log("Printing sublinks:hereee",sublinks);
                const category_id = sublinks.filter((category) => category.name === catalogName)[0]._id;
                //console.log("Printing category id:",category_id);
                setCategoryId(category_id);
                
            }catch(error){
                console.log("Could not fetch the category list");
                console.log(error);
            };
        };
        getCategoryDetails();
            },[catalogName]);
    useEffect(() =>{ 
        const getCategoryPagedata = async() => {
        try{
            const result = await getCategoryPageData(categoryId);
            console.log("Printing category page result:",result);
            setCatelogPageData(result.data.data);
        }catch(error){
            console.log("Could not fetch the category page data");
            console.log(error);
        }
        }
    getCategoryPagedata();

    },[categoryId]);
    return ( 
    <div className="">
        <div>
            <p>Home / Catalog /</p>
            <span>{catalogName}</span>
            <p></p>
            <p></p>
        </div>
        <div>
        {/* section1 */}
            <div>
                <div className="flex flex-row">
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <CourseSlider/>
            </div>
            {/* sectio2 */}
            <div>
                <p>Top Courses</p>
                <div>
                    <CourseSlider/>
                </div>
            </div>
            {/* section3 */}
            <div>
                <p>Frequently Bought Together</p>
            </div>

        </div>
     <Footer/>   
    </div>  );
}
 
export default Categorypage;