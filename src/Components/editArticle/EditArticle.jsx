import { useContext, useState } from "react";
import styled from "./editArticle.module.css";
import axios from "axios";
import digitPhoto from "./../../assets/images/images.jpg";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppContext } from "../../App";
import LoginForm from "../FormLogin/LoginForm";
import { useNavigate } from "react-router-dom";

function EditArticle() {
  const [article, setArticle] = useState({
    title: "",
    author: "",
    tag: "",
    content: "",
  });

  const handelInput = (e) => {
    setArticle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/articles/${params.id}`)
      .then((result) => {
        console.log(result.data);

        setArticle(() => ({
          title: result.data.title,
          author: result.data.author,
          tag: result.data.tag,
          content: result.data.content,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/articles/${params.id}`, {
        title: article.title,
        author: article.author,
        tag: article.tag,
        content: article.content,
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
  const {isDarkMode,setIsDarkMode}=useContext(AppContext)

  return (
    <>
      <div>
        {isLogin ? (
          <div className={isDarkMode ?`${styled.editArticle} ${styled.darkMode}`:styled.editArticle}>
            <div className={styled.editArticleWrapper}>
              <div className={styled.logOut}>
                <button onClick={() => setIsLogin(false)}>Log Out</button>
              </div>

              <h1>Edit</h1>

              <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                  type="text"
                  name="title"
                  value={article.title}
                  onChange={handelInput}
                />
                <br />

                <label htmlFor="author"> author:</label>
                <br />
                <input
                  type="text"
                  name="author"
                  value={article.author}
                  onChange={handelInput}
                />
                <br />

                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                  name="content"
                  value={article.content}
                  onChange={handelInput}
                />
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
        )}
      </div>
    </>
  );
}

export default EditArticle;
