import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";

import toast from "react-hot-toast";

import DropIn from "braintree-web-drop-in-react";

import { useState, useEffect } from "react";
import axios from "axios";
export default function UserCartSidebar() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");

  const [instance, setInstance] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item?.price;
    });

    return total.toLocaleString("INR", {
      style: "currency",
      currency: "INR",
    });
  };


  //buy

  const handleBuy = async()=>{
    try{
      setLoading(true);
      const {nonce} = await instance.requestPaymentMethod();
      
      const {data} = await axios.post('/braintree/payment', {
        nonce,
        cart,
      });
      setLoading(false);
      toast.success('Payment successful');
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders')

    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="col-md-4 mt-4 mb-3 pt-3 border rounded-1">
        <h4 className="text-center">Your Cart Summary</h4>
        <div className="text-center">Payments/Address</div>
        <hr />
        <p className="text-center">Total : {cartTotal()}</p>

        <hr />

        {auth?.user?.address ? (
          <>
            <div className="h4 mb-3 text-center ">
              <h4 className="text-center text-capitalize fw-bold">
                Delivery Address:
              </h4>
              <h5 className="text-center text-capitalize">
                {auth?.user?.address}
              </h5>
            </div>
            <div className="d-flex justify-content-center">
              <button
                onClick={() => navigate("/dashboard/user/profile")}
                className="btn btn-outline-info "
              >
                Update Address
              </button>
            </div>
          </>
        ) : (
          <div className="h4 mb-3 text-center d-flex justify-content-center">
            {auth?.token ? (
              <button
                onClick={() => navigate("/dashboard/user/profile")}
                className="btn btn-outline-info"
              >
                Add Delivery Address
              </button>
            ) : (
              <button
                onClick={() => navigate("/login", { state: "/cart" })}
                className="btn btn-outline-danger"
              >
                Login to Checkout
              </button>
            )}
          </div>
        )}

        <div className="text-center mt-3 mb-5">
          <h4 className="text-center">Pay Here</h4>

          {!clientToken || !cart?.length ? (
            ""
          ) : (
            <>
              <DropIn
                options={{
                  authorization: clientToken, 
                  paypal : {
                    flow:'vault'
                  }
                }}

                onInstance={(instance) => setInstance(instance)}
              />

              <button className="btn btn-success p-2 col-12 m-2" 
                onClick={handleBuy}  
                disabled={!auth?.user?.address || !instance}
              >
                {loading ? 'Processing...' : 'Buy'}
              </button>

              

            </>
          )}
        </div>
      </div>
    </>
  );
}
