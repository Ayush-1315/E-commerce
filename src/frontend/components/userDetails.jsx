import { useAuth } from "../context/authContext"
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishistContext";
export const ShowUser=()=>{
    const {authDispatch,authState,setIsLogin}=useAuth();
    const {cartDispatch} =useCart();
    const {wishlistDispatch}=useWishlist();
    const {firstName,lastName,gender,email,address:{city,state,country,pin},phone}=authState;
    return <div>
        <h2 div style={{margin:"0",padding:"1rem"}}>{`${firstName} ${lastName}`}</h2>
        <p>Email:{email}</p>
        <p>Gender:{gender}</p>
        <p>Phone Number: {phone}</p>
        <p>Address: {`${city},${state},${country}`}</p>
        <p>Pin Code: {pin}</p>
        <button onClick={()=>{
            authDispatch({type:"LOG_OUT"});
            cartDispatch({type:"RESET"});
            wishlistDispatch({type:"RESET"});
            setIsLogin(false);}
            }>LogOut</button>
    </div>
}