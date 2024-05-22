const MILLISECONDS_INCREASE = 1000 / 60
let wordDisplay = document.getElementById('text')
let timeDisplay = document.getElementById('time')
let result = document.getElementById('result')
let words = ['these', 'are', 'some', 'regular', 'words', 'that', 'coming',
             'to', 'my', 'mind', 'in', 'no', 
            'particular', 'order', 'and', 'i', 'will', 'stop', 'when',
            'reached', 'the', 'end', 'of', 'line',
            'okay', 'alright', 'awesome', 'amazing', 'extraordinary',
            'cool', 'shiny', 'fresh', 'gaming', 'cat',
            'dog', 'banana', 'pizza', 'elephant', 'you', 'me', 'him',
            'her', 'they', 'them', 'wellcode', 'software']
let letters
document.addEventListener('keydown', checkLetter)
let timeId
let inTyping = false
let letterIndex
let noLetters
let noWords
let rightLetters

function startTyping() {
    let randomPicker = -1;
    milli = 0
    seconds = 0
    rightLetters = 0
    noWords = 0
    inTyping = true
    noLetters = 0
    rightLetters = 0
    newWord(randomPicker)
    timeId = setInterval(increaseTime(milli, seconds), MILLISECONDS_INCREASE);
    result.textContent = 'TYPING SPEED . Press SPACE to reset'
}

function increaseTime(milli, seconds) {
    ++milli
    if (milli == 60) {
        ++seconds
        milli = 0
    }
    if (seconds == 60) {
        stopTyping()
    }
    timeDisplay.textContent = 'Time : ' + seconds.toString().padStart(2, '0') +
                              ':' + milli.toString().padStart(2, '0');
}

function stopTyping(noWords) {
    clearInterval(timeId)
    inTyping = false
    result.textContent = `Congratulations , your have managed to type ` +
                         `${noWords} words, managing to` +
                         ` score ${rightLetters} letters out of a total` +
                         ` of ${noLetters}!\nYour accuracy is ` +
                         `${(rightLetters / noLetters * 100).toFixed(2)}%`
}

function checkLetter(e) {
    if (e.key == ' ' && !inTyping) {
        startTyping()
    } else if (e.key == ' ') {
        stopTyping(noWords)
    } else if (inTyping && e.key != ' ') {
        let currLetter = wordDisplay.childNodes[letterIndex]
        if (e.key == letters[letterIndex]) {
            currLetter.classList.add('rightLetter')
            ++rightLetters
        } else {
            currLetter.classList.add('wrongLetter')
        }
        ++letterIndex
        if (letterIndex == letters.length) {
            newWord()
        }
        ++noLetters
    }
}

function newWord(randomPicker) {
    letterIndex = 0
    oldPick = randomPicker
    while (oldPick == randomPicker) {
        randomPicker = Math.floor(Math.random() * words.length)
    }
    let selectedWord = words[randomPicker]
    letters = selectedWord.split('')
    wordDisplay.textContent = ''
    letters.forEach(letter => {
        let currLetter = document.createElement('span')
        currLetter.textContent = letter
        wordDisplay.appendChild(currLetter)
    })
    ++noWords
}
