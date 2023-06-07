export const removeFromCart=async(productId,encodedToken)=>{
try{
const response=await fetch(`/api/user/cart/${productId}`,
{  
    method:'DELETE',
    headers:{'authorization':encodedToken},
}
);
const data=await response.json();
return data?.cart;
}
catch(e){
    console.log(e)
}
}