# Word Chain

Word Chain is an online word game meant to test your vocabulary and spelling skills.

Word Chain is built in Angular. Players' high scores are stored in local storage, meaning high scores will persist as long as the player continues to use the same device.

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

The scoring system rewards strategic play by assigning higher points to the least common letters in the English language, such as X, J, Q, and Z, for example. To maximize your score, aim for longer words that contain these rarer letters. Note that the first letter of every word is excluded from the scoring calculation, as it is always provided.

## Development server

`npm run start`

## Build

`npm run build`

## Running unit tests

`npm run test`