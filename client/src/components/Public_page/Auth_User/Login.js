import React from "react";
import { useState } from "react";
import { login } from "../../function/auth";
import { useDispatch } from "react-redux";
import { useNavigate,location } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ModalForgetPassword from "../Modal/ModalForgetPassword";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  // console.log("Lo : ",location.state)

  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  // console.log(value)
  const roleBaseRedirect = (role) => {
    let intended = location.state;
    if (intended) {
      navigate("../" + intended);
    } else {
      if (role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/");
      }
    }
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log('Submit :')

    login(value)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        toast.success("เข้าสู่ระบบสำเร็จ : " + res.data.Payload.user.username);

        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.Payload.user.username,
            iduser: res.data.Payload.user.iduser,
            role: res.data.Payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        // console.log("inlogin",res.data.Payload)
        roleBaseRedirect(res.data.Payload.user.role);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data == "Password Invalid!!!") {
          toast.error("ผิดพลาด : รหัสผ่านไม่ถูกต้อง");
        }else if (err.response.data == "User not found!!!"){
          toast.error("ผิดพลาด : ไม่พบบัญชีผู้ใช้");
        }else {
          console.log(err.response.data);
          toast.error(err.response.data);
        }
      });
  };

  return (
    <div className="container-fluid" id="container_color">
      <br />
      <div className="pageheight container mt-4">
        <div className="row">
          {/* <h1>user</h1> */}
          <div className="col-md-6 offset-md-3 ">
            <div className="card mb-5 p-5 card_shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">ชื่อสมาชิก</label>
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label className="form-label">รหัสผ่าน</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div className="d-flex justify-content-between">
                    <a href="register" id="register">
                      สมัครสมาชิก
                    </a>
                    {/* <a id="forgot">ลืมรหัสผ่าน ?</a> */}
                    <ModalForgetPassword/>
                  </div>
                  <br />
                  <div className="d-flex justify-content-center mt-3">
                    <button id="btn_success" className="btn">
                      เข้าสู่ระบบ
                    </button>
                  </div>
                  {/* <button className="btn btn-success">เข้าสู่ระบบ</button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
