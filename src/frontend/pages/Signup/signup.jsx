import { useEffect } from "react";
import { SignUp } from "../../components/signupForm";
export const Signup=()=>{
    useEffect(()=>{
        document.title="SignUp | ShopsyCart";
    })
    return<>SignUp
    <SignUp/>
    </>
}