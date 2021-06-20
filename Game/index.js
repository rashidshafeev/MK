import {generateLogs} from '../logs.js'
import Player from '../Player/index.js'
import {HIT, ATTACK} from '../constants/index.js'
import {getRandom, createElement} from '../utils/index.js'

class Game {
    constructor(props) {
        this.player1 = props.player1
        this.player2 = props.player2
    }

    start = () => {
        const player1 = new Player(this.player1)

        // const player1 = new Player({
        //     player: 1,
        //     name: 'SUB-ZERO',
        //     hp: 100,
        //     img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        //     rootSelector: '.arenas',
        // })

        const player2 = new Player(this.player2)
        
        // const player2 = new Player({
        //     player: 2,
        //     name: 'KITANA',
        //     hp: 100,
        //     img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        //     rootSelector: '.arenas',
        // })

        const $formFight = document.querySelector('.control')
        const $arenas = document.querySelector('.arenas')

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

        player1.createPlayer()
        player2.createPlayer()

        generateLogs('start', player1, player2)

        $formFight.addEventListener('submit', function(e) {
            e.preventDefault()
        
            const enemy = enemyAttack()
        
            const attack = playerAttack()
        
            damageApply(enemy,attack)
        
            winCheck()
        })
    }

}

export default Game