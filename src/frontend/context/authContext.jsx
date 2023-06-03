import {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userDetails } from "../services/getUser";
import { createUser } from "../services/createUser";
import { initialUser, authReducerFun } from "../reducers/authReducer";
import { setData } from "../services/setLocal";
import { error, notify } from "../../App";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducerFun, initialUser);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  useEffect(() => {
    authDispatch({ type: "LOAD_DATA" });
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const user = async (email, password) => {
    try {
      const response = await userDetails({ email, password });
      if (response?.encodedToken === undefined) throw response;
      else {
        const {
          encodedToken,
          foundUser: {
            firstName,
            lastName,
            email,
            gender,
            phone,
            address: { city, state, country, pin },
          },
        } = response;
        setData(
          firstName,
          lastName,
          email,
          gender,
          phone,
          city,
          state,
          country,
          pin,
          encodedToken
        );
        authDispatch({
          type: "LOG_USER",
          payload: {
            firstName,
            lastName,
            email,
            gender,
            phone,
            address: { city, state, country, pin },
            loginStatus: true,
          },
        });
      }
      if (localStorage.getItem("token")) {
        setIsLogin(true);
        navigate(location?.state?.pathname);
      }
    } catch (e) {
      console.log(e);
      error("Invalid Credentials");
    }
  };
  const signUp = async (newUser) => {
    // console.log(newUser);
    try {
      const response = await createUser(newUser);
      if (response?.encodedToken === undefined) throw response;
      else {
        const {
          encodedToken,
          createdUser: {
            firstName,
            lastName,
            email,
            gender,
            phone,
            address: { city, state, country, pin },
          },
        } = response;
        setData(
          firstName,
          lastName,
          email,
          gender,
          phone,
          city,
          state,
          country,
          pin,
          encodedToken
        );
        authDispatch({
          type: "LOG_USER",
          payload: {
            firstName,
            lastName,
            email,
            gender,
            phone,
            address: { city, state, country, pin },
            loginStatus: true,
          },
        });
        if (localStorage.getItem("token")) {
          setIsLogin(true);
          location?.state === null
            ? navigate("/")
            : navigate(location?.state?.pathname);
        }
        notify("Logged In");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, authState, authDispatch, user, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
