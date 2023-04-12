import React from "react";

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { removeProduct } from "../../function/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalDestroyProduct = ({ product ,loadDataPeriod }) => {

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
        console.log(res);
        if (res.data == "haveIncart") {
          toast.info("ไม่สามารถลบสินค้าได้ เนื่องจากสินค้าอยู่ในตะกร้า");
        } else {
          loadDataPeriod();
          // toast.success("ลบสินค้า " + res.data.title + " สำเร็จ");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('ลบสินค้าผิดพลาด !!!')
      });
  };

  const destroyProduct = () => {
    for (let i = 0; i < product.length; i++) {
      handleRemove(product[i]._id);
      // console.log(product[i]._id)
    }
    toast.success("ลบสินค้าทั้งหมด สำเร็จ");
    // handleRemove(product[0]._id)
    // console.log('desTroy')
    handleClose()
  };

  return (
    <>
      <div className="d-grid mt-2">
        <button onClick={handleShow} className="btn btn-danger">
          ลบสินค้าทั้งหมด &nbsp;<i className="bi bi-exclamation-triangle"></i>
        </button>
      </div>
      <Modal show={stateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ลบบัญสินค้าทั้งหมด</Modal.Title>
        </Modal.Header>
        <Modal.Body>ต้องการลบสินค้าทั้งหมด หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button
            variant="primary"
              onClick={destroyProduct}
          >
            ลบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDestroyProduct;
