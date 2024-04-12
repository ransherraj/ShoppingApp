import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../context/auth";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";

import EmptyCart from "../components/cards/EmptyCart";


export default function Cart() {
  const [cart, setCart] = useCart();
  const [auth, useauth] = useAuth();
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === productId);

      myCart.splice(index, 1);
      // localStorage.splice(index,1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  const cartTotal = () =>{
    let total = 0;
    cart.map((item)=>{
        total += item?.price
    })

    return total.toLocaleString("INR", {
        style: "currency",
        currency: "INR",
    })
  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subtitle={
          cart?.length
            ? `You have ${cart?.length > 0 ? cart?.length : 0} items in cart. ${
                auth?.token ? "" : "Please Login to Checkout"
              }`
            : "Your cart is empty"
        }
      />

      <div className="">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-1 h4 bg-light bg-opacity-50 text-center text-light">
              {cart?.length >= 1 ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <div
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((c, index) => (
                  <ProductCardHorizontal  key={index} c={c}/>
                  // <ProductCardHorizontal  index={index} c={c}/>
                ))}
              </div>
            </div>
            
            <UserCartSidebar/>

          </div>
        </div>
      )}

      {cart?.length === 0 && (
        <EmptyCart/>
      )}
    </>
  );
}
