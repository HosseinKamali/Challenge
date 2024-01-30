import styled from "./RegistrationForm.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'

function RegistrationForm() {
  const schema = yup.object().shape({
    email : yup.string().email().required(),
    password: yup.string().min(4).max(12).required().matches(/[A-Z]+/).matches(/[a-z]+/).matches(/\d+/),
    confirmPasword: yup.string().oneOf([yup.ref("password")]).required()
  });
  const onFormSubmit = () => {
    console.log("sent form");
  };

  const { register, handleSubmit , formState : {errors} } = useForm({resolver : yupResolver(schema)});

  return (
    <div className={styled.registerForm}>
      <div className={styled.registerBackGround}>
        <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <label>Email:</label>
            <br />
            <input type="email" placeholder="Enter Email" {...register("email")}/>
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <label>Password:</label>
            <br />
            <input type="password" placeholder="Enter password" {...register("password")}/>
            <p>{errors.password?.message}</p>
          </div>
          <div>
            <label>Confirm Password:</label>
            <br />
            <input type="confirmPassword"  placeholder="confirmPasword" {...register("confirmPasword")}/>
            <p>{errors.confirmPasword?.message}</p>
          </div>
          
          <button type="submit">Sign Up</button>
          <p>
            Aready have an account ? <Link to="/Login">Login</Link>
          </p>
        </form>
        </div>
       
      </div>
    </div>
  );
}

export default RegistrationForm;
