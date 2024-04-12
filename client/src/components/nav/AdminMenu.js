import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <>
      
        <div className="p-3 mt-2 h4 bg-light d-flex justify-content-center text-primary rounded-1">
          Admin Links
        </div>
        <ul className="list-group list-unstyled">
          <li>
            <NavLink className="list-group-item rounded-1" to="/dashboard/admin/category">
              Create Category
            </NavLink>
          </li>

          <li>
            <NavLink className="list-group-item rounded-1" to="/dashboard/admin/product">
              Create Product
            </NavLink>
          </li>

          <li>
            <NavLink className="list-group-item rounded-1" to="/dashboard/admin/categories">
              Categories
            </NavLink>
          </li>

          <li>
            <NavLink className="list-group-item rounded-1" to="/dashboard/admin/products">
              Products
            </NavLink>
          </li>

          <li>
            <NavLink className="list-group-item rounded-1" to="/dashboard/admin/manage-shipping">
              Manage Shipping
            </NavLink>
          </li>

          <li>
            <NavLink className="list-group-item rounded-1" to="/dashboard/admin/manage-orders">
              Manage Orders
            </NavLink>
          </li>

          <li>
            <NavLink className="list-group-item rounded-1" to="/dashboard/admin/manage-customer">
              Manage Customer
            </NavLink>
          </li>

          <li>
            <NavLink className="list-group-item rounded-1" to="/dashboard/admin/new-lunch">
              New Lunch
            </NavLink>
          </li>

          
        </ul>

        <hr/>

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
