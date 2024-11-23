const emojis = [
    "😺",
    "😺",
    "🦝",
    "🦝",
    "🦊",
    "🦊",
    "🐶",
    "🐶",
    "🐵",
    "🐵",
    "🦁",
    "🦁",
    "🐯",
    "🐯",
    "🐮",
    "🐮",
];
let openCards = [];

let shuffleEmojis = emojis.sort(() =>(Math.random() > 0.5 ? 2 : -1));

for(let i = 0; i < emojis.length; i++){
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

const flipSound = new Audio('./sounds/flip.mp3');
const matchSound = new Audio('./sounds/match.mp3');

function handleClick() {
    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2) {
        setTimeout(checkMath, 500);
    }

    console.log(openCards);
}

function checkMath() {
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    }else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];

    // Verificando se o jogo foi vencido
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        showVictoryMessage();
        hideCards();
    }
}

// Função para exibir a mensagem de vitória
function showVictoryMessage() {
    const modal = document.createElement("div");
    modal.className = "victory-modal";
    modal.innerHTML = `
        <div class="victory-content">
            <h2>🎉 Parabéns, você venceu! 🎉</h2>
            <p>🎊 Você concluiu o jogo com sucesso! 🎊</p>
            <button onclick="closeVictoryMessage()">Jogar novamente</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function hideCards() {
    // Faz as cartas desaparecem
    document.querySelectorAll(".item").forEach(card => {
        if (!card.classList.contains("boxMatch")) {
            card.style.visibility = "hidden"; 
        }
    });
}

// Função para fechar o modal de vitória
function closeVictoryMessage() {
    document.querySelector(".victory-modal").remove();
    // Torna as cartas visíveis novamente ao reiniciar o jogo 
    document.querySelectorAll("item").forEach(card => {
        card.style.visibility = "visible";
    });
}
