import React from "react";
import NavAmin from "../../NavAdmin";
import "../../PrivatePage.css";
import { useState, useEffect } from "react";
import {  listAmount } from "../../../function/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listPeriod,listPrice } from "../../../function/category";
import { createProduct } from "../../../function/product";

import SetValueProduct from "./SetValueProduct";
import FileUpload from './FileUpload'

const initialstate = {
  title: "",
  price: 0,
  period: "",
  amount: "",
  quantity: "1",
  status: "ready",
  images: [],
};

const CreateProduct = () => {

  const { user } = useSelector((state) => ({ ...state }));

  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState([]);
  const [period, setPeriod] = useState("");

  const [loading,setLoading] = useState(false)
  const [value, setValue] = useState(initialstate);

  const loadDataPrice = () => {
    listPrice(user.token)
      .then((res) => {
        setPrice(res.data[0].price);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const loadDataAmount = () => {
    listAmount(user.token)
      .then((res) => {
        setAmount(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadDataPeriod = () => {
    listPeriod(user.token)
      .then((res) => {
        setPeriod(res.data[0].date);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

// console.log(value)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("value: ",value);
    if(value.title.length != 6) {
      toast.error('กรุณากรอกหมายเลข 6 ตัวเลข')
    }
    else if (value.amount.length == 0){
      toast.error('กรุณาเลือกจำนวนใบ')
    }
    else if (value.images.length == 0) {
      toast.error('กรุณาเลือกรูปภาพ')
    }
else{
      createProduct(user.token, value)
      .then((res) => {
        console.log(res);
        toast.success("เพิ่มสินค้า " + res.data.title + " สำเร็จ");
        window.location.reload()
      })
      .catch((err) => {
        if (err.response.data == "Token Invalid!!!") {
          console.log(err.response.data);
          toast.error("บัญชีผู้ใช้หมดเวลา กรุณาเข้าสู่ระบบใหม่");
        } else {
          console.log(err.response.data);
        toast.error(err.response.data);
        }
      });
}
  };
// console.log(value)
  const handleChange = (e) => {
    console.log(e.target.name, e.target);
    loadDataPrice();
    loadDataPeriod();
    if(e.target.name == 'amount'){
      
      setValue({ ...value, amount: e.target.value,
        price: parseInt(e.target.value)*price,
        period: period})
    }else{
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    loadDataAmount();
    loadDataPrice();
    loadDataPeriod();
    

  }, []);

  return (
    <div className="container-fluid" id="container_color_admin">
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-3 mt-4">
            <div className="card card_shadow">
              <div className="card-body p-5">
              <div className="d-flex justify-content-center">
                  <a href="/admin/home" className="h1 dashbroad">DashBroad</a>
                </div>
                <hr />
                <div className="ms-5">
                  <NavAmin />
                </div>
                <hr />

              </div>
            </div>
          </div>

          <div className="col-md-9 mt-4 mb-5 ">
            <div className="card card_shadow">
              <div className="card-body">
                {/* content */}
                <h3 className="text-center mt-3">เพิ่มสินค้า</h3>
                <div className="mt-4">
                  <div>
                    <SetValueProduct />
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 card_shadow p-3"
                  >
                    {/* ใส่แพตเทิล 6 ตัวเลข ทำต่ออัพโหลดรูปภาพ --------------  */}
                    <div className="row"> 
                      <div className="form-group col-md-6 mt-2">
                        <label htmlFor="" className="form-label">
                          หมายเลข
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={value.title}
                          onChange={handleChange}
                          className="form-control"
                        />
                        
                      </div>

                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6 mt-2">
                            <div className="form-group">
                              <label htmlFor="" className="form-label">
                                จำนวนใบ
                              </label>

                              <select
                                name="amount"
                                onChange={handleChange}
                                className="form-control"
                                // defaultValue={value.amount}
                              >
                                <option selected disabled>กรุณนาเลือก...</option>
                                {amount.length > 0 &&
                                  amount.map((item) => (
                                    <option key={item._id} value={item.amount}>
                                      {item.amount}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6 mt-2">
                          <label htmlFor="" className="form-label">
                                ราคาสินค้า
                              </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            disabled
                            placeholder={value.price}

                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="form-group mt-2">
                      <label className="form-label">เลือกรูปภาพ</label>
                      <input type="file" className="form-control" />
                    </div> */}

                    {/* {loading
            ? <div>Loding...   <Spin /></div>
            : <div></div>
            } */}
                  <FileUpload 
                  value={value} 
                  setValue={setValue}
                  loading={loading}
                  setLoading={setLoading}
                  />

                    <div className="d-grid my-3">
                      <button type="submit" className="btn btn-primary mt-2">
                        เพิ่มสินค้า
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
