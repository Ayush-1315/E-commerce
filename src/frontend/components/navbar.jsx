import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useProducts } from "../context/productsContext";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import "./component CSS/navbar.css";
import { useWishlist } from "../context/wishistContext";
export const Navbar = () => {
  let navigate = useNavigate();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isLogin, authState } = useAuth();
  const { filterDispatch } = useProducts();
  const [search, setSearch] = useState("");
  const [showSearchBar,setShow]=useState(window.screen.width>=768);
  const { firstName } = authState;
  const changeHandler = (e) => setSearch(e.target.value);
  const searchString = () => {
    if (search.trim() !== "") {
      filterDispatch({ type: "FILTER_BY_SEARCH", payload: search });
      setSearch("");
      navigate(`/search/${search}`);
      setShow(prev=>!prev);
    }
  };
  const sendString = (e) => {
    e.key === "Enter" && searchString();
  };
  const showBar=()=>{
    setShow(prev=>!prev);
  }
  return (
    <nav>
      <div  className="Navbar">
        <div className="logo">
          <NavLink
            to="/"
            onClick={() => filterDispatch({ type: "RESET_FILTERS" })}
          >
            ShopsyCart
          </NavLink>
        </div>
        <div className="searchBar">
          <input
            type="text"
            onChange={changeHandler}
            onKeyDown={sendString}
            value={search}
            placeholder="Search products, mobiles, accessories"
          />
          <button className="searchBtn" onClick={searchString}>
            {" "}
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
        <div className="navbarOptions">
        <button className="searchBtn optionHolder search" onClick={showBar}>
            {" "}
            <span className="material-symbols-outlined">search</span>
          </button>
          {isLogin ? (
            <Link to={`/user/${firstName}`} className="optionHolder">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          ) : (
            <NavLink to="/login" className="optionHolder">
              <span className="material-symbols-outlined">login</span>
            </NavLink>
          )}
          <NavLink to="/wishlist" className="optionHolder">
            <span className="material-symbols-outlined">
              favorite
              {wishlistItems !== 0 && (
                <span className="badge">{wishlistItems}</span>
              )}
            </span>
          </NavLink>
          <NavLink to="/cart" className="optionHolder">
            <span className="material-symbols-outlined">
              local_mall
              {cartItems !== 0 && <span className="badge">{cartItems}</span>}
            </span>
          </NavLink>
        </div>
      </div>
      <div className="searchScreen" style={{display:showSearchBar?"block":"none"}}>
        <div className="searchBarMob">
          <input
            type="text"
            onChange={changeHandler}
            onKeyDown={sendString}
            value={search}
            placeholder="Search products, mobiles, accessories"
          />
          <button className="searchBtn" onClick={searchString}>
            {" "}
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
