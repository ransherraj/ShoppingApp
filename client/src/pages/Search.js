import Jumbotron from "../components/cards/Jumbotron";
import { useEffect, useState } from "react";

import axios from "axios";
import bg from "../images/bg4.jpg";

import { useSearch } from "../context/search";

import { Badge, Card, Space } from "antd";

import ProductCard from "../components/cards/ProductCart";

export default function Searched() {
  // const [auth, setAuth] = useAuth();
  const [values, setValues] = useSearch();


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
          title="Amleefa"
          subtitle="Presenting you the best books at reasonable price"
        />
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      </div>

      <div className="d-flex justify-content-center align-items-center p-4 bg-dark bg-opacity-75 text-light text-Capitalize border">
        <h3 className="text-info text-capitalize">
          Search Result : {
            values.results.length > 0 ?
            `${values.results.length} products found` :
            "Not available"
          }
        </h3>
      </div>

      <div className="row " style={{ backgroundImage: `url(${bg})` }}>
        
        <div className="col-md-12 ">
          <h2 className="p-3 m-3 mb-2 bg-dark bg-opacity-75 text-center rounded-1 text-light">
            Available Searched Result
          </h2>
          <div className="d-flex justify-content-center flex-wrap">
            {values?.results?.map((p) => (
              <ProductCard p={p} />
            ))}
          </div>
        </div>

        
        
      </div>
    </>
  );
}
