import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axiosInstance";
import { toast } from 'react-toastify';

// Styles
import "../styles/Register.css";

const loginSchema = yup.object().shape({
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل لازمه"),
  password: yup.string().min(6, "حداقل ۶ کاراکتر").required("پسورد لازمه"),
});

const registerSchema = yup.object().shape({
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل لازمه"),
  password: yup.string().min(6, "حداقل ۶ کاراکتر").required("پسورد لازمه"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "پسوردها یکی نیستن")
    .required("تایید پسورد لازمه"),
});


function Register({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const payload = { email: data.email, password: data.password };
      const res = await axios.post(url, payload);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        onLogin();
      } else {
        toast.success("ثبت‌نام موفق! حالا وارد شو");
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "مشکل برایت پیش آمده کسکم");
    }
  };

  return (
    <div className="register-container">
      <h2>{isLogin ? "ورود" : "ثبت‌نام"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputContainer">
          <input {...register("email")} placeholder="ایمیل" />
          <span className="error">{errors.email?.message}</span>
        </div>

        <div className="inputContainer">
          <input type="password" {...register("password")} placeholder="پسورد" />
          <span className="error">{errors.password?.message}</span>
        </div>

        {!isLogin && (
          <>
            <div className="inputContainer">
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="تایید پسورد"
              />
              <span className="error">{errors.confirmPassword?.message}</span>
            </div>
          </>
        )}

        <button type="submit">
          {isLogin ? "ورود" : "ثبت‌نام"}
        </button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "ثبت‌نام نکردی؟" : "قبلا ثبت‌نام کردی؟"}
      </p>
    </div>
  );
}

export default Register;
