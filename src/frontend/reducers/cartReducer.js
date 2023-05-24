export const cart=[];
export const cartReducerFun=(state,action)=>{
 const {type,payload}=action;
 switch(type)
 { 
    case 'LOAD_CART':return[...payload];
    case 'RESET':return [...cart];
    default: return [...state];
 }
}