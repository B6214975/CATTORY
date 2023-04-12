import React from "react";
import NavAmin from "../NavAdmin";
import "../PrivatePage.css";
import { useState, useEffect } from "react";
import { listAllProductforAdmin , removeProduct} from "../../function/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment/min/moment-with-locales";
import ModalDetailProduct from "../Modal/ModalDetailProduct";
import ModalRemoveProduct from "../Modal/ModalRemoveProduct";
import ModalDestroyProduct from "../Modal/ModalDestroyProduct";
import {
  listPeriod,
} from "../../function/category";

const ManageProduct = () => {
  const [product, setProduct] = useState([]);
  const [selectProduct, setSelectProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("");


  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadDataPeriod()
  }, []);

  const loadData = (value) => {
    setLoading(true);
    listAllProductforAdmin(value)
      .then((res) => {
        setProduct(res.data);
        setSelectProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const loadDataPeriod = () => {
    listPeriod(user.token)
      .then((res) => {
        setPeriod(res.data[0].date);
        // console.log(res.data[0].date)
        loadData(res.data[0].date);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleSearchTitle = (e) => {
    // console.log(e.target.value);
    // setSearchTitle(e.target.value);
    const valueTitle = e.target.value;
    if (valueTitle == "") {
      setSelectProduct(product);
    } else {
      const filterTitle = product.filter((item) => {
        return item.title == valueTitle;
      });
      setSelectProduct(filterTitle);
    }
  };

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

                <p></p>
              </div>
            </div>
          </div>

          <div className="col-md-9 mt-4 mb-5 ">
            <div className="card card_shadow">
              <div className="card-body">
                {/* content */}
                <h3 className="text-center mt-3">จัดการสินค้า</h3>
                <div className="m-4">
                  <div className="row">

                  <div className="form-group">
                      <label className="form-label">งวดประจำวันที่</label>
                      <div className="d-grid">
                        <button className="btn btn-outline-secondary"
                         disabled>
                          {period}
                         </button>
                      </div>
                       
                      </div>

                    <div className="col-md-8 mt-3">
                      <div className="card">
                        <div className="input-group">
                          <button disabled className="btn">ค้นหา</button>
                          <input onChange={handleSearchTitle}
                          type="text" className="form-control m-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4 mt-3">
                     <ModalDestroyProduct product={product} loadDataPeriod={loadDataPeriod}/>
                    </div>
                    
                  </div>
                </div>
                {/* <div className="card m-5 card_shadow">
                  <div className="row justify-content-between p-4">
                    {product.map((item) => (
                      <div className="col-md-3 m-1 mt-2 card" key={item._id}>
                        <h4 className="card-title text-center mt-3">
                          {item.title}
                        </h4>
                        <div className="card-body d-flex justify-content-around">
                          <ModalDetailProduct item={item} />
                          <ModalRemoveProduct item={item} loadData={loadData} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
                <div className="table_manage overflow-auto">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th scope="col">เลข</th>
                        <th scope="col">จำนวน</th>
                        <th scope="col">สถานะ</th>
                        <th scope="col">เพิ่ม</th>
                        <th scope="col">อัปเดตล่าสุด</th>
                        <th scope="col">รายละเอียด | ลบ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectProduct.map((item, index) => (
                        <tr key={index}>
                          <td scope="row">{item.title}</td>
                          <td scope="row">{item.amount}</td>
                          {item.status == "ready" ? (
                            <td scope="row" className="text-success">
                              {item.status}
                            </td>
                          ) : (
                            <td scope="row" className="text-warning">
                              {item.status}
                            </td>
                          )}
                          <td>
                            {moment(item.createdAt).locale("th").format("ll")}
                          </td>
                          <td>
                            {moment(item.updatedAt)
                              .locale("th")
                              .startOf(item.updatedAt)
                              .fromNow()}
                          </td>
                          <td>
                            <ModalDetailProduct 
                            item={item} 
                            loadDataPeriod={loadDataPeriod}
                            />
                            &nbsp;<i className="bi bi-grip-vertical"></i>
                            &nbsp;
                            <ModalRemoveProduct
                              item={item}
                              loadDataPeriod={loadDataPeriod}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
