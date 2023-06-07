import { useEffect } from "react";
import { LoginForm } from "../../components/loginForm";
import "./login.css"

export const Login=()=>{
    useEffect(()=>{
        document.title="Login | ShopsyCart";
    },[])
    return <>
    <LoginForm/>
    </>
}