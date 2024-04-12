import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import ProductCartHorizontal from '../../components/cards/ProductCardHorizontal'
import UserInfoMenu from "../../components/nav/UserInfoMenu";
import UserMenu from "../../components/nav/UserMenu";

import axios from "axios";
import moment from "moment";

export default function UserOrders() {

  //context
  const [auth, setAuth] = useAuth();

  //state
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    if(auth?.token) getOrders();
  }, [auth?.token]);


  const getOrders = async()=> {
    try{
      const {data} = await axios.get('/orders');
      setOrders(data);
      console.log("orders=>",orders);
    }
    catch(err){
      console.log(err);
    }
  }


  return (

    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Your Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 h4 text-primary bg-light d-flex justify-content-center ">
              Orders
            </div>

            
              {orders?.map((o, i) => {
                return (
                  <div className="border shadow bg-light rounded-2 mb-5">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Ordered</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i+1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" :'Failed'}</td>
                          <td>{o?.products?.length}</td>
                          <td className=" ">
                            <a href="/download-receipt" className="btn btn-primary"> Export as pdf</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* <div className="container mt-4">
                    {o?.products?.map((p, i)=>(
                      <ProductCartHorizontal key={i} p={p} />
                    ))}
                    </div> */}
                    
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      
    </>
  );
}
