var net = require('net');
var buf = new Buffer(256);

var chatServer = net.createServer()
var clientList = [];
chatServer.on('connection', function(client) {
	
	clientList.push(client);
	client.username = client.remoteAddress + ':' + client.remotePort;
	
	console.log(client.username + ' comes into the chat room!\n');
	client.write(client.username + ': Welcom to the chat room!\n');
  client.on('data', function(data){
  	broadcast(data, client);
	});
	
	client.on('end', function() {
		clientList.splice(clientList.indexOf(client), 1);
		console.log(client.username + ' leaves this room!');
	});
	
	client.on('error', function(e) {
		console.log(e)
	});
})
chatServer.listen(9000, function(){
  console.log('chatServer listen on port 9000!');	
});

function broadcast(message, client) {
	var cleanup = [];
	for(var i=0;i<clientList.length;i+=1) {
		if(client !== clientList[i]) {
			if(clientList[i].writable) {
				clientList[i].write(client.username + " says: " + message)
			} else {
				cleanup.push(i);
				clientList[i].destroy();
			}
		}
	}
	//Remove dead Nodes out of write loop to avoid trashing loop index
	for(i=0;i<cleanup.length;i+=1) {
		clientList.splice(i, 1)
	}
}