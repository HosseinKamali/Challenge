import React, { useContext, useState } from "react";
import styled from "./ArticleForm.module.css";

import axios from "axios";
import { AppContext } from "../../App";
import LoginForm from "../FormLogin/LoginForm";
import { useNavigate } from "react-router-dom";

function ArticleForm() {
  const [article, setArticle] = useState({
    title: "",
    author: "",
    content: "",
    tag: "",
  });

  const handelInput = (e) => {
    setArticle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/articles", {
        title: article.title,
        author: article.author,
        content: article.content,
        tag: article.tag,
      })
      .then((response) => {
        navigate("/");

        console.log("Article created successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error creating article:", error);
      });
  };
  const { isLogin, setIsLogin } = useContext(AppContext);
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);

  return (
    <>
      <div>
        {isLogin ? (
          <div className={isDarkMode ? `${styled.newArticle} ${styled.darkMode}`:styled.newArticle}>
            <div className={styled.newArticleWrapper}>
              <div className={styled.logOut}>
                <button onClick={() => setIsLogin(false)}>Log Out</button>
              </div>

              <h2>New Article</h2>

              <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <br />
                <input type="text" name="title" onChange={handelInput} />
                <br />

                <label htmlFor="author">author:</label>
                <br />
                <input type="text" name="author" onChange={handelInput} />
                <br />

                <label htmlFor="content">Content:</label>
                <br />
                <textarea name="content" onChange={handelInput} />
                <br />

                <label htmlFor="tags">Choose a tag:</label>
                <br />
                <select name="tag" onChange={handelInput}>
                  <option value="tag1">Tag1</option>
                  <option value="tag2">Tag2</option>
                </select>
                <br />

                <button type="submit">Create</button>
              </form>
            </div>
          </div>
        ) : (
          <LoginForm />
        )}{" "}
      </div>
    </>
  );
}

export default ArticleForm;
