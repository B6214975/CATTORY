import React from "react";
import { useState, useEffect } from "react";
import { listPrice, editPrice } from "../../../function/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdatePrice = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [id, setId] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [price, setPrice] = useState(0);

  const handleChangePrice = (e) => {
    // console.log(e.target.value);
    setNewPrice(e.target.value)

  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listPrice(user.token)
      .then((res) => {
        setId(res.data[0]._id);
        setPrice(res.data[0].price);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if(+newPrice < 0 ){
    toast.error('กรูณากรอกราคาเป็นค่าบวก')
    console.log("submit: ",Number.isInteger(parseInt(newPrice)))
   }
   else if ((Number.isInteger((+newPrice)))){
    // console.log("submit: ",parseInt(newPrice),Number.isInteger(parseInt(newPrice)))
    // console.log("submit: ",typeof newPrice, +newPrice)

    editPrice(user.token, id, { newPrice })
      .then((res) => {
        console.log(res);
        loadData()
        toast.success("อัปเดตราคา สำเร็จ");
      })
      .catch((err) => {
        if (err.response.data == "Token Invalid!!!") {
          console.log(err.response.data);
          toast.error("บัญชีผู้ใช้หมดเวลา กรุณาเข้าสู่ระบบใหม่");
        } else {
          console.log(err);
        }
      });
   }
   else{
    // console.log("submit")
    toast.error('กรุณากรอกราคาเป็นจำนวนเต็ม')
    console.log("submit: ",Number.isInteger(parseInt(newPrice)))
    
   }
  };

  return (
    <div className="row">
      <div className="col-md-8 mt-2">
        <input
          type="text"
          className="form-control"
          disabled
          placeholder={"ราคาต่อใบ ใบละ : "+price+" บาท"}
        />
      </div>
      <div className="col-md-4 mt-2">
        <input
          type="number"
          className="form-control"
          placeholder="ราคาใหม่"
          onChange={handleChangePrice}
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

export default UpdatePrice;
