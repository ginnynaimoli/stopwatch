var hours = document.querySelector('#hours'),
    minutes = document.querySelector('#minutes'),
    seconds = document.querySelector('#seconds'),
    miliseconds = document.querySelector('#miliseconds'),

    startButton = document.querySelector("#startButton"),
    pauseButton = document.querySelector("#pauseButton"),
    stopButton = document.querySelector("#stopButton"),
    resetButton = document.querySelector("#resetButton"),

    setTime,
    currentTime,
    difference,
    timer = 0, // set the timer to a number (otherwise assume is a string)
    interval;

// Logic: using date.now() which shows all the miliseconds elapse from 1970
var start = function(){
    setTime = Date.now();
    interval = setInterval(update, 10)
}
// clear the interval from the start function
var pause = function(){
    clearInterval(interval); // only take the name of the interval want to stop
}
// clear the interval and set the timer back to 0 for stop
var stop = function(){
    clearInterval(interval);
    timer = 0;
}
// set the timer back to 0 and run the entire clock again
var reset = function(){
    timer = 0;
    updateScreen();
}
// apply only the difference miliseconds to miliseconds
var update = function(){
    currentTime = Date.now();
    difference = currentTime - setTime;
    timer += difference;

    updateScreen();
    setTime = currentTime;
}
// the clock shows time like 1.45, we only want the miliseconds show
var updateScreen = function(){
    var timeRaw = timer/1000;
        timeMiliSeconds = parseInt((timeRaw % 1) * 100);
        timeSeconds = Math.floor(timeRaw);
        timeMinutes = Math.floor(timeSeconds/60);
        timeHours = Math.floor(timeMinutes/60);


    miliseconds.innerText = twoDigiter(timeMiliSeconds);
    seconds.innerText = twoDigiter(processSixty(timeSeconds));
    minutes.innerText = twoDigiter(processSixty(timeMinutes));
    hours.innerText = twoDigiter(timeHours);

}
// add 0 before the time if number showed is one digit
var twoDigiter = function(number){
    var numString = number.toString();
    if (numString.length < 2) {
        return '0' + numString;
    } else {
        return numString;
    }
}
// reset the number back to 00 if over 60
var processSixty = function(number){
    var divisible = Math.floor(number/60);
    if(number/60 >= divisible){
        return number - 60 * divisible;
    }
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);