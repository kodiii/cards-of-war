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
            document.querySelector(".placeholder").innerHTML = html
            })
        })
})