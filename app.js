/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var player, currScore, currPlayer, currStatus, prev, curr;
// inital state of the board
clearBoard();
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (currStatus === true) {
        // roll dice and generate random number

        curr = Math.floor(Math.random() * 6) + 1;

        console.log(prev + " " + curr);
        // change the displayed image every time we roll a dice
        var diceDom = document.querySelector(".dice");
        diceDom.style.display = 'block';
        diceDom.src = "dice-" + curr + ".png";
        if (curr === 6 && prev === 6) {

            player[currPlayer] = 0;
            document.querySelector('#score-' + currPlayer).textContent = player[currPlayer];
            nextPlayer();
        } else if (curr !== 1) {
            currScore += curr;
            document.querySelector('#current-' + currPlayer).textContent = currScore;
        } else {
            nextPlayer();
        }
        prev = curr;
    }
});
// hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (currStatus) {
        player[currPlayer] += currScore;
        currScore = 0;
        document.querySelector('#score-' + currPlayer).textContent = player[currPlayer];
        // update UI
        var data = document.querySelector('.final-score').value;
        // console.log(data);
        var winningScore = 100;
        if (data) {
            winningScore = data;
        }
        if (player[currPlayer] >= winningScore) {
            document.querySelector('#name-' + currPlayer).textContent = "WINNER !!!";
            document.querySelector(".dice").style.display = 'none';
            document.querySelector('.player-' + currPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + currPlayer + '-panel').classList.remove('active');
            currStatus = false;
        } else {
            // next player turn
            nextPlayer();
        }
    }

});

// clicking new button
document.querySelector('.btn-new').addEventListener('click', clearBoard);

function nextPlayer() {
    // body... 
    currScore = 0;
    currPlayer === 0 ? currPlayer = 1 : currPlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector(".dice").style.display = 'none';
}

function clearBoard() {
    // body... 
    player = [0, 0];
    prev = 0;
    curr = 0;
    // current score
    currStatus = true;
    currScore = 0;
    currPlayer = 0;
    document.querySelector(".dice").style.display = 'none';
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById("name-0").textContent = 'Player 1';
    document.getElementById("name-1").textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}