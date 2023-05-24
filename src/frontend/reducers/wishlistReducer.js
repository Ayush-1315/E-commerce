export const wishlist=[];
export const wishlistReducerFun=(state,action)=>{
 const {type,payload}=action;
 switch(type)
 { 
    case 'LOAD_CART':return[...payload];
    case 'RESET':return[...wishlist];
    default: return [...state];
 }
}