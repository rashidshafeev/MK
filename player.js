const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Kunai','Sai'],
    attack: function() {
        console.log(player1.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHP,

}

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Kunai','Sai'],
    attack: function() {
        console.log(player2.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHP,
}

function changeHP(amount) {
    this.hp -= amount;

    if (this.hp < 0) {
        this.hp = 0
    }
}


function elHP() {
    const $playerLife = document.querySelector(`.player${this.player} .life`)
    return $playerLife
}


function renderHP() {
    this.elHP().style.width = `${this.hp}%`
}

export {player1, player2}