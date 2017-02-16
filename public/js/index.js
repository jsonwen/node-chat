var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Alice',
  //   text: 'hello'
  // });
});

socket.on('disconnect', function() {
  console.log('Server disconnected');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hello'
// }, function(response) {
//   console.log('Got it', response);
// });

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(response) {
    console.log('Got it', response);
  });
});