var socket = io();

function scrollToBottom() {
  // Selectors
  var $messages = $('#messages');
  var $newMessage = $messages.children('li:last-child');
  // Heights
  var clientHeight = $messages.prop('clientHeight');
  var scrollTop = $messages.prop('scrollTop');
  var scrollHeight = $messages.prop('scrollHeight');
  var newMessagesHeight = $newMessage.innerHeight();
  var lastMessageHeight = $newMessage.prev().innerHeight();

  // Scroll at bottom if the client is bottom or near bottom
  if (clientHeight + scrollTop + newMessagesHeight + lastMessageHeight >= scrollHeight) {
    $messages.scrollTop(scrollHeight);
    console.log('Should scroll');
  }
}

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
  var formattedTime = moment(message.createdAt).format('h:mma');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mma');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hello'
// }, function(response) {
//   console.log('Got it', response);
// });

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var $messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: $messageTextBox.val()
  }, function(response) {
    $messageTextBox.val('');
    $messageTextBox.focus();
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not support by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});