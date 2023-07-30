class Field {
    static hat = '^';
    static hole = 'O';
    static fieldCharacter = '░';
    static pathCharacter = '*';

    constructor(height, width, percentage) {
        this.field = this.generateField(height, width, percentage);
    }

    get(x, y) {
        return this.field[y][x];
    }

    set(x, y, char) {
        this.field[y][x] = char;
    }

    updatePath(x, y) {
        this.set(x, y, Field.pathCharacter);
    }

    generateField(height, width, percentage) {
        const field = new Array(height);
        for (let i = 0; i < height; i++) {
            field[i] = new Array(width).fill(Field.fieldCharacter);
        }
        let numHoles = Math.round(height * width * (percentage/100));
        // number of holes has to be in range [0, height*width-2]
        // because two cells are reserved for hat and starting position
        numHoles = Math.max(0, Math.min(numHoles, height * width - 2));
        field[0][0] = Field.pathCharacter;
        this.fillField(field, height, width, Field.hat, 1);
        this.fillField(field, height, width, Field.hole, numHoles);
        return field;
    }

    fillField(field, height, width, char, n) {
        // generate random (x,y) coordinates n times
        while (n > 0) {
            let y = Math.floor(Math.random() * height);
            let x = Math.floor(Math.random() * width);
            // Only fill if the cell at (x,y) is a field character (i.e. empty)
            if (field[y][x] === Field.fieldCharacter) {
                field[y][x] = char;
                n--;
            }
        }
    }

    toString() {
        let str = '';
        for (let i = 0; i < this.field.length; i++) {
            str += this.field[i].join('') + '\n'
        }
        return str
    }
}

module.exports.Field = Field