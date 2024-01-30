import React, { createContext, useState } from "react";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import LoginForm from "./Components/FormLogin/LoginForm";
import TableComponent from "./Components/TableComponent/TableComponent";
import ArticleForm from "./Components/ArticleForm/ArticleForm";
import {Routes, Route } from "react-router-dom";
import EditArticle from "./Components/editArticle/EditArticle";
import NavBar from "./Components/navBar/NavBar";


export const AppContext = createContext(null)

function App(){

  const [isLogin,setIsLogin]= useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

 

  return(
<>

<AppContext.Provider value={{isLogin,setIsLogin,isDarkMode,setIsDarkMode}}>
  <div>
 <NavBar/>
  <Routes>
    <Route path="/" element={<TableComponent/>}/>
    <Route path="/Login" element={<LoginForm/>}/>
    <Route path="/Registration" element={<RegistrationForm/>}/>
    <Route path="/ArticleForm" element={<ArticleForm/>}/>
    <Route path="/EditArticle/:id" element={<EditArticle/>}/> 
    



</Routes> 
  
  </div>
 

</AppContext.Provider>


</>
  )
}
export default App;