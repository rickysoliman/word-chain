export const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export enum TextColors {
  Default = 'white',
  Success = '#00FF00',
  Mistake = '#DC143C',
};
export const textColors = {
  default: TextColors.Default,
  success: TextColors.Success,
  mistake: TextColors.Mistake,
};

export const introText = `Welcome to Link-A-Word! Get ready for an exciting word chain challenge!`;

export const rules = [
    `At the start of the game you will be given a letter at random. Your first word must begin with that letter. From that point on, every succeeding word must begin with the LAST LETTER OF THE PREVIOUS WORD.`,
    `Every word must be a valid word in the English language.`,
    `Every word must be spelled correctly.`,
    `Every word must be TWO OR MORE LETTERS LONG.`,
    `No word will be accepted more than once.`,
    `Names of people or places will not be accepted.`,
    `Offensive swear words or slurs will not be accepted.`,
    `You will have 60 seconds to build your chain and score as many points possible.`,
];

export const letterPoints: { [key: string]: number } = { // arranged by frequency
  E: 1,
  T: 2,
  A: 3,
  O: 4,
  I: 5,
  N: 6,
  S: 7,
  H: 8,
  R: 9,
  D: 10,
  L: 11,
  C: 12,
  U: 13,
  M: 14,
  W: 15,
  F: 16,
  G: 17,
  Y: 18,
  P: 19,
  B: 20,
  V: 21,
  K: 22,
  X: 23,
  J: 24,
  Q: 25,
  Z: 26,
};