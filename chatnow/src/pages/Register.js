import React, {useEffect, useState } from 'react';
import styled from "styled-components";
import Logo from "../assets/logo1.svg";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/APIRoutes';
const Register = () => {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    userName:"",
    userEmail:"",
    userPassword:"",
    confirmPassword:""
  })
  useEffect(() => {
    if(localStorage.getItem('chatAppUser')){
      navigate('/');
    }
  }, [navigate])
  

  const submitHandler = async (e)=>{
      e.preventDefault();
      if(handleValidation()){
        const {userName,userEmail,userPassword} = values;
        const {data} = await axios.post(registerRoute,{
          userName,userEmail,userPassword
        });
        if(data.status === false){
          toast(data.message , options)
        }
        if(data.status === true){
          localStorage.setItem('chatAppUser',JSON.stringify(data.user))
          toast(data.message , options)
          navigate('/');
        }
      }
      
  }
  const options ={
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  }
 
  const handleValidation = ()=>{
    const {userName,userEmail,userPassword,confirmPassword} = values;
    if(userPassword!==confirmPassword){
      toast(`Value of confirm password didn't match try again.` ,options)
      return false;
    }
    else if(userName.length<=3){
      toast(`User name should be greater than 3 characters.` ,options)
      return false;
    }else if(userPassword.length<8){
      toast(`Password should be greater than 8 characters.` ,options)
      return false;
    }else if(userEmail===""){
      toast(`Enter a valid mail.` ,options)
      return false;
    }
    return true;
   
  }
  const changeHandler =(e)=>{
    e.preventDefault();
    setvalues({...values,[e.target.name]:e.target.value})
  }
  return (
      <FormContainer>
        <form onSubmit={(e)=>submitHandler(e)}>
         <div className='brand'>
         <img src={Logo} alt="logo" />
         <h1>HereYouGo</h1>
         </div>
         <input type="text" placeholder='Name' name='userName' onChange={(e)=>changeHandler(e)} />
         <input type="email" placeholder='Email' name='userEmail' onChange={(e)=>changeHandler(e)} />
         <input type="password" placeholder='Password' name='userPassword' onChange={(e)=>changeHandler(e)} />
         <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e)=>changeHandler(e)} />
         <button type='submit'>Create new user</button>
         <span>Already a User ? <Link to="/login">Login.</Link></span>
        </form>
        <ToastContainer />
      </FormContainer>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #F9ED69;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #0F4C75;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #3F72AF;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #112D4E;
      outline: none;
    }
  }
  button {
    background-color: #A6E3E9;
    color: #0F4C75;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    transition:.5s;
    text-transform: uppercase;
    &:hover {
      background-color: #71C9CE;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #1B262C;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register