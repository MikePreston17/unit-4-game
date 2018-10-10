/*	Author: Michael Preston
 *	Date: "10-09-2018"
 */
var goal, totalScore, wins, losses;

var gemDictionary = {
    ruby: 10,
    sapphire: 5,
    topaz: 1,
    emerald: 2,
}

window.addEventListener('load', init)

$(document).on("click", ".gem", function () {
    let score = gemDictionary[this.alt];

    if (typeof score !== 'number') {
        throw new Error('score was not a number! Could not update score!')
    }

    totalScore += score;
    render()
    checkWinCondition()
})

function checkWinCondition() {
    if (totalScore < goal)
        return;
    else if (totalScore == goal) {
        alert('You win!')
        wins++;
    } else if (totalScore > goal) {
        alert('You lose!')
        losses++;
    }
    reset();
}

function init() {
    totalScore = 0;
    losses = 0;
    wins = 0;
    setGoal();
    render();
}

function setGoal() {
    goal = randomInt(19, 120, true);
    $('#goal').text(goal);
}

function reset() {
    totalScore = 0;
    setGoal();
}

function randomInt(min, max, inclusive) {
    return Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min
}

function render() {
    $('#score').text(totalScore);
    $('#losses').text(losses);
    $('#wins').text(wins);
}