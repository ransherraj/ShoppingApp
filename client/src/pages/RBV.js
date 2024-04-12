// import Jumbotron from "../components/cards/Jumbotron";
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/auth";
// import axios from "axios";
// import bg from "../images/bg4.jpg";
// import moment from "moment";

// import { Badge, Card, Space } from 'antd';

// import ProductCard from "../components/cards/ProductCart";

// export default function RBV() {
//   const [auth, setAuth] = useAuth();

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const { data } = await axios.get("/products");
//       setProducts(data);
//       console.log(data.length);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const arr = [...products];

//   const sortedBySold = arr?.sort((a, b) => {
//     return a.sold < b.sold ? 1 : -1;
//   });

//   return (
//     <>
//       <div>
//         <Jumbotron
//           title="Amleefa"
//           subtitle="Presenting you the best books at reasonable price"
//         />
//         {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
//       </div>

//       {/* <div className="d-flex justify-content-center align-items-center p-4 bg-info min-vh-100 text-dark text-Capitalize">
//         {products?.length}
//       </div> */}

//       <div className="row  " style={{ backgroundImage: `url(${bg})` }}>
//         <div className="col-md-6 border flex-wrap">
//           <h2 className="p-3 m-3 mb-2 bg-dark bg-opacity-75 text-center rounded-1 text-light">New Arrived </h2>
//           <div className="d-flex justify-content-center flex-wrap">
//             {products?.map((p) => (
//               <ProductCard p={p}/>
//             ))}
//           </div>
//         </div>
//         <div className="col-md-6 border">
//           <h2 className="p-3 m-3 mb-2 bg-dark bg-opacity-75 text-center rounded-1 text-light">Best Sellers </h2>
//           <div className="d-flex justify-content-center flex-wrap">
//             {sortedBySold?.map((p) => (
//               <ProductCard p={p}/>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import Jumbotron from "../components/cards/Jumbotron";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import bg from "../images/bg4.jpg";
import moment from "moment";

import { Badge, Card, Space } from "antd";

import ProductCard from "../components/cards/ProductCart";

export default function RBV() {
  // const [auth, setAuth] = useAuth();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
      console.log(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const arr = [...products];

  const sortedBySold = arr?.sort((a, b) => {
    return a.sold < b.sold ? 1 : -1;
  });

  return (
    <>
      <div>
        <Jumbotron
          title="Bookrr"
          subtitle="Presenting you the best books at reasonable price"
        />
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      </div>

      {/* <div className="d-flex justify-content-center align-items-center p-4 bg-dark bg-opacity-75 text-light text-Capitalize border">
        <h3 className="text-info text-capitalize">
          Total products available here : {products?.length}
        </h3>
      </div> */}

      <div className="row " style={{ backgroundImage: `url(${bg})` }}>
        <div className="col-md-6  ">
          <h2 className="p-3 m-3 mb-2 bg-dark bg-opacity-75 text-center rounded-1 text-light">
            New Arrived{" "}
          </h2>
          <div className="d-flex justify-content-center flex-wrap">
            {products?.map((p) => (
              <ProductCard p={p} />
            ))}
          </div>
        </div>
        <div className="col-md-6 ">
          <h2 className="p-3 m-3 mb-2 bg-dark bg-opacity-75 text-center rounded-1 text-light">
            Best Sellers{" "}
          </h2>
          <div className="d-flex justify-content-center flex-wrap">
            {sortedBySold?.map((p) => (
              <ProductCard p={p} />
            ))}
          </div>
        </div>

        
        <div className="container d-flex justify-content-center ">
          {products && products.length < total && (
            <button className="btn btn-info mb-3 col-md-6"
            style={{backgroundColor:'#bec2c4', border:'none'}}
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load More..."}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

