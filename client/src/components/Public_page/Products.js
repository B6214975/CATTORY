import React from "react";
import "./PublicPage.css";
// import Card_Home from "./Card/Card_Home";
import Card_Product from "./Card/Card_Product";
import { useState, useEffect } from "react";
import { listAllProduct } from "../function/product";
import AlertPrice from "./Home/AlertPrice";

const Products = () => {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount,setAmount] = useState([])
  const [productSelect,setProductSelect] = useState([])

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listAllProduct()
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        setProductSelect(res.data);
        setLoading(false);

        const Amount = [...new Set(res.data.map((item) => item.amount))];
        Amount.sort(function(a, b){return a - b});
        setAmount(Amount);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  };
  const handleSelectAmount = (e) => {
    console.log(e.target.name)
    const valueAmount = e.target.name;
    if (valueAmount == "all") {
      setProductSelect(product);
    } else {
      const filterData = product.filter((item) => {
        return item.amount == valueAmount;
      });
      setProductSelect(filterData);
    }
  };
  return (
    <div className="container-fluid" id='container_color'>
    <br />
    <div className='pageheight container mt-4 ' >
    <div className="row">
    <div className="container">
      <div className="card">
        <h4 className="text-center mt-3">เลือกชุด</h4>
        <div className="d-flex justify-content-center mt-2">
        <nav >
          <ul className="pagination"> 
          <li 
           className="page-item">
          <a className="page-link" 
          onClick={handleSelectAmount}
          name='all'
          id="textlink_color"
          >
            ทั้งหมด
          </a>
        </li>   
          {amount.map((item,index)=>
          <li key={index}
           className="page-item">
          <a className="page-link" 
          onClick={handleSelectAmount}
          name={item}
          id="textlink_color"
          >
            {item}
          </a>
        </li> 
          )}   
            
          </ul>
        </nav>
        </div>
        <div className="alert_price">
              <AlertPrice/>
            </div>
      </div>
      <div className="row">
        {productSelect.length == 0 
        ? <div className ="alert alert-warning mt-3 mt-5 div_soldout">
          <p className="text-center my-5">ขออภัย สินค้าหมด</p>
        </div>
      :<>
      {productSelect.map((item, index) => (
          <Card_Product item={item} key={index}/>
        ))}
      </>}
        
      </div>
    </div>
      <br />
      <div className="mb-4"></div>
    </div>
  </div>
  </div>
  );
};

export default Products;
