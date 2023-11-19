// socket.js
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.headers.cookie
    ?.split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("invalid_token"));
    }
  } else {
    next(new Error("unauthorized"));
  }
};

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8000",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    authenticateSocket(socket, next);
  });

  io.on("connection", (socket) => {
    socket.join(socket.userId);
    console.log(`User ${socket.userId} connected`);
    io.to(socket.userId).emit("user-connected", "hello user");
    socket.on("disconnect", () => {
      console.log(`User ${socket.userId} disconnected`);
      socket.leaveAll();
    });
    socket.on("ping", (data) => {
      console.log(data.data);
    });
  });

  return io;
};

module.exports = initializeSocket;
