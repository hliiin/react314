import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { login, logout } from "../store/modules/authSlice";
//  登陆页面, redux里有个isLogin 为true表示登陆了  false表示没登陆

export default function Login() {
  // 路由跳转
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const {isLogin} = useSelector((state) => state.auth)
  // 登陆完毕 跳转到 / 
  const handleLogin = () => {
    dispatch(login())
    navigate('/')
  }
  // console.log(isLogin);
  

  return (
    <div>
      <h1>这是login页面</h1>
      <button onClick={handleLogin}>点击登录</button>
      <button onClick={() => dispatch(logout())}>退出登录</button>
    </div>
  );
}
