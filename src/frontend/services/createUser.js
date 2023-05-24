import axios from "axios"
export const createUser=async(user)=>{
    // console.log(user);
 try{
const response=await axios.post("/api/auth/signup",{
    ...user
});
console.log(response);
return response.data
 }
 catch(e){
console.log(e);
 }
}