import { Badge } from "antd";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import { useState } from "react";

import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

export default function ProductCard({ p }) {

    //context
    const [cart, setCart] = useCart();
    //hooks
    const navigate = useNavigate();
    const stock = p.quantity == 0 ? `${p.quantity} in stock` : `out of stock`
    const color = p.quantity - p.sold == 0 ? `red` : `purple`
  return (
    <div className="card mb-3 m-2 hoverable" key={p._id}>
      <Badge.Ribbon className="text-capitalize" text={`${p.sold} sold`} color='green'>
        <Badge.Ribbon className="text-capitalize" text={`${p?.quantity>=1 ? `${p.quantity - p.sold} In stock` : "Out of Stock" }`} 
        color={color}
        placement='start'
        >
          <img
            className="border-bottom rounded-1"
            style={{ width: "220px", height: "200px" }}
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h6 className="text-color text-capitalize">{p?.name}</h6>


        <h4 className="fw-bold">{
            p?.price?.toLocaleString("INR", {
            style:'currency',
            currency:'INR'

        }
        )}</h4>

        <p className="card-text descriptionFont text-capitalize"> {p?.description?.substring(0, 20)}...</p>
        {/* <p>{moment(p?.createdAt).fromNow()}</p>
        <p>{p?.sold} sold</p> */}
      </div>

      <div className="d-flex justify-content-between m-1">
        <div
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={()=>{
            navigate(`/product/${p.slug}`)
          }}
        >
          View Item
        </div>

        <div
          className="btn btn-success col card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={()=>{
            setCart([...cart, p]);
            localStorage.setItem('cart', JSON.stringify([...cart, p]));
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </div>
      </div>
    </div>
  );
}
