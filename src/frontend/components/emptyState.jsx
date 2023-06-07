import EmptyCart from "../../images/cart.webp";
export const EmptyState=({message})=>{
    return<div className="empty-page">
        <h1>{message}</h1>
        <img src={EmptyCart} alt="emptyCart" className="emptyState"/>
    </div>
}