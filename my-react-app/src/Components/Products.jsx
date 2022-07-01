import '../App.css';
import Cards from "./Cards";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = ({cat, filters, sort}) => {


  const [products,setProducts] = useState([]);
  const [filteredProducts,setFilteredProducts] = useState([]);

  //to get products from nodi api using axios in use effect.
  useEffect(()=>{
    const getProducts = async ()=>{
      const res = await axios.get(
        cat
          ? `http://localhost:4000/api/products?category=${cat}`
          : "http://localhost:4000/api/products"
      );
      setProducts(res.data);
    }
    getProducts()
  },[cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);


  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "Acs") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  
  return (
    <div>
      {cat
        ? filteredProducts.map((item) => <Cards item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Cards item={item} key={item.id} />)}
    </div>
  );
};

export default Products;