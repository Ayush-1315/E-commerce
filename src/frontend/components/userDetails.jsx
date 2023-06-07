import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishistContext";
import "../pages/User/viewUser.css";
import MaleUser from "../../images/maleUser.png";
import FemaleUser from "../../images/femaleUser.png";
import { useUser } from "../context/userContext";
import { AddressForm } from "./addressForm";
import { OrderHistoryCard } from "./orderHistory";
export const ShowUser = () => {
  const { authDispatch, setIsLogin, authState } = useAuth();
  const { cartDispatch } = useCart();
  const { wishlistDispatch } = useWishlist();
  const { addresses, removeAddress, orders } = useUser();
  const { firstName, lastName, gender, email } = authState;
  const [showTab, setShowTab] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formAddress, setFormAddress] = useState(undefined);
  const [update, setUpdate] = useState(-1);
  const updateHandler = (index) => {
    setShowForm(true);
    setFormAddress(addresses[index]);
    setUpdate(index);
  };
  const removeHandler = (index) => {
    if (index !== -1) {
      removeAddress(index);
    }
  };
  return (
    <>
      <div className="userMenu">
        <div className="userTabs">
          <div
            className={showTab === 0 ? "tabs active-tab" : "tabs"}
            onClick={() => setShowTab(0)}
          >
            User Info
          </div>
          <div
            className={showTab === 1 ? "tabs active-tab" : "tabs"}
            onClick={() => setShowTab(1)}
          >
            Orders
          </div>
          <div
            className={showTab === 2 ? "tabs active-tab" : "tabs"}
            onClick={() => setShowTab(2)}
          >
            Addresses
          </div>
        </div>
        <div
          style={{ display: showTab === 0 ? "block" : "none" }}
          className="tabMenu user-log"
        >
          <img
            src={gender.toLowerCase() === "female" ? FemaleUser : MaleUser}
            alt="userAvatar"
            className="avatar"
          />
          <div>
            <h2>{`${firstName} ${lastName}`}</h2>
            <p>Email: {email}</p>
            <p>Gender: {gender}</p>
            <button
              onClick={() => {
                authDispatch({ type: "LOG_OUT" });
                cartDispatch({ type: "RESET" });
                wishlistDispatch({ type: "RESET" });
                setIsLogin(false);
              }}
            >
              <span>LogOut</span>
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
        <div
          style={{ display: showTab === 1 ? "block" : "none" }}
          className="tabMenu"
        >
          <p>Total Orders: {orders.length === 0 ? "No recent purchases" : orders.length}</p>
          {orders.map((order,index)=><OrderHistoryCard key={index} {...order}/>)}
        </div>
        <div
          style={{ display: showTab === 2 ? "block" : "none" }}
          className="tabMenu"
        >
          {addresses.map((address, index) => {
            const {
              city,
              state,
              country,
              pinCode,
              email,
              phone,
              firstName,
              lastName,
            } = address;
            return (
              <div key={index} className="addressCards">
                <p className="cardName cardInfo">
                  {firstName} {lastName}
                </p>
                <p className="cardInfo">{email}</p>
                <p className="cardInfo">
                  <strong>Ph:</strong> {phone}
                </p>
                <p className="cardInfo">
                  <strong>Address:</strong> {city},{state},{country},{pinCode}
                </p>
                <div className="cardFooter">
                  <button
                    onClick={() => {
                      updateHandler(index);
                    }}
                  >
                    Update
                  </button>
                  <button onClick={() => removeHandler(index)}>Remove</button>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="addAddressBtn"
          >
            <span className="material-symbols-outlined">add</span>
            Add new Address
          </button>
        </div>
      </div>
      {
        <AddressForm
          setFormFun={(val) => setShowForm(val)}
          showForm={showForm}
          receivedAddress={formAddress}
          setFormAddress={(add) => setFormAddress(add)}
          updateIndex={update}
          setUpdateIndex={(index) => setUpdate(index)}
        />
      }
    </>
  );
};
