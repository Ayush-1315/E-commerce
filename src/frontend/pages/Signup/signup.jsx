import { useEffect } from "react";
import { SignUp } from "../../components/signupForm";
import "./signUp.css"
export const Signup=()=>{
    useEffect(()=>{
        document.title="SignUp | ShopsyCart";
    },[])
    return<>
    <SignUp/>
    </>
}