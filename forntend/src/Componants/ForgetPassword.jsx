import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { requestOtp } from "./Slices/ForgetPasswordSlice";

function ForgetPassword() {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(requestOtp({ mobile }))
      .unwrap()
      .then(() => setOtpSent(true))
      .catch((error) => alert(error));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ mobile, otp, newPassword }))
      .unwrap()
      .then(() => alert("Password Reset Successful!"))
      .catch((error) => alert(error));
  };

  return (
    <div className="containers">
      <div className="wrapper">
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <h1>Forget Password</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <h1>Verify OTP</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
