import { Component, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, take } from 'rxjs';
import { alphabet, Word, TextColors, textColors, letterPoints, TimerEventData } from '../../game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  @Output() timerFinished: EventEmitter<TimerEventData> = new EventEmitter<TimerEventData>();
  @Output() quitButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  countdown: string | null = '3';
  nextLetter: string = '';
  userInput: string = this.nextLetter;
  userInputColor: TextColors = textColors.default;
  wordChain: string[] = [];
  wordCache = new Map();
  score: number = 0;
  highScore: number = Number(localStorage.getItem('highScore')) || 0;
  alphabet = alphabet;
  letterPoints = letterPoints;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.startCountdown();
  }

  focusOnInput(): void {
    this.inputField.nativeElement.focus();
  }

  startCountdown(): void {
    const countdownValues = ['3', '2', '1', 'GO'];
    let countdownIndex = 0;

    const displayCountdown = () => {
      if (countdownIndex >= countdownValues.length) {
        this.countdown = null;
        this.setNextLetter();
        this.focusOnInput();
      } else {
        this.countdown = countdownValues[countdownIndex];
        countdownIndex++;
        setTimeout(displayCountdown, 1000);
      }
    };

    displayCountdown();
  }

  setNextLetter(): void {
    this.nextLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    this.userInput = this.nextLetter;
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
    this.userInputColor = textColors.success;
    const stats = [];
    for (let i = 1; i < this.userInput.length; i++) {
      stats.push({
        letter: this.userInput[i],
        points: this.letterPoints[this.userInput[i]],
      });
    }
    const totalPoints = this.calculateScore();
    const word: Word = {
      index: this.wordChain.length,
      definitions: dictionaryResp.firstDefinition,
      stats,
      totalPoints,
    };
    setTimeout(() => {
      this.wordChain.push(this.userInput);
      this.wordCache.set(this.userInput, word);
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
    const alphabetRegex = /^[a-zA-Z]+$/;
    if (this.userInput[0] !== this.nextLetter || this.userInput.length === 1 || this.wordCache.has(this.userInput) || !alphabetRegex.test(this.userInput)) {
      this.handleMistake();
      return;
    }

    const validatorURL = `http://localhost:8080/validity/${this.userInput}`;
    const dictResp = this.http.get(validatorURL)
    dictResp.isValid ? this.handleSuccess(dictionaryResp) : this.handleMistake();

  }


  updateNextLetter(): void {
    this.nextLetter = this.userInput[this.userInput.length - 1];
    this.userInput = this.nextLetter;
    this.userInputColor = textColors.default;
  }

  handleTimerFinished(): void {
    this.timerFinished.emit({
      chain: this.wordChain,
      cache: this.wordCache,
      score: this.score,
    });
  }

  playAgain(): void {
    this.wordChain = [];
    this.wordCache = new Map();
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore.toLocaleString());
    }
    this.score = 0;
    this.setNextLetter();
    this.userInput = this.nextLetter;

    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  quit(): void {
    this.score = 0;
    this.quitButtonClicked.emit();
  }
}
