# Word Chain

Word Chain is an online word game meant to test your vocabulary and spelling skills.

## Rules

* At the start of the game you will be given a letter at random. You must enter a word that begins with that letter. From that point on, every succeeding word you enter must begin with the LAST LETTER OF THE PREVIOUS WORD.
* Every word must be a valid word in the English language.
* Every word must be spelled correctly.
* Every word must be TWO OR MORE LETTERS LONG.
* Every word must only consist of letters from the alphabet. (Numbers, spaces, and special characters will not be accepted.),
* No word will be accepted more than once.
* Names of people or places will not be accepted.
* Offensive swear words or slurs will not be accepted.
* You will have 60 seconds to build your chain and score as many points as possible.

Word Chain is built in Angular. Players' high scores are stored in local storage, meaning high scores will persist as long as the player continues to use the same device.

## Development server

`npm run start`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).