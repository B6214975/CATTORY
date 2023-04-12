import React from "react";
import "../PublicPage.css";

import { getUserCart, saveOrder, emotyCart } from "../../function/users";
import { createQRcode } from "../../function/Order";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";

const CheckOut = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [qr, setQR] = useState("");

  const [products, setProducts] = useState([]);
  const [total, SetTotal] = useState(0);

  // console.log("IMG : ",image)

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data.products);
        SetTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(total)
    if (total > 0) {
      console.log("Total :", total);
      createQRcode({total:total})
        .then((res) => {
          console.log(res);
          setQR(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [total]);

  // console.log("img: ",image)

  const createOrder = () => {
    // console.log(user.token)
    // if (image.length == 0) {
    //   toast.error("กรุณาแนบใบเสร็จ");
    // } else {
      saveOrder(user.token, image)
        .then((res) => {
          if(res.data == "OK not sold Out"){
            console.log(res.data);
             emotyCart(user.token);
             dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
           toast.success("การสั่งซื้อสำเร็จ");
          navigate("/history");
        }else{
          res.data.map((item)=>{
            toast.info('หมายเลข '+item+" ถูกซื้อไปแล้ว")
          })
        }
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  };

  const test = () => {};

  // console.log(products)

  return (
    <div className="container-fluid" id="container_color">
      <br />
      <div className="pageheight container">
        <div className="row">
          <div className="col-md-7 mt-4">
            <div className="card mb-4">
              <div className="card-body">
                <div className="">
                  <div className="boxQR d-flex justify-content-center ">
                  <div className="B_qr pb-5 ">
                    <h5 className="text-center mt-3 mb-4">PromPay</h5>
                  <img src={qr} id="qr" className="mx-3"/>
                  <p className="mt-5 text-center">พร้อมเพย์ : ปฐพี ศรีโยธา</p>
                  {/* <p>ราค</p> */}
                  </div>
                  </div>

                </div>

                
              </div>
            </div>
          </div>
          <div className="col-md-5 mt-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center mt-1">Checkout</h4>
                <hr />
                {products.map((item, index) => (
                  <div className="" key={index}>
                    <p>
                      {item.product.title} x {item.amount} ใบ = {item.price} บาท
                    </p>
                  </div>
                ))}
                <hr />
                <p>ยอดรวมสุทธิ : {total} บาท</p>
                <hr />
                <div className="form-control">
                  <FileUpload
                    image={image}
                    setImage={setImage}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </div>

                <div className="d-grid mt-3">
                  <button
                    disabled={products.length == 0 || image.length == 0}
                    onClick={createOrder}
                    className="btn"
                    id="btn_success"
                  >
                    ชำระเงินเสร็จสิ้น
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
