import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  nextLetter: string = alphabet[Math.floor(Math.random() * alphabet.length)];
  userInput: string = this.nextLetter;
  userInputColor: 'white' | 'green' | 'red' = 'white';
  wordChain: string[] = [];

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
    this.userInputColor = 'green';
    setTimeout(() => {
      this.wordChain.push(this.userInput);
      this.updateNextLetter();
    }, 250);
  }

  handleMistake(): void {
    this.userInputColor = 'red';
    setTimeout(() => {
      this.userInput = this.nextLetter;
      this.userInputColor = 'white';
    }, 500);
  }

  validateWord() {
    if (this.userInput[0] !== this.nextLetter || this.wordChain.includes(this.userInput)) {
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
    this.userInputColor = 'white';
  }
}
