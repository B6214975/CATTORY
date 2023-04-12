import React from "react";
import "./PublicPage.css";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userCart } from "../function/users";
import { toast } from "react-toastify";
import _ from "lodash";
import { readProduct } from "../function/product";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.price;
    }, 0);
  };
  // console.log(cart);
  const handleSaveOrder = () => {
    userCart(user.token, cart)
      .then((res) => {
        console.log(res.data);
        if (res.data == "OK not sold Out"){
           navigate("/checkout");
          // toast.success('success go to checkOUT')
        }else{
          console.log(res.data)
          res.data.map((item)=>{
            if(item.length == 6){
              toast.info('หมายเลข '+item+" ถูกซื้อแล้ว")
              // console.log("6 : ",item)
            }
            else{
              readProduct(item).then(res=>{
                console.log(res)
                toast.info('หมายเลข '+res.data.title+" กำลังถูกชำระเงิน")
              })
            }
          //   // toast.info('หมายเลข '+item+" กำลังถูกชำระเงิน")

          })

        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (item) => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id == item._id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    //console.log(cart)
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
    
  };

  return (
    <div className="container-fluid" id="container_color">
      <br />
      <div className="pageheight container">
        <div className="row">
          {/* <h1>cart</h1> */}
          <div className="col-md-8 mt-4 mb-4">
            <div className="card card_shadow">
              <div className="card-body">
                {cart.length == 0
                ?<p className="text-warning text-center">ยังไม่มีสินค้าในตะกร้า</p>
              :<></>
              }
                
                <ul className="list-group">
                  {cart.map((item, index) => (
                    <li key={index} className="list-group-item">
                      <div className="row">
                        <div className="card col-md-7">
                          <Carousel>
                            {item.images.map((img, ind) => (
                              <Carousel.Item key={ind}>
                                <div className="row">
                                  <div className="card col-md-12">
                                    <img
                                      className="d-block w-100"
                                      src={img.url}
                                    />
                                  </div>
                                </div>

                                <div className="d-grid">
                                  <h1 className="text-center p-2" id="bg_img">
                                    <p></p>
                                  </h1>
                                </div>
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </div>

                        <div className="col-md-5 align-self-center">
                          <div className="d-flex justify-content-center">
                            <div>
                              <p>เลข : {item.title}</p>
                              <p>จำนวน : {item.amount} ใบ</p>
                              <p>งวดประจำวันที่ : {item.period}</p>
                              <div className="d-grid">
                                <button
                                  id="btn_delete"
                                  onClick={() => handleRemove(item)}
                                  className="btn btn-outline-danger text-danger"
                                >
                                  ลบสินค้าออกจากตะกร้า{" "}
                                  <i className="bi bi-trash3"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-4 resule_div">
            <div className="card card_shadow p-3">
              <div className="card-body">
                <h4>ผลรวม</h4>
                <hr />
                {cart.map((item, index) => (
                  <p key={index}>
                    {item.title} x {item.amount} ใบ = {item.price} บาท
                  </p>
                ))}
                <hr />
                <p>ราคาสุทธิ : {getTotal()} บาท</p>

                <br />
                {user ? (
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn"
                      id="btn_success"
                      onClick={handleSaveOrder}
                      disabled={!cart.length}
                    >
                      ชำระเงิน
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <button className="btn" id="btn_warning"
                    >
                      <Link to="/login" id="a_link" state="cart">
                        เข้าสู่ระบบ
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
