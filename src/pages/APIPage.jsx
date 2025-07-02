import axios from "axios";
import React, { useState, useEffect } from "react";
// 引入样式文件
import "../styles/APIPage.css";
// 该页面实调用后端的api接口，操作数据库数据， 首先需要安装axios : npm i axios  (用来请求数据接口)

export default function APIPage() {



  // new code------------------------------------------------------------------------------------------getBook获取数据
  const [books, setBooks] = useState([]); //存储获取数据接口的所有书籍

  // 1.2  获取数据的接口， 需要在页面首次加载的时候就调用该接口
  const getBooks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1/getBooks");
      console.log(res);
      // 将获取到的书籍数组 保存给books
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 1.3 当页面首次加载时候， 就调用getBooks方法，useEffect() 用来再页面加载的时候触发一些事件
  useEffect(() => {
    getBooks();
  }, []);

  // ---------------------------------------------------------------------------------delete
  // 2. 完善删除的接口
  const deleteBook = async (id) => {
    const res = await axios.delete(`http://127.0.0.1/deleteBook/${id}`);
    console.log(res);
    // 删完之后需要重新调用一下获取数据的接口方法
    getBooks();
  };

  // ---------------------------------------------------------------------------add
  // 3.2 添加一个变量控制 弹出框， 为true弹出框出现  false就隐藏弹出框
  const [showModal, setShowModal] = useState(false); // 控制新增书籍的弹窗
  const [form, setForm] = useState({ name: "", author: "", price: "" }); // 定义一个对象变量， 接收输入框里面的数据

  // 3.3 完善新增接口
  const addBook = async () => {
    const res = await axios.post("http://127.0.0.1/addBook", { data: form });
    console.log(res);
    // 新增完成之后， 需要关闭弹窗
    setShowModal(false);
    // 并且将输入框清空, 不然再次点开弹窗还会保留上次添加的内容
    setForm({ name: "", author: "", price: "" });
    // 添加完之后， 再次调用获取书籍的方法
    getBooks();
  };

  // ----------------------------------------------------------------------getBookByname 查询
  const [searchResult, setSearchResult] = useState(null); // 存储查询到的书籍， 刚开始是为空
  const [searchName, setSearchName] = useState(""); // 存储查询的书籍名,从搜索输入框获取
  // 4.3 查询接口调用
  const getBookByname = async () => {
    // 再查询之前，先判断一下输入框的值是否为空, 需要把首尾空格也去除， 否则空格也会被识别为有内容
    if (!searchName.trim()) {
      alert("请输入查找的书的名字");
      return;
    }
    // 如果输入有内容 就调用接口
    try {
      const res = await axios.get("http://127.0.0.1/getBookByname", {
        params: { name: searchName },
      });
      // 如果查找的书籍没有， 就直接return
      if (!res.data.length) {
        alert("没有找到匹配的书籍");
        return;
      }

      console.log(res); // res.data[0] 就是查询返回的数据
      // 将找到的书籍存起来
      setSearchResult(res.data[0]);
    } catch (err) {
      console.error(err);

      setSearchResult(null);
    }
  };

  // 4.4 清空按钮
  const clearSearch = () => {
    setSearchName("");
    setSearchResult(null);
  };

  // ------------------------------------------------------------------- 修改数据接口
  // 5.3  定义一个变量控制修改弹窗的出现和隐藏
  const [showChange, setShowChange] = useState(false);
  // 定义一个变量存储当前修改的书籍信息
  const [editData,setEidtData] = useState(null)  // 开始的时候为空

  // 5.4 定义一个方法：触发的时候弹窗出现，并且传递一个参数，  设置当前要编辑的对象
  const handleEditClick = (book) => {
    setShowChange(true);
    setEidtData(book) // 点击修改按钮时候， 将当前的书籍信息传递进来，并且存储到变量editData
  }
  // 5.5 定义可以修改输入框的内容，和editData保持一致
  const handleChange = (e) => {
    setEidtData({...editData,[e.target.name]: e.target.value})
  }
  // 5.6  定义方法调用 修改数据的接口
    const updateBook = async () => {
    const res = await axios.put(
      `http://127.0.0.1/updateBook/${editData._id}`,
      { data: editData }
    );
    console.log(res);
    setShowChange(false); // 修改完成之后， 关闭弹窗
    getBooks(); // 修改完成之后， 重新调用获取数据接口

  };



  return (
    <div>
      <h1>该页面实现模拟请求后端的接口</h1>

      <button onClick={updateBook}>修改updateBook</button>
      <br />

      <hr />
      {/* ------------------------------------------------------------------------------- */}
      {/* 3.3 添加一个按钮控制弹窗的展示 */}
      <button onClick={() => setShowModal(true)}>点击展示新增弹窗</button>

      {/* 1. 完善获取数据接口的展示 */}
      <h2>渲染获取到的所有书籍</h2>
      {/* 1.4 将books里面的书籍信息循环遍历展示 */}
      {books.map((item, index) => (
        <div className="booklist" key={index}>
          <p>bookname:{item.name}</p>
          <p>author:{item.author}</p>
          <p>price:{item.price}</p>
          <button onClick={() => deleteBook(item._id)}>删除书籍</button>
          {/* 5.1 添加修改的按钮 */}
          <button onClick={() => handleEditClick(item)}>修改书籍</button>
        </div>
      ))}
      <hr />

      {/* 3.1  准备新增的弹窗结构 */}
      {showModal && (
        <div className="bgModal">
          <div className="addModal">
            <h2>新增书籍</h2>
            <input
              placeholder="书名"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="作者名"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}  
            />
            <input
              placeholder="价格"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <div className="btns">
              <button onClick={addBook}>确认</button>
              <button onClick={() => setShowModal(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. 查询相关的内容 */}
      <input
        type="text"
        placeholder="请输入查找的书籍名字"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={getBookByname}>点击搜索</button>
      <button onClick={clearSearch}>清空搜索结果</button>
      <h2>查询的书籍结果</h2>
      {/* 4.2 当查询书籍结果searchResult为空的时候，就让书籍展示的结构隐藏 */}
      {searchResult && (
        <div>
          <p>bookname:{searchResult.name}</p>
          <p>author:{searchResult.author}</p>
          <p>price:{searchResult.price}</p>
        </div>
      )}

      {/* 5.2 修改的弹窗内容 */}
      {showChange && (
        <div className="bgModal">
          <div className="changeModal">
            <h2>修改书籍</h2>
            <input name="name" value={editData.name} placeholder="书名" onChange={handleChange} />
            <input name="author" value={editData.author} placeholder="作者名字" onChange={handleChange}/>
            <input name="price" value={editData.price} placeholder="书籍价格" onChange={handleChange} />
            <div className="btns">
              <button onClick={updateBook}>确认</button>
              <button onClick={() => setShowChange(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
