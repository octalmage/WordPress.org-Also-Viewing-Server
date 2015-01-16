var io = require('socket.io')(process.env.PORT || 5000);

var pages=[];

io.on('connect', function(socket)
{
	socket.on('pageopened', function(details)
 	{
    	console.log('username: ' + details.username);
    	//console.log('page: ' + details.page);
    	//console.log(socket.id);

 		details.socket=socket.id;
 		if (typeof pages[details.page] == "undefined")
 		{
 			pages[details.page]=[];
 		}
    	pages[details.page].push({username: details.username, page: details.page, socket: socket.id });
    	io.sockets.emit(details.page, pages[details.page]);
    	
  		
  	});

	socket.on('disconnect', function () 
    {
    	console.log("disconnected.");
    	console.log(pages);
    	for (x in pages)
    	{
    		for (y in pages[x])
    		{
    			if (pages[x][y].socket==socket.id)
    			{
    				console.log("disconnect: " + pages[x][y].username);
    				pages[x].splice(y, 1);
    				io.sockets.emit(x, pages[x]);

    			}
    		}

    	}
  	});
});
