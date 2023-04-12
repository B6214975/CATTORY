import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { removeUser } from "../../function/users";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalRemove = ({ item , loadData}) => {
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
    removeUser(user.token, id)
      .then((res) => {
        console.log(res);
        loadData();
        toast.success("ลบผู้ใช้ "+res.data.username+" สำเร็จ");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error('ลบบัญชีผู้ใช้งานผิดพลาด !!!')
      });
  };


  return (
    <>
      <a>
      <i onClick={handleShow} 
      className="bi bi-trash text-danger"
      ></i>
      </a>

      <Modal show={stateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ลบบัญชีผู้ใช้งาน</Modal.Title>
        </Modal.Header>
        <Modal.Body>ต้องการลบบัญชีผู้ใช้งาน {item.username} หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={()=>handleRemove(item._id)}>
            ลบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRemove;
