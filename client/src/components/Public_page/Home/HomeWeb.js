import React from "react";
import "../PublicPage.css";
import Card_Home from "../Card/Card_Home";
import { useState, useEffect } from "react";
import { listProduct } from "../../function/product";
import { searchFilter } from "../../function/product";
import AlertPrice from "./AlertPrice";


const HomeWeb = () => {
  const [product, setProduct] = useState([]);
  const [productSearch, setProductSearch] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchNumber, setSearchNumber] = useState({
    number1: "",
    number2: "",
    number3: "",
    number4: "",
    number5: "",
    number6: "",
  });

  const handleChange = (e) => {
    setSearchNumber({ ...searchNumber, [e.target.name]: e.target.value });

    const index = parseInt(e.target.name.substr(-1));
    // console.log(index)

    if (e.target.value == "") {
      const nextfield = document.querySelector(
        `input[name=number${index - 1}]`
      );
      if (nextfield !== null) {
        nextfield.focus();
      }
    } else {
      const nextfield = document.querySelector(
        `input[name=number${index + 1}]`
      );
      if (nextfield !== null) {
        nextfield.focus();
      }
    }
  };

  const handleSubmit = () => {
    searchFilter(searchNumber)
      .then((res) => {
        console.log(res);
        setProductSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProduct(6)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // console.log(searchNumber);
  console.log(product);
  return (
    <div className="container-fluid" id="container_color">
      <br />
      <div className="pageheight container mt-4">
        <div className="row">
          {/* <h1>Home Page</h1> */}
          {/* ค้นหาสินค้า */}
          <div className="col-md-6 offset-md-3">
            <div className="card card_shadow" id="searchBar">
              <div className="card-body">
                <h3 className="text-center mt-3">ค้นหาสินค้า</h3>
                {/* <p className="text-warning">
                  **ตกแต่ง**ยังไม่ทำค้นหา ** ทำประกาศ บอกราคาด้วย
                </p> */}
                <div className="form-gruop mt-4">
                  <div className="d-flex">
                    <input
                      onChange={handleChange}
                      name="number1"
                      maxLength={1}
                      type="number"
                      className="form-control card_shadow me-1 text-center"
                    />
                    <input
                      onChange={handleChange}
                      name="number2"
                      maxLength={1}
                      type="number"
                      className="form-control card_shadow mx-1 text-center"
                    />
                    <input
                      onChange={handleChange}
                      name="number3"
                      maxLength={1}
                      type="number"
                      className="form-control card_shadow mx-1 text-center"
                    />
                    <input
                      onChange={handleChange}
                      name="number4"
                      maxLength={1}
                      type="number"
                      className="form-control card_shadow mx-1 text-center"

                    />
                    <input
                      onChange={handleChange}
                      name="number5"
                      maxLength={1}
                      type="number"
                      className="form-control card_shadow mx-1 text-center"

                    />
                    <input
                      onChange={handleChange}
                      name="number6"
                      maxLength={1}
                      type="number"
                      className="form-control card_shadow ms-1 text-center"

                    />
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button
                      type="buton"
                      className="btn px-4 card_shadow"
                      id="btn_success"
                      onClick={handleSubmit}
                    >
                      ค้นหา
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* แสดงสินค้า */}
          <div className="my-5">
            {productSearch.length > 0 ? (
              <>
                <h5 className="text-center">สินค้าที่ค้นหา</h5>
                <div className="row">
                  {productSearch.map((item, index) => (
                    <Card_Home item={item} key={index} />
                  ))}
                </div>
                <br />
                <hr />
                <br />
              </>
            ) : (
              <></>
            )}
            <div className="alert_price">
              <AlertPrice/>
            </div>
            <h5 className="text-center">สินค้า</h5>
            <div className="row">
              {product.length == 0 ? (
                <div className="alert alert-warning mt-3">
                  <p className="text-center">ขออภัย สินค้าหมด</p>
                </div>
              ) : (
                <>
                  {product.map((item, index) => (
                    <Card_Home item={item} key={index} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWeb;
