import React from "react";
import NavAmin from "../../NavAdmin";

// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";

import CreateAmount from "./CreateAmount";
// import CreatePeriod from "../Product/CreatePeriod";

import "../../PrivatePage.css";

const CreateCategory = () => {


  return (
    <div className="container-fluid" id="container_color_admin">
      <br />
      <div className="container ">
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

          <div className="col-md-9 mt-4 mb-4">
            <div className="card card_shadow">
              <div className="card-body p-5">

                
                  <div className="row">
                    <div className="">
                      <CreateAmount/>
                    </div>

                    {/* <div className="">
                      <CreatePeriod/>
                    </div> */}
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
