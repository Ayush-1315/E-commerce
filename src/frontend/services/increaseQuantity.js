import axios from "axios"
export const increaseQty=async(productId,encodedToken)=>{
try{
const {status,data}=await axios.post(`/api/user/cart/${productId}`,
{action:{type:"increment"}},
{headers:{authorization:encodedToken}}
);
if(status===200){
    return data?.cart;
}
}
catch(e){
    console.log(e)
}
}