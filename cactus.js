import { getcustomproperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTVERVAL_MIN = 500
const CACTUS_INTVERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime

export function setupCactus() {
    nextCactusTime = CACTUS_INTVERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)

        if (getcustomproperty(cactus, "--left") <= -100) {
            cactus.remove()
        }
    })

    if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTVERVAL_MIN, CACTUS_INTVERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "img/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min)
}