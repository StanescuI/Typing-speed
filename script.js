let wordDisplay = document.getElementById('text')
let timeDisplay = document.getElementById('time')
let result = document.getElementById('result')
let words = ['these', 'are', 'some', 'regular', 'words', 'that', 'coming', 'to', 'my', 'mind', 'in', 'no', 
            'particular', 'order', 'and', 'i', 'will', 'stop', 'when', 'reached', 'the', 'end', 'of', 'line',
            'okay', 'alright', 'awesome', 'amazing', 'extraordinary', 'cool', 'shiny', 'fresh', 'gaming', 'cat',
            'dog', 'banana', 'pizza', 'elephant', 'you', 'me', 'him', 'her', 'they', 'them', 'wellcode', 'software']
let randomPicker = -1
let selectedWord
let letters
let i = 0
document.addEventListener('keydown', checkLetter)
let accuracy
let noWords
let noLetters
let timeId
let rightLetters = 0
let seconds
let mili
let inTyping = false

function startTyping() {
    newWord()
    inTyping = true
    noWords = 0
    noLetters = 0
    rightLetters = 0
    seconds = 00
    mili = 00
    timeId = setInterval(increaseTime, 1000 / 60)
    result.textContent = "TYPING SPEED . Press SPACE to reset"
    let startButton = document.getElementById('startButton')
    startButton.innerText = 'Reset'
    startButton.setAttribute('onclick', 'location.reload()');
}

function increaseTime() {
    ++mili
    if (mili == 60) {
        ++seconds
        mili = 0
    }
    if (seconds == 60) {
        stopTyping()
    }
    timeDisplay.textContent = "Time : " + seconds.toString().padStart(2, '0') + ':' + mili.toString().padStart(2, '0');
}

function stopTyping() {
    clearInterval(timeId)
    inTyping = false
    result.textContent = `Congratulations , your have managed to type ${noWords} words in this minute,
                         managing to score ${rightLetters} letters out of a total of ${noLetters}!\nYour
                        accuracy is ${(rightLetters / noLetters * 100).toFixed(2)}%`
}

function checkLetter(e) {
    if (e.key == ' ' && !inTyping) {
        startTyping()
    } else if (e.key == ' ' && inTyping) {
        location.reload()
    } else {
        let currLetter = wordDisplay.childNodes[i]
        if (e.key == letters[i]) {
            currLetter.classList.add('rightLetter')
            ++rightLetters
        } else {
            currLetter.classList.add('wrongLetter')
        }
        ++i
        if (i == letters.length) {
            newWord()
            i = 0
        }
        ++noLetters
    }
}

function newWord() {
    i = 0
    oldPick = randomPicker
    while (oldPick == randomPicker) {
        randomPicker = Math.floor(Math.random() * words.length)
    }
    selectedWord = words[randomPicker]
    letters = selectedWord.split('')
    wordDisplay.textContent = ''
    letters.forEach(letter => {
        let currLetter = document.createElement('span')
        currLetter.textContent = letter
        wordDisplay.appendChild(currLetter)
    })
    ++noWords
}
