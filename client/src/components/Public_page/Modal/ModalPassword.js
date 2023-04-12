import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { resetPassword } from "../../function/users";
import { toast } from "react-toastify";

const ModalPassword = ({userData, user}) => {

  const [stateModal, setStateModal] = useState(false);
//   const [check,setCheck] = useState(true);
  const[password,setPassword] = useState(
    {
        oldpassword:"",
        newpassword: "",
        renewpassword: "",

      }
  )

  const handleClose = () => {
    setStateModal(false);
  };
  const handleShow = (e) => {
    e.preventDefault();
    setStateModal(true);
  };

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    
  };
// console.log(password)
//   console.log(user)

  const handleChangePassword = () => {
    if(password.newpassword == password.renewpassword){
        if(password.newpassword.length >= 6 && 
          password.newpassword.length <= 20){
          // toast.error('success')
          resetPassword(user.token,user.iduser,password)
        .then(res=>{
            console.log(res)
            toast.success('เปลี่ยนหัสผ่านสำเร็จ')
            handleClose()
        })
        .catch(err=>{
            console.log(err)
            if(err.response.data == 'Password Invalid!!!'){
                toast.error('รหัสผ่านเดิมไม่ถูกต้อง')
            }
        })
        }else{
          toast.error('กรุณาตั้งรหัสผ่านเป็นตัวอัการตั้งแต่ 6 ถึง 20 ตัวอักษร')
        }
    }
   else{
    toast.error('รหัสผ่านไม่ตรงกัน')
   }
  }

//   console.log(userData)
  return (
    <>
      <button onClick={handleShow}
      id="btn_warning" 
      className="btn">
        เปลี่ยนรหัสผ่าน
      </button>
      <Modal show={stateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ผู้ใช้ : {userData.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="form-label">รหัสผ่านเดิม</label>
            <input
              type="password"
              className="form-control"
              name="oldpassword"
              onChange={handleChange}
            />
            <label className="form-label mt-3">รหัสผ่านใหม่</label>
            <input
              type="password"
              className="form-control"
              name="newpassword"
              onChange={handleChange}
            />
            <label className="form-label mt-3">ตรวจสอบรหัสผ่านใหม่</label>
            <input
              type="password"
              className="form-control"
              pattern= {password.newpassword}
              name="renewpassword"
              onChange={handleChange}
            />

            <div className="d-grid mt-3">
                <button 
                onClick={handleChangePassword}
                className="btn" 
                id="btn_warning">
                    อัปเดตรหัสผ่าน
                </button>
            </div>
            
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPassword;
