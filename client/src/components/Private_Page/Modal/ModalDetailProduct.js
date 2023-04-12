import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import { updateProduct } from "../../function/product";
import { toast } from "react-toastify";
import axios from "axios";

const ModalDetailProduct = ({ item, loadDataPeriod }) => {
  const [stateModal, setStateModal] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [value, setValue] = useState(item);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setStateModal(false);
  };
  const handleShow = () => {
    setStateModal(true);
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    // console.log(value)
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    updateProduct(user.token, value._id, value)
      .then((res) => {
        loadDataPeriod();
        console.log(res);
        toast.success("อัปเดต " + res.data.title + " สำเร็จ");
        setLoading(false);
        handleClose()
        // navigate("/admin/home")
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Update Error!!!");
      });
  };

  const handleRemove = (public_id) => {
    const { images } = value;
    console.log(images.length)
    if (images.length == 1){
      toast.info('ไม่สามารถลบรูปได้ เนื่องจากเหลือรูปสุดท้าย')
    }
    else{
      setLoading(true);
    
      axios
        .post(
          process.env.REACT_APP_API + "/removeimages",
          { public_id },
          {
            headers: {
              authtoken: user.token,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          let filterImages = images.filter((item) => {
            return item.public_id !== public_id;
          });
          setValue({ ...value, images: filterImages });
          // handleSubmit()
          console.log(res)
          // loadData();
  
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

  };
// console.log(value)
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
          <Modal.Title>
            เลข : {value.title}&nbsp;&nbsp;
            {loading ? (
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <></>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="form-label">เลข</label>
            <input
              type="text"
              className="form-control"
              // placeholder={item.title}
              defaultValue={value.title}
              name="title"
              onChange={handleChange}
            />

            <div className="row justify-content-between  mt-3">
              <div className="form-group col-md-6">
                <label className="form-label mt-3">จำนวน</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={value.amount}
                    name="amount"
                    onChange={handleChange}
                  />
                  <button className="btn" disabled>
                    ใบ
                  </button>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-label mt-3">ราคา</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={value.price}
                    name="price"
                    onChange={handleChange}
                  />
                  <button className="btn" disabled>
                    บาท
                  </button>
                </div>
              </div>
            </div>
            <label className="form-label mt-3">งวดประจำวันที่</label>
            <input
              type="text"
              className="form-control"
              placeholder={value.period}
              disabled
            />
            <div className="card mt-3">
              <p className="m-2">จำนวนรูปภาพ : {value.images.length}</p>

              <Carousel>
                {value.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100" src={img.url} />
                    <div className="d-flex justify-content-center my-1">
                      <button
                        onClick={() => handleRemove(img.public_id)}
                        className="btn btn-outline-danger"
                      >
                        ลบรูปที่ {index + 1}
                      </button>
                    </div>
                    {/* <p className="p-0">ลบรูปที่ {index + 1}</p> */}
                    <div className="d-grid">
                      <h1 className="text-center bg-secondary p-2">
                        <p></p>
                      </h1>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <div className="d-grid"> */}
          <button onClick={handleSubmit} className="btn btn-warning">
            อัปเดตสินค้า
          </button>
          {/* </div> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDetailProduct;
