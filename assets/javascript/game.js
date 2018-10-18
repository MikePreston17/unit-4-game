/*	Author: Michael Preston
 *	Date: "10-09-2018"
 */

const MIN_GOAL = 19,
    MAX_GOAL = 120;
const MIN_POINTS = 1,
    MAX_POINTS = 12;
var goal, totalScore, wins, losses;
var gemDictionary = {
    ruby: 0,
    sapphire: 0,
    topaz: 0,
    emerald: 0,
}

window.addEventListener('load', init)

/**
 * Events
 */

$(document).on("click", ".gem", function () {
    var that = this; //added 'that' just in case 'this' changes by jQuery (best practices)
    let score = gemDictionary[that.alt];

    if (typeof score !== 'number') {
        throw new Error('score was not a number! Could not update score!')
    }

    totalScore += score;
    render()
    checkWinCondition()
})

/**
 * Game Logic
 */

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
    generateGems();
    totalScore = 0;
    losses = 0;
    wins = 0;
    render();
}

function setGoal() {
    goal = randomInt(MIN_GOAL, MAX_GOAL, true);
    $('#goal').text(goal);
}

function generateGems() {

    if (!goal || goal == 0) setGoal();

    var values = range(MIN_POINTS, MAX_POINTS);
    var result = Object.keys(gemDictionary);

    do {
        var selected = [];

        result.forEach(key => {
            let poppedIndex = randomInt(0, values.length - 1);
            selected.push(values[poppedIndex]);
            gemDictionary[key] = values[poppedIndex];
            values.splice(poppedIndex, 1);
        })
    }
    while (!addsUpTo(selected.sort((a, b) => b - a), goal))
}

function reset() {
    totalScore = 0;
    setGoal();
    generateGems();
    render();
}

//Uses the greedy alg to ensure some array of values CAN add up to the GOAL
function addsUpTo(values, goal) {

    if (values.reduce(sum) === goal) return true;

    values.forEach(number => {
        let times = Math.floor(goal / number);
        goal -= times * number;
    });

    return goal === 0;
}

function render() {
    $('#score').text(totalScore);
    $('#win-loss').text(`Wins: ${wins}\nLosses:${losses}`);
}

/**
 * Helper functions 
 */

function randomInt(min, max, inclusive) {
    return Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min
}

function range(start, end) {
    return [...Array(1 + end - start).keys()].map(v => start + v)
}

function sum(total, num) {
    return total + num;
}