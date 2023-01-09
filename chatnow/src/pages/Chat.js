import axios from 'axios';
import styled from "styled-components";
import { io } from "socket.io-client";
import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { allUsers ,host } from '../utils/APIRoutes';
import Contact from '../components/Contact'
import Welcome from '../components/Welcome.js'
import ChatContainer from '../components/ChatContainer.js'

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setcontacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(()=>{
   async function getUser(){
    if(!localStorage.getItem('chatAppUser')){
      navigate('/login');
    }else{
       const userData =await JSON.parse(localStorage.getItem("chatAppUser"));
       setcurrentUser(userData);
       setisLoaded(true);
    }
  }
  getUser();
  },[navigate])
  // setting value in global
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  
  useEffect(()=>{
   async function getData(){

    if(currentUser){
    if(currentUser.isAvatar){
     const {data}=await axios.get(`${allUsers}/${currentUser._id}`);
     setcontacts(data.users);
    }else{
      navigate('/setavatar');
    }
   }
   };
   getData();
  },[navigate,currentUser])
  const handleChangeChat = (chat)=>{
     setcurrentChat(chat);
  }
  return (
      <Container>
        <div className='container'>
            <Contact
             contacts={contacts}
             changeChat ={handleChangeChat}
             />
            {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser}/>
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )}
        </div> 
     
    </Container>
    )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #F9ED69;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat