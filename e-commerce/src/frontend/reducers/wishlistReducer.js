export const wishlist=[];
export const wishlistReducerFun=(state,action)=>{
 const {type,payload}=action;
 switch(type)
 { 
    case 'LOAD_CART':return[...payload];
    default: return [...state];
 }
}