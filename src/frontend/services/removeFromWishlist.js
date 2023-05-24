export const removeFromWishlist=async(productId,encodedToken)=>{
    try{
    const response=await fetch(`/api/user/wishlist/${productId}`,
    {  
        method:'DELETE',
        headers:{'authorization':encodedToken},
    }
    );
    const data=await response.json();
    return data?.wishlist;
    }
    catch(e){
        console.log(e)
    }
    }