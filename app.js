//VARIABLES
const phrase = document.querySelector('#phrase');
const tries = document.querySelectorAll('li.tries img')
let missed = 0;
const startScreen = document.querySelector('#overlay');
const startButton = document.querySelector('a.btn__reset');
const phrases = ["Break a leg","When pigs fly","Piece of cake","Blessing in disguise","A dime a dozen","Call it a day", "Trim the fat"]
const ulOfPhrases = document.querySelector('#phrase ul');
const qwertyButtons = document.querySelector('#qwerty');
const h2 = document.querySelector('h2.title');
let randPhrase;

///FUNCTIONS///
// Grabs Random Phrase from phrases array
getRandomPhraseAsArray = (array) => {
//Didn't add plus one to random generator because of 0 index
let random = Math.floor(Math.random() * array.length)
// Grabs random phrase then returns a new array with split letters
randPhrase = array[random].split("");
return randPhrase;
};
// Sets the game display. Function accepts a phrase stored in an array
addPhraseToDisplay = (phraseArray) => {
  for(let i=0; i<phraseArray.length; i++) {
    let liPhrase = document.createElement('li');
    liPhrase.textContent = phraseArray[i];
    if (liPhrase.textContent == ' ') {
      liPhrase.className = 'space';
    } else {
      liPhrase.className = 'letter';
    }
    ulOfPhrases.appendChild(liPhrase);
  }
};
//Check if letters match function
const checkLetter = (letter) => {
  let letterFound = false;
  const letters = document.querySelectorAll('.letter');
    //if current letter being looped over equals the letter being pressed -> add "show class" to letter
  for(let i=0; i<letters.length; i++) {
    if (letters[i].textContent.toUpperCase() === letter.toUpperCase())  {
      letters[i].className += " show";
      letterFound = true;
    }
  }
    if(letterFound) {
      return letter;
  }
    return null;
}
// Checks to see if player has won or lost the game. If player has won/lost the
// overlay screen is set to display
 function checkWin() {
   const totalShown = document.querySelectorAll('.show');
   const totalLetters = document.querySelectorAll('.letter');
   if (totalShown.length === totalLetters.length) {
     startScreen.style.display = '';
     startScreen.className = 'win';
     startButton.textContent = 'Play Again';
     h2.textContent = "You Win!"
     missed = 0;
   } else if (missed >= tries.length) {
     startScreen.style.display = '';
     startScreen.className = 'lose';
     startButton.textContent = 'Try Again'
     h2.textContent = "You Lose!"
     missed = 0;
   }
 }

//CLICK EVENTS//
 // Hide Start Game Overlay
 startButton.addEventListener('click', ()=> {
   startScreen.style.display = 'none';
   chosen = document.querySelectorAll('.chosen')
 // Initalizes attributes and class settings on display banner and qwerty display
   for(let i=0; i<chosen.length; i++) {
     chosen[i].removeAttribute("disabled");
     chosen[i].className = '';
   }
   const letter = document.querySelectorAll('.letter')
   for (let i=0;i<letter.length;i++) {
       letter[i].parentNode.removeChild(letter[i]);
     }
   const space = document.querySelectorAll('.space')
   for (let i=0;i<space.length;i++) {
       space[i].parentNode.removeChild(space[i]);
     }
 // Initializes Hearts
   for(let i=0; i<tries.length; i++){
         tries[i].setAttribute('src','images/liveHeart.png');
       }
// resets random phrase
   let resetPhrase = getRandomPhraseAsArray(phrases);
   addPhraseToDisplay(resetPhrase);
 });

// Listens for click events on the qwerty display and uses checkWin function to
//see if button clicked matches letter in phrase
 qwertyButtons.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
      event.target.className = "chosen";
      event.target.setAttribute('disabled', true);
      let userAttempt = checkLetter(event.target.textContent);
      if (userAttempt === null){
        tries[tries.length-1-missed].setAttribute('src','images/lostHeart.png');
        missed += 1;
      }
      else if (userAttempt != null) {
        console.log('match!');
      }
    }
    checkWin();
  });
