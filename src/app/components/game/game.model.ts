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

export const introText = [
  `Welcome to Link-A-Word! Get ready for an exciting word chain challenge!`,
  `Your mission is to create a chain of words by starting each word with the given letter. Every letter in your word gets you points, with the least common letters being worth the most.`,
  `But here's the twist: the next word must begin with the last letter of the previous word. `,
  `Think fast and keep the chain going to maximize your score. Can you create the longest chain and score the most points within the thrilling 60-second time limit? Test your word prowess now!`,
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