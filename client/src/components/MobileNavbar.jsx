import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom";

export default function MobileNavbar(){
    const { auth } = useAuth();
    return(
        <div className="mobileNavbar">
            <ul className="mobileNavList">
                <li>
                    <Link to="/"><h1>My<span style={{color: '#327bf6'}}>ID</span></h1></Link>
                </li>
                <li>
                    {auth?.email ?
                    <a><span style={{fontWeight: 'bold'}}>Hei</span> {`${auth.email}`}</a>
                        : <br/>
                    }
                </li>
            </ul>
        </div>
    )
}