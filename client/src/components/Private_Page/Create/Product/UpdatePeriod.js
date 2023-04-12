import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/min/moment-with-locales";

import { useState, useEffect } from "react";
import {
  listPeriod,
  editPeriod,
} from "../../../function/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdatePeriod = () => {
  const [dateTh, setDateTh] = useState("");
  const [dateStart, setDateStart] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const [period, setPeriod] = useState("");
  const [ok, setOk] = useState(false);

  const [id, setId] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleChangePeriod = (e) => {
    setDateStart(e);
    console.log(e);
    let dataThMoment = moment(e).locale("th").format("LL");
    setNewDate(dataThMoment);
    setOk(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editPeriod(user.token, id, { newDate })
      .then((res) => {
        console.log(res);
        toast.success("อัปเดตงวด สำเร็จ");
      })
      .catch((err) => {
        if (err.response.data == "Token Invalid!!!") {
          console.log(err.response.data);
          toast.error("บัญชีผู้ใช้หมดเวลา กรุณาเข้าสู่ระบบใหม่");
        } else {
          console.log(err);
        }
      });
  };

  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   // console.log(value)
  //   if (value.date == "") {
  //     toast.error("เพิ่มงวดของลอตเตอรี่ ผิดพลาด : กรุณาวันที่ของงวดลอตเตอรี่");
  //     return;
  //   }
  //   createPeriod(user.token, value)
  //     .then((res) => {
  //       console.log(res);
  //       loadData();
  //       toast.success("เพิ่มงวดที่ " + res.data.date + " สำเร็จ");
  //       setOk(false)
  //     })
  //     .catch((err) => {
  //       if (err.response.data == "Token Invalid!!!") {
  //         console.log(err.response.data);
  //         toast.error("บัญชีผู้ใช้หมดเวลา กรุณาเข้าสู่ระบบใหม่");
  //       } else if (err.response.data == "have_Period") {
  //         console.log(err.response.data);
  //         toast.error(
  //           "เพิ่มงวดของลอตเตอรี่ ผิดพลาด : มีงวดของลอตเตอรี่อยู่แล้ว"
  //         );
  //       } else {
  //         console.log(err);
  //         toast.error("เพิ่มงวดของลอตเตอรี่ ผิดพลาด");
  //       }
  //     });
  // };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listPeriod(user.token)
      .then((res) => {
        setId(res.data[0]._id);
        setPeriod(res.data[0].date);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="row">
      {ok ? (
        <div className="col-md-8 mt-2">
          <input
            type="text"
            className="form-control"
            disabled
            placeholder={"งวดประจำวันที่ : " + newDate}
          />
        </div>
      ) : (
        <div className="col-md-8 mt-2">
          <input
            type="text"
            className="form-control"
            disabled
            placeholder={"งวดประจำวันที่ : " + period}
          />
        </div>
      )}

      <div className="col-md-4 mt-2">
        <DatePicker
          className="form-control"
          placeholderText="อัปเดตวันที่"
          selected={dateStart}
          onChange={(date) => handleChangePeriod(date)}
          name="date"
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="form-group">
        <div className="d-grid">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-warning mt-2"
          >
            อัปเดต
          </button>
        </div>
      </div>
      <br />

    </div>
  );
};

export default UpdatePeriod;
