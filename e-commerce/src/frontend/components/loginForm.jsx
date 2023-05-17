import { Link } from "react-router-dom"
export const LoginForm=()=>{
    return <div>
        <h2>Login</h2>
        <label htmlFor="email">Email address</label>
        <input type="email" name="email" id="email"/>
        <label htmlFor="password">Email address</label>
        <input type="password" name="password" id="password"/>
        <input type="checkbox" name="remember" id="remember"/>
        <label htmlFor="remember">Remember me</label>
        <button>Login</button>
        <Link>Create New Account</Link>
    </div>
}