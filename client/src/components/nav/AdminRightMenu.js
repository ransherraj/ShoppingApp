import { NavLink } from "react-router-dom";

export default function AdminRightMenu() {
  return (
    <>
      <div className="p-3 mt-2 h4 bg-light d-flex justify-content-center text-primary rounded-1">
        Adminstration
      </div>
      <ul className="list-group list-unstyled">

      <li>
          <NavLink
            className="list-group-item rounded-1"
            to="/dashboard/admin/all-admin"
          >
            Admins
          </NavLink>
        </li>



        <li>
          <NavLink
            className="list-group-item rounded-1"
            to="/dashboard/admin/update-admin"
          >
            Update Admin
          </NavLink>
        </li>

        <li>
          <NavLink
            className="list-group-item rounded-1"
            to="/dashboard/admin/delete-admin"
          >
            Delete Admin
          </NavLink>
        </li>
      </ul>
    </>
  );
}
