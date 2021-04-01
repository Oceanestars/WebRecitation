console.log("server is starting now");
var express = require('express');
const http = require('http');
const app = express(); // Init for express
const port = process.env.PORT || 3000
const server = http.createServer(app); // Creation of an HTTP server
server.listen(port, () => console.log(`Server started on port ${port}...`))
app.use(express.static('src')); //host static files like img
