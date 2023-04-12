import React from "react";

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeProduct } from "../../function/product";

const ModalRemoveProduct = ({ item, loadDataPeriod }) => {
  const [stateModal, setStateModal] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const handleClose = () => {
    setStateModal(false);
  };
  const handleShow = () => {
    setStateModal(true);
  };

  const handleRemove = (id) => {
    setStateModal(false);
    removeProduct(user.token, id)
      .then((res) => {
        console.log(res.data);
        if (res.data == "haveIncart") {
          toast.info("ไม่สามารถลบสินค้าได้ เนื่องจากสินค้าอยู่ในตะกร้า");
        } else {
          loadDataPeriod();
          toast.success("ลบสินค้า " + res.data.title + " สำเร็จ");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("ลบสินค้าผิดพลาด !!!");
      });
  };

  return (
    <>
      <a>
        <i onClick={handleShow} className="bi bi-trash text-danger"></i>
      </a>
      <Modal show={stateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ลบสินค้า {item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>ต้องการลบบัญชีผู้ใช้งาน {item.title} หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={() => handleRemove(item._id)}>
            ลบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRemoveProduct;
