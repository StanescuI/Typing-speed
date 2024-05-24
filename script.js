const MILLISECONDS_INCREASE = 1000 / 60;
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
let inTyping = false;
document.addEventListener('keydown', (e) => 
                          checkLetter(e, game));

class Game {
    constructor() {
        this.seconds = 0;
        this.milli = 0;
        this.rightLetters = 0;
        this.noWords = 0;
        this.noLetters = 0;
        this.letterIndex = 0;
        this.timeId = null;
    }

    startTyping() {
        this.seconds = 0;
        this.milli = 0;
        this.rightLetters = 0;
        this.noWords = 0;
        this.noLetters = 0;
        inTyping = true;
        this.letterIndex = 0;
        newWord(this);
        this.timeId = setInterval(() => 
                      increaseTime(this), MILLISECONDS_INCREASE);
        result.textContent = 'TYPING SPEED. Press SPACE to reset';
    }
}
let game = new Game();

function increaseTime(game) {
    game.milli++;
    if (game.milli === 60) {
        game.seconds++;
        game.milli = 0;
    }
    if (game.seconds === 60) {
        stopTyping(game);
    }
    timeDisplay.textContent = 'Time: ' + 
                              game.seconds.toString().padStart(2, '0') + ':' + 
                              game.milli.toString().padStart(2, '0');
}

function stopTyping(game) {
    clearInterval(game.timeId);
    inTyping = false;
    if (game.noLetters != 0) {
        result.textContent = 
            `Congratulations, you have managed to type `+ 
             `${game.noWords - 1} words, managing to score ` + 
             `${game.rightLetters} letters out of a total of `+ 
             `${game.noLetters}!\nYour accuracy is ` + 
             `${(game.rightLetters / game.noLetters * 100).toFixed(2)}%`;
    } else {
        result.textContent = `You didn't type any letter, press SPACE to try again !`;
    }
}

function checkLetter(e, game) {
    if (e.key === ' ' && !inTyping) {
        game.startTyping();
    } else if (e.key === ' ') {
        stopTyping(game);
    } else if (inTyping && e.key !== ' ') {
        let currLetter = wordDisplay.childNodes[game.letterIndex];
        if (e.key === letters[game.letterIndex]) {
            currLetter.classList.add('rightLetter');
            game.rightLetters++;
        } else {
            currLetter.classList.add('wrongLetter');
        }
        game.letterIndex++;
        if (game.letterIndex === letters.length) {
            newWord(game);
        }
        game.noLetters++;
    }
}

function newWord(game) {
    game.letterIndex = 0;
    let oldPick = -1;
    let randomPicker;
    do {
        randomPicker = Math.floor(Math.random() * words.length);
    } while (oldPick === randomPicker);
    oldPick = randomPicker;
    let selectedWord = words[randomPicker];
    letters = selectedWord.split('');
    wordDisplay.textContent = '';
    letters.forEach(letter => {
        let currLetter = document.createElement('span');
        currLetter.textContent = letter;
        wordDisplay.appendChild(currLetter);
    });
    game.noWords++;
}