//GET and POST APIs demonstration using native http methods without using express
const http = require('http');


http.createServer(function (req, res) {

    if (req.method === 'GET' && req.url === '/GET') {
        res.writeHead(200, { 'Content-type': 'text/plain' });
        res.write("hello world");
        res.end();
    }
    else if (req.method === 'POST' && req.url === '/POST') {
        let data = [];
        req.on('data', (chunk) => {
            data.push(chunk);
        }).on('end', () => {
            data = Buffer.concat(data).toString();
            let { name } = JSON.parse(data);
            res.writeHead(200, { 'Content-type': 'application/json' });
           let msg= JSON.stringify({message:"Hello "+name});
            res.end(msg);
        })
    }
    else {
        res.statusCode = 404;
        res.end("Not found");
    }

}).listen(3000);

