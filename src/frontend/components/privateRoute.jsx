import { Navigate } from "react-router";
import { useLocation } from "react-router";

import { useAuth } from "../context/authContext";
export const PrivateRoute=({children})=>{
    const {isLogin}=useAuth();
    const location=useLocation()
    return (isLogin)?children:<Navigate to="/login" state={location}/>}