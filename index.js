console.log("welcome to server");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require("./config/db-config");
const Group = require("./models/group.js");

app.set("view engine", "ejs");

//setting the express middlewares to get the reqeust body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("A  new user connected");
  socket.on("disconnect", (socket) => {
    console.log("A user has disconnected");
  });

  socket.on("join_room", (data) => {
    console.log("Joining a room ", data.roomid);
    socket.join(data.roomid);
  });

  socket.on("new_msg", (data) => {
    // console.log("data is ", data);
    io.to(data.roomid).emit("msg_rcvd", data);
  });
});

app.get("/chat/:roomid/:user", async (req, res) => {
  res.render("index", { roomid: req.params.roomid, user: req.params.user });
});

app.get("/group", async (req, res) => {
  res.render("group");
});

app.post("/group", async (req, res) => {
  console.log(req.body);
  await Group.create({
    name: req.body.name,
  });
  res.redirect("/group");
});

server.listen(3001, async () => {
  console.log("listening on port 3000");
  await connect();
  console.log("DB connected");
});
