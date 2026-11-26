const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, 'public')));

// salas: code -> Set de socket ids (máx 2)
const rooms = new Map();

function roomSize(code) {
  return rooms.has(code) ? rooms.get(code).size : 0;
}

io.on('connection', (socket) => {
  let currentRoom = null;
  let currentName = 'Convidado';

  socket.on('join-room', ({ room, name }, callback) => {
    room = String(room || '').trim().toUpperCase();
    name = String(name || 'Convidado').trim().slice(0, 30) || 'Convidado';
    if (!room) return callback && callback({ ok: false, error: 'Código de sala inválido.' });
    if (roomSize(room) >= 2) return callback && callback({ ok: false, error: 'Esta sala já está cheia (máximo 2 pessoas).' });

    currentRoom = room;
    currentName = name;
    if (!rooms.has(room)) rooms.set(room, new Set());
    const isFirst = rooms.get(room).size === 0;
    rooms.get(room).add(socket.id);
    socket.join(room);

    callback && callback({ ok: true, isFirst, peers: rooms.get(room).size });
    // avisa quem já estava
    socket.to(room).emit('user-joined', { name, id: socket.id });
  });

  // Sinalização WebRTC — repassa apenas para a outra pessoa da sala
  const relay = (event) => (payload) => {
    if (currentRoom) socket.to(currentRoom).emit(event, payload);
  };
  socket.on('offer', relay('offer'));
  socket.on('answer', relay('answer'));
  socket.on('ice-candidate', relay('ice-candidate'));

  socket.on('chat-message', (payload) => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('chat-message', {
      name: currentName,
      text: String(payload?.text || '').slice(0, 1000),
      time: Date.now(),
    });
  });

  socket.on('reaction', (payload) => {
    if (currentRoom) socket.to(currentRoom).emit('reaction', { emoji: String(payload?.emoji || '🔥').slice(0,8), name: currentName });
  });

  socket.on('media-state', (state) => {
    if (currentRoom) socket.to(currentRoom).emit('media-state', state);
  });

  socket.on('disconnect', () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(socket.id);
      if (rooms.get(currentRoom).size === 0) rooms.delete(currentRoom);
      socket.to(currentRoom).emit('user-left', { name: currentName });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`🤝 NósDois rodando em http://0.0.0.0:${PORT}`));
