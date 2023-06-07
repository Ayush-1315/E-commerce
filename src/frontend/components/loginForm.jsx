import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
export const LoginForm = () => {
  const { isLogin, user } = useAuth();
  const initialForm = {
    email: "",
    password: "",
    remeberMe: true,
  };
  // const location=useLocation();
  const [userCredential, setCredentials] = useState({ ...initialForm });
  const changeHandler = (value, type) => {
    setCredentials({ ...userCredential, [type]: value });
  };
  const sendCredentials = (email, password) => {
    if (email.trim() !== "" && password.trim() !== "") {
      user(`${email}`, `${password}`);
    } else alert("Enter Credentials");
    setCredentials({ ...initialForm });
  };
  const { email, password } = userCredential;
  const [passwordVisible,setPasswordVisible]=useState(false);
  const toggleVisibility=()=>setPasswordVisible(!passwordVisible);
  return (
    
    <div className="login-form">
      {!isLogin ? (
        <>
          <h2>Login</h2>
          <fieldset className="input-wrapper">
            <legend>Email Address</legend>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email "
              onChange={(e) => changeHandler(e.target.value, "email")}
              value={userCredential.email}
            />
          </fieldset>
          <fieldset className="input-wrapper .login-password">
            <legend>Password</legend>
            <input
              type={passwordVisible?"text":"password"}
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => changeHandler(e.target.value, "password")}
            />
            <span className="material-symbols-outlined show-password" onClick={()=>toggleVisibility()}>{!passwordVisible? "visibility" :"visibility_off"}</span>
          </fieldset>

          <div>
            <input
              type="checkbox" 
              name="remember"
              id="remember"
              onChange={(e) => changeHandler(e.target.checked, "remeberMe")}
              checked={userCredential.remeberMe}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button onClick={() => sendCredentials(email, password)} className="sign-in-btns">
            Login
          </button>

          <button
            onClick={() =>
              sendCredentials("adarshbalika@gmail.com", "adarshbalika")
            }
           className="sign-in-btns">
            Guest User
          </button>
          <Link to="/signup" className="sign-in-btns create-acc">Create New Account
          <span className="material-symbols-outlined">
arrow_forward_ios
</span> </Link>
        </>
      ) : (
        <Navigate to={`/`} />
      )}
    </div>
  );
};
