import { useState, useContext, createContext,useEffect } from "react";
import { useAuth } from "./authContext";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const {authState}=useAuth();
 useEffect(()=>{
    const currentAddress = {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        gender: localStorage.getItem("gender"),
        email: localStorage.getItem("email"),
        city: localStorage.getItem("city"),
        state: localStorage.getItem("state"),
        country: localStorage.getItem("country"),
        pinCode: localStorage.getItem("pin"),
        phone: localStorage.getItem("phone"),
      };
    setAddresses([currentAddress]);
    setOrders([]);
    console.log('Auth Working');
 },[authState]);
//  Address Management
  const [addresses, setAddresses] = useState([]);
  const addNewAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
  };
  const updateAddress = (updateIndex, updateAddress) => {
    setAddresses((addresses) =>
      addresses.map((address, index) =>
        index === updateIndex ? { ...address, ...updateAddress } : address
      )
    );
  };
  const removeAddress=(removeIndex)=>setAddresses(addresses=>addresses.filter((_,index)=>index!==removeIndex));
  // Orders Management
  return (
    <UserContext.Provider
      value={{
        orders,
        addresses,
        setOrders,
        addNewAddress,
        updateAddress,
        removeAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
