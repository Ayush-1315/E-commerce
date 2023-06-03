import { useUser } from "../../context/userContext"

export const OrderSuccess=()=>{
    const {orders}=useUser();
    console.log(orders)
    return <>
    <h1>Order Success</h1>
    <p>{orders[orders.length-1]?.orderId}</p>
    </>
}