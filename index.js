var io = require('socket.io')(process.env.PORT || 5000);


io.on('connection', function(socket)
{
  socket.on('pageopened', function(details)
  {
    console.log('username: ' + details.username);
  });
});
