const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/forMsg");
const { getcurrentuser, joinuser,leaveRoom,getRoomUsers } = require("./utils/users");

const app = express();
const chatbot = "Chat bot";
const server = http.createServer(app);

const io = socketio(server);
//setting static folder
app.use(express.static(path.join(__dirname, "public")));
//when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = joinuser(socket.id, username, room);
    console.log("room", room);
    socket.join(user.room);

    console.log("new connection....");
    //welcome message for connected user
    socket.emit("message", formatMessage(chatbot, "welcome to chatchord"));

    //send rooms and users for user
io.to(user.room).emit("roomUsers",{room:user.room,
users:getRoomUsers(user.room)
})
    //acnowledged to every one about new user except current user
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(chatbot, `${user.username} has joined the chat`)
      );
  });

  //listen for chat messages
  socket.on("chatMessage", (msg) => {
      const user=getcurrentuser(socket.id)
    //   console.log(msg)
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //acnowledge every on when user disconnects
  socket.on("disconnect", () => {
      const user=leaveRoom(socket.id)
      if(user){
          io.to(user.room).emit("message", formatMessage(chatbot, `${user.username} has left the chat`));
          //send rooms and users for user
io.to(user.room).emit("roomUsers",{room:user.room,
    users:getRoomUsers(user.room)
    })
      }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
