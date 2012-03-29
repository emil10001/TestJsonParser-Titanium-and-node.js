var http = require('http');

var resp_obj = {
  "title"       : "test title",
  "content"     : "response body\nline2",
  "sub_obj"     : {
    "sub_title"   : "test subtitle",
    "sub_content" : "sub response body",
  }
};

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(resp_obj));
    console.log('request made');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
