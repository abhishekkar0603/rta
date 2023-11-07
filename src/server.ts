import { PORT } from "./env";
import ExpressConfig from "./Express/app";
import http from "http";
import { Server } from "socket.io";

const app = ExpressConfig();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected on: " + socket.id);
  socket.on("message", (msg) => {
    console.log(msg);
  });
});

server.listen(PORT, () => console.log("Server Running on Port " + PORT));
