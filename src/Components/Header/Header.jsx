/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <Link to="/">Trang chủ</Link>
        <Link to="/model">Mô hình</Link> 
        <Link to="/booking">Dịch vụ</Link>
        <Link to="/login" className="primary-button">
          Đăng nhập
        </Link>
      </div>
    </nav>
  );
};

export default Header;
