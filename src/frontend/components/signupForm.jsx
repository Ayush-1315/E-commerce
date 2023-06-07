import { useState } from "react";
import { useAuth } from "../context/authContext";
export const SignUp = () => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    address: {
      city: "",
      state: "",
      country: "",
      pin: "",
    },
    password: "",
  });
  const changeHandler = (cred, value, add = false) => {
    add && cred.trim() !== "" && value.trim() !== ""
      ? setFormData({
          ...formData,
          address: { ...formData.address, [cred]: value },
        })
      : setFormData({ ...formData, [cred]: value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    signUp(formData);
  };
  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form action="#">
        {/* <label htmlFor="fName">First Name</label>
        <input
          type="text"
          placeholder="FIRST NAME"
          id="fName"
          onChange={(e) => changeHandler("firstName", e.target.value)}
          required
        /> */}
        <fieldset className="input-wrapper">
          <legend>First Name</legend>
          <input
            type="text"
            placeholder="First Name"
            id="fName"
            name="firstName"
            onChange={(e) => changeHandler("firstName", e.target.value)}
          />
        </fieldset>
        <fieldset className="input-wrapper">
          <legend>Last Name</legend>
          <input
            type="text"
            placeholder="Last Name"
            id="lName"
            name="lastName"
            onChange={(e) => changeHandler("lastName", e.target.value)}
          />
        </fieldset>
        {/* <label htmlFor="lName">Last Name</label>
        <input
          type="text"
          placeholder="LAST NAME"
          id="lName"
          onChange={(e) => changeHandler("lastName", e.target.value)}
        /> */}
        <fieldset className="input-wrapper">
          <legend>Email Address</legend>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            onChange={(e) => changeHandler("email", e.target.value)}
          />
        </fieldset>
        {/* <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          onChange={(e) => changeHandler("email", e.target.value)}
        /> */}
        <fieldset className="input-wrapper">
          <legend>Gender</legend>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={(e) => changeHandler("gender", e.target.value)}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={(e) => changeHandler("gender", e.target.value)}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={(e) => changeHandler("gender", e.target.value)}
          />
          <label htmlFor="other">Other</label>
        </fieldset>
        <fieldset className="input-wrapper">
          <legend>Password</legend>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e) => changeHandler("password", e.target.value)}
          />
        </fieldset>
        <h2>Billing Address</h2>
        <fieldset className="input-wrapper">
          <legend>City</legend>
          <input
            type="text"
            placeholder="City"
            id="city"
            name="city"
            onChange={(e) => changeHandler("city", e.target.value,true)}
          />
        </fieldset>
        {/* <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={(e) => changeHandler("city", e.target.value, true)}
        /> */}
        <fieldset className="input-wrapper">
          <legend>State</legend>
          <input
            type="text"
            placeholder="State"
            id="state"
            name="state"
            onChange={(e) => changeHandler("state", e.target.value,true)}
          />
        </fieldset>
        {/* <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          onChange={(e) => changeHandler("state", e.target.value, true)}
        /> */}
        <fieldset className="input-wrapper">
          <legend>Country</legend>
          <input
            type="text"
            placeholder="Country"
            id="country"
            name="country"
            onChange={(e) => changeHandler("country", e.target.value,true)}
          />
        </fieldset>
        {/* <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          onChange={(e) => changeHandler("country", e.target.value, true)}
        /> */}
        <fieldset className="input-wrapper">
          <legend>Pin Code</legend>
          <input
            type="text"
            placeholder="Pin Code"
            id="pinCode"
            name="pin"
            onChange={(e) => changeHandler("pin", e.target.value,true)}
          />
        </fieldset>
        {/* <label htmlFor="pin">Pin Code</label>
        <input
          type="text"
          id="pin"
          onChange={(e) => changeHandler("pin", e.target.value, true)}
        /> */}
        <fieldset className="input-wrapper">
          <legend>Phone</legend>
          <input
            type="text"
            placeholder="Phone Number"
            id="phone"
            name="phone"
            onChange={(e) => changeHandler("phone", e.target.value)}
          />
        </fieldset>
        {/* <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          onChange={(e) => changeHandler("phone", e.target.value)}
        /> */}
        <input type="submit" value="Sign Up" onClick={(e) => submitForm(e)} />
      </form>
    </div>
  );
};
