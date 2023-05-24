import { Link,  Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
export const LoginForm = () => {
  const { isLogin, user } = useAuth();
  const [userCredential, setCredentials] = useState({
    email: "",
    password: "",
    remeberMe: true,
  });
  const changeHandler = (value, type) => {
    setCredentials({ ...userCredential, [type]: value });
  };
  const sendCredentials = (email, password) => {
    if (email.trim() !== "" && password.trim() !== "") {
      user(`${email}`, `${password}`);
    } else alert("Enter Credentials");
  };
  const { email, password } = userCredential;
  return (
    <div>
      {!isLogin ? (
        <>
          <h2>Login</h2>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => changeHandler(e.target.value, "email")}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => changeHandler(e.target.value, "password")}
          />
          <input
            type="checkbox"
            name="remember"
            id="remember"
            onChange={(e) => changeHandler(e.target.checked, "remeberMe")}
            checked={userCredential.remeberMe}
          />
          <label htmlFor="remember">Remember me</label>

          <button onClick={() => sendCredentials(email, password)}>
            Login
          </button>

          <button
            onClick={() =>
              sendCredentials("adarshbalika@gmail.com", "adarshbalika")
            }
          >
            Test
          </button>
          <Link to="/signup">Create New Account</Link>
        </>
      ):<Navigate to={`/`}/>}
    </div>
  );
};
