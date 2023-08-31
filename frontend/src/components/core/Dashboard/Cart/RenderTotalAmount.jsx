import { useSelector } from "react-redux";

const RenderTotalAmount = () => {
    const handleBuyCourse = ()=>{
        // const course = cart.map((course)=>course._id));
        console.log("buy course");
    }
    const {total} = useSelector((state)=>state.cart.totalItems);
    return ( 
    <div>
        <p>Total</p>
        <p>{total} Rs</p>
        <button onClick={handleBuyCourse} className="w-full">Buy Now</button>
        
    </div> );
}
 
export default RenderTotalAmount;