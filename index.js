var io = require('socket.io')(process.env.PORT || 5000);

var pages=[];

io.on('connect', function(socket)
{
	socket.on('pageopened', function(details)
	{
		details.socket=socket.id;

		if (typeof pages[details.page] === "undefined")
		{
			pages[details.page]=[];
		}

		pages[details.page].push({username: details.username, page: details.page, socket: socket.id});

		io.sockets.emit(details.page, pages[details.page]);
	});

	socket.on('disconnect', function()
	{
		for (var x in pages)
		{
			for (var y in pages[x])
			{
				if (pages[x][y].socket === socket.id)
				{
					pages[x].splice(y, 1);
					io.sockets.emit(x, pages[x]);
				}
			}
		}
	});
});
