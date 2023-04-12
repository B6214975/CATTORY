import React from "react";
import NavAmin from "../NavAdmin";
import "../PrivatePage.css";
import {
  listUser,
  changeRole,
  changeStatus,
  // removeUser,
  // resetPassword,
} from "../../function/users";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment/min/moment-with-locales";
import { Switch } from "antd";
// modal
import ModalRemove from "../Modal/ModalRemove";
import ModalDetail from "../Modal/ModalDetail";
import { toast } from "react-toastify";

const ManageUser = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]); //ข้อมูลในตาราง ต้นฉบับ
  const [selectData, setSelectData] = useState([]); //ข้อมูลที่เลือก
  const [drop, setDrop] = useState([]);
  // const [searchName, setSearchName] = useState("");

  const roleData = ["admin", "user"];

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    listUser(user.token)
      .then((res) => {
        setData(res.data);
        setSelectData(res.data);
        // console.log(res);
        const dataDrop = [...new Set(res.data.map((item) => item.role))];
        setDrop(dataDrop);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleOnChangeRole = (e, id) => {
    // console.log(e.target.value)
    let value = {
      id: id,
      role: e.target.value,
    };
    // console.log(value)
    changeRole(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
        if(err.response.data == 'Token Invalid!!!'){
          console.log(err.response.data);
          toast.error('บัญชีผู้ใช้หมดเวลา กรุณาเข้าสู่ระบบใหม่')
        }
        
      });
  };
  const handleOnChange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    // console.log(value);
    changeStatus(user.token, value)
      .then((res) => {
        // console.log("in rese")
        loadData(user.token);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.data == 'Token Invalid!!!'){
          console.log(err.response.data);
          toast.error('บัญชีผู้ใช้หมดเวลา กรุณาเข้าสู่ระบบใหม่')
        }
      });
  };
  const handleSelectRole = (e) => {
    // console.log(e.target.value)
    const valueRole = e.target.value;
    if (valueRole == "all") {
      setSelectData(data);
    } else {
      const filterData = data.filter((item) => {
        return item.role == valueRole;
      });
      setSelectData(filterData);
    }
  };
  const handleSearchName = (e) => {
    // console.log(e.target.value);
    // setSearchName(e.target.value);
    const valueName = e.target.value;
    if (valueName == "") {
      setSelectData(data);
    } else {
      const filterDataName = data.filter((item) => {
        return item.username == valueName;
      });
      setSelectData(filterDataName);
    }
  };

  return (
    <div className="container-fluid" id="container_color_admin">
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-3 mt-4">
            <div className="card card_shadow">
              <div className="card-body p-5">
              <div className="d-flex justify-content-center">
                  <a href="/admin/home" className="h1 dashbroad">DashBroad</a>
                </div>
                <hr />
                <div className="ms-5">
                  <NavAmin />
                </div>
                <hr />

              </div>
            </div>
          </div>

          <div className="col-md-9 mt-4 mb-5 ">
            <div className="card card_shadow">
              <div className="card-body">
                <div className="mt-3">
                  <h3 className="text-center">จัดการสมาชิก</h3>
                  <div className="row my-4 d-flex justify-content-around">
                    <div className="col-md-4">
                      <div className="form-group  text-center">
                        <label className="form-label">เลือกสมาชิก</label>
                        <select
                          onChange={(e) => handleSelectRole(e)}
                          className="form-select"
                        >
                          <option value="all">all</option>
                          {drop.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group text-center">
                        <label className="form-label">ค้นหาสมาชิก</label>
                        <input
                          onChange={handleSearchName}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table_manage overflow-auto">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th scope="col">ชื่อสมาชิก</th>
                        <th scope="col">สิทธิ์</th>
                        <th scope="col">สถานะ</th>
                        <th scope="col">สมัครสมาชิก</th>
                        <th scope="col">อัปเดตล่าสุด</th>
                        <th scope="col">รายละเอียด | ลบ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectData.map((item, index) => (
                        <tr key={index}>
                          <td scope="row">{item.username}</td>
                          <td>
                            {item.role == "admin" ? (
                              <select
                                value={item.role}
                                className="form-select bg-primary text-white"
                                onChange={(e) =>
                                  handleOnChangeRole(e, item._id)
                                }
                              >
                                {roleData.map((role, irole) => (
                                  <option value={role} key={irole} className="">
                                    {role}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <select
                                value={item.role}
                                className="form-select bg-info text-white"
                                onChange={(e) =>
                                  handleOnChangeRole(e, item._id)
                                }
                              >
                                {roleData.map((role, irole) => (
                                  <option value={role} key={irole} className="">
                                    {role}
                                  </option>
                                ))}
                              </select>
                            )}
                          </td>
                          <td>
                            <Switch
                              checked={item.enabled}
                              onChange={(e) => handleOnChange(e, item._id)}
                            />
                          </td>
                          <td>
                            {moment(item.createdAt).locale("th").format("ll")}
                          </td>
                          <td>
                            {moment(item.updatedAt)
                              .locale("th")
                              .startOf(item.updatedAt)
                              .fromNow()}
                          </td>
                          <td>
                            <ModalDetail item={item} />
                            &nbsp;<i className="bi bi-grip-vertical"></i>
                            &nbsp;
                            <ModalRemove item={item} loadData={loadData} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
