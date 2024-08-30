//rock paper scissors buton - DOM & EventLister
document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGames('rock'); // call function with arguments
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGames('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGames('scissors');
    });

// reset button
document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        resetGame();
    });

// auto play button
document.querySelector('.js-autoplay-button')
    .addEventListener('click', () => {
        autoPlay();
    });

// variable score check which one is truly, then store in score
// score is object 
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties:0 
};

// play games function - function with parameter
function playGames(playerMove) {
    
    /**
     * two ways to use parameter in function
     * 1. using parameter playMove 
     * 2. store playMove value in new variable as shown below
     */

    const player = playerMove;
    // console.log(player);
    const computer = computerMove(); // function as a value and it will return the value and store in computer variable

    // store result
    let result = '';

    // compare between player and computer move, and keep the result
    if (player === 'rock') {
        if (computer === 'rock') {
            result = 'Tie.';
        } else if (computer === 'paper') {
            result = 'You Loss.';
        } else if (computer === 'scissors') {
            result = 'You Win.';
        }
    }

    if (player === 'paper') {
        if (computer === 'rock') {
            result = 'You Win.';
        } else if (computer === 'paper') {
            result = 'Tie.';
        } else if (computer === 'scissors') {
            result = 'You Loss.';
        }
    }

    if (player === 'scissors') {
        if (computer === 'rock') {
            result = 'You Loss.';
        } else if (computer === 'paper') {
            result = 'You Win.';
        } else if (computer === 'scissors') {
            result = 'Tie.';
        }
    }

    // update score 
    if (result === 'You Win.') {
        score.wins +=1;
    } else if (result === 'You Loss.') {
        score.losses +=1;
    } else if (result === 'Tie.') {
        score.ties +=1;
    }
    
    // update the score into object name score(key)
    localStorage.setItem('score',JSON.stringify(score));

    // display result - use DOM & EventListener
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} 
        Losses:${score.losses} Ties: ${score.ties}`;
}

// computer move function
function computerMove() {
    const randomNumber = Math.random();
    let computerMove;
    
    if (randomNumber >= 0 && randomNumber <= 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

function resetGame() {
    // object score
    score = { wins: 0, losses: 0, ties: 0 };
    // score.wins = 0;
    // score.losses = 0;
    // score.ties = 0;
    localStorage.removeItem('score');
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Losses:${score.losses}, Tie: ${score.ties}`
}


// autPlay() - where games start move itself
let onPlay = false; // means games not play get
let intervalId; // set on off interval

function autoPlay() {
    if(!onPlay) { 
        // play auto game
        onPlay = true;
        intervalId = setInterval(() => {
            //playGames() run 
            const playerMove = computerMove(); // function as a value stored in variable
            playGames(playerMove);
        },
        1000); // 1 second
    } else {
        // stop the auto play
        clearInterval(intervalId);
        onPlay = false;
    }
}