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
  const { isLogin } = useAuth();
  const { filterDispatch, sideMenu, setSideMenu } = useProducts();
  const [search, setSearch] = useState("");
  const [showSearchBar, setShow] = useState(window.screen.width >= 768);
  const changeHandler = (e) => setSearch(e.target.value);
  const searchString = () => {
    if (search.trim() !== "") {
      filterDispatch({ type: "FILTER_BY_SEARCH", payload: search });
      setSideMenu({ ...sideMenu, menu: true });
      setSearch("");
      navigate(`/search/${search}`);
      setShow((prev) => !prev);
    }
  };
  const sendString = (e) => {
    e.key === "Enter" && searchString();
  };
  const showBar = () => {
    setShow((prev) => !prev);
  };
  const showFilters = () =>
    setSideMenu({ ...sideMenu, sidemenu: !sideMenu.sidemenu });
  const { menu } = sideMenu;
  return (
    <nav>
      <div className="Navbar">
        <div className="logo">
          <span
            className="material-symbols-outlined showMenu"
            style={{ display: menu ? "inline-block" : "none" }}
            onClick={showFilters}
          >
            menu
          </span>
          <NavLink
            to="/"
            onClick={() => {
              filterDispatch({ type: "RESET_FILTERS" });
              setSideMenu({ sidemenu: false, menu: false });
            }}
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
            <Link to={`/user`} className="optionHolder">
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
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartItems !== 0 && <span className="badge">{cartItems}</span>}
            </span>
          </NavLink>
        </div>
      </div>
      <div
        className="searchScreen"
        style={{ display: showSearchBar ? "block" : "none" }}
      >
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
