import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
enum TextColors {
  Default = 'white',
  Success = '#00FF00',
  Mistake = '#DC143C',
};
const textColors = {
  default: TextColors.Default,
  success: TextColors.Success,
  mistake: TextColors.Mistake,
};

const introText = [
  `Welcome to Link-A-Word! Get ready for an exciting word chain challenge!`,
  `Your mission is to create a chain of words by starting each word with the given letter. You'll be rewarded with 1 point for every letter in your word.`,
  `But here's the twist: the next word must begin with the last letter of the previous word. `,
  `Think fast and keep the chain going to maximize your score. Can you create the longest chain and score the most points within the thrilling 60-second time limit? Test your word prowess now!`,
];

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  nextLetter: string = alphabet[Math.floor(Math.random() * alphabet.length)];
  userInput: string = this.nextLetter;
  userInputColor: TextColors = textColors.default;
  wordChain: string[] = [];
  score: number = 0;
  highScore: number = 0;
  hasGameStarted: boolean = false;
  showGameOverScreen: boolean = false;
  introText = introText;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.inputField.nativeElement.focus();
  }

  onInput(event: Event): void {
    const htmlElement = event.target as HTMLInputElement;
    const value = htmlElement.value.toUpperCase();
    this.userInput = value;
  }

  onSubmit(): void {
    this.validateWord();
  }

  handleSuccess(): void {
    this.userInputColor = textColors.success;
    setTimeout(() => {
      this.wordChain.push(this.userInput);
      this.score += this.userInput.length;
      this.updateNextLetter();
    }, 250);
  }

  handleMistake(): void {
    this.userInputColor = textColors.mistake;
    setTimeout(() => {
      this.userInput = this.nextLetter;
      this.userInputColor = textColors.default;
    }, 500);
  }

  validateWord() {
    if (this.userInput[0] !== this.nextLetter || this.userInput.length === 1 || this.wordChain.includes(this.userInput)) {
      this.handleMistake();
      return;
    }

    const dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${this.userInput}`;
    const profanityUrl = `https://www.purgomalum.com/service/containsprofanity?text=${this.userInput}`;

    forkJoin([
      this.http.get(dictionaryUrl),
      this.http.get(profanityUrl),
    ]).subscribe(
      ([dictionaryResp, containsProfanity]) => {
        containsProfanity ? this.handleMistake() : this.handleSuccess();
      },
      (error: any) => {
        this.handleMistake();
      }
    );
  }

  updateNextLetter(): void {
    this.nextLetter = this.userInput[this.userInput.length - 1];
    this.userInput = this.nextLetter;
    this.userInputColor = textColors.default;
  }

  handleTimerFinished(): void {
    this.hasGameStarted = false;
    this.showGameOverScreen = true;
  }

  playAgain(): void {
    this.wordChain = [];
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    this.score = 0;
    this.nextLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    this.userInput = this.nextLetter;
    this.hasGameStarted = true;
    this.showGameOverScreen = false;
    
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  quit(): void {
    this.score = 0;
    this.highScore = 0;
    this.nextLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    this.userInput = this.nextLetter;
    this.hasGameStarted = false;
    this.showGameOverScreen = false;
  }
}
