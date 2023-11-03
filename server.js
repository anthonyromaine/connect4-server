import { Server } from "socket.io";

const io = new Server(3000, { cors: {origin: "http://localhost:5173" } });
const players = {};

io.on("connection", (socket) => {
  players[socket.id] = {
    playerId: socket.id
  }
  console.log("client connected");
  socket.on('disconnect', function () {
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('player-disconnected', socket.id);
  });
});