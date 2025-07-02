//  将所有的store小仓库 进行合并

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterSlice";
import channelReducer from "./modules/channelSlice";

import authReducer from "./modules/authSlice";
import cartReducer from "./modules/cartSlice";

// 引入持久化相关的内容
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from 'redux-persist'

// // 1. 将所有的模块合并
// const store = configureStore({
//   reducer:{
//     counter:counterReducer,
//     channel:channelReducer,
//     auth:authReducer,
//     cart:cartReducer,
//   }
// })

// // 2. 导出大仓库   写完需要去index.js 入口文件里面 引入大仓库
// export default store;

// redux的持久化存储  例如购物车或者登陆状态等一些数据信息 保存到本地， 防止页面一刷新，数据就重置， 需要安装 npm install redux-persist
// 1. 持久化的配置
const persistConfig = {
  key: "reactdeom", // 持久化存储在控制台展示的名字， 最好和项目名保持一致， 防止跟其他的项目持久化内容分不清
  storage, // 持久化存储的v位置， 默认在本地存储localStorage
};

// 2. 组合reducer
const reactdemoReducer = combineReducers({
  counter: counterReducer,
  channel: channelReducer,
  auth: authReducer,
  cart: cartReducer,
});


// 3. 创建持久化 reducer 整合1 2步骤
const persistedReducer = persistReducer(persistConfig,reactdemoReducer)

// 4. 创建store
const store =  configureStore({
  reducer:persistedReducer
})
// 将第四步的store也持久化一下 在抛出
const persistor = persistStore(store)

// 5. 导出大仓库,第四步中创建的store 和 持久化的store都要导出,  需要再去index.js文件里面加一些持久化的内容
export {store, persistor};