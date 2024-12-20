const fruits = ['apple', 'banana', 'mango', 'strawberry'];
const gameArea = document.getElementById('game-area');
const targetFruitElement = document.getElementById('target-fruit');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const messageElement = document.getElementById('message');
const continueButton = document.getElementById('continue-button');
let score = 0;
let targetFruit = '';
let gameInterval;
let dropSpeed = 2;

function getRandomFruit() {
    return fruits[Math.floor(Math.random() * fruits.length)];
}

function createFruitElement(fruit) {
    const fruitElement = document.createElement('img');
    fruitElement.src = `img/${fruit}.png`;
    fruitElement.classList.add('fruit');
    fruitElement.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
    fruitElement.style.top = `-50px`;
    fruitElement.dataset.fruit = fruit;
    gameArea.appendChild(fruitElement);
    return fruitElement;
}

function dropFruit(fruitElement) {
    const dropInterval = setInterval(() => {
        fruitElement.style.top = `${fruitElement.offsetTop + dropSpeed}px`;
        if (fruitElement.offsetTop > gameArea.clientHeight) {
            gameArea.removeChild(fruitElement);
            clearInterval(dropInterval);
            if (fruitElement.dataset.fruit === targetFruit) {
                stopGame();
                messageElement.style.display = 'block';
                continueButton.style.display = 'inline-block';
                startButton.disabled = false;
                stopButton.disabled = true;
            }
        }
    }, 20);
}

function startGame() {
    targetFruit = getRandomFruit();
    targetFruitElement.textContent = targetFruit;
    messageElement.style.display = 'none';

    gameInterval = setInterval(() => {
        const fruit = getRandomFruit();
        const fruitElement = createFruitElement(fruit);
        dropFruit(fruitElement);
    }, 1000);
}

function stopGame() {
    clearInterval(gameInterval);
    const fruits = document.querySelectorAll('.fruit');
    fruits.forEach(fruit => gameArea.removeChild(fruit));
}

gameArea.addEventListener('click', (event) => {
    if (event.target.classList.contains('fruit')) {
        const clickedFruit = event.target.dataset.fruit;
        if (clickedFruit === targetFruit) {
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            dropSpeed += 0.5; // Increase the speed of falling fruits
            targetFruit = getRandomFruit(); // Change the target fruit
            targetFruitElement.textContent = targetFruit;
        }
        gameArea.removeChild(event.target);
    }
});

startButton.addEventListener('click', () => {
    stopGame(); // Stop the current game if running
    startGame();
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
    stopGame();
    startButton.disabled = false;
    stopButton.disabled = true;
});

continueButton.addEventListener('click', () => {
    startGame();
    continueButton.style.display = 'none';
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.disabled = true;