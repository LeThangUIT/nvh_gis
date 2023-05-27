import React from "react";
import "./BookingPage.css";
import pic1 from "../../Assets/booking_pic1.png";

export default function BookingPage() {
  return (
    <div>
      <div className="booking-container">
        <div className="booking-container-left">
          <img src={pic1} alt="" />
        </div>
        <div className="booking-container-right">
          <form className="booking-form">
            <span className="booking-form-title">Gửi yêu cầu đặt sân</span>
            <input type="text" placeholder="Họ và tên" name="name" />
            <input type="number" placeholder="Số điện thoại" name="phone" />
            <input type="email" placeholder="Email (nếu có)" name="email" />
            <div className="time">
              <input type="date" name="date" />
              <input type="time" name="time" />
            </div>
            <textarea type="text" placeholder="Ghi chú" name="note" />
            <button className="booking-btn">Đặt sân</button>
          </form>
        </div>
      </div>
    </div>
  );
}
