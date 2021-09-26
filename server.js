var Grass = require( "./modules/grass.js");
var GrassEater = require("./modules/grasseater.js");
var Predator = require("./modules/predator.js");
var PredatorEater = require("./modules/predatoreater.js");
var PredatorEaterEater = require("./modules/predatoreatereater.js");
let random = require('./modules/random');
matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
predatorEaterArr = [];
predatorEaterEaterArr = [];

grassCount = 0;
grassEaterCount = 0;
predatorCount = 0;
predatorEaterCount = 0;
predatorEaterEaterCount = 0;

function matrixGenerator(matrixSize, grass, grassEater, predator, predatorEater, predatorEaterEater) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < predatorEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < predatorEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 1, 1, 1, 1);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function creatingObjects() {

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                // var emptyCells = gr.chooseCell(0)
                grassArr.push(gr);
                grassCount++;
            }
            else if (matrix[y][x] == 2) {
                var grr = new GrassEater(x, y);
                grassEaterArr.push(grr);
                grassEaterCount++
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y);
                predatorArr.push(pred);
                predatorCount++
            }
            else if (matrix[y][x] == 4) {
                var predeat = new PredatorEater(x, y);
                predatorEaterArr.push(predeat);
                predatorEaterCount++
            }
            else if (matrix[y][x] == 5) {
                var predeatereater = new PredatorEaterEater(x, y);
                predatorEaterEaterArr.push(predeatereater);
                predatorEaterEaterCount++
            }
        }

    }
}



creatingObjects();
function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var o in grassEaterArr) {
            grassEaterArr[o].mul();
            grassEaterArr[o].eat();

        }

    }
    if (predatorArr[0] !== undefined) {
        for (var j in predatorArr) {
            predatorArr[j].mul();
            predatorArr[j].eat();

        }
    }
    if (predatorEaterArr[0] !== undefined) {
        for (var p in predatorEaterArr) {
            predatorEaterArr[p].mul();
            predatorEaterArr[p].eat();

        }
    }
    if (predatorEaterEaterArr[0] !== undefined) {
        for (var h in predatorEaterEaterArr) {
            predatorEaterEateArr[h].mul();
            predatorEaterEateArr[h].eat();


        }
    }

    let sendData = {
        matrix:matrix,
        grassCounter:grassCount,
        grassEaterCounter:grassEaterCount,
        predatorCounter:predatorCount,
        predatorEaterCounter:predatorEaterCount,
        predatorEaterEaterCounter:predatorEaterEaterCount,


    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000);