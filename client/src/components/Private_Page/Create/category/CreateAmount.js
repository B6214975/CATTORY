import React from "react";
import { useState, useEffect } from "react";
import {
  createAmount,
  listAmount,
  deleteAmount,
} from "../../../function/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateAmount = () => {
  const [value, setValue] = useState({
    amount: "",
  });

  const { user } = useSelector((state) => ({ ...state }));
//   const [category, setCategory] = useState([]);
  const [amount, setAmount] = useState([]);

  const handleChangeAmount = (e) => {
    // console.log(value.name);
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value)
    if (value.amount == "") {
      toast.error("เพิ่มจำนวนใบลอตเตอรี่ ผิดพลาด : กรุณากรอกจำนวนใบลอตเตอรี่");
      return;
    }
    createAmount(user.token, value)
      .then((res) => {
        console.log(res);
        loadData();
        toast.success("เพิ่มจำนวนใบลอตเตอรี่ " + res.data.amount + "ใบ สำเร็จ");
      })
      .catch((err) => {
        if (err.response.data == "Token Invalid!!!") {
          console.log(err.response.data);
          toast.error("บัญชีผู้ใช้หมดเวลา กรุณาเข้าสู่ระบบใหม่");
        } else if (err.response.data == "have_amount") {
          console.log(err.response.data);
          toast.error(
            "ลบจำนวนใบลอตเตอรี่ ผิดพลาด : มีจำนวนใบลอตเตอรี่อยู่แล้ว"
          );
        } else {
          console.log(err);
          toast.error("เพิ่มจำนวนใบลอตเตอรี่ ผิดพลาด");
        }
      });
  };

  useEffect(() => {
    loadData();
  }, []);


  const loadData = () => {
    listAmount(user.token)
      .then((res) => {
        setAmount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    deleteAmount(user.token, id)
      .then((res) => {
        console.log(res);
        loadData();
        toast.success("ลบจำนวนใบลอตเตอรี่ " + res.data.amount + "ใบ สำเร็จ");
      })
      .catch((err) => {
        if (err.response.data == "Token Invalid!!!") {
          console.log(err.response.data);
          toast.error("บัญชีผู้ใช้หมดเวลา กรุณาเข้าสู่ระบบใหม่");
        } else {
          console.log(err.response.data);
          toast.error("ลบจำนวนใบลอตเตอรี่ ผิดพลาด");
        }
      });
  };
  return (
    <div className="row">
      <h3 className="text-center">เพิ่มหมวดหมู่</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="row">
          <div className="col-md-6 mt-3">
            <div className="input-group">
              <input
                onChange={handleChangeAmount}
                type="number"
                className="form-control"
                placeholder="เพิ่มจำนวนใบลอตเตอรี่"
                value={value.amount}
                name="amount"
              />
              <button className="btn btn-secondary">ใบ</button>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      </form>
      <br />
      <div className="card_shadow mt-4 max_height overflow-auto">
        <table className="table table-striped table-hover text-center ">
          <thead>
            <tr>
              <th scope="col" colSpan="3">
                จำนวนใบลอตเตอรี่
              </th>
            </tr>
          </thead>
          <tbody>
            {amount.map((item, index) => (
              <tr key={index}>
                <th>{item.amount}&nbsp;&nbsp;ใบ</th>
                <th>
                  <i
                    onClick={() => handleDelete(item._id)}
                    className="bi bi-trash text-danger"
                  ></i>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateAmount;
