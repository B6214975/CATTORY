import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import moment from "moment/min/moment-with-locales";
import Collapse from "react-bootstrap/Collapse";

const ModalSlip = ({ item }) => {
  const [stateModal, setStateModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setStateModal(false);
  };
  const handleShow = () => {
    setStateModal(true);
  };

  // console.log(item)
  return (
    <>
      <a>
        <i
          onClick={handleShow}
          className="bi bi-file-earmark-text text-warning h5"
        ></i>
      </a>
      <Modal show={stateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          {item.orderBy == null ? (
            <p className="text-warning">ผู้ใช้ถูกลบ</p>
          ) : (
            <Modal.Title>ผู้ซื้อ : {item.orderBy.username}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <div className="">
              <p>{moment(item.createdAt).locale("th").format("llll")}</p>
              <ol>
                {item.products.map((p, i) => (
                  <li key={i}>
                    {p.product == null ? (
                      <p className="text-warning">สินค้าถูกลบแล้ว</p>
                    ) : (
                      <>
                        <td>
                          {p.product.title} x {p.amount} = {p.price}
                        </td>
                      </>
                    )}
                  </li>
                ))}
              </ol>

              <p>ราคาสุทธิ : {item.cartTotal}</p>
              
              <p>งวดประจำวันที่ : {item.products[0].period}</p>
            </div>
            <div className="d-flex justify-content-center">
              <div className="card col-md-4 p-2">
                <img src={item.images[0].url} />
              </div>
            </div>
            <div className=" mt-3">
              <div className="d-grid">
                <button
                  className="btn btn-primary "
                  onClick={() => setOpen(!open)}
                >
                  ข้อมูลสมาชิก
                </button>
              </div>
              <Collapse in={open}>
                {item.orderBy == null ? (
                  <p className="text-warning text-center mt-3">ผู้ใช้ถูกลบ</p>
                ) : (
                  <div className="mt-3">
                    <p>ชื่อสมาชิก : {item.orderBy.username}</p>
                    <p>email : {item.orderBy.email}</p>
                    <p>
                      ชื่อ : {item.orderBy.firstname}
                      {"    "} นามสกุล : {item.orderBy.lastname}
                    </p>
                    <p>เบอร์โทรศัพท์ : {item.orderBy.telnumber}</p>
                    <p>หมายเลขบัญชี : {item.orderBy.banknumber}</p>
                    <p>ธนาคาร : {item.orderBy.bankname}</p>
                  </div>
                )}
              </Collapse>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSlip;
