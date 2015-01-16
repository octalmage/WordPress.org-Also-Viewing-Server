var io = require('socket.io')(process.env.PORT || 5000);


io.on('connect', function(socket)
{
	socket.on('pageopened', function(details)
 	{
    	console.log('username: ' + details.username);
  		io.sockets.emit('userconnected', { my: 'data' });
  	});

	socket.on('disconnect', function () 
    {
    	io.sockets.emit('user disconnected');
  	});
});
