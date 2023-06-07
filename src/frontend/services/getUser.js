import axios from "axios";
export const userDetails=async({email,password})=>{
    try{
        const response=await axios.post("/api/auth/login",{
            email: `${email}`,
            password: `${password}`,
        }); 
        return response.data
        ;
    }
    catch(e){
        console.log(e);
        const {message,response:{status,statusText}}=e;
        return {message,status,statusText};
    }
}