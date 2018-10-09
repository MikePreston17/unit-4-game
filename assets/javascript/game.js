var goal;






function init() {
    goal = randomInt(19, 120, true); //I surmised this would be inclusive.
    $('#goal').text(goal);
}

function randomInt(min, max, inclusive) {
    return Math.floor(Math.random() * (max - min + inclusive ? 1 : 0)) + min;
}