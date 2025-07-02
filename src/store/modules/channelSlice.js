//  这是存放请求接口数据的仓库 http://geek.itheima.net/v1_0/channels

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 1. 创建一个store
const channelSlice = createSlice({
  // 定义一个名字
  name:'channel',
  // 初始化数据
  initialState:{
    channelList:[]
  },
  // 定义f方法： 将获取到的接口数据 赋值给channelList
  reducers:{
    setChannels(state,action ) {
      state.channelList = action.payload
    }
  }
})

// 2.需要将方法解构一下 
const {setChannels} = channelSlice.actions

// 3. 定义一个异步请求方法， 用来获取接口里面的数据
const getChannel = () => {
  // dispatch 不是自己自定义的， 而是redux-thunk里面就有的
  return async (dispatch) => {
    // 3.1 定义async函数  通过await接收到获取接口的结果
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')
    console.log(res,'这是接口数据');  // 获取到的接口数据一般在res.data里面
    
    // 3.2 调用setChannels 将获取到的数据 传递给channelList
    dispatch(setChannels(res.data.data.channels))
  }
}

// 4. 将定义好的方法抛出去， 在页面中调用获取接口数据的方法
export {getChannel}


// 5. 获取reducer
const channelReducer = channelSlice.reducer


// 6. 将步骤按需抛出
export default channelReducer;
