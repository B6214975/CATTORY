import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "../PublicPage.css";
import {v4 as uuidv4} from 'uuid';


import { sendSMS } from "../../function/users";
import { forgetPassword } from "../../function/users";

const ModalForgetPassword = () => {
    const generateID = uuidv4()
  const [stateModal, setStateModal] = useState(false);
  const [otp, setOtp] = useState(generateID);
  const [otpInput, setOtpInput] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [newpass, setNewpass] = useState(false);
  const [id,setId] = useState('')
  const [username, setUsername] = useState({
    username: "",
  });
  const [password, setPassword] = useState({
    newpassword: "",
    renewpassword: "",
  });

  const handleClose = () => {
    setStateModal(false);
    setNewpass(false);
    setOtpStatus(false)
    setOtp(generateID)
    setPassword({
        newpassword:"",
        renewpassword:""
    })
  };
  const handleShow = (e) => {
    e.preventDefault();
    setStateModal(true);
  };

  const handleClick = (e) => {
    // console.log("onClick");
    sendSMS(username)
      .then((res) => {
        // console.log(res);
        setOtp(res.data[1]);
        setId(res.data[0]._id)
        setOtpStatus(true);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.data == 'not have user'){
            toast.error('ไม่พบบัญชีผู้ใช้นี้')
        }
      });
  };
//   console.log(otp);

  const handleChange = (e) => {
    setUsername({ ...username, [e.target.name]: e.target.value });
    // console.log(username);
  };
  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    // console.log(password);
  };
  const handleChangeOTP = (e) => {
    setOtpInput(e.target.value);
    // console.log(otpInput);
  };
  useEffect(() => {
    if (otpInput == otp) {
      setNewpass(true);
    }
  }, [otpInput]);

  const handleSubmitPassword =()=>{
    if(password.newpassword == password.renewpassword){
     
      if(password.newpassword.length >= 6 && 
        password.newpassword.length <= 20){
          // toast.success("== && true")
            forgetPassword(id,password).then(res=>{
        console.log(res)
        toast.success('เปลี่ยนรหัสผ่านสำเร็จ')
        handleClose()
    }).catch(err=>{
        console.log(err)
        toast.error('เปลี่ยนรหัสผ่านไม่สำเร็จ')
    })
      }else{
        toast.error("กรุณาตั้งรหัสผ่านเป็นตัวอัการตั้งแต่ 6 ถึง 20 ตัวอักษร")
      }
    
    }else{
      toast.error('รหัสผ่านไม่ตรงกัน')
    }
  }

  return (
    <>
      <a onClick={handleShow} id="forgot">
        ลืมรหัสผ่าน
      </a>
      <Modal show={stateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>ผู้ใช้ : </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {newpass ? (
            <div className="form-group">
                {/* <p className="text-warning">ยังไม่ทำ validate</p> */}
              <label className="form-label">รหัสผ่านใหม่</label>
              <input
                type="password"
                className="form-control"
                name="newpassword"
                value={password.newpassword}
                  onChange={handleChangePassword}
              />
              <label className="form-label mt-3">ยืนยันรหัสผ่านใหม่</label>
              <input
                type="password"
                className="form-control"
                name="renewpassword"
                value={password.renewpassword}
                  onChange={handleChangePassword}
              />
              <div className="d-grid mt-3">
                <button
                  //   onClick={handleClick}
                  onClick={handleSubmitPassword}
                  // disabled={password.newpassword != password.renewpassword}
                  className="btn"
                  id="btn_warning"
                >
                  เปลี่ยนรหัสผ่าน
                </button>
              </div>
            </div>
          ) : (
            <>
              {otpStatus ? (
                <div className="form-group">
                  <label className="form-label">กรอกรหัส OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    name="otp"
                    onChange={handleChangeOTP}
                    value={otpInput}
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">ชื่อผู้ใช้</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username.username}
                    onChange={handleChange}
                  />
                  <div className="d-grid mt-3">
                    <button
                      onClick={handleClick}
                      // onClick={handleChangePassword}
                      className="btn"
                      id="btn_warning"
                      disabled={username.username==''}
                    >
                      ขอรับหัส OTP
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalForgetPassword;
