import styled from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
import axios from "axios";
import { useContext, useState} from "react";
import { AppContext } from "../../App";


function LoginForm() {
  const schema = yup.object().shape({
    email : yup.string().email().required(),
    password : yup.string().min(4).max(12).required().matches(/[a-z]+/).matches(/[A-Z]+/).matches(/\d+/),
  })
  const { register, handleSubmit, formState:{errors} } = useForm({resolver : yupResolver(schema)});

  const onFormSubmit = (data) => {
   
   axios.post('http://localhost:8000/articles',{
    email:data.email,
    password:data.password
   }).then(result => console.log(result.data)).catch(error => console.error(error))
 
  };
  
  const {isLogin,setIsLogin}=useContext(AppContext)
  const {isDarkMode}=useContext(AppContext)

 return (
    <>
   
   <div className={isDarkMode ? `${styled.loginForm} ${styled.darkMode}` : styled.loginForm}>
        <div className={styled.loginBackGround}>
          <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" id="email" placeholder="Enter Email" {...register("email")}/>
              <p>{errors.email?.message}</p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" id="password" placeholder="Enter Password" {...register("password")}/>
              <p>{errors.password?.message}</p>
            </div>
            
              <button type="submit" onClick={()=>setIsLogin(true)}>
                Login
              </button>
            
            <p>
              Don't have an account? <Link to="/Registration"> Register</Link>
            </p>
          </form>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default LoginForm;
