import React from 'react'
import { useParams } from 'react-router-dom'
//  useParmas ： 获取路径中携带的动态参数

export default function Artical() {

  // 从layout页面跳转过来的路径是 '/artical/001'   想在当前页面获取到路径中的动态参数：001
  // 1.1 使用useParams()获取
  const params = useParams()
  console.log(params);  //{id: '001'}
  

  return (
    <div>
      <h1>这是artical页面</h1>
      <h2>这是携带的文章id:{params.id}</h2>
    </div>
  )
}
