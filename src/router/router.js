// 和路由相关的内容，  创建路由表

//  引入路由页面  给每个页面配置路由
import About from "../pages/About";
import Artical from "../pages/Artical";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../pages/Layout";
import NotFound from "../pages/NotFound";

import GoodsInfo from "../pages/GoodsInfo";
import GoodsList from "../pages/GoodsList";

import Count from "../pages/Count";
import Channels from "../pages/Channels";

// 引入购物车Cart页面
import Cart from "../pages/Cart";

// 引入路由保护的组件
import ProtectedRoute from "../components/ProtectedRoute";
import { Routes,Route } from "react-router-dom";

import APIPage from "../pages/APIPage";
import AntdPage from "../pages/AntdPage";

// 1. 配置路由表

// 要实现 路由保护, 也就是登陆后才能去访问的路由页面  需要添加属性 requresAuth:true 表示需要被保护
const router = [
  // 一级路由
  {
    path: "/",
    element: <Layout />,
    // 二级路由---写完之后， 需要去它的父路由页面， 准备一个二级路由的出口
    children: [
      {
        // 实现将home页面 作为layout页面默认展示的子路由--需要添加index属性  为true
        path:'/home',
        element: <Home></Home>,
        // 将home页面改为默认展示的二级路由页面， 需要删除path, 并添加index属性
        // index: true,
      },
      {
        path: "/about",
        element: <About></About>,
        requresAuth: true,
      },
    ],
  },

  // artical页面， 想要访问，必须携带的有动态参数, 例如下面id是可以变化的 不是固定的
  {
    path: "/artical/:id",
    element: <Artical></Artical>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  // 404页面：  如果用户输入了路由表路由之外的路径， 就让他们跳转到NotFound页面，
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
  {
    path: "/goodslist",
    element: <GoodsList></GoodsList>,
  },
  {
    path: "/goodsinfo/:id",
    element: <GoodsInfo></GoodsInfo>,
  },
  {
    path: "/count",
    element: <Count />,
  },
  {
    path: "/channels",
    element: <Channels />,
  },
  {
    path: "/cart",
    element: <Cart />,
    requresAuth: true,
  },
  {
    path: "/apipage",
    element: <APIPage />,
  },
  {
    path: "/antdpage",
    element: <AntdPage />,
  },
];
// 判断路由情况 是否有子路由
// 第一种情况 一级路由有子路由的情况
// 实现路由保护组件的使用, 需要对路由表进行判断
const RouteList = () => {
  return (
    <Routes>
      {router.map((route,index) => {
        // 实现路由保护组件的使用, 需要对路由表进行判断
        // 第一种情况 一级路由有子路由的情况
        if(route.children) {
          return (
            // 一级路由
            <Route key={index} path={route.path} element={<ProtectedRoute element={route.element} requresAuth={route.requresAuth} />}>
              {/* 子路由--二级路由 --遍历二级路由*/}
              {route.children.map((childRoute,index) => (
                <Route key={index} path={childRoute.path} element={<ProtectedRoute element={childRoute.element} requresAuth={childRoute.requresAuth} />}></Route>
              ))}
            </Route>
          )
        } else {
          // 第二种 :只有一级路由  没有子路由
          return(
            <Route key={index} path={route.path} element={< ProtectedRoute element={route.element} requresAuth={route.requresAuth} />}></Route>
          )
        }
        
      })}
    </Routes>
  )
};

// 2. 抛出路由表  去App.js中引入
// export default router;
export default RouteList;  // 需要去App.js里面稍作修改
