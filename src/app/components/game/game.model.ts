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
    `At the start of the game you will be given a letter at random. You must enter a word that begins with that letter. From that point on, every succeeding word you enter must begin with the LAST LETTER OF THE PREVIOUS WORD.`,
    `Every word must be a valid word in the English language.`,
    `Every word must be spelled correctly.`,
    `Every word must be TWO OR MORE LETTERS LONG.`,
    `No word will be accepted more than once.`,
    `Names of people or places will not be accepted.`,
    `Offensive swear words or slurs will not be accepted.`,
    `You will have 60 seconds to build your chain and score as many points possible.`,
];

export const letterPoints: { [key: string]: number } = { // arranged by frequency
  E: 10,
  T: 20,
  A: 30,
  O: 40,
  I: 50,
  N: 60,
  S: 70,
  H: 80,
  R: 90,
  D: 100,
  L: 110,
  C: 120,
  U: 130,
  M: 140,
  W: 150,
  F: 160,
  G: 170,
  Y: 180,
  P: 190,
  B: 200,
  V: 210,
  K: 220,
  X: 230,
  J: 240,
  Q: 250,
  Z: 260,
};