import { useAuth } from "../context/authContext"
export const ShowUser=()=>{
    const {authDispatch,authState,setIsLogin}=useAuth();
    const {firstName,lastName,gender,email,address:{city,state,country,pin},phone}=authState;
    return <div>
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>Email:{email}</p>
        <p>Gender:{gender}</p>
        <p>Phone Number: {phone}</p>
        <p>Address: {`${city},${state},${country}`}</p>
        <p>Pin Code: {pin}</p>
        <button onClick={()=>{
            authDispatch({type:"LOG_OUT"})
            setIsLogin(false);}
            }>LogOut</button>
    </div>
}