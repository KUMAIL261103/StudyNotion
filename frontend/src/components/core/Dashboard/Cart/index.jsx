import { useSelector } from "react-redux";
import RenderCartItems from "./RenderCartItems";
import RenderTotalAmount from "./RenderTotalAmount";
const Cart = () => {
    const {totalItems,total} = useSelector((state)=>state.cart.totalItems);
    return ( 
        <div>
            <h1>My Cart</h1>
            <p>{totalItems} Courses in cart</p>
            {total>0?
            (<div>
                <RenderCartItems/>
                <RenderTotalAmount/>

            </div>):(<p>Cart is empty</p>)}
        </div>
     );
}
 
export default Cart;
