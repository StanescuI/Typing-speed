const MILLISECONDS_INCREASE = 1000 / 60;
const SECONDS_PER_MINUTE = 60;
let wordDisplay = document.getElementById('text');
let timeDisplay = document.getElementById('time');
let result = document.getElementById('result');
let words = ['these', 'are', 'some', 'regular', 'words', 'that', 'coming',
            'to', 'my', 'mind', 'in', 'no', 
            'particular', 'order', 'and', 'i', 'will', 'stop', 'when',
            'reached', 'the', 'end', 'of', 'line',
            'okay', 'alright', 'awesome', 'amazing', 'extraordinary',
            'cool', 'shiny', 'fresh', 'gaming', 'cat',
            'dog', 'banana', 'pizza', 'elephant', 'you', 'me', 'him',
            'her', 'they', 'them', 'wellcode', 'software'];
let letters;
let gameRunning = false;
document.addEventListener('keydown', (e) => {
    checkLetter(e, game);
});

class Game {
    constructor() {
        this.resetGame();
    }

    resetGame() {
        this.seconds = 0;
        this.ms = 0;
        this.rightLetters = 0;
        this.totalTypedWords = 0;
        this.noLetters = 0;
        this.letterIndex = 0;
        this.timeId = null;
        this.oldPick = -1;
    }

    startTyping() {
        this.resetGame();
        gameRunning = true;
        this.newWord();
        this.timeId = setInterval(() => {
            increaseTime(this)
        }, MILLISECONDS_INCREASE);
        result.textContent = 'TYPING SPEED. Press SPACE to reset';
    }
    
    newWord() {
        this.letterIndex = 0;
        let randomPicker = Math.floor(Math.random() * words.length);
        while (this.oldPick === randomPicker){
            randomPicker = Math.floor(Math.random() * words.length);
        }
        this.oldPick = randomPicker;
        let selectedWord = words[randomPicker];
        letters = selectedWord.split('');
        wordDisplay.textContent = '';
        letters.forEach(letter => {
            let currLetter = document.createElement('span');
            currLetter.textContent = letter;
            wordDisplay.appendChild(currLetter);
        });
        ++this.totalTypedWords;
    }
}
let game = new Game();

function increaseTime(game) {
    ++game.ms;
    if (game.ms === SECONDS_PER_MINUTE) {
        ++game.seconds;
        game.ms = 0;
    }
    if (game.seconds === SECONDS_PER_MINUTE) {
        stopTyping(game);
    }
    timeDisplay.textContent = 'Time: ' + 
                              game.seconds.toString().padStart(2, '0') + ':' + 
                              game.ms.toString().padStart(2, '0');
}

function stopTyping(game) {
    clearInterval(game.timeId);
    gameRunning = false;
    if (game.noLetters != 0) {
        result.textContent = 
            'Congratulations, you have managed to type ' + 
            `${game.totalTypedWords - 1} words, managing to score ` + 
            `${game.rightLetters} letters out of a total of `+ 
            `${game.noLetters}!\nYour accuracy is ` + 
            `${(game.rightLetters / game.noLetters * 100).toFixed(2)}%`;
    } else {
        result.textContent = '0 typed letters, press SPACE to try again !';
    }
}

function checkLetter(e, game) {
    if (e.key === ' ' && !gameRunning) {
        game.startTyping();
        return;
    }
    if (e.key === ' ') {
        stopTyping(game);
    } else {
        let currLetter = wordDisplay.childNodes[game.letterIndex];
        if (e.key === letters[game.letterIndex]) {
            currLetter.classList.add('rightLetter');
            ++game.rightLetters;
        } else {
            currLetter.classList.add('wrongLetter');
        }
        ++game.letterIndex;
        if (game.letterIndex === letters.length) {
            game.newWord();
        }
        ++game.noLetters;
    }
}