import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useProducts } from "../context/productsContext";
export const Navbar=()=>{
    let navigate=useNavigate();
    const {filterDispatch}=useProducts();
    const [search,setSearch]=useState('');
    const changeHandler=(e)=>setSearch(e.target.value);
    const sendString=(e)=>{
        if(e.key==="Enter" && search!=="")
        {filterDispatch({type:"FILTER_BY_SEARCH",payload:search});
        setSearch('');
        navigate(`/search/${search}`);
    }       
    };
    return<nav className="Navbar">
    <div className="logo">
        <NavLink to="/" onClick={()=>filterDispatch({type:"RESET_FILTERS"})}>ShopsyCart</NavLink>
    </div>
    <div>
        <input type="search" onChange={changeHandler} onKeyDown={sendString} value={search}/>
    </div>
    <div className="options`">
        <NavLink to="/login"><button>Login</button></NavLink>
        <NavLink to="/wishlist"><button>WishList</button></NavLink>
        <NavLink to="/cart"><button>Cart</button></NavLink>
    </div>
    </nav>
}