import {getRandom, createElement} from './utils.js'
import {player1, player2} from './player.js'
import {generateLogs} from './logs.js'
import {enemyAttack, playerAttack, damageApply} from './fightlogic.js'
import {winCheck, $arenas, $formFight} from './wincheck.js'

function createPlayer(playerInfo) {
    const $player = createElement('div', `player${playerInfo.player}`)
    const $progressbar = createElement('div','progressbar') 
    const $life = createElement('div','life') 
    const $name = createElement('div','name') 
    const $p = createElement('p')
    const $character = createElement('div','character')
    const $img = createElement('img')


    $life.style.width = (`${playerInfo.hp}%`)
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

$formFight.addEventListener('submit', function(e) {
    e.preventDefault()

    const enemy = enemyAttack()

    const attack = playerAttack()

    damageApply(enemy,attack)

    winCheck()
})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
generateLogs('start', player1, player2)