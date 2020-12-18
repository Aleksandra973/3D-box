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

            /*
           6----7
          /|   /|
         2----3 |
         | |  | |
         | 4--|-5
         |/   |/
         0----1
      */

            "vertices": [
                [0, 0, request.width], //0
                [request.length, 0, request.width], //1
                [0, request.height, request.width], //2
                [request.length, request.height, request.width], //3
                [0, 0, 0], //4
                [request.length, 0, 0], //5
                [0, request.height, 0], //6
                [request.length, request.height, 0] //7
            ],
            "faces": [
                // front
                [0, 3, 2],
                [0, 1, 3],
                // right
                [1, 7, 3],
                [1, 5, 7],
                // back
                [5, 6, 7],
                [5, 4, 6],
                // left
                [4, 2, 6],
                [4, 0, 2],
                // top
                [2, 7, 6],
                [2, 3, 7],
                // bottom
                [4, 1, 0],
                [4, 5, 1]
            ]
        })
    })
})

app.listen(3000, () => console.log('Listening...'))