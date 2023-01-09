import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../assets/loaderr.svg";
import { Buffer } from "buffer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {avatarRoute } from "../utils/APIRoutes";

const SetAvatar = () => {
  const api = `https://api.multiavatar.com/4699646`;
  const navigate = useNavigate();
  const [images, setimages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);
  const options = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  useEffect(() => {
    const check = async ()=>{
      const localData = await JSON.parse(localStorage.getItem("chatAppUser"));
      if(!localData){
        navigate('/login');
      }else if(localData.isAvatar){
        navigate('/');
      }
    }
    check();
  }, [])
  
  const setProfilePicture = async () => {    
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", options);
    } else {
      const localData = await JSON.parse(localStorage.getItem("chatAppUser"));
      const { data } = await axios.post(`${avatarRoute}/${localData._id}`, {
        image: images[selectedAvatar],
      });
      console.log(data)
      if (data.isAvatar) {
        localData.isAvatar = true;
        localData.avatarImage = data.user.avatarImage || images[selectedAvatar];
        localStorage.setItem("chatAppUser", JSON.stringify(localData));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", options);
      }
    }
  };
  useEffect(() => {
    const getImages = async () => {
      const data = [];
      for (let i = 0; i < 5; i++) {
        const avtar = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(avtar.data);
        data.push(buffer.toString("base64"));
      }
      // console.log(data);
      setimages(data);
      // console.log(images);
      setisLoading(false);
    };

    getImages();
  }, [api,images]);

  return isLoading ? (
    <Container>
      <img src={Loader} alt="" />
    </Container>
  ) : (
    <Container>
      <div className="title-container">
        <h1>Pick an Avatar as your profile picture</h1>
      </div>
      <div className="avatars">
        {images.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                key={avatar}
                onClick={() => {
                  setselectedAvatar(index);
                }}
              />
            </div>
          );
        })}
        <button className="submit-btn" onClick={setProfilePicture}>Set Your Avatar</button>
      </div>
      <ToastContainer/>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #F9ED69;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      background-color: #0F4C75;
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #0F4C75;
    }
  }
  .submit-btn {
    background-color: #A6E3E9;
    color:#0F4C75;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #71C9CE;
    }
  }
`;

export default SetAvatar;
