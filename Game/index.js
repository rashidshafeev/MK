import {generateLogs} from '../logs/index.js'
import Player from '../Player/index.js'
import {HIT, ATTACK} from '../constants/index.js'
import {getRandom, createElement} from '../utils/index.js'

async function getRandomPlayer() {
    const q = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
    return q
}

class Game {
    constructor(props) {
        this.$arenas = document.querySelector('.arenas')
        this.$formFight = document.querySelector('.control')
    }

    start = async () => {

        this.player1 = new Player({
            ...JSON.parse(localStorage.getItem('player1')),
            player: 1,
            rootSelector: '.arenas',
        })

        this.player2 = new Player({
            ...await this.getRandomPlayer(),
            player: 2,
            rootSelector: '.arenas',
        })

        this.player1.createPlayer()
        this.player2.createPlayer()

        generateLogs('start', this.player1, this.player2)

        this.$formFight.addEventListener('submit', async (e) => {
            e.preventDefault()
        
            const attack = this.playerAttack()
            const attackInfo = await this.getAttackInfo(attack.hit, attack.defence)

            this.damageApply(attackInfo)
            this.winCheck()
        })
    }
    
    getAttackInfo = async (hit, defence) => {
            const attackInfo = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                    hit,
                    defence,
                })
            })

            return attackInfo.json()
        }
        
        
    playerAttack = () => {
            const attack = {}
        
            for (let item of this.$formFight) {
                if (item.checked && item.name ==='hit') {
                    attack.hit = item.value
                }
        
                if (item.checked && item.name ==='defence') {
                    attack.defence = item.value
                }
        
                item.checked = false
            }
        
            return attack
        }
        
        
    damageApply = ({player1: player1Attack, player2: player2Attack} = attackInfo) => {

                if (player1Attack.hit !== player2Attack.defence) {
                    this.player2.changeHP(player1Attack.value)
                    this.player2.renderHP()
                    generateLogs('hit', this.player1, this.player2, player1Attack.value)
                } else {
                    generateLogs('defence', this.player2, this.player1)
                }
        
                if (player2Attack.hit !== player1Attack.defence) {
                    this.player1.changeHP(player2Attack.value)
                    this.player1.renderHP()
                    generateLogs('hit', this.player2, this.player1, player2Attack.value)
                } else {
                    generateLogs('defence', this.player1, this.player2)
                }
        }

    winCheck = () => {
            if ((this.player1.hp > 0)&&(this.player2.hp === 0)) {
                this.$arenas.appendChild(this.playerWin(this.player1))
                generateLogs('end', this.player1, this.player2)
            } else if ((this.player1.hp === 0)&&(this.player2.hp > 0)) {
                this.$arenas.appendChild(this.playerWin(this.player2))
                generateLogs('end', this.player2, this.player1)
            } else if ((this.player1.hp === 0)&&(this.player2.hp === 0)) {
                this.$arenas.appendChild(this.playerWin())
                generateLogs('draw')
            }
        
            if (this.player1.hp === 0 || this.player2.hp === 0) {
                this.$formFight.style.display = 'none'
                this.createReloadButton()
            }
        }

    playerWin = (player) => {
            const $winTitle = createElement('div', 'winTitle')
        
            if (player) {
                $winTitle.innerText = `${player.name} win`
            } else {
                $winTitle.innerText = 'draw'
            }
        
            return $winTitle
        }
        
        
    createReloadButton = () => {
            const $reloadWrap = createElement('div','reloadWrap')
            const $reloadButton = createElement('button','button')
        
            $reloadButton.innerText = 'Restart'
        
            $reloadWrap.appendChild($reloadButton)
        
            $reloadButton.addEventListener('click', function(){
                window.location.pathname = './index.html'
            })
        
            this.$arenas.appendChild($reloadWrap)
        }

    getRandomPlayer = async () => {
            const q = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
            return q
        }
        
}

export default Game
