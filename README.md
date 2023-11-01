# Real_Time-Chat-App

Creating a basic chat application using Socket.io involves both a server-side component (in Node.js) and a client-side component (usually in HTML and JavaScript). Below, I'll provide a simple example of how to create a chat app using Socket.io. This example assumes you have Node.js and npm installed.

Set up your project:

Create a project directory and navigate to it in your terminal:

bash
Copy code
mkdir chat-app
cd chat-app
Initialize a new Node.js project by running:

bash
Copy code
npm init -y
Install the required dependencies:

bash
Copy code
npm install express socket.io
Create server.js:

Create a server.js file in your project directory. This will be the server-side code for your chat app.

javascript
Copy code
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (message) => {
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
Create an HTML file (index.html):

Create an index.html file in the same directory as your server.js file:

html
Copy code
<!DOCTYPE html>
<html>
<head>
  <title>Socket.io Chat App</title>
</head>
<body>
  <ul id="messages"></ul>
  <input id="messageInput" autocomplete="off" /><button>Send</button>

  <script src="/socket.io/socket.io.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    const socket = io();

    $("form").submit(() => {
      socket.emit("chat message", $("#messageInput").val());
      $("#messageInput").val("");
      return false;
    });

    socket.on("chat message", (message) => {
      $("#messages").append($("<li>").text(message));
    });
  </script>
</body>
</html>
Run the server:

Start your Node.js server by running:

bash
Copy code
node server.js
Your chat app should now be running on http://localhost:3000.

Open the chat app in your browser:

Open a web browser and navigate to http://localhost:3000. You can open multiple tabs or browser windows to simulate multiple users. Enter a message in the chat input field, and you should see it displayed in real-time in all connected clients.

This is a basic example of a chat app using Socket.io. You can further enhance and style it as needed for your project.
