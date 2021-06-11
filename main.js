const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat')
const date = new Date()

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Kunai','Sai'],
    attack: function() {
        console.log(player1.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHP,

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
    changeHP,
    elHP,
    renderHP,
}

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
}


function changeHP(amount) {
    this.hp -= amount;

    if (this.hp < 0) {
        this.hp = 0
    }
}


function elHP() {
    const $playerLife = document.querySelector(`.player${this.player} .life`)
    return $playerLife
}


function renderHP() {
    this.elHP().style.width = `${this.hp}%`
}


function getRandom(amount) {
    return Math.ceil(Math.random()*amount);
}


function createElement(tag, className) {
    const $tag = document.createElement(tag)

    if (className) {
        $tag.classList.add(className)
    }

    return $tag
}


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

function generateLogs(type, player1, player2, damage) {
    let text
    switch (type) {
        case 'start':
            text = logs[type].replace('[time]',`${date.getHours()}:${date.getMinutes()}`).replace('[player1]', player1.name).replace('[player2]', player2.name)
            break
        case 'end':
            text = logs[type][getRandom(logs[type].length) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name)
            break
        case 'draw':
            text = logs[type]
            break
        case 'hit':
            text = `${date.getHours()}:${date.getMinutes()} - ${logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} -${damage} [${player2.hp}/100]`
            break
        case 'defence':
            text = `${date.getHours()}:${date.getMinutes()} - ${logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name)}`
            break
    }
    console.log(text)
    const el = `<p>${text}</p>`
    
    $chat.insertAdjacentHTML('afterbegin', el)
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