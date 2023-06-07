import { Link } from "react-router-dom"
import error from "../../../images/notFound.png"
export const Error=()=>{
    return <div>
        <img src={error} alt="error" />
        <h1>Page Not Found !</h1>
        <Link to="/">Go Back</Link>
    </div>
}