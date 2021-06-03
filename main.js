const player1 = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Kunai','Sai'],
    attack: function() {
        console.log(player1.name + 'Fight...')
    }
}

const player2 = {
    name: 'KITANA',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Kunai','Sai'],
    attack: function() {
        console.log(player2.name + 'Fight...')
    }
}

function createPlayer(playerName, playerInfo) {

    const $player = document.createElement('div')
    $player.classList.add(playerName)

    const $arenas = document.querySelector('.arenas')
    $arenas.appendChild($player)


    const $progressbar = document.createElement('div') 
    $progressbar.classList.add('progressbar')

    const $life = document.createElement('div') 
    $life.classList.add('life')
    $life.style.width = (playerInfo.hp + '%')

    const $name = document.createElement('div') 
    $name.classList.add('name')

    const $p = document.createElement('p')
    $p.innerText = playerInfo.name

    $name.appendChild($p)

    $progressbar.appendChild($life)
    $progressbar.appendChild($name)


    const $character = document.createElement('div') 
    $character.classList.add('character')

    const $img = document.createElement('img')
    $img.src = playerInfo.img

    $character.appendChild($img)


    $player.appendChild($progressbar)
    $player.appendChild($character)

}

createPlayer('player1', player1)
createPlayer('player2', player2)