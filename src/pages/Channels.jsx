import React, {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getChannel } from '../store/modules/channelSlice'
//  和仓库channelSlice 相关

export default function Channels() {
  // 获取仓库的列表数据 channelList[]
  const {channelList} = useSelector((state) => state.channel)
  // 获取仓库抛出的getChannel方法
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getChannel())
  },[dispatch])
  
  return (
    <div>
      <h1>这是和获取接口数据相关的页面</h1>
      {/* 渲染仓库里面的 channnelList */}
      {channelList.map((item) => (
        <h3 key={item.id}>id是：{item.id}---内容是：{item.name}</h3>
      ))}
      
    </div>
  )
}
