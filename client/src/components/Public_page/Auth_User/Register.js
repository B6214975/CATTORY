import React from "react";
import { useState } from "react";
import { register } from "../../function/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Register_Input from "./Register_Input";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
    firstname: "",
    lastname: "",
    bankname: "",
    banknumber: "",
  });

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
      id: 3,
      name: "password",
      type: "password",
      errorMessage: "กรุณาตั้งรหัสผ่านเป็นตัวอัการตั้งแต่ 6 ถึง 20 ตัวอักษร",
      label: "รหัสผ่าน",
      pattern: `.{6,20}`,
      required: true,
    },
    {
      id: 4,
      name: "repassword",
      type: "password",
      errorMessage: "รหัสผ่านไม่ตรงกัน",
      label: "ตรวจสอบรหัสผ่าน",
      pattern: value.password,
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

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  //   console.log(value);
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Submit : ",value)
    if (value.bankname == "") {
      toast.error("ผิดพลาด : กรุณาเลือกธนาคาร");
    } else {
      register(value)
        .then((res) => {
          console.log(res);
          toast.success("สมัครสมาชิก : สำเร็จ");
          navigate("/login");
        })
        .catch((err) => {
          if (err.response.data == "have_user") {
            console.log(err.response);
            toast.error("ผิดพลาด : มีชื่อบัญชีนี้อยู่แล้ว");
            return;
          }
          else if (err.response.data == "have_email") {
            console.log(err.response);
            toast.error("ผิดพลาด : มี email อยู่แล้ว");
            return;
          }
          // console.log(err.response.data);
          // toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="container-fluid" id="container_color">
      <br />
      <div className="pageheight container mt-4">
        <div className="row">
          <div className="col-md-6 offset-md-3 ">
            <div className="card mb-5 p-5 card_shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {inputs.map((input) => (
                    <Register_Input
                      key={input.id}
                      {...input}
                      value={value[input.name]}
                      onChange={handleChange}
                    />
                  ))}
                  <div className="form-group">
                    <label className="form-label">ธนาคาร</label>
                    <select
                      className="form-select"
                      name="bankname"
                      onChange={handleChange}
                    >
                      <option selected disabled>
                        กรุณาเลือกธนาคาร
                      </option>
                      <option value="Bangkok Bank">Bangkok Bank</option>
                      <option value="Krung thai bank">Krung thai bank</option>
                      <option value="Bank of Ayutthaya">
                        Bank of Ayutthaya
                      </option>
                      <option value="Kasikorn bank4">Kasikorn bank</option>
                      <option value="TMB BANK">TMB BANK </option>
                      <option value="SIAM COMMERCIAL BANK">
                        SIAM COMMERCIAL BANK
                      </option>
                    </select>
                  </div>
                  <br />
                  <br />
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn" id="btn_success">
                      สมัครสมาชิก
                    </button>
                  </div>
                </form>

                {/* <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">ชื่อผู้ใช้งาน</label>
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      pattern="^[A-Za-z0-9]{3,16}$"
                      required
                      focused={focused.toString()}
                      onBlur={handleFocus}
                      onChange={handleChange}
                    />
                    <span>
                      ชื่อผู้ใช้ควรมีความยาวตั้งแต่ 3 ถึง 16 อักษร
                      และไม่ควรมีอักขระพิเศษใดๆ
                    </span>
                  </div>
                  <br />
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                      focused={focused.toString()}
                      onBlur={handleFocus}
                      onChange={handleChange}
                    />
                    <span>รูปแบบของ email ของคุณไม่ถูกต้อง</span>
                  </div>
                  <br />
                  <div className="form-group">
                    <label className="form-label">รหัสผ่าน</label>
                    <input
                      className="form-control"
                      type="text"
                      name="password"
                      pattern=".{6,}"
                      required
                      focused={focused.toString()}
                      onBlur={handleFocus}
                      onChange={handleChange}
                    />
                    <span>รหัสผ่านต้องมีมากกว่า 6 ตัวอักษร หรือ ตัวเลข</span>
                  </div>
                  <br />
                  <div className="form-group">
                    <label className="form-label">ตรวจสอบรหัสผ่าน</label>
                    <input
                      className="form-control"
                      type="text"
                      name="repassword"
                      pattern={value.password}
                      required
                      focused={focused.toString()}
                      onBlur={handleFocus}
                      onChange={handleChange}
                    />
                    <span>รหัสผ่านไม่ตรงกัน</span>
                  </div>
                  <br />

                  <div className="d-flex justify-content-between">
                    <div className="form-grop">
                      <label className="form-label">ชื่อ</label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstname"
                        pattern=".{1,}"
                        required
                        focused={focused.toString()}
                        onBlur={handleFocus}
                        onChange={handleChange}
                      />
                      <span>กรุณากรอกชื่อ</span>
                    </div>
                    <div className="form-grop">
                      <label className="form-label">นามสกุล</label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastname"
                        pattern=".{1,}"
                        required
                        focused={focused.toString()}
                        onBlur={handleFocus}
                        onChange={handleChange}
                      />
                      <span>กรุณากรอกนามสกุล</span>
                    </div>
                  </div>
                  <br />

                  <div className="form-group">
                    <label className="form-label">เลขบัญชีธนาคาร</label>
                    <input
                      className="form-control"
                      type="text"
                      name="banknumber"
                      pattern=".{1,}"
                      required
                      focused={focused.toString()}
                      onBlur={handleFocus}
                      onChange={handleChange}
                    />
                    <span>กรุณากรอกเลขบัญชีธนาคาร</span>
                  </div>
                  <br />

                  <div className="form-group">
                    <label className="form-label">ธนาคาร</label>
                    <select
                      className="form-select"
                      name="bankname"
                      onChange={handleChange}
                    >
                      <option selected disabled>
                        กรุณาเลือกธนาคาร
                      </option>
                      <option value="Bangkok Bank">Bangkok Bank</option>
                      <option value="Krung thai bank">Krung thai bank</option>
                      <option value="Bank of Ayutthaya">
                        Bank of Ayutthaya
                      </option>
                      <option value="Kasikorn bank4">Kasikorn bank</option>
                      <option value="TMB BANK">TMB BANK </option>
                      <option value="SIAM COMMERCIAL BANK">
                        SIAM COMMERCIAL BANK
                      </option>
                    </select>
                  </div>
                  <br />

                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn" id="btn_success">
                      สมัครสมาชิก
                    </button>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
