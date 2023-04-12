import React from "react";
import "./PublicPage.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { getOrders } from "../function/users";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [order, setOrder] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  console.log(order);

  const loadData = () => {
    getOrders(user.token)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid" id="container_color">
      <br />
      <div className="pageheight container mt-4">
        <div className="card d-flex justify-content-center p-3">
          {/* <p className="text-warning"> ใส่วันที่ เรียงลำดับจากก่อนไปหลัง</p> */}
          <div className="card-body">
            {order.length == 0 
            ? <p className="text-center">ยังไม่มีประวัติการซื้อสินค้า</p>
          :<div>
            {order.map((item, index) => (
              <div key={index} className="card p-3 mt-3">
                <div className="card-body">
                <div className="d-flex justify-content-between">
                   <div className="d-flex">
                   <p className="mb-2">
                      สถานะ :
                    </p>&nbsp;
                    {item.orderstatus == 'new'
                    ? <p className="mb-2  text-primary">
                    รอการยืนยัน
                    </p>
                    : <>
                    {item.orderstatus == 'success'
                    ? <p className="mb-2  text-success">
                    สำเร็จ
                    </p>
                    : <>
                    <p className="mb-2 text-danger">
                    ยกเลิก
                    </p>
                    </>
                    }
                    </>
                    }
                    {/* <p className="mb-2">
                    {":  " + item.orderstatus}
                    </p> */}
                   </div>
                    <p className="mb-2">
                      งวดประจำวันที่ {":  " + item.products[0].period}
                    </p>
                </div>

                <div className="">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="text-center">
                        <td>ลำดับ</td>
                        <td>หมายเลข</td>
                        <td>จำนวน</td>
                        <td>ราคา</td>
                      </tr>
                    </thead>

                    <tbody>
                      {item.products.map((p, i) => (
                        <tr key={i} className="text-center">
                          <td>{i+1}</td>
                          {p.product == null
                          ?<p className="text-center">สินค้าถูกลบแล้ว</p>
                        :(
                          <>
                          <td>{p.product.title}</td>
                          <td>{p.product.amount} ใบ</td>
                           <td>{p.price} บาท</td>
                          </>
                        )}
                          
                        </tr>
                      ))}

                      <tr>
                        <td colSpan={4}>
                          ยอดสุทธิ : <b>{item.cartTotal}</b> บาท
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            ))}
          </div>
          }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
