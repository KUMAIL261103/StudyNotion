import { useSelector } from "react-redux";

const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state)=>state.cart);
    const handleBuyCourse = ()=>{
        const course = cart.map((course)=>course._id);
        console.log("buy course",course);
    }
    return ( 
    <div>
        <p>Total</p>
        <p>{total} Rs</p>
        <button onClick={handleBuyCourse} className="w-full">Buy Now</button>
        
    </div> );
}
 
export default RenderTotalAmount;