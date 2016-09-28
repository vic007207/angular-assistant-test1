var http = require('http');
var url = require("url");
var mysql = require('mysql');

var server = http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;

  response.writeHead(200, {
            'Content-Type': 'text/plain'
        });

  response.write("Hello World");
  response.end();
});
server.listen(8080);
console.log("Server running at http://127.0.0.1:8080/");