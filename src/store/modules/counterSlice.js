//  这是存放的计数器相关的小仓库

import { createSlice } from "@reduxjs/toolkit";

// 1. 创建一个store
const counterSlice = createSlice({
  // 定义一个名字
  name:'counter',
  // 初始化数据
  initialState:{
    count:10
  },
  // 定义修改数据的方法
  reducers:{
    // 方法1： 让count +1,  increment自定义方法名
    increment(state) {
      state.count ++
    },
    // 方法2： 让count -1,  decrement自定义方法名
    decrement: (state) => {
      state.count --
    },

    // 方法3： 再组件中调用该方法， 并且组件那边需要传递一个值， 告知仓库， 要将仓库的数据count修改了
    addCount(state,action) {
      // 仓库这边是通过action.payload 进行接收
      state.count = action.payload
    }
  }
})

// 2. 解构counterSlice的reducers里面的方法   为了能让其他页面直接使用
const {increment,decrement,addCount} = counterSlice.actions

// 3. 获取reducer
const counterReducer = counterSlice.reducer

// 4. 将 2 3步骤按需抛出
export {increment,decrement,addCount}
export default counterReducer