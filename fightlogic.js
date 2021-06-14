import {getRandom} from './utils.js'
import {player1, player2} from './player.js'
import {generateLogs} from './logs.js'

const $formFight = document.querySelector('.control')

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1]
    const defence = ATTACK[getRandom(3) - 1]

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}


function playerAttack() {
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

    return attack
}


function damageApply(enemyAttack, playerAttack) {
        if (enemyAttack.hit !== playerAttack.defence) {
            player1.changeHP(enemyAttack.value)
            player1.renderHP()
            generateLogs('hit', player2, player1, enemyAttack.value)
        } else {
            generateLogs('defence', player1, player2)
        }

        if (playerAttack.hit !== enemyAttack.defence) {
            player2.changeHP(playerAttack.value)
            player2.renderHP()
            generateLogs('hit', player1, player2, playerAttack.value)
        } else {
            generateLogs('defence', player2, player1)
        }
}

export {enemyAttack, playerAttack, damageApply}