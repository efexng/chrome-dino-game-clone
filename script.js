import {setupGround, updateGround} from './ground.js'
import {setupDino, updateDino, getDinoRect, setDinoLose} from './dino.js'
import {setupCactus, updateCactus, getCactusRects} from './cactus.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT =30 
const SPEED_SCALE_INCREASE = 0.00001
 
 const worldElem = document.querySelector('[data-world')
 const scoreElem = document.querySelector('[data-score')
 const startScreenElem = document.querySelector('[data-start-screen')

 setPixelToWorldScale()
 window.addEventListener("resize", setPixelToWorldScale)
 document.addEventListener("keydown", handleStart, { once: true})


let LastTime 
let speedScale
let score

 function update(time) {
    if (LastTime == null) {
        LastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - LastTime

    updateGround(delta, speedScale)
    updateSpeedScale(delta)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateScore(delta)
    if (checklose()) return handleLose()

    LastTime = time
    window.requestAnimationFrame(update)
 }

 function updateSpeedScale(delta) {
    speedScale +=delta * SPEED_SCALE_INCREASE
 }

 function checklose() {
    const dinorect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinorect))
 }

 function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right && 
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )

 }

function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

function handleStart() {
    LastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupDino()
    setupCactus()
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true})
        startScreenElem.classList.remove("hide")

    }, 100);
}

 function setPixelToWorldScale() {
    let wordToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) 
    {
        wordToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        wordToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH * wordToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * wordToPixelScale}px`
 }

