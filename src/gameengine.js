const { Field } = require('./field.js');


class GameEngine {
    static directions = {'r': [1, 0],
                         'l': [-1, 0],
                         'u': [0, -1],
                         'd': [0, 1]};
    
    constructor(height, width, percentage) {
        this.field = new Field(height, width, percentage);
        this.height = height;
        this.width = width;
        this.player = {
            x: 0,
            y: 0
        };
    }

    showWelcome() {
        this.print('Welcome to Find-Your-Hat!\n' +
            'You have to navigate through the field and reach the hat. ' +
            'But be aware of any holes!\n' +
            'To exit the game, simply type "quit".\n');
    }

    showInstructions() {
        this.print('Navigate through the field by typing one of ' +
            'l(eft), r(right), u(p), d(down).\n');
    }

    startGame() {
        this.showWelcome();
        this.showInstructions();
        this.nextRound();
        process.stdin.on('data', data => this.validateInput(data));
    }

    endGame() {
        process.exit();
    }

    nextRound() {
        this.print(this.field.toString());
        this.print('Where to go next? ');
    }

    validateInput(input) {
        input = input.toString().trim().toLowerCase();
        if (input === 'quit') {
            this.endGame();
        }
        if (Object.keys(GameEngine.directions).includes(input)) {
            this.move(input);
        } else {
            this.showInstructions();
        }
    }

    move(direction) {
        this.updatePlayer(direction);
        this.validateGameState();
        this.field.updatePath(this.player.x, this.player.y);
        this.nextRound();
    }

    updatePlayer(direction) {
        this.player.x += GameEngine.directions[direction][0];
        this.player.y += GameEngine.directions[direction][1];
    }

    validateGameState() {
        if (this.player.y < 0 || this.player.y >= this.height ||
            this.player.x < 0 || this.player.x >= this.width) {
            this.print('Ops! You fell off the field...\n');
            this.endGame();
        } else if (this.field.get(this.player.x, this.player.y) === Field.hole) {
            this.print('Ouch! You fell into a hole...\n');
            this.endGame();
        } else if (this.field.get(this.player.x, this.player.y) === Field.hat) {
            this.print('Congratulations! You found the hat!\n');
            this.endGame();
        }
    }

    print(msg) {
        process.stdout.write(msg);
    }
}

module.exports.GameEngine = GameEngine