import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styled from "./TableComponent.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../FormLogin/LoginForm";
import { AppContext } from "../../App";

const TableComponent = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/articles")
      .then((result) => {
        setArticles(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteArticle = (id) => {
    axios
      .delete(`http://localhost:8000/articles/${id}`)
      .then(() => {
        setArticles(articles.filter((article) => article.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { isLogin, setIsLogin } = useContext(AppContext);
  const {isDarkMode,setIsDarkMode}= useContext(AppContext)

  return (
    <>
      <div>
        {isLogin ? (
          <div className={isDarkMode ?`${styled.tablewrraper} ${styled.darkMode}`:styled.tablewrraper}>
            <div className={styled.tableForm}>
             <div>
             <a href="#"  className={styled.logOut} onClick={() => setIsLogin(false)}>
                LogOut
              </a>
              </div> 
              <div className={styled.add}>
                <h2>Index</h2>
                <button>
                  <Link to="/ArticleForm">+ ADD</Link>
                </button>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Content</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td>{article.title}</td>
                      <td>{article.author}</td>
                      <td>{article.content}</td>
                      <td>
                        {" "}
                        <button onClick={() => deleteArticle(article.id)}>
                          delete
                        </button>
                        <button>
                          <Link to={`EditArticle/${article.id}`}>Edit</Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </>
  );
};

export default TableComponent;
