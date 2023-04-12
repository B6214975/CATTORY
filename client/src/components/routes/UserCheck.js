import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserCheck = () => {

    const navigate = useNavigate();
    const [count, setCount] = useState(15);
  
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        },1000)
        count === 0 && navigate('/')
        return () => clearInterval(interval)
  
    },[count])

  return (
    <div className="container-fluid" id="container_color">
    <br />
    <div className="pageheight container mt-4">
      <div className="row">

        {/* <h1>History</h1> */}
        <div className="col-md-6 offset-md-3 ">
          <div className="card_shadow mb-5 p-5 alert alert-warning mt-5">
            <div className="d-flex justify-content-center ">
              <h1 className="text-warning">
                <i className="bi bi-exclamation-triangle"></i>
              </h1>
            </div>
            <br />
            <h3 className="text-center">กรุณาเข้าสู่ระบบ</h3>
            <br />
            <p className="text-center">
              ก่อนเข้าถึงหน้านี้ กรุณาเข้าสู่ระบบ
            </p>
            <p className="text-center">
            จะกลับสู้หน้าแรกภายใน {count}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default UserCheck