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
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,

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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
}


function changeHP(amount) {
    this.hp -= Math.ceil(Math.random()*amount);

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


function playerWin(player) {
    const $winTitle = createElement('div', 'winTitle')

    if (player) {
        $winTitle.innerText = player.name + ' win'
    } else {
        $winTitle.innerText = 'draw'
    }

    return $winTitle
}


$randomButton.addEventListener('click', function() {
        player1.changeHP(20)
        player1.renderHP()
        player2.changeHP(20)
        player2.renderHP()

        if ((player1.hp > 0)&&(player2.hp === 0)) {
            $arenas.appendChild(playerWin(player1))
        } else if ((player1.hp === 0)&&(player2.hp > 0)) {
            $arenas.appendChild(playerWin(player2))
        } else if ((player1.hp === 0)&&(player2.hp === 0)) {
            $arenas.appendChild(playerWin())
        }

        if (player1.hp === 0 || player2.hp === 0) {
            $randomButton.disabled = true
            $arenas.appendChild(createReloadButton())
        }
        
})


function createReloadButton() {
    const $reloadWrap = createElement('div','reloadWrap')
    const $reloadButton = createElement('button','button')

    $reloadButton.innerText = 'Restart'

    $reloadWrap.appendChild($reloadButton)

    $reloadButton.addEventListener('click', function(){
        window.location.reload()
    })

    return $reloadWrap
}


$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
