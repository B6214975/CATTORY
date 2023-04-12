import React from "react";
import "../PublicPage.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { listUserBy, updateUser } from "../../function/users";
import { useDispatch } from "react-redux";
import ModalPassword from "../Modal/ModalPassword";
import { toast } from "react-toastify";
import User_update from "./User_update";

const User = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [userData, setUserData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // console.log(newData)

  useEffect(() => {
    loadData();
  }, []);
  // console.log(user);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      errorMessage:
        "ชื่อผู้ใช้ควรมีความยาวตั้งแต่ 3 ถึง 16 อักษร และไม่ควรมีอักขระพิเศษใดๆ",
      label: "ชื่อผู้ใช้",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      errorMessage: "รูปแบบของ email ของคุณไม่ถูกต้อง",
      label: "email",
      required: true,
    },

    {
      id: 5,
      name: "firstname",
      type: "text",
      errorMessage: "กรุณากรอกชื่อ",
      label: "ชื่อ",
      pattern: ".{1,}",
      required: true,
    },
    {
      id: 6,
      name: "lastname",
      type: "text",
      errorMessage: "กรุณากรอกนามสกุล",
      label: "นามสกุล",
      pattern: ".{1,}",
      required: true,
    },
    {
      id: 7,
      name: "telnumber",
      type: "text",
      errorMessage: "กรอกเบอร์โทรศัพท์ที่ถูกต้อง",
      label: "เบอร์โทรศัพท์",
      pattern: "[0]{1}[0-9]{9}",
      required: true,
    },
    {
      id: 8,
      name: "banknumber",
      type: "text",
      errorMessage: "กรุณากรอกเลขบัญชีธนาคาร",
      label: "เลขบัญชีธนาคาร",
      pattern: ".{1,}",
      required: true,
    },
  ];

  const loadData = () => {
 
    listUserBy(user.token, user.iduser)
      .then((res) => {
        console.log(res);
        setUserData(res.data);
        setNewData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
    // console.log(newData)
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    updateUser(user.token, newData._id, newData)
      .then((res) => {
        // console.log(res.data.username,res.data.role,res.data._id);
        setLoading(false);
        console.log(res);
        toast.success('อัปเดตข้อมูลผู้ใช้ '+user.username+" เรียบร้อย")
        dispatch({
          type: "LOGIN",
          payload: {
            token: user.token,
            username: res.data.username,
            iduser: res.data._id,
            role: res.data.role,
          },
        });
        localStorage.setItem("token", user.token);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error('อัปเดตข้อมูลผู้ใช้ '+user.username+" ผิดพลาด")
      });
  };

  return (
    <div className="container-fluid" id="container_color">
      <br />
      <div className="pageheight container mt-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card_shadow mb-5 p-5">
              {/* <div className="card-body">
                <h3 className="text-center mt-1">สมาชิก</h3>
                <p className="text-warning">****ยังไม่เสร็จ มาทำต่อ 
                *** เหลือทำ validation *** เปลี่ยนรหัสผ่าน</p>
                <div className="form-gruop mt-4">
                  <form>
                    <div className="form-group">
                      <label className="form-label">ชื่อผู้ใช้งาน</label>
                      <input
                        className="form-control"
                        type="text"
                        name="username"
                        defaultValue={userData.username}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={userData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="d-flex justify-content-between">
                      <div className="form-grop">
                        <label className="form-label">ชื่อ</label>
                        <input
                          className="form-control"
                          type="text"
                          name="firstname"
                          defaultValue={userData.firstname}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-grop">
                        <label className="form-label">นามสกุล</label>
                        <input
                          className="form-control"
                          type="text"
                          name="lastname"
                          defaultValue={userData.lastname}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="form-group">
                      <label className="form-label">เบอร์โทรศัพท์</label>
                      <input
                        className="form-control"
                        type="text"
                        name="telnumber"
                        defaultValue={userData.telnumber}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label className="form-label">เลขบัญชีธนาคาร</label>
                      <input
                        className="form-control"
                        type="text"
                        name="banknumber"
                        defaultValue={userData.banknumber}
                        onChange={handleChange}
                      />
                    </div>
                    <br />

                    <div className="form-group">
                      <label className="form-label">ธนาคาร</label>
                      <select 
                      onChange={handleChange}
                      className="form-select" 
                      name="bankname">
                        <option selected disabled>
                          {userData.bankname}
                        </option>
                        <option value="Bangkok Bank">Bangkok Bank</option>
                        <option value="Krung thai bank">Krung thai bank</option>
                        <option value="Bank of Ayutthaya">
                          Bank of Ayutthaya
                        </option>
                        <option value="Kasikorn bank">Kasikorn bank</option>
                        <option value="TMB BANK">TMB BANK </option>
                        <option value="SIAM COMMERCIAL BANK">
                          SIAM COMMERCIAL BANK
                        </option>
                      </select>
                    </div>
                    <br />

                    <div className="d-flex justify-content-between mt-3">
                      {loadData
                      ? (<button
                        onClick={handleUpdate}
                        className="btn"
                        id="btn_success"
                      >
                        อัปเดตข้อมูล
                      </button>)
                      : (<button
                        className="btn"
                        id="btn_success"
                      >
                        <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>

</div>
                      </button>)
                      }
                      
                     <ModalPassword userData={userData} user={user}/>
                    </div>
                  </form>
                </div>
              </div> */}

              <div className="card-body">
                <form onSubmit={handleUpdate}>
                  {inputs.map((input) => (
                    <User_update
                      key={input.id}
                      {...input}
                      value={newData[input.name]}
                      onChange={handleChange}
                    />
                  ))}
                  <div className="form-group">
                      <label className="form-label">ธนาคาร</label>
                      <select 
                      onChange={handleChange}
                      className="form-select" 
                      name="bankname">
                        <option selected disabled>
                          {userData.bankname}
                        </option>
                        <option value="Bangkok Bank">Bangkok Bank</option>
                        <option value="Krung thai bank">Krung thai bank</option>
                        <option value="Bank of Ayutthaya">
                          Bank of Ayutthaya
                        </option>
                        <option value="Kasikorn bank">Kasikorn bank</option>
                        <option value="TMB BANK">TMB BANK </option>
                        <option value="SIAM COMMERCIAL BANK">
                          SIAM COMMERCIAL BANK
                        </option>
                      </select>
                    </div>
                  <br />
                  <br />
                  {/* <div className="d-flex justify-content-between mt-3">
                      {loadData
                      ? (<button
                        onClick={handleUpdate}
                        className="btn"
                        id="btn_success"
                        className="btn"
                      >
                        อัปเดตข้อมูล
                      </button>)
                      : (<button
                        className="btn"
                        id="btn_success"
                      >
                        <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>

</div>
                      </button>)
                      }
                      
                     <ModalPassword userData={userData} user={user}/>
                    </div> */}

<div className="d-flex justify-content-between mt-3">
                    <button className="btn" id="btn_success">
                    อัปเดตข้อมูล
                    </button>
                    <ModalPassword userData={userData} user={user}/>
                  </div>
                </form>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
