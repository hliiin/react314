import React,{useState} from 'react'
// 引入所有的书信息， 到时候根据路径中的动态id 在书里面进行查找， 找到后 就在页面中渲染
import goods from '../data/goods'
import { useParams } from 'react-router-dom'

export default function GoodsInfo() {
  //书籍信息都在 goods里--
  // 1.1 获取路径中的id参数--- 获取到值也是一个字符串
  const parmas = useParams()
  console.log(parmas);  //{id: ''}

  // 1.2 根据拿到的parmas.id 在goods里面开始查找
  const goodsInfo = goods.find((item) => item.id === Number(parmas.id) )
  console.log(goodsInfo);  
  

  


  
  return (
    <div>
      <h1>书籍的详情信息</h1>
      <div>
        <p>书的名字：{goodsInfo.name}</p>
        <p>书的价格：{goodsInfo.price}</p>
        <img src={goodsInfo.img} alt=""  width='200' />
      </div>
    </div>
  )
}
