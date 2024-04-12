
import { NavLink } from "react-router-dom"

export default function UserMenu(){
    return (
        <>
        <div className="p-3 mt-2 h4 bg-light d-flex justify-content-center text-primary ">
              Your Links
            </div>
            <ul className="list-group list-unstyled">
              <li className="hoverUserLink rounded-1">
                <NavLink
                  className="list-group-item hoverUserLink "
                  to="/dashboard/user/profile"
                >
                  Profile
                </NavLink>
              </li>

              <li className="hoverUserLink rounded-1">
                <NavLink
                  className="list-group-item hoverUserLink"
                  to="/dashboard/user/orders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
        </>
    )
}
