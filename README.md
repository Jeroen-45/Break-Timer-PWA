# Break Timer PWA
A simple progressive web app meant to be ran on an old phone, using it as a permanently on screen.
This app can be useful as a basic pomodoro timer or a 20/20 rule reminder.

A live demo can be found at [https://timer.j45.nl](https://timer.j45.nl).

## Usage
By default, the app is setup to take a break of at least 20 seconds every 20 minutes. After 2 minutes of ignoring the break, the flashing red will become brighter. You can change this behaviour using the variables at the top of `js/timer.js`.

The app will always start by counting down from 20 minutes. Once the countdown reaches zero, it will continue into the negatives and the screen will start flashing red. After two minutes, the red flashing will become brighter. At any moment (even before the countdown reaches zero), you can tap the screen to start a break. The app will now start counting upwards and the screen will become blue. After 20 seconds, the blue will become brighter. At any moment you can tap the screen again to end the break. The app will nog begin counting down again.