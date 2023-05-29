import { useEffect,useRef } from "react"
import { ShowUser } from "../../components/userDetails"
export const UserPage=()=>{
const name=useRef(`${localStorage.firstName} ${ localStorage.lastName}`);
useEffect(()=>{
    document.title=`${name.current} | ShopsyCart`;
},[])
return<div style={{height:"72vh"}}>
<ShowUser/>
</div>
}