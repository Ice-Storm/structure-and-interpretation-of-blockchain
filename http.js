var http = require('http');

http.createServer(function (request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Hello World");
  console.log(request.headers)
  
  response.end();
}).listen(8080, '0.0.0.0');

console.log('Server running on port 8080.');

// // 另一种写法
// function onRequest(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello World");
//   response.end();
// }

// http.createServer(onRequest).listen(8080);