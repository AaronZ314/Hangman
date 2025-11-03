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
    if(word.indexOf(letter) < 0) {
        guess_count--;
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

    //update the image
    var image = document.getElementById("hangmanImage");
    image.src = "images/hangman"+guess_count+".gif";

    //TODO: CREATE WIN CONDITION. DO NOT LET PEOPLE GUESS THE SAME LETTER TWICE (IGNORE THE SECOND GUESS IF IT HAPPENS)
}
