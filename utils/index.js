const getRandom = (amount) => Math.ceil(Math.random()*amount)

const createElement = (tag, className) => {
    const $tag = document.createElement(tag)

    if (className) {
        $tag.classList.add(className)
    }

    return $tag
}

export {getRandom, createElement}