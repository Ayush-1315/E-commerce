import { useEffect, useState, useRef } from "react";
import "../pages/User/viewUser.css";
import "./component CSS/addressForm.css";
import { useUser } from "../context/userContext";
export const AddressForm = ({
  receivedAddress,
  setFormFun,
  showForm,
  setFormAddress,
  updateIndex,
  setUpdateIndex,
}) => {
  const { addNewAddress, updateAddress } = useUser();
  const initialData = {
    firstName: "",
    lastName: "",
    gender: "",
    city: "",
    email: "",
    state: "",
    country: "",
    pinCode: "",
    phone: "",
  };
  const addRef = useRef(initialData);
  const [newAddress, setNewAddress] = useState(initialData);
  const changeHandler = (attribute, value) => {
    setNewAddress({ ...newAddress, [attribute]: value.trim() });
  };
  useEffect(() => {
    setNewAddress(receivedAddress ?? addRef.current);
  }, [receivedAddress]);
  const reset = (e) => {
    e.preventDefault();
    if (typeof setUpdateIndex === "function") setUpdateIndex(-1);
    if (typeof setFormFun === "function") setFormFun(false);
    if (typeof setFormAddress === "function") setFormAddress(undefined);
    setNewAddress(initialData);
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (receivedAddress !== undefined) updateAddress(updateIndex, newAddress);
    else addNewAddress(newAddress);
    reset(e);
  };
  const isEmptyForm = Object.values(newAddress).reduce(
    (acc, curr) => (curr === "" ? true : acc),
    false
  );
  return (
    <>
      <div
        className="formBackground"
        style={{ display: showForm ? "block" : "none" }}
      ></div>
      <div
        style={{
          display: showForm ? "block" : "none",
        }}
        className="addressForm"
      >
        <div className="addressFormHeader">
          <h2>Add New Address</h2>
          <button onClick={(e) => reset(e)} className="formClose">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form action="#">
          <fieldset className="parent-wrapper">
            <legend>Customer Details</legend>
            <fieldset className="input-wrapper">
              <legend>First Name</legend>
              <input
                type="text"
                placeholder="First Name"
                id="fName"
                name="firstName"
                onChange={(e) => changeHandler("firstName", e.target.value)}
                value={newAddress.firstName}
              />
            </fieldset>

            <fieldset className="input-wrapper">
              <legend>Last Name</legend>
              <input
                type="text"
                placeholder="Last Name"
                id="lName"
                onChange={(e) => changeHandler("lastName", e.target.value)}
                value={newAddress.lastName}
              />
            </fieldset>
            <fieldset className="input-wrapper block-element">
              <legend>Email Address</legend>
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) => changeHandler("email", e.target.value)}
                value={newAddress.email}
              />
            </fieldset>
            <fieldset className="input-wrapper block-element">
              <legend>Phone</legend>
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                onChange={(e) => changeHandler("phone", e.target.value)}
                value={newAddress?.phone}
              />
            </fieldset>
            <fieldset className="input-wrapper">
              <legend>Select Gender</legend>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={(e) => changeHandler("gender", e.target.value)}
                checked={newAddress.gender.toLowerCase() === "male"}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={(e) => changeHandler("gender", e.target.value)}
                checked={newAddress.gender.toLowerCase() === "female"}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                onChange={(e) => changeHandler("gender", e.target.value)}
                checked={newAddress.gender.toLowerCase() === "other"}
              />
              <label htmlFor="other">Other</label>
            </fieldset>
          </fieldset>
          <fieldset className="parent-wrapper">
            <legend>Address</legend>
            <fieldset className="input-wrapper">
              <legend>City</legend>
              <input
                type="text"
                id="city"
                placeholder="City"
                onChange={(e) => changeHandler("city", e.target.value, true)}
                value={newAddress.city}
              />
            </fieldset>
            <fieldset className="input-wrapper">
              <legend>State</legend>
              <input
                type="text"
                id="state"
                placeholder="State"
                onChange={(e) => changeHandler("state", e.target.value, true)}
                value={newAddress.state}
              />
            </fieldset>
            <fieldset className="input-wrapper">
              <legend>Country</legend>
              <input
                type="text"
                id="country"
                placeholder="Country"
                onChange={(e) => changeHandler("country", e.target.value, true)}
                value={newAddress.country}
              />
            </fieldset>
            <fieldset className="input-wrapper">
              <legend>Pin Code</legend>
              <input
                type="text"
                id="pin"
                placeholder="Pin Code"
                onChange={(e) => changeHandler("pinCode", e.target.value, true)}
                value={newAddress.pinCode}
              />
            </fieldset>
          </fieldset>
          <div className="addressFormFooter">
            <button onClick={(e) => submitForm(e)} disabled={isEmptyForm}>
              {updateIndex === -1 ? "Add Address" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
