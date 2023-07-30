const { GameEngine } = require('./gameengine.js');


const game = new GameEngine(parseInt(process.argv[2]),  // height
                            parseInt(process.argv[3]),  // width
                            parseInt(process.argv[4])); // percentage of holes [0-100]
game.startGame();