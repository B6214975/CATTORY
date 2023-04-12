import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

const ModalDetail = ({ item }) => {
  const [stateModal, setStateModal] = useState(false);

  const handleClose = () => {
    setStateModal(false);
  };
  const handleShow = () => {
    setStateModal(true);
  };

  return (
    <>
      <a>
      <i
        onClick={handleShow}
        className="bi bi-file-earmark-text text-warning"
      ></i>
      </a>
      <Modal show={stateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ผู้ใช้ : {item.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="form-label">ชื่อผู้ใช้</label>
            <input
              type="text"
              className="form-control"
              placeholder={item.username}
              disabled
            />
            <label className="form-label mt-3">email</label>
            <input
              type="text"
              className="form-control"
              placeholder={item.email}
              disabled
            />
            <div className="d-flex justify-content-between  mt-3">
              <div className="form-group">
                <label className="form-label">ชื่อ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={item.firstname}
                  disabled
                />
              </div>
              <div className="form-group">
                <label className="form-label">นามสกุล</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={item.lastname}
                  disabled
                />
              </div>
            </div>
            <label className="form-label mt-3">เบอร์โทรศัพท์</label>
            <input
              type="text"
              className="form-control"
              placeholder={item.telnumber}
              disabled
            />
            <label className="form-label mt-3">เลขบัญชี</label>
            <input
              type="text"
              className="form-control"
              placeholder={item.banknumber}
              disabled
            />
            <label className="form-label mt-3">ธนาคาร</label>
            <input
              type="text"
              className="form-control"
              placeholder={item.bankname}
              disabled
            />
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDetail;
