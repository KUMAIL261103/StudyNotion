import React from "react";
import {RiDeleteBin6Line} from "react-icons/ri";
import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import { useDispatch } from "react-redux";
const RenderCartItems = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector((state)=>state.cart);
    return ( <div>
        {
            cart.map((course,index)=>(
                <div key={index}>
                    <div>
                        <img src={course?.thumbnail} alt="course"/>
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.Category}</p>
                            <div>
                                <span>4.5</span>
                                <ReactStars count={5} size={20} activeColor="#ffd700" edit={false}
                                emptyIcon={<BiSolidStar/>} halfIcon={<BiSolidStarHalf/>} fullIcon={<BiSolidStar/>}/>
                                <span>{course?.ratingReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>dispatch(removeFromCart(course._id))}>
                            <RiDeleteBin6Line/>
                           <span>Remove</span> 
                        </button>
                        <p>course?.price</p>
                    </div>
                </div>
            ))
        }
    </div> );
}
 
export default RenderCartItems;