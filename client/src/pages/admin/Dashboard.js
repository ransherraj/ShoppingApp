import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import { NavLink } from "react-router-dom";
import AdminMenu from "../../components/nav/AdminMenu";
import AdminRightMenu from "../../components/nav/AdminRightMenu";
import AdminInfoMenu from "../../components/nav/AdminInfoMenu";

import bg from '../../images/bg.jpg'


export default function AdminDashboard() {
  const [auth, setAuth] = useAuth();

 

  return (
    //panel panel-default
    // <h1 className=" mt-4 justify-content-center text-center">Admin Dashboard</h1>
    <>
      <Jumbotron
        title={`Hello, ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />

      <div className="container-fluid ">
        <div className="row ">
          <div className="col-md-3 bg-dark bg-opacity-50 min-vh-100">
            <AdminMenu/>
          </div>
          <div className="col-md-9 bg-secondary bg-opacity-25 min-vh-100" style={{backgroundImage:`url(${bg})`}}>
            <AdminInfoMenu/>
          </div>

          {/* <div className="col-md-3 bg-dark bg-opacity-50 min-vh-100">
            <AdminRightMenu />
          </div> */}
        </div>
      </div>
    </>
  );
}
