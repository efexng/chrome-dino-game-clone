import { getcustomproperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const groundEms = document.querySelectorAll("[data-ground]")

export function setupGround() {
    setCustomProperty(groundEms[0], "--left", 0)
    setCustomProperty(groundEms[1], "--left", 300)
}

export function updateGround(delta, speedScale) {
    groundEms.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

        if (getcustomproperty(ground, "--left") <= -300) {
            incrementCustomProperty(ground, "--left", 600)
        }
    })
}