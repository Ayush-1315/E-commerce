import { useUser } from "../../context/userContext"
import success from "../../../images/success.gif";
export const OrderSuccess=()=>{
    const {orders}=useUser();
    console.log(orders)
    return <>
    <h1>Order Success</h1>
    <img src={success} alt="Success" style={{width: "18rem",borderRadius: "30px"}}/>
    <p><strong>Transaction ID:</strong>{orders[orders.length-1]?.orderId}</p>
    </>
}