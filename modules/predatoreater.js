var LivingCreature = require("./LivingCreature");
var random = require("./random.js");

module.exports = class PredatorEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 6;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(characterr) {
         this.getNewCoordinates();
         return super.chooseCell(characterr)
    }
    move() {
        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells)
        if (newCell && this.energy >= 0) {
            var newx = newCell[0]
            var newy = newCell[1]
            matrix[newy][newx] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }


    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newpredatoreater = new PredatorEater(newX, newY);
            predatorEaterArr.push(newpredatoreater);
            this.energy = 6;
        }

    }
    eat() {
        this.getNewCoordinates()
        var predatorCells = this.chooseCell(3)
        var newCell = random(predatorCells)
        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in predatorArr) {
                if (newX ==predatorArr[i].x && newY == predatorArr[i].y) {
                   predatorArr.splice(i, 1)
                    break
                }
            }
        } else {
            this.move()
        }

    }
    die() {
        matrix[this.y][this.x] = 0
        for (var j in predatorEaterArr) {
            if (this.x == predatorEaterArr[j].x && this.y == predatorEaterArr[j].y) {
                predatorEaterArr.splice(j, 1);
                break
            }
        }
    }

}
