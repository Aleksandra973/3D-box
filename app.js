/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('{"msg": "Hello World"}');
});

server.use('test', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('{"msg": "Hello World2"}');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});*/



const express = require('express')


const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.post('/calculate', (req, res) => {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
       let request = JSON.parse(data)
        console.log(request)
        res.send({
            "vertices": [
                [0,0,0],
                [request.length,0,0],
                [0, request.height, 0],
                [request.length, request.height, 0],
                [0, 0, request.width],
                [request.length, 0, request.width],
                [0, request.height, request.width],
                [request.length, request.height, request.width]],
            "faces": [

            ]})
    })
})

app.listen(3000, () => console.log('Listening...'))