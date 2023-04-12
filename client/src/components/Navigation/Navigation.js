import React from "react";
import "./Navigation.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./logo_version3.png";
import { useDispatch, uaeSelector, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import {  emotyCart } from "../function/users";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const logout = () => {
    emotyCart(user.token);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    navigate("/");
  };

  return (
    <Navbar expand="lg" id="navcss" className="card_shadow_nav">
      <Container>
        <Navbar.Brand href="/">
          <img className="logo_wab" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/products">สินค้า</Nav.Link>
            <Nav.Link href="/history">ประวัติการสั่งซื้อ</Nav.Link>
            <Nav.Link href="/user">ข้อมูลสมาชิก</Nav.Link>
            <Nav.Link href="/cart">
              ตะกร้าสินค้า&nbsp;
              {cart.length == 0 ? (
                  <i className="bi bi-cart3"></i>
              ) : (
                <Badge bg="danger">
                  <i className="bi bi-cart3"></i>&nbsp; {cart.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user && (
          <Navbar.Collapse className="justify-content-end">
            <div>
              <Nav className="me-auto">
                {user.role == "admin" ? (
                  <Nav.Link className="text-danger" href="/admin/home">
                    {user.username}
                    &nbsp; <i className="bi bi-person-workspace"></i>
                    &nbsp; Go backend
                  </Nav.Link>
                ) : (
                  <Nav.Link className="text-info">
                    {user.username}
                    &nbsp; <i className="bi bi-person-circle"></i>
                  </Nav.Link>
                )}

                <Nav.Link onClick={logout}>
                  ออกจากระบบ &nbsp; <i className="bi bi-box-arrow-right"></i>
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        )}
        {!user && (
          <Navbar.Collapse className="justify-content-end">
            <div>
              <Nav className="me-auto">
                <Nav.Link href="/login">
                  เข้าสู่ระบบ &nbsp; <i className="bi bi-box-arrow-in-left"></i>
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
