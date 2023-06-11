import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { alphabet, Word, TextColors, textColors, introText, rules, letterPoints } from './game.model';

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
  wordCache = new Map();
  score: number = 0;
  highScore: number = Number(localStorage.getItem('highScore')) || 0;
  hasGameStarted: boolean = false;
  showGameOverScreen: boolean = false;
  showRules: boolean = false;
  introText = introText;
  rules = rules;
  alphabet = alphabet;
  letterPoints = letterPoints;
  dropdownStates: { [word: string]: boolean } = {};

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    if (this.hasGameStarted) {
      this.inputField.nativeElement.focus();
    }
  }

  onInput(event: Event): void {
    const htmlElement = event.target as HTMLInputElement;
    const value = htmlElement.value.toUpperCase();
    this.userInput = value;
  }

  onSubmit(): void {
    this.validateWord();
  }

  calculateScore(): number {
    let score = 0;
    for (let i = 1; i < this.userInput.length; i++) {
      score += letterPoints[this.userInput[i]];
    }
    return score;
  }

  handleSuccess(dictionaryResp: any): void {
    console.log({ dictionaryResp });
    this.userInputColor = textColors.success;
    const stats = [];
    for (let i = 1; i < this.userInput.length; i++) {
      stats.push({
        letter: this.userInput[i],
        points: this.letterPoints[this.userInput[i]],
      });
    }
    const totalPoints = this.calculateScore();
    console.log(stats);
    const word: Word = {
      index: this.wordChain.length,
      definitions: dictionaryResp[0].meanings,
      stats,
      totalPoints,
    };
    setTimeout(() => {
      this.wordChain.push(this.userInput);
      this.wordCache.set(this.userInput, word);
      console.log(this.wordCache.get(this.userInput));
      this.score += totalPoints;
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
    if (this.userInput[0] !== this.nextLetter || this.userInput.length === 1 || this.wordCache.has(this.userInput)) {
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
        containsProfanity ? this.handleMistake() : this.handleSuccess(dictionaryResp);
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
    this.wordCache = new Map();
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore.toString());
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
    this.nextLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    this.userInput = this.nextLetter;
    this.hasGameStarted = false;
    this.showGameOverScreen = false;
  }

  displayRules(): void {
    this.showRules = true;
  }

  hideRules(): void {
    this.showRules = false;
  }

  toggleDropdown(word: string): void {
    this.dropdownStates[word] = !this.dropdownStates[word];
  }

  isDropdownOpen(word: string): boolean {
    return this.dropdownStates[word] || false;
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
