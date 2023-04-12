import React from "react";
import NavAmin from "../NavAdmin";
import "../PrivatePage.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrdersAdmin, updateOrderStatus } from "../../function/Order";
import ModalSlip from "../Modal/ModalSlip";

import moment from "moment/min/moment-with-locales";
import { toast } from "react-toastify";
import Badge from "react-bootstrap/Badge";

const ManageOrder = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [order, setOrder] = useState([]);
  const [orderSelect, setOrderSelect] = useState([]);
  const [open, setOpen] = useState(false);
  const statusData = ["new", "success", "cancel"];
  const [count, setCount] = useState(0);
  const [newOR, setNewOR] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrdersAdmin(user.token)
      .then((res) => {
        setOrder(res.data);
        setOrderSelect(res.data);
        const filterData = res.data.filter((item) => {
          return item.orderstatus == "new";
        });
        setNewOR(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("order: ", count);

  const handleChangeStatus = (OrderId, orderStatus) => {
    // console.log(OrderId, orderStatus);
    updateOrderStatus(user.token, OrderId, orderStatus)
      .then((res) => {
        console.log(res.data);
        toast.success("อัปเดต " + res.data.orderstatus + " สำเร็จ");
        loadData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("อัปเดตสถานะผิดพลาด");
      });
  };

  const handleSelectStatus = (e) => {
    // console.log("select: ",e.target.value)
    const valueStatus = e.target.value;
    if (valueStatus == "all") {
      setOrderSelect(order);
    } else {
      const filterData = order.filter((item) => {
        return item.orderstatus == valueStatus;
      });
      setOrderSelect(filterData);
    }
  };
  console.log(orderSelect)

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
                <div className="mt-3">
                  <h3 className="text-center">จัดการออเดอร์</h3>
                  <div className="row my-4 d-flex justify-content-end">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">สถานะออเดอร์</label>
                        <select
                          onChange={(e) => handleSelectStatus(e)}
                          className="form-select"
                          // defaultValue={}
                        >
                          <option value="all">ทั้งหมด</option>
                          {newOR.length > 0 ? (
                            <option
                              value="new"
                              className="bg-primary text-white"
                            >
                              ใหม่ {"  " + newOR.length}
                            </option>
                          ) : (
                            <option value="new" className="">
                              ใหม่ {"  " + newOR.length}
                            </option>
                          )}
                          <option value="success">สำเร็จ</option>
                          <option value="cancel">ยกเลิก</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table_manage overflow-auto">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">ชื่อผู้สมาชิก</th>
                        <th scope="col">วันที่สั่งซื้อ</th>
                        <th scope="col">ราคาสุทธิ</th>

                        <th scope="col">อัพเดตสถานะ</th>
                        <th scope="col">ใบเสร็จ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderSelect.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td>
                            {item.orderBy == null
                            ? <p className="text-warning">ผู้ใช้ถูกลบ</p>
                            :<p>{item.orderBy.username}</p>}
                          </td>
                          <td>
                            {moment(item.createdAt).locale("th").format("llll")}
                          </td>
                          <td>{item.cartTotal} บาท</td>
                          <td>
                            {item.orderstatus != "cancel" ? (
                              <select
                                value={item.orderstatus}
                                className="form-select text-center"
                                onChange={(e) =>
                                  handleChangeStatus(item._id, e.target.value)
                                }
                              >
                                <option value="new">ใหม่</option>
                                <option value="success">สำเร็จ</option>
                                <option value="cancel">ยกเลิก</option>
                              </select>
                            ) : (
                              <select
                                value={item.orderstatus}
                                className="form-select text-center"
                              >
                                <option value="cancel">ยกเลิก</option>
                              </select>
                            )}
                          </td>
                          <td>
                            <ModalSlip item={item} />
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

export default ManageOrder;
