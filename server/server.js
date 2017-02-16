const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joins'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  io.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log('Server is up on port', port);
});