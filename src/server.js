require("dotenv").config();

const http = require("http");
const app = require("./app");

const Socket = require("socket.io");
const socket = require("./socket");

const server = http.createServer(app);

const io = Socket(server);
socket(io);

server.listen(process.env.PORT, () => {
  console.log("running server at", process.env.PORT);
});
