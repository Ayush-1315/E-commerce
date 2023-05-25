import { useEffect } from "react";
import { LoginForm } from "../../components/loginForm";
export const Login=()=>{
    useEffect(()=>{
        document.title="Login | ShopsyCart";
    })
    return <>
    <LoginForm/>
    </>
}