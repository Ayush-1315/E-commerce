import { useState} from "react";
import { useAuth } from "../context/authContext";
export const SignUp = () => {
  const {signUp}=useAuth();
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
      pinCode: "",
    },
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
    <>
      <form action="#">
        <label htmlFor="fName">First Name</label>
        <input
          type="text"
          placeholder="FIRST NAME"
          id="fName"
          onChange={(e) => changeHandler("firstName", e.target.value)}
          required
        />
        <label htmlFor="lName">Last Name</label>
        <input
          type="text"
          placeholder="LAST NAME"
          id="lName"
          onChange={(e) => changeHandler("lastName", e.target.value)}
        />
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          onChange={(e) => changeHandler("email", e.target.value)}
        />
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
        <p>Billing Address</p>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={(e) => changeHandler("city", e.target.value, true)}
        />
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          onChange={(e) => changeHandler("state", e.target.value, true)}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          onChange={(e) => changeHandler("country", e.target.value, true)}
        />
        <label htmlFor="pin">Pin Code</label>
        <input
          type="text"
          id="pin"
          onChange={(e) => changeHandler("pin", e.target.value, true)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          onChange={(e) => changeHandler("phone", e.target.value)}
        />
        <input type="submit" value="Sign Up" onClick={(e)=>submitForm(e)} />
      </form>
    </>
  );
};
