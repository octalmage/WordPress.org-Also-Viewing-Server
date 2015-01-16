var io = require('socket.io')(process.env.PORT || 5000);
var pages=[];
var users=[];

io.on('connect', function(socket)
{
	socket.on('pageopened', function(details)
 	{
    	console.log('username: ' + details.username);
    	console.log('page: ' + details.page);
    	console.log(socket.id);

    	if (typeof pages[details.page] == "undefined")
    	{
    		pages[details.page]=[];
    	}

    	users[socket.id]={};
    	users[socket.id].username=details.username;
    	users[socket.id].page=details.page;

    	if (pages[details.page].indexOf(details.username)==-1)
    	{
    		pages[details.page].push(details.username);
    		console.log(pages);
    		io.sockets.emit('userconnected', pages);
    	}
    	
  		
  	});

	socket.on('disconnect', function () 
    {
    	console.log(socket.id);
    	io.sockets.emit(users[socket.id].username);
  	});
});
