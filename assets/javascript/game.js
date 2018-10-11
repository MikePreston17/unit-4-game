/*	Author: Michael Preston
 *	Date: "10-09-2018"
 */
const MIN_GOAL = 19,
    MAX_GOAL = 120;
var goal, totalScore, wins, losses;
var gemDictionary = {
    ruby: 0,
    sapphire: 0,
    topaz: 0,
    emerald: 0,
}

window.addEventListener('load', init)

$(document).on("click", ".gem", function () {
    var that = this; //in case 'this' changes by jQuery (best practices)

    let score = gemDictionary[that.alt];

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
        wins++;
        render();
        alert('You win!')
    } else if (totalScore > goal) {
        losses++;
        render();
        alert('You lose!')
    }
    reset();
}

function init() {
    generateDictionary();
    totalScore = 0;
    losses = 0;
    wins = 0;
    render();
}


function setGoal() {
    console.log('setGoal()', );
    goal = randomInt(MIN_GOAL, MAX_GOAL, true);
    $('#goal').text(goal);
}

function reset() {
    totalScore = 0;
    setGoal();
    generateDictionary();
}

function randomInt(min, max, inclusive) {
    return Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min
}

function render() {
    $('#score').text(totalScore);
    $('#win-loss').text(`Wins: ${wins}\nLosses:${losses}`);
}

//Sample:  1-3, 5-7, 10-12
//MUST BE RANDOM because we could get 19..20 as our range, which would not be good!
//Eliminate repeats
//Use the greedy alg to ensure some array of values CAN add up to the GOAL
function generateDictionary() {
    if (!goal || goal == 0) setGoal();

    var result = Object.keys(gemDictionary);
    var max, min;    

    console.log('goal: ', goal);
    do {
        max = randomInt(range_min, range_max, false)
        min = randomInt(range_min, range_max, true);
        console.log(`possible gem values: (${min}..${max})`);
    } while (max === min || min > max || max >= goal)

    //todo: make the min and max BELOW and never adding up to the cpuGuess.

    result.forEach(key => {
        gemDictionary[key] = randomInt(min, max, true);
    })

    var cookieIndex = randomInt(1, 4, false);
    console.log('cookieindex: ', cookieIndex);
    console.log('cookie :', gemDictionary[cookieIndex]);
    console.log(gemDictionary);
}