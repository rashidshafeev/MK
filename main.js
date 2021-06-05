const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')

const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Kunai','Sai'],
    attack: function() {
        console.log(player1.name + 'Fight...')
    }
}

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Kunai','Sai'],
    attack: function() {
        console.log(player2.name + 'Fight...')
    }
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

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life')
    player.hp -= Math.ceil(Math.random()*20);

    if (player.hp < 0) {
        player.hp = 0
    }
    console.log(player.hp)

    $playerLife.style.width = player.hp + '%'
}

function playerLose(player) {
    const $loseTitle = createElement('div', 'loseTitle')

    if (player) {
        $loseTitle.innerText = player.name + ' win'
    } else {
        $loseTitle.innerText = 'draw'
    }

    $randomButton.disabled = true

    return $loseTitle
}

$randomButton.addEventListener('click', function() {
        changeHP(player1)
        changeHP(player2)

        if ((player1.hp > 0)&&(player2.hp == 0)) {
            $arenas.appendChild(playerLose(player1))
        } else if ((player1.hp == 0)&&(player2.hp > 0)) {
            $arenas.appendChild(playerLose(player2))
        } else if ((player1.hp == 0)&&(player2.hp == 0)) {
            $arenas.appendChild(playerLose())
        }
})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))