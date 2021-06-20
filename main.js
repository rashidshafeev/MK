import Game from './Game/index.js'

const game = new Game({
    player1: {
        player: 1,
        name: 'SUB-ZERO',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        rootSelector: '.arenas',
    },
    player2: {
        player: 2,
        name: 'KITANA',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        rootSelector: '.arenas',
    }
})

game.start()