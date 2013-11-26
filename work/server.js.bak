var http = require('http');
var url = require('url');

http.createServer(function(request, response) {
var postData = "test";
var pathname = url.parse(request.url).pathname;

    request.on("end", function(test) {
    	console.log('end!');
    });

    request.on("data", function(chunk) {
        postData += chunk;
        console.log("Recived post data chunk '" + postData + "'.");
    });
    
    response.end('test!');
}).listen(8888);