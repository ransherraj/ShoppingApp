import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import { NavLink, Link } from "react-router-dom";
import AdminMenu from "../../components/nav/AdminMenu";

import "../../index.css";
import bg from '../../images/bg.jpg'

import AdminRightMenu from "../../components/nav/AdminRightMenu";
import AdminInfoMenu from "../../components/nav/AdminInfoMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export default function AdminProducts() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

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
            <AdminMenu />
          </div>
          <div className="col-md-9 bg-secondary bg-opacity-25 min-vh-100 " style={{backgroundImage:`url(${bg})`}}>
            <div className="d-flex justify-content-center text-light mt-2 mb-2 p-2 bg-secondary rounded-1">
              <h2>Products</h2>
            </div>

            {products?.map((p) => (
              <Link 
                style={{textDecoration: 'none'}}
                key={p._id}
                to={`/dashboard/admin/product/update/${p.slug}`}
              >
                <div className="card mb-3">
                  <div className="row  g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        className="img img-fluid rounded-start border border-primary "
                        // height="200px"
                        // width="400px"
                        style={{width:'400px', height:'200px'}}

                      />
                    </div>

                    <div className="col-md-8 bg-dark bg-opacity-75 rounded-1 text-light" >
                      <div className="card-body "  >
                        <h3 className="card-title text-capitalize d-flex justify-content-center" > Book Name : {p.name}</h3>
                        <p className="card-text text-capitalize d-flex justify-content-center" >Book Description : {p.description.substring(0, 30)}...</p>
                        <p className="card-text d-flex justify-content-center"> Created On : 
                          <small className="" >
                            {moment(p.createdAt).format(
                              " MMM Do YYYY, h:mm:ss A"
                            )}
                          </small>


                        </p>

                        
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* <div className="col-md-3 bg-dark bg-opacity-50 min-vh-100">
            <AdminRightMenu />
          </div> */}
        </div>
      </div>
    </>
  );
}
