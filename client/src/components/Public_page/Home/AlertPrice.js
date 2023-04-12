import React from "react";
import Toast from "react-bootstrap/Toast";
import { listPrice } from "../../function/category";
import { listPeriod } from "../../function/category";
import { useState, useEffect } from "react";

const AlertPrice = () => {

    const [period, setPeriod] = useState("");
    const [price, setPrice] = useState(0);

    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);


    useEffect(() => {
        loadData();
      }, []);
    
      const loadData = () => {
        listPeriod()
          .then((res) => {
            setPeriod(res.data[0].date);
          })
          .catch((err) => {
            console.log(err.response.data);
          });

          listPrice()
          .then((res) => {

            setPrice(res.data[0].price);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      };

    //   console.log(price,period)


  return (
    <Toast show={showA} onClose={toggleShowA}>
      <Toast.Header>
        <strong className="me-auto">ประกาศ</strong>
        <small>ประจำงวดที่ : {period}</small>
      </Toast.Header>
      <Toast.Body>ราคาต่อหนึ่งใบงวดนี้ อยู่ที่ใบละ {price} บาท </Toast.Body>
    </Toast>
  );
};

export default AlertPrice;
