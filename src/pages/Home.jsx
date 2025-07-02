import React from 'react'
import { useLocation } from 'react-router-dom'
// useLoaction  ： 用来获取当前路径后面拼接的查询参数

//例如： http://localhost:3000/?id=2   => ?id=2  就是拼接的




export default function Home() {
  // 1. 使用useLocation 获取
  const location = useLocation()
  console.log(location);  //{pathname: '/', search: '?id=2', hash: '', state: null, key: 'default'}
  // 2. 获取当前的路径和查询参数
  const path = location.pathname
  const search = location.search

  // /3. 获取参数的具体值 也就是 ?id=2 的 2  , 需要使用new URLSearchParmas()
  const query = new URLSearchParams(search)
  console.log(query);  //URLSearchParams {size: 1}  只能知道拼接了几个参数

  // 3.2 需要解析一下query, 使用get获取到某个拼接参数的值
  const keyWords = query.get('id')
  console.log(keyWords);  //2  注意： 获取到的参数的值都是字符串类型string
  

  return (
    <div>
      <h1>这是home页面</h1>
      <h2>当前的路径信息</h2>
      <p>当前的路径：{path}</p>
      <p>当前的查询参数：{search}</p>
      <p>参数的具体值：{keyWords}</p>
    </div>
  )
}
