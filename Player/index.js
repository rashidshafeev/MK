import {createElement} from '../utils/index.js'

class Player {
    constructor(props) {
        this.name = props.name
        this.hp = props.hp
        this.img = props.img
        this.player = props.player
        this.selector = `player${this.player}`
        this.rootSelector = props.rootSelector
    }

    changeHP = (amount) => {
        this.hp -= amount;
    
        if (this.hp < 0) {
            this.hp = 0
        }
    }
    
    elHP = () => {
        return document.querySelector(`.${this.selector} .life`)
    }
    
    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`
    }
    
    createPlayer = () => {
        const $root = document.querySelector(this.rootSelector)
        const $player = createElement('div', this.selector)
        const $progressbar = createElement('div','progressbar') 
        const $life = createElement('div','life') 
        const $name = createElement('div','name') 
        const $p = createElement('p')
        const $character = createElement('div','character')
        const $img = createElement('img')
    
        $life.style.width = (`${this.hp}%`)
        $p.innerText = this.name
        $img.src = this.img
    
        $progressbar.appendChild($life)
        $progressbar.appendChild($name)
    
        $name.appendChild($p)
    
        $character.appendChild($img)
    
        $player.appendChild($progressbar)
        $player.appendChild($character)

        $root.appendChild($player)
    
        return $player
    }

}

export default Player