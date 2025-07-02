import React from 'react'

// 使用组件库里面的组件， 需要在项目里先安装包 npm i antd ， 并且需要去入口文件index.js里面引入全局样式

// 页面中用到什么就引入什么组件
import { Button, Checkbox } from "antd";

// 需要修改组件库里组件样式 就在控制台找到对应的类名进行修改
import '../styles/AntdPage.css'


export default function AntdPage() {

const onChange = checkedValues => {
  console.log('checked = ', checkedValues);
};
const plainOptions = ['Apple', 'Pear', 'Orange','Banana'];

  return (
    <div>
      <h1>实验使用antd组件库---演示</h1>
      <Button color="default" variant="solid">
            Solid
      </Button>


      <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
    </div>
  )
}
