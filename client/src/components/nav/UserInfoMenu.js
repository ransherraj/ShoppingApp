

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function UserInfoMenu(){
    const [auth, setAuth] = useAuth();
    return (
        <>
            <div className="p-3 mt-2 h4 bg-light d-flex justify-content-center text-primary ">
              Your Information
            </div>

            <ul className="list-group">
                <li className="list-group-item text-uppercase"> {auth?.user?.name}</li>
                <li className="list-group-item text-lowercase"> {auth?.user?.email}</li>
                
            </ul>
        </>
    )
}