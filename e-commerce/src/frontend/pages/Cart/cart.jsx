import { CartProductCard } from "../../components/cartProduct";
import { useCart } from "../../context/cartContext"
export const Cart=()=>{
    const {cartState}=useCart();
    const encodedToken=localStorage.getItem("token");
    const cartEmpty=cartState.length===0;
    return <div>
    {
        encodedToken ? 
        (cartEmpty?<>Looks Like you need to Shop!</>:<>
        {cartState.map((product,index)=><CartProductCard product={product} key={index}/>)}
        </>):
        <h1>Login First</h1>    
    }
    </div>
}