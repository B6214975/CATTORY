import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./routes.css";

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

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
          <div className="card_shadow mb-5 p-5 alert alert-danger">
            <div className="d-flex justify-content-center ">
              <h1 className="text-danger">
              <i className="bi bi-exclamation-octagon"></i>
              </h1>
            </div>
            <br />
            <h3 className="text-center">ผู้ใช้ไม่มีสิทธิในการเข้าถึง</h3>
            <br />
            <p className="text-center">
              จะกลับสู้หน้าแรกภายใน 
            </p>
            <h2 className="text-center">{count}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
  // return <div>loadingToRedirect</div>;
};

export default LoadingToRedirect;
