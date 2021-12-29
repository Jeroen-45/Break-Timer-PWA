/* Start timer loop and set event handlers */
setInterval(updateTimer, 1000);
document.addEventListener("click", processTap, true);
document.addEventListener("touchend", processTap, false);

/* Settings / constants */
const countdownTime = 20 * 60 * 1000;
const countdownOverdueExtremeTime = 2 * 60 * 1000;
const breakTime = 20 * 1000;

const timerElement = document.getElementById("timer");

/* State variables */
var state = "none";
var timerStart = 0; // start of current timer
var lastTap = 0; // Time of last tap

/* Convert milliseconds to MM:SS string with minus sign in front of it if applicable */
function msToMMSS(ms) {
    let s = Math.round(ms / 1000);
    let sAbs = Math.abs(s);
    let minutes = parseInt(sAbs / 60);
    let seconds = String(parseInt(sAbs % 60)).padStart(2, "0");
    return (s < 0 ? "-" : "") + minutes + ":" + seconds;
}

/* Set background color of body to the css variable with the given name */
function setBgColor(color) {
    document.body.style.backgroundColor = "var(--" + color + ")";

    /* Update theme color (tab/top bar color in mobile browsers) */
    bgColorString = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    document.querySelector("meta[name=theme-color]").setAttribute("content", bgColorString);
}

function processTap() {
    /* Check if last tap was longer than 10ms ago, to avoid double triggering with click AND touchend */
    if (lastTap >= Date.now() - 10) {
        return;
    }

    /* Set last tap time */
    lastTap = Date.now();

    /* Take appropriate action based on the current state */
    switch (state) {
        case "breakCountdown":
            setBgColor("blue");
            state = "break";
            timerStart = Date.now();
            break;

        case "break":
        case "breakExtra":
            setBgColor("black");
            state = "breakCountdown";
            timerStart = Date.now();
            break;

        default:
            break;
    }
    updateTimer();
}

function updateTimer() {
    switch (state) {
        case "breakCountdown":
            remainingTime = countdownTime - (Date.now() - timerStart);
            remainingTimeSeconds = Math.round(remainingTime / 1000);

            timerElement.innerHTML = msToMMSS(remainingTime);

            if (remainingTimeSeconds <= 0) {
                /* Time is up, start flashing red */
                if (remainingTimeSeconds % 2 == 0) {
                    if (remainingTime + countdownOverdueExtremeTime <= 0) {
                        /* Time has been up for longer than countdownOverdueExtremeTime */
                        setBgColor("red-light");
                    } else {
                        setBgColor("red");
                    }
                } else {
                    setBgColor("black")
                }
            }
            break;

        case "break":
        case "breakExtra":
            currentBreakTime = Date.now() - timerStart;

            timerElement.innerHTML = msToMMSS(currentBreakTime);

            if (currentBreakTime > breakTime && state == "break") {
                /* break time satisfied */
                setBgColor("blue-light");
                state = "breakExtra";
            }
            break;

        default:
            /* No valid timer running, start break countdown */
            timerStart = Date.now();
            state = "breakCountdown";
            updateTimer();
            break;
    }
}