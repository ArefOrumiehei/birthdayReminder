import { useState } from "react";
import axios from "../api/axiosInstance";
import "../styles/Register.css";

function Register({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const res = await axios.post(url, { email, password });
      
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        onLogin();
      } else {
        alert("ثبت‌نام موفق! حالا وارد شو");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "خطا");
    }
  };

  return (
    <div className="register-container">
      <h2>{isLogin ? "ورود" : "ثبت‌نام"}</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ایمیل" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="پسورد" />
      <button onClick={handleSubmit} disabled={!email || !password}>{isLogin ? "ورود" : "ثبت‌نام"}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "ثبت‌نام نکردی؟" : "قبلا ثبت‌نام کردی؟"}
      </p>
    </div>
  );
}

export default Register;
