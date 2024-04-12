import moment from "moment";
import { useCart } from "../../context/cart";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";

export default function ProductCardHorizontal( {c}) {
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

  return (
    <>
      <div className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`${process.env.REACT_APP_API}/product/photo/${c._id}`}
              alt={c.name}
              className="border rounded-1"
              style={{
                height: "150px",
                width: "140px",
                objectFit: "cover",
                marginLeft: "-12px",
                borderRopRightRadius: "0px",
              }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{c.name}</h5>
              <p className="fw-bold text-primary">
                {c?.price?.toLocaleString("INR", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
              <p className="card-text text-capitalize">{`${c?.description?.substring(
                0,
                30
              )}`}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <p className="card-text">
              <small className="text-muted">
                Listed {moment(c.createdAt).fromNow()}
              </small>
            </p>
            <button
              onClick={() => removeFromCart(c._id)}
              className="btn btn-sm btn-outline-danger mb-2"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
