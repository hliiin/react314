import React from "react";
import { Outlet,Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1>这是layout页面</h1>
      {/* 准备一个按钮，  和artical的动态参数有关 -- 点击按钮 跳转过去 */}
      <Link to='/artical/001'>
        <button>点击跳转到artical页面</button>
      </Link>

      {/* 给二级路由--/home   /about  准备路由出口 */}
      <Outlet />
    </div>
  );
}
