var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious", "dissonant", "toady", "idempotent"];
const MAX_GUESSES = 6;
var word = "";
var guesses = "";
var guess_count = MAX_GUESSES;

function newGame(){
    inputArea.hidden = false;
    var randomIndex = parseInt(Math.random()*POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses = "";
    guess_count = MAX_GUESSES;
    updatePage();
}

function guessLetter(){
    var input = document.getElementById("guess");
    var letter = input.value;
    //check if letter is in our guesses index. If it is we ignore it
    if (guesses.indexOf(letter) >= 0) {
        input.value = "";
        return;
    }
    if(word.indexOf(letter) < 0) {
        guess_count--;
        //lose condition
        if(guess_count <= 0){
            inputArea.hidden = true;
        }
    }
    guesses += letter;
    updatePage();
    input.value = "";
}

function updatePage(){
    var clueString = "";
    for(var i = 0; i<word.length; i++) {
        var currentLetter = word.charAt(i);
        if(guesses.indexOf(currentLetter) >= 0){
            clueString+=currentLetter+ " ";
        }
        else
            clueString+="_ ";
    }
    //update the clue string
    var clue = document.getElementById("clue");
    clue.innerHTML = clueString;

    //update the guesses
    var guessArea = document.getElementById("guesses");
    guessArea.innerHTML = "Guessed Letters: " + guesses;
    if (guess_count <= 0) {
        guessArea.innerHTML = "You lose!";
    }

    //win condition
    //i had to google if javascript had a function to check if a string has a character in it 
    if (!clueString.includes("_")) {
        guessArea.innerHTML = "You win!";
        inputArea.hidden = true;
    }

    //update the image
    var image = document.getElementById("hangmanImage");
    image.src = "images/hangman"+guess_count+".gif";

}
