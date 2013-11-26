var http = require('http');
var server = http.createServer(function(req,res) {
	res.writeHead(200, {});
	res.end('response');
	console.log('request event 1');
	badLoggingCall('sent response');
	console.log('sent response');
});
process.on('uncaughtException', function(e) {
console.log(e);
});
server.on('request', function(req, res){
	console.log('request event 2');
	});
server.listen(8080);