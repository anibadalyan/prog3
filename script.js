function setup(){
    var socket = io();
    var side = 30;
    var matrix = [];

let grassCountElement = ducument.getElementById('grassCount');
let grassEaterCountElement = ducument.getElementById('grassEaterCount');
let predatorCountElement = ducument.getElementById('predatorCount');
let predatorEaterCountElement = ducument.getElementById('predatorEaterCount');
let predatorEaterEaterCountElement = ducument.getElementById('predatorEaterEaterCount');
socket.on("data", draw);

function draw(data){
    matrix = data.matrix;
    grassCountElement.innerText = data.grassCounter;
    grassEaterCountElement.innerText = data.grassEaterCounter;
    predatorCountElement.innerText = data.predatorCounter;
    predatorEaterCountElement.innerText = data.predatorEaterCounter;
    predatorEaterEaterCountElement.innerText = data.predatorEaterEaterCounter;
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("white");
                rect(x * side, y * side, side, side);
            }
       else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }

}
}
