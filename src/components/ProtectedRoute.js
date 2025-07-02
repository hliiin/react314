import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
//  创建保护路由的组件

export default function ProtectedRoute({element,requresAuth}) {
  // 需要获取到登陆状态isLogin  以及路由身上是否有requresAuth:true
  const {isLogin} = useSelector((state) => state.auth)
  console.log(isLogin);
  // 功能  如果当前访问页面有requresAuth:true属性,需要登陆 并且用户没有登陆的时候  就重定向到登录页
  if(requresAuth && !isLogin) {
    return <Navigate to={'/login'} />
  } else {
    return element
  }
  
}
