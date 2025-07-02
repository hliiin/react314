import React,{useState} from 'react'
 // 引入并渲染good.js数据
import goods from '../data/goods'
import { Link } from 'react-router-dom';

export default function GoodsList() {
//  1.1  接收引入的goods商品列表
const [list, setList] = useState(goods)
console.log(list);

  return (
    <div>
      <h1>存放书籍列表的</h1>
      {/* map((item,index) => {})  默认第一个参数item是每一个对象，名字自己取， index默认是索引值 */}
      {list.map((item) => (
        <Link to={`/goodsinfo/${item.id}`}  key={item.id}>
          <p>书的名字：{item.name}</p>
        </Link>
      ))}
      
    </div>
  )
}
