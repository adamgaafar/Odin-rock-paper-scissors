let gameString = ['Rock', 'Paper', 'Scissor'];
let compT = 0;
let humanT = 0;
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    return Math.floor(Math.random() * 3) + 1;
}

function determineWinner() {
    let res = document.querySelector(".turn");
    let compTxt = document.querySelector("#compTxt");

    compT = getComputerChoice();
    compTxt.innerText = `Computer Chose: ${gameString[compT - 1]}`;
    displayComputerChoice(compT);

    if (humanT === compT) {
        res.innerText = "It's a Draw!";
    } else if (
        (humanT === 1 && compT === 3) ||
        (humanT === 2 && compT === 1) ||
        (humanT === 3 && compT === 2)
    ) {
        res.innerText = "You Win!";
        playerScore++;
    } else {
        res.innerText = "Computer Wins!";
        computerScore++;
    }

    updateScore();

    setTimeout(resetGame, 1500); // Reset automatically after 1.5s
}

function updateScore() {
    document.querySelector(".playerScore").innerText = playerScore;
    document.querySelector(".computerScore").innerText = computerScore;
}

function resetGame() {
    humanT = 0;
    compT = 0;

    document.querySelector(".turn").innerText = "Turn :";
    document.querySelector("#chooseTxt").innerText = "Choose It's Your Turn";
    document.querySelector("#compTxt").innerText = "Computer Turn ??";

    document.querySelectorAll(".items").forEach(item => item.style.display = "block");

    let existingItem = document.querySelector(".computer .items");
    if (existingItem) {
        existingItem.remove();
    }

    getHumanChoice(); // Re-enable choices after reset
}

function getHumanChoice() {
    let rock = document.querySelector("#rock");
    let paper = document.querySelector("#paper");
    let scissor = document.querySelector("#scissor");
    let chooseTxt = document.querySelector("#chooseTxt");

    function handleChoice(choice, text) {
        humanT = choice;
        chooseTxt.innerText = `You Chose ${text}`;
        document.querySelectorAll(".items").forEach(item => item.style.display = "none");
        document.querySelector(`#${text.toLowerCase()}`).style.display = "block";

        determineWinner();
    }

    // Remove previous event listeners before adding new ones
    rock.replaceWith(rock.cloneNode(true));
    paper.replaceWith(paper.cloneNode(true));
    scissor.replaceWith(scissor.cloneNode(true));

    document.querySelector("#rock").addEventListener('click', () => handleChoice(1, "Rock"));
    document.querySelector("#paper").addEventListener('click', () => handleChoice(2, "Paper"));
    document.querySelector("#scissor").addEventListener('click', () => handleChoice(3, "Scissor"));
}

document.addEventListener('DOMContentLoaded', () => {
    getHumanChoice();
});

function displayComputerChoice(choice) {
    let computerDiv = document.querySelector(".computer");

    let existingItem = document.querySelector(".computer .items");
    if (existingItem) {
        existingItem.remove();
    }

    let choiceDiv = document.createElement("div");
    choiceDiv.classList.add("items");

    let choices = {
        1: { id: "rock", img: "rock.gif", text: "Rock" },
        2: { id: "paper", img: "giphy.gif", text: "Paper" },
        3: { id: "scissor", img: "scissor.gif", text: "Scissor" }
    };

    choiceDiv.id = choices[choice].id;
    choiceDiv.innerHTML = `<img src="${choices[choice].img}" /><p>${choices[choice].text}</p>`;

    computerDiv.appendChild(choiceDiv);
}