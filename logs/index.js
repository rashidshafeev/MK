import {getRandom} from '../utils/index.js'
import {LOGS} from '../constants/index.js'
const $chat = document.querySelector('.chat')


function generateLogs(type, player1, player2, damage) {
    let text
    switch (type) {
        case 'start':
            text = LOGS[type]
                .replace('[time]',`${getTime()}`)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name)
            break
        case 'end':
            text = LOGS[type][getRandom(LOGS[type].length) - 1]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name)
            break
        case 'draw':
            text = LOGS[type]
            break
        case 'hit':
            text = `${getTime()} - ${LOGS[type][getRandom(LOGS[type].length) - 1]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name)} -${damage} [${player2.hp}/100]`
            break
        case 'defence':
            text = `${getTime()} - ${LOGS[type][getRandom(LOGS[type].length) - 1]
                .replace('[playerKick]', player2.name)
                .replace('[playerDefence]', player1.name)}`
            break
        default:
            break
    }
    const el = `<p>${text}</p>`
    
    $chat.insertAdjacentHTML('afterbegin', el)
}

function getTime() {
    const date = new Date()
    let hours, minutes

    if (date.getHours() < 10) {
        hours = `0${date.getHours()}`
    } else {
        hours = `${date.getHours()}`
    }

    if (date.getMinutes() < 10) {
        minutes = `0${date.getMinutes()}`
    } else {
        minutes = `${date.getMinutes()}`
    }
    const time = `${hours}:${minutes}`
    return time
}

export {generateLogs}