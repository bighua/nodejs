﻿var http = require('http');
var url = require('url');

var opts = {
host: 'localhost',
port: 8080,
path: '/send',
method: 'POST',
headers: {'content-type':'application/x-www-form-urlencoded'}
}
var req = http.request(opts, function(res) {
res.setEncoding('utf8')
var data = ""
res.on('data', function(d) {
data += d
})
res.on('end', function() {
console.log(data);
})
})
req.write('tweet=test');
req.write('tweet=test123');
req.end();