

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function AdminInfoMenu(){
    const [auth, setAuth] = useAuth();
    return (
        <>
            <div className="p-3 mt-2 h4 bg-light d-flex justify-content-center text-primary rounded-1">
              Admin Information
            </div>

            <ul className="list-group">
                <li className="list-group-item text-capitalize "> Admin Name : {auth?.user?.name}</li>
                <li className="list-group-item "> Admin Email :  {auth?.user?.email}</li>
                <li className="list-group-item text-capitalize"> Admin Role : {auth?.user?.role === 1 ? "1" : "0"}</li>

            </ul>
        </>
    )
}