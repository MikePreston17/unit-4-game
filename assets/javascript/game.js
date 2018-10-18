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
    // console.log('setGoal()', );
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
//TODO: Use the greedy alg to ensure some array of values CAN add up to the GOAL

const min = 1;
const max = 12;


function generateDictionary() {

    if (!goal || goal == 0) setGoal();
    // console.log('goal: ', goal);

    var values = range(1, 12);
    var result = Object.keys(gemDictionary);

    do {
        var selected = [];

        result.forEach(key => {
            let poppedIndex = randomInt(0, values.length - 1);
            selected.push(values[poppedIndex]);
            console.log('idx: ', poppedIndex);
            gemDictionary[key] = values[poppedIndex];
            values.splice(poppedIndex, 1);
            console.log('values: ', values);
        })
        // alert('pause!')
        console.log('selected: ', selected);
        if (selected[0] === undefined) {
            console.log('bad dict?', gemDictionary);
            alert('pause!')
        }
    }
    while (!addsUpTo(selected.sort((a, b) => b - a), goal))

    console.log(gemDictionary);
}

function range(start, end) {
    return [...Array(1 + end - start).keys()].map(v => start + v)
}

//performs greedy algorithm
function addsUpTo(values, goal) {

    // console.log('addup values: ', values);
    if (goal === 0)
        return true;

    var max = Math.max(...values);
    // console.log('max: ', max);

    var results = [];

    values.forEach(number => {
        let times = Math.floor(goal / number);
        // console.log(`${number}  divides into: ${goal} ${times} times`);
        goal -= times * number;
        results.push(number);
        // console.log('step-goal: ', goal);

    });

    // console.log('results: ', results);
    // console.log('goal: ', goal);
    return goal === 0;
}