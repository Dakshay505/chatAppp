const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path:"config.env"});
const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')
const socket = require('socket.io');
const app = express();
const cors = require("cors")
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('server of database is conneted');
}).catch((err)=>{
    console.log(err);
})
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoute);
app.use("/api/msg",messageRoute);


const server = app.listen(parseInt(process.env.PORT),()=>{
    console.log('server is working .');
});

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
});
  
socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
});