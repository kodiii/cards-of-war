const message = document.getElementById("message")
let deckId

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
        message.innerText = "New DECK generated!"
}

document.getElementById("new-deck").addEventListener("click", handleClick)

document.getElementById("draw-cards").addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)

            let html = ""

            data.cards.forEach(card => {


                html += `
                       <img src=${card.image} />                    
                `
            document.getElementById("placeholder").innerHTML = html
            })

            determineCardWinner(data.cards[0], data.cards[1])
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]

    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        message.innerText = "COMPUTER WIN!"
    } else if (card1ValueIndex < card2ValueIndex) {
        console.log("PLAYER WIN!")
        message.innerText = "PLAYER WIN!"
    } else {
        message.innerText = "TYE"
    }
}
