const arena = document.querySelector("#arena");
const target = document.querySelector("#target");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const scoreText = document.querySelector("#score");
const timeText = document.querySelector("#time");
const bestText = document.querySelector("#best");
const message = document.querySelector("#message");

let score = 0;
let timeLeft = 30;
let playing = false;
let timer = null;
let best = Number(localStorage.getItem("neonClickerBest")) || 0;

bestText.textContent = best;

function moveTarget() {
    const margin = 35;
    const x = margin + Math.random() * (arena.clientWidth - margin * 2);
    const y = margin + Math.random() * (arena.clientHeight - margin * 2);
    target.style.left = x + "px";
    target.style.top = y + "px";
}

function startGame() {
    if (playing) return;
    score = 0;
    timeLeft = 30;
    playing = true;
    scoreText.textContent = score;
    timeText.textContent = timeLeft;
    message.style.display = "none";
    target.style.display = "block";
    startBtn.textContent = "GAME RUNNING";
    moveTarget();

    timer = setInterval(() => {
        timeLeft--;
        timeText.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function endGame() {
    playing = false;
    clearInterval(timer);
    target.style.display = "none";
    message.innerHTML = "ЧАС ВИЙШОВ!<br>Твій результат: " + score;
    message.style.display = "grid";
    startBtn.textContent = "▶ PLAY AGAIN";

    if (score > best) {
        best = score;
        bestText.textContent = best;
        localStorage.setItem("neonClickerBest", best);
    }
}

function resetGame() {
    clearInterval(timer);
    playing = false;
    score = 0;
    timeLeft = 30;
    scoreText.textContent = score;
    timeText.textContent = timeLeft;
    target.style.display = "none";
    message.innerHTML = "Натисни START<br>щоб почати";
    message.style.display = "grid";
    startBtn.textContent = "▶ START GAME";
}

target.addEventListener("click", () => {
    if (!playing) return;
    score++;
    scoreText.textContent = score;
    moveTarget();
});

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);