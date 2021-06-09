const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

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
    const $playerLife = document.querySelector('.player' + this.player + ' .life')
    return $playerLife
}


function renderHP() {
    this.elHP().style.width = this.hp + '%'
}


function getRandom(amount) {
    return Math.ceil(Math.random()*amount);
}


function createElement(tag, className) {
    const $tag = document.createElement(tag)

    if (className) {
        $tag.classList.add(className)
    }

    return $tag
}


function createPlayer(playerInfo) {
    const $player = createElement('div', 'player' + playerInfo.player)
    const $progressbar = createElement('div','progressbar') 
    const $life = createElement('div','life') 
    const $name = createElement('div','name') 
    const $p = createElement('p')
    const $character = createElement('div','character')
    const $img = createElement('img')


    $life.style.width = (playerInfo.hp + '%')
    $p.innerText = playerInfo.name
    $img.src = playerInfo.img


    $progressbar.appendChild($life)
    $progressbar.appendChild($name)

    $name.appendChild($p)

    $character.appendChild($img)

    $player.appendChild($progressbar)
    $player.appendChild($character)

    return $player
}


function winCheck() {
    if ((player1.hp > 0)&&(player2.hp === 0)) {
        $arenas.appendChild(playerWin(player1))
    } else if ((player1.hp === 0)&&(player2.hp > 0)) {
        $arenas.appendChild(playerWin(player2))
    } else if ((player1.hp === 0)&&(player2.hp === 0)) {
        $arenas.appendChild(playerWin())
    }
}


function playerWin(player) {
    const $winTitle = createElement('div', 'winTitle')

    if (player) {
        $winTitle.innerText = player.name + ' win'
    } else {
        $winTitle.innerText = 'draw'
    }

    return $winTitle
}


function createReloadButton() {
    const $reloadWrap = createElement('div','reloadWrap')
    const $reloadButton = createElement('button','button')

    $reloadButton.innerText = 'Restart'

    $reloadWrap.appendChild($reloadButton)

    $reloadButton.addEventListener('click', function(){
        window.location.reload()
    })

    $arenas.appendChild($reloadWrap)
}


$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))


function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1]
    const defence = ATTACK[getRandom(3) - 1]

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function damageApply(enemyAttack, myAttack) {
        if (enemyAttack.hit != myAttack.defence) {
            player1.changeHP(enemyAttack.value)
            player1.renderHP()
        }

        if (myAttack.hit != enemyAttack.defence) {
            player2.changeHP(myAttack.value)
            player2.renderHP()
        }
}


$formFight.addEventListener('submit', function(e) {
    e.preventDefault()
    const enemy = enemyAttack()

    const attack = {}

    for (let item of $formFight) {
        if (item.checked && item.name ==='hit') {
            attack.value = getRandom(HIT[item.value])
            attack.hit = item.value
        }

        if (item.checked && item.name ==='defence') {
            attack.defence = item.value
        }

        item.checked = false
    }

    damageApply(enemy,attack)

    winCheck()

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.style.visibility = 'hidden'
        createReloadButton()
    }

})