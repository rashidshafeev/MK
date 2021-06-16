import {player1, player2} from './player.js'
import {createElement} from './utils.js'
import {generateLogs} from './logs.js'

const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')

function winCheck() {
    if ((player1.hp > 0)&&(player2.hp === 0)) {
        $arenas.appendChild(playerWin(player1))
        generateLogs('end', player1, player2)
    } else if ((player1.hp === 0)&&(player2.hp > 0)) {
        $arenas.appendChild(playerWin(player2))
        generateLogs('end', player2, player1)
    } else if ((player1.hp === 0)&&(player2.hp === 0)) {
        $arenas.appendChild(playerWin())
        generateLogs('draw')
    }

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.style.display = 'none'
        createReloadButton()
    }
}


function playerWin(player) {
    const $winTitle = createElement('div', 'winTitle')

    if (player) {
        $winTitle.innerText = `${player.name} win`
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

export {winCheck, $arenas, $formFight}