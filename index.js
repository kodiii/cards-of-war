let deckId
const message = document.getElementById("message")
const newDexk = document.getElementById("new-deck")
const drawCards = document.getElementById("draw-cards")
const cardsRemaining = document.getElementById("cards-remaining")
const computer = document.getElementById("computer")
const player = document.getElementById("player")
let computerCount = 0
let playerCount = 0

newDexk.addEventListener("click", handleClick)

async function handleClick() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    resetGame(data.remaining)

}

drawCards.addEventListener("click", async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    let html = ""

    data.cards.forEach(card => {
        html += `
               <img src=${card.image} />                    
        `
    document.getElementById("placeholder").innerHTML = html
    })

    determineCardWinner(data.cards[0].value, data.cards[1].value)
    cardsRemaining.style.display = "block"
    cardsRemaining.innerText = `Cards remaining: ${data.remaining}`
    gameEndMessage(data.remaining)
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]

    const card1ValueIndex = valueOptions.indexOf(card1)
    const card2ValueIndex = valueOptions.indexOf(card2)

    if (card1ValueIndex > card2ValueIndex) {
        console.log("COMPUTER WIN !")
        message.innerText = "COMPUTER WIN!"
        computerCount += 1
        computer.textContent = `Computer: ${computerCount}`
    } else if (card1ValueIndex < card2ValueIndex) {
        console.log("PLAYER WIN !")
        message.innerText = "PLAYER WIN!"
        playerCount += 1
        player.textContent = `Player: ${playerCount}`
    } else {
        message.innerText = "WAR !"
    }
}

function gameEndMessage(cardsRemain) {
    if(cardsRemain === 0 && computerCount > playerCount) {
        drawCards.disabled = true
        message.style.color = "red"
        message.textContent = " Game End, 'Computer' WIN the WAR"
    } else if (cardsRemain === 0 && computerCount < playerCount) {
        drawCards.disabled = true
        message.style.color = "red"
        message.textContent = " Game End, 'Player' WIN the WAR"
    }
}

function resetGame(cardsRemain) {
    message.style.color = "white"
    message.innerText = "New DECK generated, click 'Draw' button!"
    cardsRemaining.style.display = "block"
    cardsRemaining.innerText = `Cards remaining: ${cardsRemain}`
    computer.textContent = `Computer: 0`
    player.textContent = `Player: 0`
    computerCount = 0
    playerCount = 0
}
