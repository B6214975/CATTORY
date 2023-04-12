import React from "react";
import NavAmin from "./NavAdmin";
import "./PrivatePage.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";
import { listAllProductforAdmin} from "../function/product";
import { useSelector } from "react-redux";
import {
  listPeriod,
} from "../function/category";


const HomeAdmin = () => {
  const now = 60;

  const [product, setProduct] = useState([]);
  // const [selectProduct, setSelectProduct] = useState([]);
  const [ready, setready] = useState([]);
  const [sold, setsold] = useState([]);
  const [percen, setPercen] = useState(0);
  const [percenStatus, setPercenStatus] = useState(true);
  const [period, setPeriod] = useState("");
  // const [loading, setLoading] = useState(false);


  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    
    loadDataPeriod()
  }, []);

  // console.log(user.token)
  const loadData = (value) => {
    // setLoading(true);
    listAllProductforAdmin(value)
      .then((res) => {
        console.log(res)
        setProduct(res.data);
        res.data.map((item)=>{
          if(item.status == 'ready') {
            ready.push(item)
          }else{
            sold.push(item)
          }
        })
        calPercentag(res.data.length,sold.length)

      })
      .catch((err) => {
        console.log(err.response);
        // setLoading(false);
      });
  };
  const loadDataPeriod = () => {
    listPeriod(user.token)
      .then((res) => {
        setPeriod(res.data[0].date);
        // console.log(res.data[0].date)
        loadData(res.data[0].date);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  function calPercentag(all,sold){
    var discount = (sold/all)*100;
    // return discount;
    if(discount == NaN){
      setPercenStatus(false)
    }
    setPercen(parseInt(discount))
  }

  console.log(percen)

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
                <div className="mt-5">
                <div className="row ">
                    <div className="col-md-12">
                      <div className="form-group">
                      <label className="form-label">งวดประจำวันที่</label>
                      <div className="d-grid">
                        <button className="btn btn-outline-secondary"
                         disabled>
                          {period}
                         </button>
                      </div>
                       
                      </div>
                    </div>
                  </div>

                  <div className="row gap-2 mt-5 justify-content-between">
                    <div className="col-md-4">
                      <div className="d-grid">
                        <button className="btn btn-outline-primary" disabled>
                          สินค้าทั้งหมด : {product.length}
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-grid">
                        <button className="btn btn-outline-success" disabled>
                          ขายแล้ว : {sold.length}
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-grid">
                        <button className="btn btn-outline-warning" disabled>
                          เหลือ : {ready.length}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-5">
                    <div className="">
                      {percenStatus && 
                      <ProgressBar now={percen} label={`${percen}%`} />
                      }
                    </div>
                  </div>
                  
                  {/* <div className="row">
                    <div className="bg-success">5</div>
                  </div> */}

                  {/* <ProgressBar now={percen} label={`${percen}%`} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
